'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getMenuHistory, createMenu } from '@/lib/api/plans';
import { MenuHistoryItem } from '@/lib/types/plans';
import { User } from '@/lib/auth/client';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw, UserCircle } from 'lucide-react';
import PlanCard from '@/components/plans/PlanCard';
import SearchAndFilters from '@/components/plans/SearchAndFilters';
import EmptyState from '@/components/plans/EmptyState';
import IncompleteProfileState from '@/components/plans/IncompleteProfileState';

interface PlansViewProps {
  user: User;
}

export default function PlansView({ user }: PlansViewProps) {
  const [plans, setPlans] = useState<MenuHistoryItem[]>([]);
  const [filteredPlans, setFilteredPlans] = useState<MenuHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isIncompleteProfile, setIsIncompleteProfile] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // Polling para planes en processing
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadPlans();

    // Cleanup polling on unmount
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, []);

  // Aplicar filtros cuando cambien planes, searchTerm o selectedStatus
  useEffect(() => {
    filterPlans();
  }, [plans, searchTerm, selectedStatus]);

  // Setup polling si hay planes en processing
  useEffect(() => {
    const hasProcessing = plans.some(p => p.status === 'processing');

    if (hasProcessing && !pollingInterval) {
      // Poll cada 5 segundos
      const interval = setInterval(() => {
        loadPlansQuietly();
      }, 5000);
      setPollingInterval(interval);
    } else if (!hasProcessing && pollingInterval) {
      clearInterval(pollingInterval);
      setPollingInterval(null);
    }
  }, [plans]);

  const loadPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      setIsIncompleteProfile(false);
      const data = await getMenuHistory();
      setPlans(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar planes';

      // Detectar si es un error de perfil incompleto
      if (errorMessage.toLowerCase().includes('incomplete') ||
          errorMessage.toLowerCase().includes('complete your profile')) {
        setIsIncompleteProfile(true);
        setError(null);
      } else {
        setError(errorMessage);
        setIsIncompleteProfile(false);
      }
    } finally {
      setLoading(false);
    }
  };

  // Reload sin mostrar loading (para polling)
  const loadPlansQuietly = async () => {
    try {
      const data = await getMenuHistory();
      setPlans(data);
    } catch (err) {
      console.error('Error polling plans:', err);
    }
  };

  const filterPlans = () => {
    let filtered = [...plans];

    // Filtrar por status
    if (selectedStatus) {
      filtered = filtered.filter(p => p.status === selectedStatus);
    }

    // Filtrar por búsqueda de texto
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p => {
        const dateMatch = p.week_start_date.toLowerCase().includes(term);
        const createdMatch = p.created_at.toLowerCase().includes(term);
        return dateMatch || createdMatch;
      });
    }

    // Ordenar por fecha de creación (más recientes primero)
    filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    setFilteredPlans(filtered);
  };

  // Agrupar planes por mes/año
  const groupPlansByMonth = (plans: MenuHistoryItem[]) => {
    const groups: { [key: string]: MenuHistoryItem[] } = {};

    plans.forEach(plan => {
      const date = new Date(plan.created_at);
      const key = `${date.getFullYear()}-${String(date.getMonth()).padStart(2, '0')}`;
      const monthYear = date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
      const capitalizedMonthYear = monthYear.charAt(0).toUpperCase() + monthYear.slice(1);

      if (!groups[capitalizedMonthYear]) {
        groups[capitalizedMonthYear] = [];
      }
      groups[capitalizedMonthYear].push(plan);
    });

    return groups;
  };

  const handleCreatePlan = async () => {
    try {
      setIsGenerating(true);
      setError(null);
      setIsIncompleteProfile(false);
      await createMenu();
      // Recargar inmediatamente para mostrar el plan "processing"
      await loadPlans();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al generar plan';

      // Detectar si es un error de perfil incompleto
      if (errorMessage.toLowerCase().includes('incomplete') ||
          errorMessage.toLowerCase().includes('complete your profile')) {
        setIsIncompleteProfile(true);
        setError(null);
      } else {
        setError(errorMessage);
        setIsIncompleteProfile(false);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Cargando planes...</p>
        </div>
      </div>
    );
  }

  // Incomplete profile state
  if (isIncompleteProfile && plans.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <IncompleteProfileState />
      </div>
    );
  }

  // Error state
  if (error && plans.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button
            onClick={loadPlans}
            variant="outline"
            className="shadow-lg"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Mis Planes de Comida
            </h1>
            <p className="text-gray-600 mt-2">
              Historial de tus planes generados
            </p>
          </div>
          {plans.length > 0 && (
            <Button
              onClick={handleCreatePlan}
              disabled={isGenerating}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-500/20 hover:shadow-green-500/40 hover:scale-[1.02] transition-all"
            >
              <Plus className="w-4 h-4 mr-2" />
              {isGenerating ? 'Generando...' : 'Nuevo Plan'}
            </Button>
          )}
        </motion.div>

        {/* Empty State */}
        {plans.length === 0 ? (
          <EmptyState onCreatePlan={handleCreatePlan} isGenerating={isGenerating} />
        ) : (
          <>
            {/* Search and Filters */}
            <SearchAndFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
            />

            {/* Incomplete profile banner (si hay error de perfil incompleto) */}
            {isIncompleteProfile && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-blue-50 to-emerald-50 border-2 border-blue-200 px-6 py-4 rounded-xl mb-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center">
                      <UserCircle className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Necesitas completar tu perfil
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Para generar nuevos planes de comida personalizados, completa tu perfil con información sobre tus objetivos, edad, peso y nivel de actividad.
                    </p>
                    <Button
                      onClick={() => window.location.href = '/profile'}
                      size="sm"
                      className="bg-gradient-to-r from-blue-500 to-emerald-600 hover:from-blue-600 hover:to-emerald-700"
                    >
                      Completar perfil
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Error banner (si hay error pero también datos) */}
            {error && !isIncompleteProfile && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
              >
                {error}
              </motion.div>
            )}

            {/* Plans List */}
            {filteredPlans.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-gray-500">No se encontraron planes con los filtros aplicados</p>
              </motion.div>
            ) : (
              <div className="flex flex-col gap-8">
                {Object.entries(groupPlansByMonth(filteredPlans)).map(([monthYear, monthPlans], groupIndex) => (
                  <motion.div
                    key={monthYear}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: groupIndex * 0.1 }}
                    className="flex flex-col gap-3 md:gap-4"
                  >
                    {/* Month Header */}
                    <div className="flex items-center gap-3 px-2">
                      <h2 className="text-xl font-bold text-gray-700">
                        {monthYear}
                      </h2>
                      <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent" />
                      <span className="text-sm text-gray-500 font-medium">
                        {monthPlans.length} {monthPlans.length === 1 ? 'plan' : 'planes'}
                      </span>
                    </div>

                    {/* Plans in this month */}
                    <div className="flex flex-col gap-3 md:gap-4">
                      {monthPlans.map((plan, index) => (
                        <PlanCard key={plan.id} plan={plan} index={index} />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

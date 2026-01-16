'use client';

import { motion } from 'framer-motion';
import { MenuHistoryItem, STATUS_LABELS, STATUS_BADGE_STYLES } from '@/lib/types/plans';
import { Calendar, Flame, Loader2, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

interface PlanCardProps {
  plan: MenuHistoryItem;
  index: number;
}

export default function PlanCard({ plan, index }: PlanCardProps) {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <Loader2 className="w-3 h-3 animate-spin" />;
      case 'failed':
        return <AlertCircle className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const handleClick = () => {
    if (plan.status === 'completed') {
      router.push(`/plans/${plan.id}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
      onClick={handleClick}
      className={plan.status === 'completed' ? 'cursor-pointer' : ''}
    >
      <Card className="bg-white/70 backdrop-blur-xl border-2 border-gray-200/50 hover:shadow-xl hover:border-green-300/50 transition-all">
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            {/* Icono y Fecha */}
            <div className="flex items-center gap-4 min-w-0 flex-1">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20 flex-shrink-0">
                <Calendar className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-base md:text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent truncate">
                  Semana del {formatDate(plan.week_start_date)}
                </div>
                <div className="text-xs md:text-sm text-gray-500 mt-0.5">
                  Creado el {formatDate(plan.created_at)}
                </div>
              </div>
            </div>

            {/* Calorías */}
            <div className="flex items-center gap-3 md:min-w-[200px] bg-gray-50/50 rounded-xl px-4 py-2.5 border border-gray-100">
              <div className="flex items-center gap-2 text-gray-600">
                <Flame className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span className="text-xs md:text-sm whitespace-nowrap">Total semanal:</span>
              </div>
              <div className="text-lg md:text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {plan.calories_total ? plan.calories_total.toLocaleString() : '—'} kcal
              </div>
            </div>

            {/* Badge de status */}
            <Badge className={`${STATUS_BADGE_STYLES[plan.status]} self-start md:self-center flex-shrink-0`}>
              <div className="flex items-center gap-1.5">
                {getStatusIcon(plan.status)}
                <span>{STATUS_LABELS[plan.status]}</span>
              </div>
            </Badge>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

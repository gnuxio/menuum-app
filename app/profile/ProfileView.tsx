'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getProfile, updateProfile, createProfile, CreateProfilePayload, type ProfileResponse } from '@/lib/api/profile';
import { User } from '@/lib/auth/client';
import AvatarUpload from '@/components/profile/AvatarUpload';
import ChangePasswordModal from '@/components/profile/ChangePasswordModal';
import ProfileInfoCard from '@/components/profile/ProfileInfoCard';
import { GOAL_LABELS, ACTIVITY_LABELS } from '@/lib/types/profile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  User as UserIcon,
  Target,
  MapPin,
  Flame,
  UtensilsCrossed,
  Shield,
  Pencil,
  Check,
  X,
  Loader2,
  CheckCircle,
  Activity
} from 'lucide-react';

interface ProfileViewProps {
  user: User;
}

export default function ProfileView({ user }: ProfileViewProps) {
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Edit mode states
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<CreateProfilePayload>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProfile();
      setProfile(data);
    } catch (err) {
      // Si el perfil no existe (404), crear un perfil vacío
      if (err instanceof Error && (err.message.includes('404') || err.message.includes('no encontró'))) {
        // Perfil no existe, mostrar estado vacío
        setProfile({
          id: '', // Temporal, indica que necesita crearse
          name: user.name || undefined,
          // Resto vacío - usuario lo completará
        } as ProfileResponse);
      } else {
        setError(err instanceof Error ? err.message : 'Error al cargar perfil');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpdate = (newUrl: string) => {
    setProfile(prev => prev ? { ...prev, avatar_url: newUrl } : null);
  };

  // Initialize form data with profile data
  const initializeFormData = () => {
    if (!profile) return;
    setFormData({
      name: profile.name || '',
      last_name: profile.last_name || '',
      age: profile.age || 0,
      weight: profile.weight || 0,
      height: profile.height || 0,
      gender: profile.gender || '',
      country: profile.country || '',
      goal: profile.goal || '',
      activity_level: profile.activity_level || '',
      dislikes: profile.dislikes || []
    });
  };

  // Update a single field
  const updateField = (field: keyof CreateProfilePayload, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field error
    if (formErrors[field]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Validate form - Campos opcionales, solo validar formato
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Solo validar si el campo tiene valor (no requerir campos)
    if (formData.name && !formData.name.trim()) {
      errors.name = 'El nombre no puede estar vacío';
    }

    if (formData.last_name && !formData.last_name.trim()) {
      errors.last_name = 'El apellido no puede estar vacío';
    }

    if (formData.age && (formData.age < 13 || formData.age > 120)) {
      errors.age = 'La edad debe estar entre 13 y 120 años';
    }

    if (formData.weight && (formData.weight < 30 || formData.weight > 300)) {
      errors.weight = 'El peso debe estar entre 30 y 300 kg';
    }

    if (formData.height && (formData.height < 100 || formData.height > 250)) {
      errors.height = 'La estatura debe estar entre 100 y 250 cm';
    }

    if (formData.country && !formData.country.trim()) {
      errors.country = 'El país no puede estar vacío';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Toggle edit mode
  const handleEditToggle = () => {
    initializeFormData();
    setIsEditing(true);
  };

  // Cancel editing
  const handleCancel = () => {
    setIsEditing(false);
    setFormErrors({});
    initializeFormData();
  };

  // Save changes
  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setIsSaving(true);
      setError(null);

      let updatedProfile: ProfileResponse;

      // Si el perfil no tiene ID real, crear en lugar de actualizar
      if (!profile?.id || profile.id === '') {
        // Crear con los datos que el usuario haya llenado (todos opcionales)
        updatedProfile = await createProfile(formData);
      } else {
        // Perfil ya existe, actualizar
        updatedProfile = await updateProfile(formData);
      }

      setProfile(updatedProfile);
      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar cambios');
    } finally {
      setIsSaving(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'No se encontró el perfil'}</p>
          <button
            onClick={loadProfile}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
          >
            Reintentar
          </button>
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
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Mi Perfil
          </h1>
          <p className="text-gray-600 mt-2">Gestiona tu información personal</p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex justify-end gap-3 mb-4"
        >
          {!isEditing ? (
            <Button
              onClick={handleEditToggle}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-500/20"
            >
              <Pencil className="w-4 h-4 mr-2" />
              Editar perfil
            </Button>
          ) : (
            <>
              <Button
                onClick={handleCancel}
                variant="outline"
                disabled={isSaving}
                className="border-2"
              >
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-500/20"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Guardar cambios
                  </>
                )}
              </Button>
            </>
          )}
        </motion.div>

        {/* Success Banner */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border-2 border-green-200 text-green-700 px-6 py-4 rounded-xl mb-4 flex items-center gap-3"
          >
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Perfil actualizado exitosamente</span>
          </motion.div>
        )}

        {/* Complete Profile Banner */}
        {!profile.name || !profile.age || !profile.goal || !profile.activity_level ? (
          !isEditing && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-blue-50 to-emerald-50 border-2 border-blue-200 px-6 py-4 rounded-xl mb-4"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Complétanos un poco más sobre ti
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Ayúdanos a conocerte mejor para generar menús personalizados que se adapten a tus objetivos y preferencias
                  </p>
                  <Button
                    onClick={handleEditToggle}
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-emerald-600 hover:from-blue-600 hover:to-emerald-700"
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Completar perfil
                  </Button>
                </div>
              </div>
            </motion.div>
          )
        ) : null}

        {/* Avatar Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/70 backdrop-blur-xl rounded-3xl border-2 border-gray-200/50 p-8 mb-6 shadow-lg"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <AvatarUpload
              currentAvatarUrl={profile.avatar_url}
              userName={`${profile.name || ''} ${profile.last_name || ''}`.trim() || user.name || 'Usuario'}
              onUploadSuccess={handleAvatarUpdate}
            />
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                {profile.name} {profile.last_name}
              </h2>
              <p className="text-gray-600 mt-1">{user.email}</p>
            </div>
          </div>
        </motion.div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ProfileInfoCard
              title="Información Personal"
              icon={UserIcon}
            >
              {!isEditing ? (
                <div className="space-y-3">
                  {profile.name && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nombre:</span>
                      <span className="font-semibold text-gray-800">{profile.name}</span>
                    </div>
                  )}
                  {profile.last_name && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Apellido:</span>
                      <span className="font-semibold text-gray-800">{profile.last_name}</span>
                    </div>
                  )}
                  {profile.country && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">País:</span>
                      <span className="font-semibold text-gray-800 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-green-600" />
                        {profile.country}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => updateField('name', e.target.value)}
                      className={`h-11 ${formErrors.name ? 'border-red-500' : ''}`}
                      disabled={isSaving}
                    />
                    {formErrors.name && (
                      <p className="text-xs text-red-500">{formErrors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="last_name">Apellido</Label>
                    <Input
                      id="last_name"
                      type="text"
                      value={formData.last_name || ''}
                      onChange={(e) => updateField('last_name', e.target.value)}
                      className={`h-11 ${formErrors.last_name ? 'border-red-500' : ''}`}
                      disabled={isSaving}
                    />
                    {formErrors.last_name && (
                      <p className="text-xs text-red-500">{formErrors.last_name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">País</Label>
                    <Input
                      id="country"
                      type="text"
                      value={formData.country || ''}
                      onChange={(e) => updateField('country', e.target.value)}
                      className={`h-11 ${formErrors.country ? 'border-red-500' : ''}`}
                      disabled={isSaving}
                    />
                    {formErrors.country && (
                      <p className="text-xs text-red-500">{formErrors.country}</p>
                    )}
                  </div>
                </div>
              )}
            </ProfileInfoCard>
          </motion.div>

          {/* Physical Data Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <ProfileInfoCard title="Datos Físicos" icon={Activity}>
              {!isEditing ? (
                <div className="space-y-3">
                  {profile.age && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Edad:</span>
                      <span className="font-semibold text-gray-800">{profile.age} años</span>
                    </div>
                  )}
                  {profile.weight && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Peso:</span>
                      <span className="font-semibold text-gray-800">{profile.weight} kg</span>
                    </div>
                  )}
                  {profile.height && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estatura:</span>
                      <span className="font-semibold text-gray-800">{profile.height} cm</span>
                    </div>
                  )}
                  {profile.gender && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sexo:</span>
                      <span className="font-semibold text-gray-800 capitalize">
                        {profile.gender}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Edad</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age || ''}
                      onChange={(e) => updateField('age', parseFloat(e.target.value) || 0)}
                      className={`h-11 ${formErrors.age ? 'border-red-500' : ''}`}
                      disabled={isSaving}
                    />
                    {formErrors.age && <p className="text-xs text-red-500">{formErrors.age}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight">Peso (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={formData.weight || ''}
                      onChange={(e) => updateField('weight', parseFloat(e.target.value) || 0)}
                      className={`h-11 ${formErrors.weight ? 'border-red-500' : ''}`}
                      disabled={isSaving}
                    />
                    {formErrors.weight && <p className="text-xs text-red-500">{formErrors.weight}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="height">Estatura (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      value={formData.height || ''}
                      onChange={(e) => updateField('height', parseFloat(e.target.value) || 0)}
                      className={`h-11 ${formErrors.height ? 'border-red-500' : ''}`}
                      disabled={isSaving}
                    />
                    {formErrors.height && <p className="text-xs text-red-500">{formErrors.height}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Sexo</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {['masculino', 'femenino'].map((sex) => (
                        <button
                          key={sex}
                          type="button"
                          onClick={() => updateField('gender', sex)}
                          disabled={isSaving}
                          className={`p-3 rounded-xl border-2 transition-all cursor-pointer ${
                            formData.gender === sex
                              ? 'border-green-500 bg-green-50 shadow-lg shadow-green-500/20'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <span className="capitalize font-medium">{sex}</span>
                        </button>
                      ))}
                    </div>
                    {formErrors.gender && <p className="text-xs text-red-500">{formErrors.gender}</p>}
                  </div>
                </div>
              )}
            </ProfileInfoCard>
          </motion.div>

          {/* Fitness Goals Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ProfileInfoCard
              title="Objetivos de Fitness"
              icon={Target}
            >
              {!isEditing ? (
                <div className="space-y-4">
                  {profile.goal && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Objetivo:</span>
                      <span className="font-semibold text-gray-800">
                        {GOAL_LABELS[profile.goal] || profile.goal}
                      </span>
                    </div>
                  )}
                  {profile.calories && (
                    <div className="mt-4 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-100">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 text-gray-600 text-sm mb-1">
                          <Flame className="w-4 h-4 text-orange-500" />
                          <span>Calorías diarias</span>
                        </div>
                        <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                          {profile.calories.toLocaleString()}
                        </div>
                        <div className="text-gray-500 text-sm mt-1">kcal/día</div>
                      </div>
                    </div>
                  )}
                  {profile.activity_level && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Actividad:</span>
                      <span className="font-semibold text-gray-800">
                        {ACTIVITY_LABELS[profile.activity_level] || profile.activity_level}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Objetivo</Label>
                    <div className="space-y-2">
                      {[
                        { id: 'perder_peso', label: 'Perder peso' },
                        { id: 'mantener_peso', label: 'Mantener peso' },
                        { id: 'ganar_musculo', label: 'Ganar músculo' }
                      ].map((objetivo) => (
                        <button
                          key={objetivo.id}
                          type="button"
                          onClick={() => updateField('goal', objetivo.id)}
                          disabled={isSaving}
                          className={`w-full p-3 rounded-xl border-2 transition-all text-left cursor-pointer ${
                            formData.goal === objetivo.id
                              ? 'border-green-500 bg-green-50 shadow-lg shadow-green-500/20'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-semibold">{objetivo.label}</span>
                            {formData.goal === objetivo.id && (
                              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
                                  <path d="M5 13l4 4L19 7"></path>
                                </svg>
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                    {formErrors.goal && <p className="text-xs text-red-500">{formErrors.goal}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Nivel de actividad</Label>
                    <div className="space-y-2">
                      {[
                        { id: 'sedentario', label: 'Sedentario', desc: 'Poco o ningún ejercicio' },
                        { id: 'ligero', label: 'Ligero', desc: 'Ejercicio ligero 1-3 días/semana' },
                        { id: 'moderado', label: 'Moderado', desc: 'Ejercicio moderado 3-5 días/semana' },
                        { id: 'alto', label: 'Alto', desc: 'Ejercicio intenso 6-7 días/semana' },
                        { id: 'muy_alto', label: 'Muy alto', desc: 'Entrenamiento intenso diario' }
                      ].map((actividad) => (
                        <button
                          key={actividad.id}
                          type="button"
                          onClick={() => updateField('activity_level', actividad.id)}
                          disabled={isSaving}
                          className={`w-full p-3 rounded-xl border-2 transition-all text-left cursor-pointer ${
                            formData.activity_level === actividad.id
                              ? 'border-green-500 bg-green-50 shadow-lg shadow-green-500/20'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-semibold text-sm">{actividad.label}</div>
                              <div className="text-xs text-gray-600">{actividad.desc}</div>
                            </div>
                            {formData.activity_level === actividad.id && (
                              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
                                  <path d="M5 13l4 4L19 7"></path>
                                </svg>
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                    {formErrors.activity_level && <p className="text-xs text-red-500">{formErrors.activity_level}</p>}
                  </div>
                </div>
              )}
            </ProfileInfoCard>
          </motion.div>

          {/* Preferences Card */}
          {((profile.dislikes && profile.dislikes.length > 0) || isEditing) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <ProfileInfoCard
                title="Preferencias Alimenticias"
                icon={UtensilsCrossed}
              >
                {!isEditing ? (
                  <div>
                    <p className="text-gray-600 text-sm mb-3">No me gusta:</p>
                    <div className="flex flex-wrap gap-2">
                      {profile.dislikes?.map((item, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm border border-red-100"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Label>No me gusta (opcional)</Label>
                    <p className="text-xs text-gray-500">Agrega alimentos que prefieres evitar</p>

                    {formData.dislikes && formData.dislikes.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.dislikes.map((item, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm border border-red-100 flex items-center gap-2"
                          >
                            {item}
                            <button
                              type="button"
                              onClick={() => {
                                const newDislikes = formData.dislikes?.filter((_, i) => i !== index);
                                updateField('dislikes', newDislikes || []);
                              }}
                              disabled={isSaving}
                              className="hover:text-red-900 cursor-pointer"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}

                    <Input
                      placeholder="Ej: Brócoli, pescado..."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const value = e.currentTarget.value.trim();
                          if (value) {
                            const newDislikes = [...(formData.dislikes || []), value];
                            updateField('dislikes', newDislikes);
                            e.currentTarget.value = '';
                          }
                        }
                      }}
                      disabled={isSaving}
                      className="h-11"
                    />
                    <p className="text-xs text-gray-500">Presiona Enter para agregar</p>
                  </div>
                )}
              </ProfileInfoCard>
            </motion.div>
          )}

          {/* Security Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <ProfileInfoCard
              title="Seguridad"
              icon={Shield}
            >
              <div className="space-y-3">
                <ChangePasswordModal />
                <p className="text-sm text-gray-500 mt-4 text-center">
                  Para cerrar sesión, usa el botón en el menú lateral
                </p>
              </div>
            </ProfileInfoCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

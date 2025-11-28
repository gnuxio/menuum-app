import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import ProfileClient from '@/components/profile/ProfileClient';

export default async function ProfilePage() {
    const supabase = await createClient();

    // Verificar autenticación
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        redirect('/login');
    }

    // Obtener datos del perfil
    const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

    if (profileError) {
        console.error('Error cargando perfil:', profileError);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-white">
            <div className="container mx-auto px-4 py-8">
                <ProfileClient
                    user={user}
                    profile={profile}
                />
            </div>
        </div>
    );
}

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validar que tengamos los datos mínimos requeridos
        if (!body.objetivo || !body.edad || !body.peso || !body.estatura) {
            return NextResponse.json(
                { error: 'Faltan datos requeridos' },
                { status: 400 }
            );
        }

        // Crear cliente de Supabase desde el servidor
        const supabase = await createClient();

        // Obtener el usuario autenticado
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json(
                { error: 'Usuario no autenticado' },
                { status: 401 }
            );
        }

        // Guardar los datos del onboarding en la tabla de perfiles
        // NOTA: Necesitarás crear esta tabla en Supabase
        const { data, error } = await supabase
            .from('user_profiles')
            .upsert({
                user_id: user.id,
                objetivo: body.objetivo,
                edad: body.edad,
                peso: body.peso,
                estatura: body.estatura,
                sexo: body.sexo,
                nivel_actividad: body.nivel_actividad,
                preferencia_alimenticia: body.preferencia_alimenticia,
                restricciones: body.restricciones,
                comidas_al_dia: body.comidas_al_dia,
                nivel_cocina: body.nivel_cocina,
                tiempo_disponible: body.tiempo_disponible,
                equipo_disponible: body.equipo_disponible,
                onboarding_completed: true,
                updated_at: new Date().toISOString(),
            })
            .select()
            .single();

        if (error) {
            console.error('Error guardando perfil:', error);
            return NextResponse.json(
                { error: 'Error al guardar el perfil', details: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data,
        });
    } catch (error) {
        console.error('Error en API onboarding:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}

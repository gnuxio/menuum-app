# Estrategia de Producto - Menuum

> **Objetivo:** Definir características valiosas para convertir Menuum en un SaaS rentable
> **Fecha:** Enero 2026

---

## Mi Opinión del Proyecto

### Lo que Menuum Hace Bien

1. **Problema real, solución clara** - "¿Qué como hoy?" es una pregunta que millones de personas se hacen diariamente. Menuum resuelve la fatiga de decisión.

2. **Personalización desde el inicio** - El perfil con objetivos, restricciones y datos físicos permite menús realmente personalizados, no genéricos.

3. **Arquitectura técnica sólida** - Next.js + Go backend es una combinación escalable. El procesamiento async de menús permite escalar sin bloquear la UX.

4. **Mercado hispanohablante** - Hay menos competencia en español que en inglés. Es un diferenciador.

### Donde Veo Oportunidad

1. **El menú es solo el inicio** - Actualmente generas el menú y... ¿luego qué? Falta el "después": lista de compras, recetas, tracking.

2. **Monetización no definida** - No veo tiers de pricing ni límites. Sin esto, no hay modelo de negocio.

3. **Retención** - ¿Por qué volvería un usuario la próxima semana? Necesitas hooks que generen hábito.

4. **Diferenciación** - Hay muchas apps de meal planning. ¿Qué hace único a Menuum?

---

## Análisis del Mercado

### Competidores Principales

| App | Modelo | Precio | Fortaleza | Debilidad |
|-----|--------|--------|-----------|-----------|
| **Mealime** | Freemium | $5-10/mes | UX excelente, recetas detalladas | Solo inglés, no personaliza por objetivos |
| **Eat This Much** | Freemium | $9/mes | Muy personalizable, macros | UX anticuada, abrumador |
| **Yazio** | Freemium | $7/mes | Tracking + planning | Más enfocado en tracking que planning |
| **Noom** | Suscripción | $60/mes | Coaching, psicología | Muy caro, no es solo meal planning |
| **PlateJoy** | Suscripción | $12/mes | Integración supermercados | Solo USA |

### Oportunidad para Menuum

- **Mercado hispanohablante desatendido** - La mayoría de competidores fuertes son solo en inglés
- **Precio accesible** - Hay espacio entre "gratis pero limitado" y "premium caro"
- **IA como diferenciador real** - No solo usar IA para generar, sino para aprender y mejorar

---

## Modelo de Monetización Recomendado

### Tier Gratuito (Free)
**Objetivo:** Adquisición de usuarios, prueba del producto

| Característica | Límite |
|----------------|--------|
| Menús semanales | 2 por mes |
| Regenerar comidas | 3 por semana |
| Historial | Últimos 30 días |
| Lista de compras | Básica (solo ingredientes) |
| Recetas | Vista simplificada |

### Tier Pro ($4.99-7.99/mes)
**Objetivo:** Usuarios individuales comprometidos

| Característica | Incluido |
|----------------|----------|
| Menús semanales | Ilimitados |
| Regenerar comidas | Ilimitado |
| Historial | Completo |
| Lista de compras | Con cantidades y categorías |
| Recetas | Paso a paso con fotos |
| Sustituciones | Sugerir alternativas |
| Favoritos | Guardar comidas preferidas |
| Exportar | PDF, compartir |

### Tier Familia ($9.99-12.99/mes)
**Objetivo:** Hogares con múltiples personas

| Característica | Incluido |
|----------------|----------|
| Todo de Pro | ✓ |
| Perfiles | Hasta 5 personas |
| Porciones | Ajuste automático |
| Preferencias cruzadas | Menú que funcione para todos |
| Lista unificada | Una lista para toda la familia |

### Tier Premium ($14.99-19.99/mes)
**Objetivo:** Usuarios avanzados, fitness, salud específica

| Característica | Incluido |
|----------------|----------|
| Todo de Familia | ✓ |
| Condiciones médicas | Diabetes, hipertensión, etc. |
| Integración wearables | Ajuste por actividad real |
| Nutricionista IA | Chat para dudas |
| Meal prep | Optimización de preparación |
| Análisis avanzado | Tendencias, insights |

---

## Características Valiosas a Implementar

### Prioridad 1: Core del Negocio (Implementar Primero)

---

#### 1.1 Lista de Compras Automática

**¿Qué es?**
Generar automáticamente la lista de ingredientes necesarios para el menú semanal, agrupados por categoría de supermercado.

**¿Por qué es valiosa?**
- Es el paso lógico después de generar el menú
- Ahorra tiempo real al usuario (20-30 min por semana)
- Alta demanda - es feature #1 más pedida en apps de meal planning
- Crea dependencia del producto

**¿Cómo funcionaría?**

```
[Menú Semanal] → [Extraer ingredientes] → [Consolidar cantidades] → [Agrupar por categoría]

Ejemplo de output:
┌─────────────────────────────────────┐
│ 🛒 Lista de Compras - Semana 15    │
├─────────────────────────────────────┤
│ 🥬 VERDURAS                         │
│   □ Espinacas (300g)                │
│   □ Tomates (6 unidades)            │
│   □ Cebolla (3 unidades)            │
│                                     │
│ 🥩 PROTEÍNAS                        │
│   □ Pechuga de pollo (800g)         │
│   □ Salmón (400g)                   │
│   □ Huevos (12 unidades)            │
│                                     │
│ 🧀 LÁCTEOS                          │
│   □ Queso mozzarella (200g)         │
│   □ Yogur griego (500g)             │
└─────────────────────────────────────┘
```

**Implementación técnica:**
1. Backend: Endpoint `/api/v1/menu/:id/shopping-list`
2. Consolidar ingredientes de todas las comidas
3. Convertir unidades cuando sea posible (ej: 2 recetas con 100g tomate = 200g)
4. Categorizar por tipo de alimento
5. Frontend: Nueva vista con checkboxes para marcar comprados

**Esfuerzo estimado:** Medio
**Impacto en retención:** Alto

---

#### 1.2 Recetas Paso a Paso

**¿Qué es?**
Mostrar instrucciones detalladas de preparación para cada comida, no solo los ingredientes.

**¿Por qué es valiosa?**
- Sin esto, el usuario tiene que buscar recetas en otro lado
- Completa la experiencia de extremo a extremo
- Diferenciador vs apps que solo dicen "qué" pero no "cómo"

**¿Cómo funcionaría?**

```
┌─────────────────────────────────────────┐
│ 🍳 Ensalada César con Pollo             │
│ ⏱️ 25 min  |  👤 2 porciones  |  650 kcal │
├─────────────────────────────────────────┤
│ INGREDIENTES                            │
│ • 200g pechuga de pollo                 │
│ • 1 lechuga romana                      │
│ • 50g queso parmesano                   │
│ • Croutones (opcional)                  │
│ • Aderezo César                         │
├─────────────────────────────────────────┤
│ PREPARACIÓN                             │
│                                         │
│ 1. Sazona el pollo con sal y pimienta   │
│    [imagen opcional]                    │
│                                         │
│ 2. Cocina a la plancha 6-7 min por lado │
│    hasta que esté dorado                │
│                                         │
│ 3. Mientras, lava y corta la lechuga    │
│                                         │
│ 4. Corta el pollo en tiras              │
│                                         │
│ 5. Mezcla todo con el aderezo           │
│                                         │
│ 💡 TIP: Deja reposar el pollo 2 min     │
│    antes de cortar para que quede jugoso│
└─────────────────────────────────────────┘
```

**Implementación técnica:**
1. Expandir modelo de datos de "Meal" para incluir `preparation_steps[]`
2. Backend debe generar/almacenar pasos de preparación
3. Frontend: Vista expandida de receta con pasos numerados
4. Opcional: Timer integrado para pasos con tiempo

**Esfuerzo estimado:** Medio-Alto
**Impacto en retención:** Alto

---

#### 1.3 Sistema de Favoritos y "No me gusta"

**¿Qué es?**
Permitir al usuario marcar comidas como favoritas o indicar que no le gustó, para mejorar futuras recomendaciones.

**¿Por qué es valiosa?**
- Personalización real basada en feedback
- El menú mejora con el tiempo (crea lealtad)
- Reduce regeneraciones manuales
- Datos valiosos para el algoritmo

**¿Cómo funcionaría?**

```
┌─────────────────────────────────────┐
│ 🥗 Ensalada Mediterránea           │
│ 450 kcal                            │
│                                     │
│ [❤️ Favorito]  [👎 No repetir]     │
│                                     │
│ [🔄 Regenerar]  [📖 Ver receta]    │
└─────────────────────────────────────┘
```

**Comportamiento:**
- ❤️ **Favorito**: Aumenta probabilidad de aparecer en futuros menús
- 👎 **No repetir**: Excluye esta comida de futuros menús
- El sistema aprende patrones (ej: "no le gustan las ensaladas los lunes")

**Implementación técnica:**
1. Tabla `user_meal_preferences`: user_id, meal_id, preference (favorite/dislike)
2. Endpoint `POST /api/v1/meals/:id/preference`
3. Algoritmo de generación considera preferencias
4. Vista de favoritos para generar menús desde ahí

**Esfuerzo estimado:** Bajo-Medio
**Impacto en retención:** Alto

---

#### 1.4 Límites y Tiers (Monetización)

**¿Qué es?**
Implementar el sistema de planes Free/Pro/Familia/Premium con límites reales.

**¿Por qué es valiosa?**
- Sin esto, no hay modelo de negocio
- Los límites del tier gratuito crean urgencia
- Permite probar antes de pagar

**¿Cómo funcionaría?**

```
Usuario Free intenta generar 3er menú del mes:
┌─────────────────────────────────────────┐
│ ⚠️ Has alcanzado tu límite mensual     │
│                                         │
│ Con el plan gratuito puedes generar    │
│ 2 menús por mes.                        │
│                                         │
│ Este mes has generado: 2/2 menús       │
│ Próxima renovación: 15 de febrero      │
│                                         │
│ [🚀 Actualizar a Pro - $6.99/mes]      │
│                                         │
│ Con Pro obtienes:                       │
│ ✓ Menús ilimitados                      │
│ ✓ Lista de compras completa             │
│ ✓ Recetas paso a paso                   │
│ ✓ Favoritos y preferencias              │
└─────────────────────────────────────────┘
```

**Implementación técnica:**
1. Campo `subscription_tier` en usuario
2. Tabla `subscription_limits` con límites por tier
3. Middleware que verifica límites antes de acciones
4. Integración con Stripe/Paddle para pagos
5. Webhooks para actualizar tier al pagar

**Esfuerzo estimado:** Alto
**Impacto en ingresos:** Crítico

---

### Prioridad 2: Diferenciadores (Implementar Después)

---

#### 2.1 Sustituciones Inteligentes

**¿Qué es?**
Sugerir alternativas cuando un ingrediente no está disponible o el usuario quiere cambiar algo.

**¿Por qué es valiosa?**
- Reduce fricción ("no tengo salmón" → "usa atún")
- Muestra inteligencia del sistema
- Útil para restricciones de último minuto

**¿Cómo funcionaría?**

```
Usuario toca un ingrediente:
┌─────────────────────────────────────┐
│ 🐟 Salmón (200g)                    │
│                                     │
│ ¿No tienes salmón? Alternativas:   │
│                                     │
│ [Atún fresco] Similar en omega-3   │
│ [Trucha] Mismo tiempo de cocción   │
│ [Pechuga de pollo] Menos calorías  │
│                                     │
│ [✓ Cambiar]  [✗ Cancelar]          │
└─────────────────────────────────────┘
```

**Implementación técnica:**
1. Base de datos de equivalencias nutricionales
2. Endpoint `GET /api/v1/ingredients/:id/substitutes`
3. UI para seleccionar sustituto
4. Recalcular macros del plato

**Esfuerzo estimado:** Medio
**Impacto en UX:** Alto

---

#### 2.2 Meal Prep / Batch Cooking

**¿Qué es?**
Optimizar el menú semanal para preparar varios platos en una sesión de cocina.

**¿Por qué es valiosa?**
- Ahorra tiempo real (cocinar 1 vez vs 21 veces)
- Tendencia en auge (meal prep es muy popular)
- Diferenciador fuerte vs competencia

**¿Cómo funcionaría?**

```
┌─────────────────────────────────────────┐
│ 🍳 Plan de Meal Prep - Domingo         │
│                                         │
│ Tiempo total estimado: 2h 30min         │
│                                         │
│ PASO 1: Preparar proteínas (45 min)    │
│ • Hornear 1kg de pollo (para L,M,J)    │
│ • Cocinar 500g de carne molida (Mi,V)  │
│                                         │
│ PASO 2: Preparar granos (30 min)       │
│ • Cocinar arroz integral (4 porciones) │
│ • Preparar quinoa (3 porciones)        │
│                                         │
│ PASO 3: Preparar vegetales (30 min)    │
│ • Cortar y almacenar verduras          │
│ • Preparar ensalada base               │
│                                         │
│ PASO 4: Ensamblar contenedores         │
│ • Lunes: Pollo + arroz + brócoli       │
│ • Martes: Pollo + quinoa + ensalada    │
│ • ...                                   │
└─────────────────────────────────────────┘
```

**Implementación técnica:**
1. Algoritmo que agrupa ingredientes similares
2. Identificar qué se puede preparar con anticipación
3. Generar timeline de preparación
4. Tips de almacenamiento

**Esfuerzo estimado:** Alto
**Impacto en diferenciación:** Muy Alto

---

#### 2.3 Presupuesto Semanal

**¿Qué es?**
Estimar el costo del menú semanal y permitir ajustar por presupuesto.

**¿Por qué es valiosa?**
- El dinero es una restricción real
- "Comer saludable es caro" es objeción común
- Permite planificar mejor

**¿Cómo funcionaría?**

```
Al generar menú:
┌─────────────────────────────────────────┐
│ 💰 Presupuesto semanal                  │
│                                         │
│ [€30] ──●────────────── [€150]         │
│            €75                          │
│                                         │
│ ☑️ Priorizar ingredientes de temporada │
│ ☑️ Sugerir marcas económicas           │
└─────────────────────────────────────────┘

En la lista de compras:
┌─────────────────────────────────────────┐
│ 🛒 Lista de Compras                     │
│                                         │
│ Presupuesto: €75                        │
│ Estimado: €68.50 ✓                      │
│                                         │
│ 🥬 Verduras ................ €15.20    │
│ 🥩 Proteínas ............... €28.00    │
│ 🧀 Lácteos ................. €12.30    │
│ 🍞 Otros ................... €13.00    │
└─────────────────────────────────────────┘
```

**Implementación técnica:**
1. Base de datos de precios aproximados por región
2. Parámetro de presupuesto al generar menú
3. Algoritmo considera costo en selección
4. Mostrar desglose en lista de compras

**Esfuerzo estimado:** Alto (requiere datos de precios)
**Impacto en conversión:** Alto

---

#### 2.4 Perfiles Familiares

**¿Qué es?**
Múltiples perfiles bajo una cuenta, con menú que considera las necesidades de todos.

**¿Por qué es valiosa?**
- Las familias son segmento grande
- Mayor ticket (plan familia más caro)
- Retención más alta (más difícil cambiar)

**¿Cómo funcionaría?**

```
┌─────────────────────────────────────────┐
│ 👨‍👩‍👧‍👦 Tu Familia                         │
│                                         │
│ [👤 Juan] Admin - 2000 kcal, sin gluten │
│ [👤 María] - 1600 kcal, vegetariana     │
│ [👤 Sofía] Niña 8 años - 1400 kcal     │
│                                         │
│ [+ Añadir familiar]                     │
└─────────────────────────────────────────┘

Al generar menú:
┌─────────────────────────────────────────┐
│ 🍳 Almuerzo - Lunes                     │
│                                         │
│ Base: Pasta con verduras               │
│                                         │
│ Variaciones:                            │
│ • Juan: Con salsa sin gluten            │
│ • María: Sin carne, extra verduras      │
│ • Sofía: Porción pequeña, sin picante  │
│                                         │
│ 🛒 Lista unificada para 3 personas     │
└─────────────────────────────────────────┘
```

**Implementación técnica:**
1. Modelo `family_members` relacionado a usuario
2. Cada miembro tiene su propio perfil nutricional
3. Generación considera intersección de restricciones
4. Ajuste automático de porciones

**Esfuerzo estimado:** Alto
**Impacto en ingresos:** Alto (tier más caro)

---

### Prioridad 3: Nice to Have (Futuro)

---

#### 3.1 Integración con Supermercados

**¿Qué es?**
Enviar la lista de compras directamente a servicios de delivery de supermercados.

**Posibles integraciones:**
- España: Mercadona, Carrefour, Amazon Fresh
- México: Walmart, Soriana, Amazon
- Otros: Instacart (multi-país)

**Valor:** Muy alto, pero requiere partnerships

---

#### 3.2 Integración con Wearables

**¿Qué es?**
Conectar con Apple Health, Google Fit, Fitbit para ajustar calorías según actividad real.

**Valor:** Medio-alto para usuarios fitness

---

#### 3.3 Nutricionista IA (Chat)

**¿Qué es?**
Chat con IA especializada en nutrición para resolver dudas.

**Ejemplos:**
- "¿Puedo comer esto si tengo diabetes?"
- "¿Cómo sustituyo el huevo en esta receta?"
- "Necesito más proteína, ¿qué sugiges?"

**Valor:** Alto para tier premium

---

#### 3.4 Tracking de Comidas Reales

**¿Qué es?**
Permitir marcar qué comiste realmente vs el plan, para medir adherencia.

**Valor:** Medio (compite con apps de tracking existentes)

---

#### 3.5 Comunidad / Social

**¿Qué es?**
Compartir menús, recetas, fotos con otros usuarios.

**Valor:** Bajo-medio (distracción del core, mucho esfuerzo)

---

## Roadmap Sugerido

### Fase 1: MVP Monetizable (1-2 meses)

| Semana | Feature | Impacto |
|--------|---------|---------|
| 1-2 | Lista de compras automática | Retención |
| 3-4 | Sistema de favoritos | Personalización |
| 5-6 | Límites y tiers (Free/Pro) | Monetización |
| 7-8 | Integración pagos (Stripe) | Ingresos |

**Meta:** Tener usuarios pagando

---

### Fase 2: Retención y Valor (2-3 meses)

| Semana | Feature | Impacto |
|--------|---------|---------|
| 1-3 | Recetas paso a paso | Completar experiencia |
| 4-5 | Sustituciones inteligentes | UX |
| 6-8 | Plan Familia | Mayor ticket |

**Meta:** Reducir churn, aumentar ARPU

---

### Fase 3: Diferenciación (3-4 meses)

| Feature | Impacto |
|---------|---------|
| Meal prep / Batch cooking | Diferenciación |
| Presupuesto semanal | Conversión |
| Integraciones (wearables) | Premium |

**Meta:** Destacar de competencia

---

## Métricas Clave a Seguir

### Adquisición
- Registros por semana
- Costo por adquisición (si hay ads)
- Fuente de tráfico

### Activación
- % que completa perfil
- % que genera primer menú
- Tiempo hasta primer menú

### Retención
- Retención a 7 días
- Retención a 30 días
- Menús generados por usuario/mes

### Monetización
- Tasa de conversión Free → Pro
- ARPU (Average Revenue Per User)
- MRR (Monthly Recurring Revenue)
- Churn mensual

### Engagement
- Comidas marcadas como favoritas
- Uso de lista de compras
- Vistas de recetas

---

## Conclusión

Menuum tiene una **base técnica sólida** y resuelve un **problema real**. Para convertirlo en un SaaS rentable, recomiendo:

1. **Priorizar monetización** - Implementar tiers y pagos antes de agregar más features gratuitas

2. **Completar el flujo** - Lista de compras y recetas son críticas para que el producto sea útil de extremo a extremo

3. **Crear loops de retención** - Favoritos y aprendizaje de preferencias hacen que el producto mejore con el uso

4. **Diferenciarse** - Meal prep y presupuesto son features que pocos competidores tienen bien implementados

El mercado de meal planning es competitivo pero hay espacio, especialmente en español y con un producto bien ejecutado. La clave es no intentar hacer todo a la vez, sino enfocarse en el core y monetizar temprano.

---

*Este documento debe revisarse y actualizarse según feedback de usuarios y métricas reales.*

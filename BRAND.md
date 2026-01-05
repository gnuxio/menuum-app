# BRAND.md - Guía de Identidad Visual y de Marca

## 🎯 Identidad de Marca

### ¿Qué es Menuum?

**Menuum es tu chef personal de nutrición**. No somos una app de IA genérica, somos el asistente que elimina la carga mental de planificar comidas saludables, convirtiendo objetivos nutricionales en menús deliciosos y prácticos.

### Nuestra Promesa

> "Come rico sin complicarte. Menús personalizados que se ajustan a tu vida, no al revés."

### Valores de Marca

1. **Cercano, no corporativo** - Hablamos como un chef amigable, no como un software
2. **Práctico, no teórico** - Soluciones reales para el día a día
3. **Saludable, no restrictivo** - Balance y disfrute, no dietas extremas
4. **Simple, no simplista** - Fácil de usar pero con resultados profesionales
5. **Personal, no genérico** - Cada menú es único, adaptado a la persona

---

## 🗣️ Voz y Tono (Voice & Tone)

### Personalidad de Marca

**Somos:**
- Tu chef personal de nutrición 👨‍🍳
- Cercano, amigable, experto pero accesible
- Práctico y orientado a soluciones
- Motivador sin ser presionante
- Profesional sin ser intimidante

**NO somos:**
- Una app de IA genérica 🤖
- Corporativo o técnico
- Perfeccionista o estricto
- Fríamente científico
- Condescendiente o paternalista

### Lenguaje y Palabras Clave

#### ✅ Palabras que SÍ usamos:

**Verbos:**
- Preparar, cocinar, servir
- Crear, armar, diseñar
- Ajustar, personalizar, adaptar
- Disfrutar, saborear, comer

**Sustantivos:**
- Menú, receta, platillo
- Ingredientes, comida, semana
- Chef, cocina, sabor
- Balance, nutrición, energía

**Frases típicas:**
- "Tu menú de hoy"
- "¿Qué hay de comer?"
- "Listo para servir"
- "Preparando tu menú..."
- "Comidas que te van a encantar"
- "Balanceado y delicioso"

#### ❌ Palabras que evitamos:

**Evitar lenguaje técnico/IA:**
- ❌ "Generar" → ✅ "Preparar" / "Crear"
- ❌ "Algoritmo" → ✅ "Receta personalizada"
- ❌ "Optimizar" → ✅ "Ajustar" / "Perfeccionar"
- ❌ "Procesando" → ✅ "Preparando"
- ❌ "Dashboard" → ✅ "Hoy" / "Mi Cocina"
- ❌ "Plan activo" → ✅ "Mi menú de esta semana"
- ❌ "Datos generados" → ✅ "Tu menú personalizado"
- ❌ "IA inteligente" → ✅ "Chef personal"

**Evitar lenguaje de dieta restrictiva:**
- ❌ "Régimen"
- ❌ "Prohibido"
- ❌ "Estricto"
- ❌ "Sacrificio"

### Ejemplos de Copywriting

#### Login / Bienvenida
```
✅ "Bienvenido a Menuum - Come rico sin complicarte 🍃"
❌ "Planificación inteligente con IA"

✅ "Tu chef personal de nutrición"
❌ "Generador automático de planes alimenticios"
```

#### Dashboard Vacío
```
✅ "¿Qué hay de comer hoy? 🤔
    Aún no tienes menú para esta semana. ¡Vamos a armar uno juntos!"
❌ "No tienes un plan activo. Genera tu primer plan de comidas personalizado."

✅ "Tu cocina está esperando 👨‍🍳"
❌ "No hay datos disponibles"
```

#### Estados de Carga
```
✅ "Preparando tu menú..."
✅ "Seleccionando ingredientes frescos... 🥬"
✅ "Balanceando sabores y nutrientes... ⚖️"
✅ "Armando tus comidas... 🍽️"
❌ "Generando plan con IA..."
❌ "Procesando datos..."
```

#### Botones de Acción
```
✅ "Crear mi menú"
✅ "Nueva semana"
✅ "Cambiar platillo"
❌ "Generar nuevo plan"
❌ "Regenerar"
```

#### Empty States
```
✅ "Tu cocina está vacía
    Dime tu objetivo y yo preparo un menú semanal completo.
    Rico, balanceado y sin repetir platos."
❌ "No hay planes todavía.
    Comienza generando tu primer plan de comidas personalizado."
```

#### Errores y Feedback
```
✅ "¡Ups! Algo se quemó en la cocina 🔥
    No pudimos preparar tu menú. Intentémoslo de nuevo."
❌ "Error al generar plan. Código: 500"

✅ "¡Menú listo para servir! 🍽️"
❌ "Plan generado exitosamente"
```

---

## 🎨 Sistema de Diseño Visual

### Paleta de Colores

#### Colores Primarios (Identidad de Marca)

```css
/* Verde Natural - Color principal de marca */
--brand-green: #22C55E;        /* green-500 */
--brand-emerald: #10B981;      /* emerald-600 */

/* Gradiente de marca (uso en títulos, botones CTA) */
background: linear-gradient(to right, #22C55E, #10B981);
```

**Uso:**
- Botones principales (CTAs)
- Títulos principales
- Navegación activa
- Iconos de éxito
- Elementos de marca (logo, highlights)

#### Colores Secundarios (Contexto de Comida)

```css
/* Naranja Energía - Calorías, desayuno */
--energy-orange: #F97316;      /* orange-500 */
--warm-amber: #F59E0B;         /* amber-500 */

/* Azul Info - Información, procesando */
--info-blue: #3B82F6;          /* blue-500 */
--sky-light: #0EA5E9;          /* sky-500 */

/* Rojo Acento - Errores, proteínas */
--accent-red: #EF4444;         /* red-500 */

/* Amarillo Alegre - Snacks, alertas */
--cheerful-yellow: #EAB308;    /* yellow-500 */

/* Púrpura Elegante - Cenas */
--elegant-purple: #A855F7;     /* purple-500 */
```

**Asociación con Tipos de Comida:**
```
Desayuno  → Naranja (sunrise, energía)
Almuerzo  → Emerald (vegetales, frescura)
Cena      → Púrpura (elegancia, calma)
Snack     → Amarillo (alegría, casual)
```

#### Neutrales (Base de UI)

```css
/* Escala de Grises - NO usar Slate */
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-200: #E5E7EB;
--gray-300: #D1D5DB;
--gray-400: #9CA3AF;
--gray-500: #6B7280;
--gray-600: #4B5563;
--gray-700: #374151;
--gray-800: #1F2937;
--gray-900: #111827;

/* Blancos y fondos */
--white: #FFFFFF;
--background: #F9FAFB;         /* gray-50 */
```

**Contraste y Accesibilidad:**
- Textos principales: gray-800 sobre blanco (ratio 12:1) ✅
- Textos secundarios: gray-600 (mínimo para cumplir WCAG AA)
- Evitar gray-500 en fondos claros (ratio límite)

#### Colores de Estado

```css
/* Estados de Sistema */
--success: #22C55E;            /* green-500 */
--warning: #F59E0B;            /* amber-500 */
--error: #EF4444;              /* red-500 */
--info: #3B82F6;               /* blue-500 */
--processing: #0EA5E9;         /* sky-500 */
```

### Tipografía

#### Familias de Fuente

```css
/* Fuentes del Sistema (Geist) */
--font-sans: 'Geist Sans', system-ui, sans-serif;
--font-mono: 'Geist Mono', 'Monaco', 'Courier New', monospace;
```

**Uso:**
- **Geist Sans**: Todo el texto de la aplicación (UI, contenido, navegación)
- **Geist Mono**: Código, números técnicos (si se necesita)

#### Jerarquía Tipográfica

```css
/* Display - Páginas de Marketing */
.text-display {
  font-size: 3.75rem;      /* 60px */
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: -0.02em;
}

/* H1 - Títulos Principales */
.text-h1 {
  font-size: 2.25rem;      /* 36px en mobile */
  font-size: 3rem;         /* 48px en desktop */
  line-height: 1.2;
  font-weight: 700;
  /* Gradient para títulos principales */
  background: linear-gradient(to right, #16A34A, #059669);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* H2 - Secciones */
.text-h2 {
  font-size: 1.875rem;     /* 30px */
  line-height: 1.3;
  font-weight: 700;
  color: #1F2937;          /* gray-800 */
}

/* H3 - Subsecciones */
.text-h3 {
  font-size: 1.5rem;       /* 24px */
  line-height: 1.4;
  font-weight: 600;
  color: #374151;          /* gray-700 */
}

/* Body - Texto General */
.text-body {
  font-size: 1rem;         /* 16px */
  line-height: 1.6;
  font-weight: 400;
  color: #4B5563;          /* gray-600 */
}

/* Small - Texto Secundario */
.text-small {
  font-size: 0.875rem;     /* 14px */
  line-height: 1.5;
  font-weight: 400;
  color: #6B7280;          /* gray-500 */
}

/* Tiny - Metadatos, Badges */
.text-tiny {
  font-size: 0.75rem;      /* 12px */
  line-height: 1.4;
  font-weight: 500;
  color: #6B7280;          /* gray-500 */
}
```

**Pesos de Fuente:**
- Regular (400): Texto de párrafos
- Medium (500): Labels, badges
- Semibold (600): Subtítulos, énfasis
- Bold (700): Títulos, CTAs
- Extrabold (800): Display, hero titles

### Espaciado y Layout

#### Sistema de Espaciado (Base 8px)

```css
/* Escala de Espaciado */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
```

**Aplicación:**
- **Cards internas**: padding de 1.5rem (24px) en mobile, 2rem (32px) en desktop
- **Gaps entre elementos**: 0.75rem - 1rem (12-16px)
- **Secciones de página**: margin-bottom de 2rem - 3rem (32-48px)
- **Márgenes de página**: 1rem (mobile), 2rem (desktop)

#### Bordes Redondeados

```css
/* Radios de Borde */
--radius-sm: 0.375rem;    /* 6px - Badges, small elements */
--radius-md: 0.5rem;      /* 8px - Inputs, buttons */
--radius-lg: 0.75rem;     /* 12px - Botones grandes */
--radius-xl: 1rem;        /* 16px - Cards pequeñas */
--radius-2xl: 1.5rem;     /* 24px - Cards grandes */
--radius-3xl: 2rem;       /* 32px - Cards principales */
--radius-full: 9999px;    /* Círculos, pills */
```

**Uso por Componente:**
- **Botones**: rounded-xl (16px)
- **Inputs**: rounded-xl (16px)
- **Cards principales**: rounded-3xl (32px)
- **Cards secundarias**: rounded-2xl (24px)
- **Badges**: rounded-full (píldoras)
- **Avatares**: rounded-full

#### Sombras

```css
/* Sistema de Sombras */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);

/* Sombras de Color (Marca) */
--shadow-green-sm: 0 4px 12px rgba(34, 197, 94, 0.15);
--shadow-green-md: 0 8px 20px rgba(34, 197, 94, 0.20);
--shadow-green-lg: 0 12px 28px rgba(34, 197, 94, 0.25);
```

**Aplicación:**
- **Cards estáticos**: shadow-lg (sutil)
- **Cards hover**: shadow-xl (más prominente)
- **Botones CTA**: shadow-lg shadow-green-md (sombra de color)
- **Modales/Dialogs**: shadow-2xl (muy elevados)

### Glassmorphism (Patrón de Marca)

**Efecto de vidrio esmerilado - Patrón distintivo de Menuum:**

```css
.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 2px solid rgba(229, 231, 235, 0.5); /* gray-200/50 */
  border-radius: 2rem;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
}

/* Variante para fondos oscuros */
.glass-card-dark {
  background: rgba(31, 41, 55, 0.7);  /* gray-800 */
  backdrop-filter: blur(12px);
  border: 2px solid rgba(75, 85, 99, 0.5);  /* gray-600/50 */
}
```

**Cuándo usar:**
- Cards principales de contenido
- Modales y overlays
- Login/Register pages
- Empty states destacados

**Cuándo NO usar:**
- Texto sobre glassmorphism (dificulta legibilidad)
- Elementos pequeños (se pierde el efecto)
- Fondos muy complejos (reduce contraste)

---

## 🧩 Componentes y Patrones de UI

### Botones

#### Botón Primario (CTA)

**Uso:** Acciones principales, conversiones importantes

```tsx
<Button className="
  bg-gradient-to-r from-green-500 to-emerald-600
  hover:from-green-600 hover:to-emerald-700
  text-white font-semibold
  shadow-lg shadow-green-500/20
  hover:shadow-green-500/40
  hover:scale-[1.02]
  transition-all duration-200
  rounded-xl px-6 py-3
">
  Crear mi menú
</Button>
```

#### Botón Secundario

**Uso:** Acciones alternativas, menos énfasis

```tsx
<Button className="
  border-2 border-gray-300
  bg-white text-gray-700
  hover:border-green-500 hover:bg-green-50
  transition-all
  rounded-xl px-6 py-3
">
  Ver detalles
</Button>
```

#### Botón Destructivo

**Uso:** Acciones irreversibles (eliminar, cancelar)

```tsx
<Button className="
  bg-red-500 hover:bg-red-600
  text-white
  transition-colors
  rounded-xl px-6 py-3
">
  Eliminar plan
</Button>
```

#### Botón Fantasma (Ghost)

**Uso:** Acciones terciarias, navegación ligera

```tsx
<Button className="
  text-green-600 hover:bg-green-50
  transition-colors
  rounded-xl px-6 py-3
">
  Cancelar
</Button>
```

### Cards

#### Card Principal (Glassmorphism)

```tsx
<Card className="
  bg-white/70 backdrop-blur-xl
  border-2 border-gray-200/50
  rounded-3xl
  shadow-xl
  overflow-hidden
">
  <CardContent className="p-6 md:p-8">
    {/* Contenido */}
  </CardContent>
</Card>
```

#### Card Secundaria (Simple)

```tsx
<Card className="
  bg-white
  border border-gray-200
  rounded-2xl
  shadow-lg
  hover:shadow-xl hover:border-green-200
  transition-all
">
  <CardContent className="p-4 md:p-6">
    {/* Contenido */}
  </CardContent>
</Card>
```

#### Card de Contenido con Header Colorido

**Para destacar información importante:**

```tsx
<Card className="bg-white/70 backdrop-blur-xl border-2 border-gray-200/50 shadow-xl overflow-hidden">
  {/* Header con gradiente */}
  <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6">
    <h2 className="text-white text-xl font-bold">Título</h2>
    <p className="text-white/80 text-sm">Subtítulo</p>
  </div>

  {/* Contenido */}
  <CardContent className="p-6">
    {/* Contenido principal */}
  </CardContent>
</Card>
```

### Badges

#### Badge de Estado (Processing/Completed/Failed)

```tsx
// Processing
<Badge className="bg-blue-100 text-blue-700 border border-blue-200">
  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
  Preparando...
</Badge>

// Completed
<Badge className="bg-green-100 text-green-700 border border-green-200">
  <CheckCircle className="w-3 h-3 mr-1" />
  Listo
</Badge>

// Failed
<Badge className="bg-red-100 text-red-700 border border-red-200">
  <AlertCircle className="w-3 h-3 mr-1" />
  Error
</Badge>
```

#### Badge de Tipo de Comida

```tsx
// Desayuno
<Badge className="bg-orange-100 text-orange-700 border border-orange-200">
  <Coffee className="w-3 h-3 mr-1" />
  Desayuno
</Badge>

// Almuerzo
<Badge className="bg-emerald-100 text-emerald-700 border border-emerald-200">
  <Sun className="w-3 h-3 mr-1" />
  Almuerzo
</Badge>

// Cena
<Badge className="bg-purple-100 text-purple-700 border border-purple-200">
  <Moon className="w-3 h-3 mr-1" />
  Cena
</Badge>

// Snack
<Badge className="bg-yellow-100 text-yellow-700 border border-yellow-200">
  <Cookie className="w-3 h-3 mr-1" />
  Snack
</Badge>
```

### Inputs y Formularios

#### Input de Texto Estándar

```tsx
<Input
  className="
    rounded-xl
    border-gray-300
    focus:border-green-500 focus:ring-green-500
    transition-all
  "
  placeholder="tucorreo@ejemplo.com"
/>
```

#### Input con Error

```tsx
<div>
  <Input
    className="
      rounded-xl
      border-red-300
      focus:border-red-500 focus:ring-red-500
      bg-red-50
    "
  />
  <p className="text-sm text-red-600 mt-1">
    Este campo es obligatorio
  </p>
</div>
```

### Estados Vacíos (Empty States)

**Estructura estándar:**

```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  className="flex flex-col items-center justify-center py-16 px-4"
>
  {/* Icono/Ilustración grande */}
  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center mb-6">
    <Icon className="w-12 h-12 text-green-600" />
  </div>

  {/* Título humanizado */}
  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 text-center">
    Título con personalidad
  </h3>

  {/* Descripción cercana */}
  <p className="text-gray-600 text-center mb-6 max-w-md leading-relaxed">
    Explicación amigable de qué hacer o por qué está vacío
  </p>

  {/* CTA */}
  <Button className="bg-gradient-to-r from-green-500 to-emerald-600 ...">
    Acción principal
  </Button>
</motion.div>
```

### Estados de Carga (Loading States)

#### Spinner con Mensaje

```tsx
<div className="flex flex-col items-center justify-center py-12">
  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4" />
  <p className="text-gray-600">Preparando tu menú...</p>
</div>
```

#### Loading con Pasos Narrativos

```tsx
<div className="text-center">
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    className="text-5xl mb-4"
  >
    🥗
  </motion.div>

  <p className="text-lg text-gray-700 mb-2">
    Seleccionando ingredientes frescos...
  </p>

  <div className="w-64 h-2 bg-gray-100 rounded-full overflow-hidden mx-auto">
    <motion.div
      className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
      initial={{ width: "0%" }}
      animate={{ width: "60%" }}
      transition={{ duration: 0.5 }}
    />
  </div>
</div>
```

---

## 🎭 Iconografía

### Iconos Permitidos (Lucide React)

**Priorizar iconos relacionados con comida y cocina:**

#### Navegación y Acciones Principales
```tsx
import {
  ChefHat,           // Dashboard/Home (en vez de Home)
  BookOpen,          // Planes/Menús (en vez de Calendar - como libro de recetas)
  User,              // Perfil
  LogOut,            // Cerrar sesión
  Settings           // Configuración
} from 'lucide-react';
```

#### Comida y Nutrición
```tsx
import {
  UtensilsCrossed,   // Comida general, empty states
  Utensils,          // Cubiertos, comidas
  Coffee,            // Desayuno
  Sun,               // Almuerzo
  Moon,              // Cena
  Cookie,            // Snack
  Leaf,              // Saludable, vegetales
  Apple,             // Frutas, salud
  Flame              // Calorías, energía
} from 'lucide-react';
```

#### Estados y Feedback
```tsx
import {
  CheckCircle2,      // Éxito, completado
  Circle,            // Pendiente
  Clock,             // En progreso, actual
  Loader2,           // Loading (animado)
  AlertCircle,       // Error, alerta
  Info               // Información
} from 'lucide-react';
```

#### Acciones
```tsx
import {
  Plus,              // Agregar, crear
  RefreshCw,         // Regenerar, actualizar
  ChevronRight,      // Siguiente, ver más
  ChevronDown,       // Expandir
  X,                 // Cerrar, eliminar
  Eye, EyeOff,       // Mostrar/ocultar password
  Edit,              // Editar
  Save               // Guardar
} from 'lucide-react';
```

### Iconos Prohibidos

❌ **Evitar iconos que griten "IA genérica":**

```tsx
// NO USAR:
import {
  Sparkles,          // ❌ Cliché de IA
  Zap,               // ❌ Demasiado tech
  Bot,               // ❌ Muy robótico
  Cpu,               // ❌ Hardware
  Binary,            // ❌ Código
  Brain              // ❌ IA genérica
} from 'lucide-react';
```

### Emojis (Uso Moderado)

**Emojis permitidos (con moderación en textos, no en UI crítica):**

✅ Permitidos:
- 👨‍🍳 Chef (identidad de marca)
- 🍽️ Plato (comidas, servir)
- 🥗 Ensalada (saludable)
- 🍅 Vegetales (ingredientes)
- ⚖️ Balanza (balance, nutrición)
- 💪 Músculo (fitness, objetivos)
- ❤️ Corazón (salud, favoritos)
- ☕ Café (desayuno)
- 🌙 Luna (cena)

❌ Prohibidos:
- 🤖 Robot (IA obvia)
- 💻 Laptop (muy tech)
- ⚙️ Engranaje (mecánico)
- 🔮 Bola de cristal (magia fake)
- ✨ Sparkles (solo en "¡Listo!" de éxito)

**Regla de oro:** Usar emojis solo en textos de ayuda, empty states y mensajes. NUNCA en navegación, botones críticos o headers principales.

---

## 🎬 Animaciones

### Principios de Animación

1. **Propósito sobre espectáculo** - Las animaciones deben mejorar la UX, no distraer
2. **Naturalidad** - Movimientos que imitan la física real
3. **Velocidad apropiada** - Rápido pero perceptible (150-300ms para la mayoría)
4. **Consistencia** - Mismo timing y easing en contextos similares

### Timings Estándar (Framer Motion)

```tsx
// Transiciones rápidas (hover, toggle)
transition={{ duration: 0.15 }}

// Transiciones estándar (fade in, slide)
transition={{ duration: 0.3 }}

// Transiciones lentas (modales, overlays grandes)
transition={{ duration: 0.5 }}
```

### Easings

```tsx
// Default (mayoría de casos)
transition={{ ease: "easeInOut" }}

// Entrada (elementos apareciendo)
transition={{ ease: "easeOut" }}

// Salida (elementos desapareciendo)
transition={{ ease: "easeIn" }}

// Bounce (celebraciones, éxito)
transition={{ type: "spring", stiffness: 300, damping: 20 }}
```

### Patrones de Animación de Marca

#### Fade In + Slide Up (Entrada de Contenido)

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  {content}
</motion.div>
```

#### Stagger Children (Listas)

```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ staggerChildren: 0.05 }}
>
  {items.map((item, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {item}
    </motion.div>
  ))}
</motion.div>
```

#### Scale on Hover (Botones, Cards Clickables)

```tsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.15 }}
>
  Click me
</motion.button>
```

#### Loading Circular (Ingredientes "Cocinándose")

**En lugar de spinners técnicos, usar rotación de iconos de comida:**

```tsx
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
  className="text-4xl"
>
  🥗
</motion.div>
```

### Animaciones Prohibidas

❌ **Evitar:**
- Partículas flotantes (muy IA-genérico)
- Morphing excesivo (confunde)
- Brillos "mágicos" (sparkle effects)
- Animaciones mayores a 1 segundo (interrumpen flujo)
- Parallax agresivo (marea)

---

## 📐 Layouts y Composición

### Grid System

**Mobile-first con breakpoint único:**

```tsx
// Mobile: stack vertical
// Desktop (md: 768px+): grid o flex horizontal

// Ejemplo: Cards de perfil
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
  <Card />
  <Card />
</div>
```

### Márgenes de Página

```tsx
// Container principal
<div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
  {/* Contenido */}
</div>

// Container estrecho (lectura, formularios)
<div className="max-w-2xl mx-auto px-4 py-8">
  {/* Contenido */}
</div>

// Container muy estrecho (login, modales)
<div className="max-w-md mx-auto px-4 py-8">
  {/* Contenido */}
</div>
```

### Espaciado entre Secciones

```tsx
// Entre secciones principales
className="mb-8 md:mb-12"

// Entre subsecciones
className="mb-6 md:mb-8"

// Entre elementos relacionados
className="mb-4 md:mb-6"

// Entre elementos en listas
className="space-y-3 md:space-y-4"
```

---

## 📱 Responsive Design

### Breakpoint Único (Mobile-first)

```css
/* Mobile: < 768px (default) */
/* Desktop: >= 768px (md:) */
```

**No usar:** `sm:`, `lg:`, `xl:`, `2xl:` (mantener simple)

### Patrones Responsivos

#### Tipografía

```tsx
// Títulos
className="text-2xl md:text-4xl"

// Subtítulos
className="text-xl md:text-2xl"

// Cuerpo
className="text-base md:text-lg"
```

#### Espaciado

```tsx
// Padding de cards
className="p-4 md:p-8"

// Gaps entre elementos
className="gap-3 md:gap-6"

// Márgenes verticales
className="my-6 md:my-12"
```

#### Layout

```tsx
// Stack en mobile, row en desktop
className="flex flex-col md:flex-row"

// Grid responsivo
className="grid grid-cols-1 md:grid-cols-3 gap-4"

// Visibilidad condicional
className="hidden md:block"     // Solo desktop
className="block md:hidden"     // Solo mobile
```

---

## ✅ Checklist de Calidad Visual

Antes de considerar un componente "terminado", verificar:

### Diseño
- [ ] Usa paleta de colores de marca (verde/emerald primarios)
- [ ] Glassmorphism en cards principales
- [ ] Bordes redondeados (rounded-xl mínimo)
- [ ] Sombras apropiadas (shadow-lg para cards)
- [ ] Gradiente en títulos principales o CTAs

### Tipografía
- [ ] Usa Geist Sans (font-family correcta)
- [ ] Jerarquía clara (h1 > h2 > body > small)
- [ ] Line-height legible (1.5 - 1.6 para body)
- [ ] Contraste suficiente (WCAG AA mínimo)

### Espaciado
- [ ] Padding interno consistente (múltiplos de 4px)
- [ ] Gaps entre elementos (0.75rem - 1.5rem)
- [ ] Márgenes externos apropiados
- [ ] Responsive (menos espacio en mobile)

### Copywriting
- [ ] Sin lenguaje de "IA genérica" (generar, optimizar, algoritmo)
- [ ] Usa lenguaje de cocina/chef (preparar, menú, platillo)
- [ ] Tono cercano y amigable (tú, no usted)
- [ ] Sin tecnicismos innecesarios

### Iconografía
- [ ] Iconos relacionados con comida (cuando aplica)
- [ ] Sin iconos de IA genéricos (Sparkles, Bot, Brain)
- [ ] Tamaño consistente (w-4 h-4 para inline, w-5 h-5 para standalone)
- [ ] Color apropiado al contexto

### Animaciones
- [ ] Duración razonable (< 500ms)
- [ ] Propósito claro (mejora UX, no distrae)
- [ ] Easing natural (easeInOut)
- [ ] Rendimiento (no causa lag)

### Accesibilidad
- [ ] Contraste de color suficiente
- [ ] Focus visible en elementos interactivos
- [ ] Labels en inputs
- [ ] aria-label en iconos solos
- [ ] Keyboard navigable

---

## 🚫 Anti-Patrones (Qué NO Hacer)

### Visual

❌ **NO:**
- Usar colores slate (usar gray)
- Bordes cuadrados (mínimo rounded-xl)
- Cards planas sin sombra
- Gradientes púrpura/azul neón (estilo IA genérico)
- Sobre-uso de glassmorphism (dificulta legibilidad)
- Animaciones mayores a 1 segundo
- Particulas flotantes o efectos "mágicos"

### Copywriting

❌ **NO:**
- "Generar con IA"
- "Algoritmo personalizado"
- "Dashboard de usuario"
- "Optimización automática"
- "Procesando datos..."
- "Plan activo en el sistema"

✅ **SÍ:**
- "Preparar mi menú"
- "Recetas ajustadas a ti"
- "Hoy en mi cocina"
- "Ajustando a tu medida"
- "Preparando tu menú..."
- "Tu menú de esta semana"

### Componentes

❌ **NO:**
- Botones sin border-radius
- Inputs sin estado de focus visible
- Empty states sin ilustración/icono
- Loading sin mensaje contextual
- Errores técnicos sin traducir
- Badges sin iconos (solo color)

---

## 📚 Recursos y Referencias

### Paleta en Figma/Design Tools

```
Verde Marca:     #22C55E
Emerald Marca:   #10B981
Naranja Energía: #F97316
Azul Info:       #3B82F6
Gray Base:       #F9FAFB - #111827
```

### Links Útiles

- **Lucide Icons:** https://lucide.dev/icons/
- **Tailwind CSS v4:** https://tailwindcss.com/docs
- **Framer Motion:** https://www.framer.com/motion/
- **Geist Font:** https://vercel.com/font

### Inspiración de Diseño (Evitar Copiar, Solo Referencia)

**Apps de comida con personalidad:**
- Forks (food diary)
- Yummly (recetas)
- PlateJoy (meal planning)

**Evitar copiar:**
- ChatGPT, Notion AI (demasiado tech)
- Apps fitness genéricas (muy agresivas)

---

## 📝 Notas Finales

Este documento es una **guía viva** que debe evolucionar con el producto.

**Al agregar nuevos componentes o features:**
1. Revisar esta guía primero
2. Mantener consistencia con patrones existentes
3. Actualizar este documento si introduces nuevos patrones
4. Priorizar siempre: **Personalidad sobre genericidad**

**Pregunta clave antes de publicar:**
> "¿Esto parece de Menuum o de cualquier app de IA?"

Si la respuesta es "cualquier app", revisar copywriting, iconografía y paleta de colores.

---

**Última actualización:** 2026-01-04
**Versión:** 1.0.0

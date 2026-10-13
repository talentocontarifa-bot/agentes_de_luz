# 🌟 Agentes de Luz 2026 — Invitación Web & Registro Interactivo

Invitación web interactiva y sistema de registro de familias para el gran evento infantil de **Niños del Rey / Castillo del Rey Cancún**:  
**"Agentes de Luz: Grandes personajes de la Biblia"**.

---

## 🎮 Características Principales

1. **Intro Interactivo POV Shooter (David vs. Goliat):**
   - Vista en primera persona con la honda / resortera de David.
   - Mecánica táctil y apuntado fluido diseñado prioritariamente para dispositivos móviles.
   - Disparo directo al tocar o hacer clic en la pantalla con retroalimentación instantánea (sonidos sintetizados en Web Audio API, animaciones elásticas, diálogo dinámico de Goliat y destello celestial de luz).
   - Opción directa de *Saltar intro* si se desea ir directo a la información.

2. **Diseño Moderno & Dinámico:**
   - Estilo visual lúdico infantil con insignias circulares coleccionables, chips flotantes y microinteracciones.
   - Sin cuadros rígidos anticuados; adaptabilidad total a pantallas móviles (`100dvh`, soporte touch preventivo).
   - Contador en cuenta regresiva hacia el 30 de Octubre de 2026, 5:30 PM.

3. **Información Completa del Evento:**
   - Fecha: **Viernes 30 de Octubre de 2026, 5:30 PM**.
   - Ubicación: **Castillo del Rey Cancún** (Av. Fonatur). Enlace directo a Google Maps.
   - Beneficios y dinámicas: Libreta de Misiones, Circuito de Juegos y Estaciones, Recompensas / Premios, Refrigerio / Box Lunch gratuito.

4. **Formulario de Registro Familiar Inteligente:**
   - Datos del padre o tutor (nombre y teléfono celular).
   - Registro de múltiples niños por familia con edad y chips rápidos de selección para alergias alimentarias o médicas.
   - Generación instantánea de **Pase Digital de Agente** con código QR único para recepción.
   - Confirmación por **WhatsApp** automatizada con mensaje formateado enviando el registro directamente al número oficial: **`998 340 7244`**.

5. **Base de Datos Local & Exportación a Excel (`.xlsx`):**
   - Almacenamiento seguro en `localStorage` del navegador.
   - Botón de exportación a Excel con dos hojas estructuradas:
     - Hoja 1: *Familias Registradas* (Fecha, ID, Tutor, Teléfono, Niños, etc.).
     - Hoja 2: *Niños y Alergias (Refrigerio)* (Control detallado para el equipo de cocina y logística).

---

## 🚀 Despliegue en Cloudflare Pages

El proyecto está diseñado como una Single Page Application (SPA) estática sin dependencias de compilación complejas.

### Pasos para conectar en Cloudflare:
1. En el panel de **Cloudflare Pages**, selecciona **Create a project** > **Connect to Git**.
2. Conecta el repositorio: `https://github.com/talentocontarifa-bot/agentes_de_luz.git`.
3. Configuración de Build:
   - **Framework preset:** `None`
   - **Build command:** *(dejar en blanco)*
   - **Build output directory:** `/` (o la raíz del repositorio)
4. Haz clic en **Save and Deploy**. Cloudflare publicará automáticamente tu sitio con certificado SSL y CDN global instantáneo.

---

## 🛠️ Tecnologías Utilizadas
- **HTML5 Semántico & CSS3 Moderno** (variables CSS, flexbox/grid, animaciones keyframe, filtros visuales).
- **JavaScript Vanilla (ES6+)**:
  - `game.js`: Motor del shooter POV en primera persona y transiciones de destello.
  - `app.js`: Lógica del evento, cuenta regresiva, validación de formularios, generador QR y enlace a WhatsApp.
- **Librerías locales incluidas:**
  - `xlsx.full.min.js`: Generación y descarga directa de archivos Excel.
  - `qrious.min.js`: Renderizado de códigos QR para pases de acceso.
  - `canvas-confetti`: Efectos de confeti en el registro exitoso.

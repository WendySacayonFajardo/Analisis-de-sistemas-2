# DoubleClick - Sistema de Gestión de Anuncios

## Descripción
Sistema frontend para la gestión de anuncios con sidebar moderno y cuatro módulos principales.

## Módulos Incluidos
- **Dashboard**: Panel principal del sistema
- **Gestión de Anuncios**: Administración de anuncios
- **Entrega de Anuncios (Ad Server)**: Sistema de distribución
- **Reportes**: Análisis y reportes de rendimiento
- **Consentimiento y Privacidad**: Gestión de políticas

## Instalación y Ejecución

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos para ejecutar:

1. **Navegar al directorio frontend:**
   ```bash
   cd frontend
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar el proyecto en modo desarrollo:**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador:**
   El proyecto se abrirá automáticamente en `http://localhost:3000`

### Otros comandos disponibles:

- **Construir para producción:**
  ```bash
  npm run build
  ```

- **Previsualizar build de producción:**
  ```bash
  npm run preview
  ```

- **Ejecutar linter:**
  ```bash
  npm run lint
  ```

## Características
- ✅ Sidebar colapsible del lado izquierdo
- ✅ Navegación entre módulos con React Router
- ✅ Diseño responsive y moderno
- ✅ Páginas en blanco listas para desarrollo
- ✅ Estilos CSS con gradientes y animaciones

## Estructura del Proyecto
```
frontend/
├── index.html
├── vite.config.js
├── .eslintrc.cjs
├── src/
│   ├── components/
│   │   ├── Sidebar.js
│   │   └── Sidebar.css
│   ├── pages/
│   │   ├── Dashboard.js
│   │   ├── AdManagement.js
│   │   ├── AdServer.js
│   │   ├── Reports.js
│   │   ├── ConsentPrivacy.js
│   │   └── Page.css
│   ├── styles/
│   │   └── App.css
│   ├── App.js
│   └── index.js
└── package.json
```

## Tecnologías Utilizadas
- React 18
- React Router DOM
- Vite (Build tool ultra-rápido)
- CSS3 con gradientes y animaciones
- ESLint para linting
- Diseño responsive

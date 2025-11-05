# Documentación Detallada - Custom Table PCF Component

## 📋 Descripción General

Este proyecto es una **Prueba de Concepto (POC)** de un componente PCF (PowerApps Component Framework) personalizado para Microsoft Power Platform. El componente implementa una tabla interactiva con funcionalidades CRUD básicas que puede integrarse en aplicaciones de Power Apps y Dynamics 365.

## 🎯 Objetivo del Proyecto

Desarrollar un componente de tabla personalizado que permita:
- Visualizar datos en formato tabular con interfaz moderna
- Realizar acciones de **Ver**, **Editar** y **Eliminar** registros
- Personalizar colores de botones de acción
- Configurar visibilidad de funcionalidades específicas
- Comunicar eventos de usuario de vuelta a Power Apps

## 🏗️ Arquitectura del Proyecto

### Estructura de Archivos

```
POC PCF/
├── 📁 customTable/                    # Componente principal
│   ├── 📄 ControlManifest.Input.xml   # Manifiesto del componente
│   ├── 📄 index.ts                    # Controlador principal PCF
│   ├── 📁 components/
│   │   └── 📁 TableComponent/
│   │       └── 📄 index.tsx           # Componente React de la tabla
│   ├── 📁 css/
│   │   └── 📄 customTable.css         # Estilos personalizados
│   └── 📁 generated/
│       └── 📄 ManifestTypes.d.ts      # Tipos TypeScript generados
├── 📁 solution/                       # Configuración de solución
├── 📄 package.json                    # Dependencias del proyecto
├── 📄 tsconfig.json                   # Configuración TypeScript
├── 📄 eslint.config.mjs              # Configuración ESLint
└── 📄 README.md                       # Instrucciones de empaquetado
```

### Stack Tecnológico

- **Framework**: PowerApps Component Framework (PCF)
- **Frontend**: React 19.2.0 + TypeScript 5.8.3
- **Estilos**: CSS3 con diseño moderno y responsive
- **Tooling**: 
  - ESLint para linting de código
  - pcf-scripts para build y desarrollo
  - pcf-start para testing local

## 🔧 Componentes Principales

### 1. Controlador PCF (`index.ts`)

**Clase**: `customTable`

**Responsabilidades**:
- Implementa la interfaz `ComponentFramework.StandardControl`
- Gestiona el ciclo de vida del componente
- Maneja la comunicación bidireccional con Power Apps
- Administra el estado de las acciones de usuario

**Métodos principales**:
- `init()`: Inicialización del componente y configuración del container React
- `updateView()`: Actualización de la vista cuando cambian los parámetros
- `getOutputs()`: Retorna valores al contexto de Power Apps
- `destroy()`: Limpieza de recursos al destruir el componente

**Manejo de eventos**:
```typescript
private handleView(recordId: string): void
private handleEdit(recordId: string): void  
private handleDelete(recordId: string): void
```

### 2. Componente React (`TableComponent/index.tsx`)

**Interface**: `ITableComponentProps`

**Características**:
- Renderizado dinámico de columnas basado en estructura de datos
- Botones de acción personalizables con colores configurables
- Manejo de estados vacíos con mensajes informativos
- Eventos onclick para cada acción (Ver, Editar, Eliminar)

**Props de entrada**:
- `records`: Array de registros a mostrar
- `viewButtonColor`, `editButtonColor`, `deleteButtonColor`: Colores personalizables
- `showDeleteButton`: Control de visibilidad del botón eliminar
- `onView`, `onEdit`, `onDelete`: Callbacks de eventos

### 3. Manifiesto del Componente (`ControlManifest.Input.xml`)

**Configuración**:
- **Namespace**: `nttnamespace`
- **Constructor**: `customTable`
- **Versión**: `1.1.0`
- **Tipo**: `standard`

**Propiedades de entrada**:
| Propiedad | Tipo | Descripción | Valor por defecto |
|-----------|------|-------------|-------------------|
| `dataJSON` | Multiple | Datos en formato JSON | (requerido) |
| `viewButtonColor` | SingleLine.Text | Color botón ver | #007bff |
| `editButtonColor` | SingleLine.Text | Color botón editar | #28a745 |
| `deleteButtonColor` | SingleLine.Text | Color botón eliminar | #dc3545 |
| `showDeleteButton` | TwoOptions | Mostrar botón eliminar | true |

**Propiedades de salida**:
| Propiedad | Descripción |
|-----------|-------------|
| `selectedViewRecordId` | ID del registro para acción Ver |
| `selectedEditRecordId` | ID del registro para acción Editar |
| `selectedDeleteRecordId` | ID del registro para acción Eliminar |
| `lastActionTimestamp` | Timestamp de la última acción |

## 🎨 Diseño y Estilos

### Características del Diseño

1. **Interfaz Moderna**:
   - Gradientes en cabecera de tabla
   - Bordes redondeados y sombras suaves
   - Efectos hover con transformaciones 3D
   - Transiciones suaves en todas las interacciones

2. **Responsive Design**:
   - Adaptación automática a diferentes tamaños de pantalla
   - Scroll horizontal en pantallas pequeñas
   - Ajuste de padding y fuentes en móviles

3. **Modo Oscuro**:
   - Soporte automático para `prefers-color-scheme: dark`
   - Paleta de colores optimizada para bajo contraste
   - Mantenimiento de legibilidad en ambos modos

4. **Accesibilidad**:
   - Focus visible en botones
   - Títulos descriptivos en acciones
   - Contraste adecuado en todos los elementos

### Estructura CSS

```css
.table-container        # Container principal con padding y overflow
.custom-table          # Tabla principal con border-collapse
.custom-table thead    # Cabecera con gradiente
.custom-table tbody tr # Filas con efectos hover
.actions-cell          # Celda de acciones con flexbox
.btn                   # Estilos base para botones
```

## 🔄 Flujo de Datos

### Entrada de Datos
1. **Power Apps** → `dataJSON` (Array de objetos JSON)
2. **PCF Controller** → Parse y validación del JSON
3. **React Component** → Renderizado dinámico de la tabla

### Eventos de Usuario
1. **Usuario** → Click en botón de acción
2. **React Component** → Callback al controlador PCF
3. **PCF Controller** → Actualización de propiedades de salida
4. **Power Apps** → Recepción del evento y datos del registro

### Ejemplo de Estructura de Datos

```json
[
  {
    "ID": "1",
    "Nombre": "Juan Pérez",
    "Email": "juan@empresa.com",
    "Telefono": "123-456-7890",
    "Departamento": "Ventas"
  },
  {
    "ID": "2", 
    "Nombre": "María García",
    "Email": "maria@empresa.com",
    "Telefono": "098-765-4321",
    "Departamento": "Marketing"
  }
]
```

## 🛠️ Desarrollo y Build

### Scripts Disponibles

```bash
npm run build         # Compilar el componente para producción
npm run start         # Iniciar servidor de desarrollo
npm run start:watch   # Desarrollo con watch mode
npm run clean         # Limpiar archivos generados
npm run rebuild       # Clean + build
npm run lint          # Ejecutar linting
npm run lint:fix      # Corregir errores de linting automáticamente
```

### Proceso de Empaquetado

1. **Crear carpeta de solución**:
   ```bash
   mkdir solution
   cd solution
   ```

2. **Inicializar solución**:
   ```bash
   pac solution init --publisher-name empresamx --publisher-prefix cTable
   ```

3. **Agregar referencia al proyecto**:
   ```bash
   pac solution add-reference --path ..
   ```

4. **Build y empaquetado**:
   ```bash
   dotnet msbuild /t:clean /t:build /restore
   ```

### Actualización de Versiones

Para actualizar el componente en Power Apps:
1. Modificar `<Version>` en `solution/src/Other/Solution.xml`
2. Incrementar versión minor o major
3. Re-importar la solución en Power Apps
4. Esperar propagación de cambios (puede tomar varios minutos)

## 🔧 Configuración del Entorno

### Requisitos del Sistema

- **SO**: Windows/macOS/Linux
- **Node.js**: 20.19.5+
- **npm**: 10.8.2+
- **.NET**: 9.0+ (requerido para macOS)
- **Power Platform CLI**: Última versión

### Dependencias Principales

**Producción**:
- `react`: ^19.2.0
- `react-dom`: ^19.2.0

**Desarrollo**:
- `@types/powerapps-component-framework`: ^1.3.16
- `@types/react`: ^19.2.2
- `typescript`: ^5.8.3
- `pcf-scripts`: ^1
- `eslint`: Configuración completa

## 🚀 Implementación en Power Apps

### Pasos de Integración

1. **Importar solución** en el entorno de Power Apps
2. **Agregar el componente** a un formulario o aplicación canvas
3. **Configurar propiedades** de entrada:
   - Conectar `dataJSON` a una fuente de datos
   - Personalizar colores de botones si es necesario
   - Configurar visibilidad del botón eliminar
4. **Configurar eventos** de salida para responder a acciones de usuario

### Casos de Uso Recomendados

- **Listas maestras** de entidades de negocio
- **Dashboards administrativos** con acciones rápidas
- **Formularios de selección** múltiple con vista previa
- **Interfaces de gestión** de datos con CRUD básico

## 🎯 Características Destacadas

### Ventajas del Componente

1. **Flexibilidad**: Adapta automáticamente las columnas según los datos
2. **Personalización**: Colores y configuraciones ajustables
3. **Performance**: Renderizado optimizado con React
4. **Integración**: Comunicación fluida con Power Apps
5. **Experiencia de Usuario**: Interfaz moderna y responsiva
6. **Mantenibilidad**: Código estructurado y bien documentado

### Limitaciones Actuales

- **Paginación**: No implementada (carga todos los registros)
- **Filtrado**: No incluye capacidades de filtrado/búsqueda
- **Ordenamiento**: No permite ordenar por columnas
- **Edición inline**: Acciones redirigen a Power Apps, no edición directa

## 🔮 Posibles Mejoras Futuras

1. **Funcionalidades**:
   - Implementar paginación para grandes volúmenes de datos
   - Agregar búsqueda y filtrado por columnas
   - Incluir ordenamiento clickeable en cabeceras
   - Desarrollar edición inline de celdas

2. **UI/UX**:
   - Modo de vista compacta/expandida
   - Selección múltiple con checkboxes
   - Drag & drop para reordenamiento
   - Columnas redimensionables

3. **Técnicas**:
   - Optimización con React.memo y useMemo
   - Lazy loading para mejor performance
   - Internacionalización (i18n)
   - Tests unitarios y de integración

## 👨‍💻 Información del Desarrollo

**Autor**: Max CM  
**Versión**: 1.1.0  
**Fecha**: Noviembre 2025  
**Licencia**: Uso interno BCP  

---

*Esta documentación está diseñada para facilitar el mantenimiento, extensión y comprensión del componente Custom Table PCF. Para dudas técnicas o solicitudes de mejora, contactar al equipo de desarrollo.*
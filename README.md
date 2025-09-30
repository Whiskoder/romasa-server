# Documentación del Proyecto – Backend para Aplicación de Taller

## Índice

1. [Descripción](#descripción)
2. [Requisitos Previos](#requisitos-previos)
3. [Instalación](#instalación)
4. [Variables de Entorno](#variables-de-entorno)
5. [Comandos Básicos](#comandos-básicos)
6. [Documentación de la API](#documentación-de-la-api)

## Descripción

Este proyecto es el backend de romasa para la gestión de diagnósticos automotrices. La aplicación permite:

- Crear y gestionar solicitudes para agendar citas de diagnóstico y servicio.
- Gestionar usuarios autenticados.
- Enviar alertas en tiempo real a los usuarios
- Administrar el flujo completo de atención al vehículo desde la solicitud hasta la finalización del servicio.

## Requisitos Previos

- Node.js (versión 18 o superior)
- npm

## Instalación

1. **Clonar el repositorio:**

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
```

2. **Instalar las dependencias:**

```bash
npm install
```

3. **Configurar las variables de entorno:**

```bash
cp .env.template .env
```

Edita el archivo .env con los valores apropiados para tu entorno.

4. **Ejecutar la aplicación en modo desarrollo:**

```bash
npm run start:dev
```

## Variables de entorno

El archivo .env.template define las siguientes variables:

**Server**
| Variable | Descripción | Ejemplo |
| --------------- | -------------------------------------------------- | ----------------------- |
| `NODE_ENV` | Entorno de ejecución (`development`, `test`, `seed`, `production`) | `development` |
| `SERVER_PORT` | Puerto en el que se ejecuta la API | `3000` |
| `SERVER_ORIGIN` | URL de origen permitida (CORS) | `http://localhost:4200` |

**Database**
| Variable | Descripción | Ejemplo |
| --------- | ----------------------------------------------------- | -------------------- |
| `DB_HOST` | Host de la base de datos | `localhost` |
| `DB_NAME` | Nombre de la base de datos | `talleres_db` |
| `DB_USER` | Usuario de la base de datos | `admin` |
| `DB_PASS` | Contraseña del usuario | `yourStrongPassword` |
| `DB_PORT` | Puerto del servidor SQL | `1433` |
| `DB_SSL` | Usar conexión segura (opcional: `true` / `false`) | `false` |
| `DB_SYNC` | Sincronizar el esquema automáticamente (`true/false`) | `false` |

⚠️ Nota: DB_SYNC debe estar desactivado en producción, ya que puede sobrescribir datos.

### Comandos básicos

**Ejecución**

```bash
# Modo desarrollo
npm run start:dev

# Modo producción (build + start)
npm run build
npm run start:prod
```

**Pruebas**

```bash
# Pruebas unitarias
npm run test

# Pruebas end-to-end
npm run test:e2e

# Cobertura de pruebas
npm run test:cov
```

### Documentación de la API

En progreso

### Notas

- El proyecto está en desarrollo activo.

<!-- # Generar migración
npm run migration:generate src/migrations/CreateUsersTable

# Ejecutar migración
npm run migration:run

# Revertir última migración
npm run migration:revert -->

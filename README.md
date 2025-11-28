# Gestor de Usuarios de Prueba

Aplicación React Native desarrollada con Expo que permite gestionar usuarios de prueba mediante la API de [reqres.in](https://reqres.in).

## Características Principales

-  Lista de usuarios con información detallada (nombre, email, avatar)
-  Creación de nuevos usuarios mediante formulario modal
-  Botón flotante (FAB) para crear usuarios - posicionado ergonómicamente
-  Selección de foto de perfil desde galería del dispositivo
-  Generación automática de avatares con iniciales (estilo Microsoft Teams)
-  Toasts discretos para notificaciones (Android)
-  Paginación para navegar entre páginas de usuarios
-  Manejo de estado global con Redux Toolkit
-  Estados de carga y manejo de errores
-  Componentes reutilizables (UserList, UserForm)

## Tecnologías Utilizadas

- **React Native** 0.74.5
- **Expo** SDK 51
- **Redux Toolkit** 2.2.0
- **React Redux** 9.1.0
- **React Native Web** (para soporte web)

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** versión 14 o superior
- **npm** (incluido con Node.js)
- Un editor de código (recomendado: Visual Studio Code)

## Instalación

### 1. Clonar o descargar el proyecto

```bash
git clone <url-del-repositorio>
cd TPReactNative2
```

O si descargaste el ZIP, descomprime y navega a la carpeta del proyecto.

### 2. Instalar dependencias

Ejecuta el siguiente comando en la raíz del proyecto:

```bash
npm install
```

**Nota importante:** Los archivos `node_modules/`, `.expo/`, y otros archivos de build están en `.gitignore` y se regenerarán automáticamente con este comando.

Este comando instalará:
- Expo SDK 51 y herramientas relacionadas
- React Native 0.74.5
- Redux Toolkit y React Redux
- expo-image-picker (para selección de fotos)
- Todas las demás dependencias listadas en `package.json`

### 3. Verificar la instalación

Puedes verificar que las dependencias se instalaron correctamente ejecutando:

```bash
npm list --depth=0
```

## Ejecución del Proyecto

### Iniciar el servidor de desarrollo

Para iniciar el proyecto, ejecuta:

```bash
npm start
```

Este comando iniciará Expo DevTools en tu navegador predeterminado, mostrando un código QR y varias opciones de ejecución.

### Ver en Web

**Opción 1:** Presiona la tecla `w` en la terminal después de ejecutar `npm start`

**Opción 2:** Ejecuta directamente:

```bash
npm run web
```

La aplicación se abrirá automáticamente en tu navegador (generalmente en `http://localhost:8081`).

### Ver en Android

#### Con dispositivo físico:

1. Instala la aplicación **Expo Go** desde Google Play Store
2. Asegúrate de que tu computadora y dispositivo estén en la misma red Wi-Fi
3. Ejecuta `npm start` en tu terminal
4. Abre Expo Go en tu dispositivo
5. Escanea el código QR que aparece en la terminal o en el navegador

#### Con emulador de Android Studio:

1. Descarga e instala [Android Studio](https://developer.android.com/studio)
2. Configura un dispositivo virtual (AVD) desde Android Studio
3. Inicia el emulador
4. Ejecuta en la terminal:

```bash
npm run android
```

O presiona `a` después de ejecutar `npm start`

### Ver en iOS (solo macOS)

#### Con dispositivo físico:

1. Instala la aplicación **Expo Go** desde App Store
2. Asegúrate de que tu Mac y dispositivo estén en la misma red Wi-Fi
3. Ejecuta `npm start` en tu terminal
4. Abre Expo Go en tu dispositivo
5. Escanea el código QR con la cámara del iPhone

#### Con simulador de iOS:

1. Instala Xcode desde App Store
2. Ejecuta en la terminal:

```bash
npm run ios
```

O presiona `i` después de ejecutar `npm start`

## Estructura del Proyecto

```
TPReactNative2/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── UserForm.js      # Formulario de creación de usuarios
│   │   └── UserList.js      # Lista de usuarios
│   ├── features/            # Slices de Redux
│   │   └── users/
│   │       └── usersSlice.js # Lógica de usuarios (thunks y reducers)
│   ├── screens/             # Pantallas de la aplicación
│   │   └── UserScreen.js    # Pantalla principal
│   └── store/
│       └── store.js         # Configuración del store de Redux
├── App.js                   # Punto de entrada de la aplicación
├── package.json             # Dependencias y scripts
└── README.md                # Este archivo

```

## Scripts Disponibles

En el directorio del proyecto puedes ejecutar:

- `npm start` - Inicia el servidor de desarrollo de Expo
## Funcionalidades de la Aplicación

### Listar Usuarios

Al iniciar la aplicación, se realiza una petición GET a la API de reqres.in para obtener la lista de usuarios de la página 1. Cada usuario muestra:
- Avatar (imagen de perfil o iniciales generadas)
- Nombre completo
- Email en formato `nombre.apellido@reqres.in`

### Crear Usuario

1. **Botón flotante**: Presiona el botón azul "**+ Crear Usuario**" ubicado en la esquina inferior derecha (posicionado para fácil acceso con el pulgar)

2. **Modal de creación**: Se abre un modal deslizante desde abajo con el formulario que permite:
   - **Nombre**: Nombre completo del usuario (ej: "Diego Martinez")
   - **Rol/Puesto (Job)**: Rol o puesto de trabajo (ej: "Desarrollador")
   - **Foto de perfil** (opcional): Botón gris para seleccionar una foto desde la galería del dispositivo

3. **Avatar automático**: Si no subes una foto, se genera automáticamente un avatar con las iniciales:
   - Un nombre: "Julian" → Avatar con **"J"**
   - Nombre completo: "Diego Martinez" → Avatar con **"DM"**
   - El avatar tiene un color de fondo aleatorio (estilo Microsoft Teams)

4. **Validación**: Si intentas crear un usuario sin completar los campos, aparece un toast discreto (solo en Android) indicando que debes completar todos los campos

5. **Confirmación**: Al crear el usuario exitosamente:
   - Aparece un toast de confirmación "✓ Usuario creado exitosamente"
   - El modal se cierra automáticamente
   - El nuevo usuario aparece al inicio de la lista
- **Nombre**: Nombre completo del usuario
- **Job**: Rol o puesto de trabajo

Al enviar el formulario, se realiza una petición POST a la API y el usuario creado se agrega automáticamente al listado.

### Paginación

En la parte inferior de la pantalla hay controles para:
- Navegar a la página anterior
- Ver el número de página actual
- Navegar a la página siguiente

Los botones se deshabilitan automáticamente cuando estás en la primera o última página.

## API Utilizada

La aplicación consume la API pública de [reqres.in](https://reqres.in):

- **GET** `https://reqres.in/api/users?page={page}` - Obtener lista de usuarios
- **POST** `https://reqres.in/api/users` - Crear nuevo usuario

**Autenticación**: Se requiere el header `x-api-key: reqres-free-v1` para todas las peticiones.

## Solución de Problemas

### Error al instalar dependencias

Si encuentras errores durante `npm install`, intenta:

```bash
npm cache clean --force
npm install
```

### El proyecto no inicia

Verifica que estés en el directorio correcto y que las dependencias estén instaladas:

```bash
cd "C:\Users\Diego\Desktop\Gestor de Usuario de Prueba\TPReactNative2"
npm install
npm start
```

### Error "Metro bundler not responding"

## Características Avanzadas Implementadas

### UX/UI Mejorada

- **Botón flotante (FAB)**: Posicionado ergonómicamente en la esquina inferior derecha para fácil acceso
- **Modal deslizante**: Animación suave desde abajo con fondo semitransparente
- **Toasts en Android**: Notificaciones discretas que no interrumpen la navegación (sin necesidad de presionar "OK")
- **Foto de perfil personalizable**: Integración con galería del dispositivo usando `expo-image-picker`

### Sistema de Avatares Inteligente

- Generación automática de avatares con iniciales (estilo Microsoft Teams)
- Soporte para nombres simples o compuestos
- Colores de fondo aleatorios
- Fallback automático si no se sube foto personalizada

### Formato de Email Mejorado

Los emails se generan automáticamente con formato profesional:
- "Diego Martinez" → `diego.martinez@reqres.in`
- "Ana Maria Lopez" → `ana.maria.lopez@reqres.in`

## Requisitos de la Consigna

Este proyecto cumple con todos los requisitos solicitados:

✅ Consumo de API de reqres.in (GET y POST)  
✅ Lista de usuarios mostrando nombre y email  
✅ Formulario de creación con campos nombre y job  
✅ Estados de carga y error visibles  
✅ Manejo de estado global con Redux (users, items, status, error)  
✅ Thunks para fetchUsers y createUser  
✅ Componentes conectados mediante useSelector/useDispatch  
✅ Paginación simple funcional  
✅ Mensaje de éxito al crear usuario  
✅ Componentes reutilizables (UserList, UserForm)

## Archivos Importantes

- `node_modules/` y `.expo/` están en `.gitignore` y se regeneran con `npm install`
- Solo necesitas descargar el código fuente y ejecutar `npm install`
- No es necesario incluir dependencias en el repositorio

Este proyecto cumple con todos los requisitos solicitados:

- Consumo de API de reqres.in (GET y POST)
- Lista de usuarios mostrando nombre y email
- Formulario de creación con campos nombre y job
- Estados de carga y error visibles
- Manejo de estado global con Redux (users, items, status, error)
- Thunks para fetchUsers y createUser
- Componentes conectados mediante useSelector/useDispatch
- Paginación simple funcional
- Mensaje de éxito al crear usuario
- Componentes reutilizables (UserList, UserForm)

## Autor

Diego - Trabajo Práctico de React Native

## Licencia

Este proyecto es de uso académico.


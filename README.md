# TPReactNative - Proyecto React Native con Redux

Este es un proyecto de React Native desarrollado con Expo que utiliza Redux Toolkit para el manejo del estado.

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado en tu sistema:

- **Node.js** (versión 14 o superior) - [Descargar aquí](https://nodejs.org/)
- **npm** (viene incluido con Node.js) o **yarn**
- **Expo CLI** (se instalará globalmente en el siguiente paso)

## 🚀 Instalación

Sigue estos pasos para configurar y ejecutar el proyecto:

### 1. Instalar Expo CLI globalmente

```bash
npm install -g expo-cli
```

### 2. Clonar o descargar el proyecto

Si aún no tienes el proyecto, descárgalo o clónalo en tu máquina local.

### 3. Navegar al directorio del proyecto

```bash
cd TPReactNative1
```

### 4. Instalar las dependencias de Node.js

Ejecuta el siguiente comando para instalar todas las dependencias del proyecto listadas en `package.json`:

```bash
npm install
```

Este comando instalará:
- React Native (0.72.6)
- Expo (~49.0.15)
- Redux Toolkit (^1.9.7)
- React Redux (^8.1.3)
- Expo Status Bar (~1.6.0)
- Babel y otras dependencias de desarrollo

## 📱 Ejecutar el Proyecto

Una vez instaladas todas las dependencias, puedes ejecutar el proyecto en diferentes plataformas:

### Opción 1: Iniciar el servidor de desarrollo

```bash
npm start
```

o

```bash
expo start
```

Esto abrirá Expo DevTools en tu navegador, donde podrás elegir cómo ejecutar la aplicación.

### Opción 2: Ejecutar en Android

```bash
npm run android
```

**Requisitos para Android:**
- Tener Android Studio instalado con un emulador configurado, O
- Tener un dispositivo Android físico conectado con depuración USB habilitada, O
- Usar la app Expo Go en tu dispositivo móvil (escanea el código QR)

### Opción 3: Ejecutar en iOS (solo macOS)

```bash
npm run ios
```

**Requisitos para iOS:**
- Sistema operativo macOS
- Xcode instalado
- Simulador de iOS configurado

### Opción 4: Ejecutar en Web

```bash
npm run web
```

Esto abrirá la aplicación en tu navegador web predeterminado.

## 📱 Usar Expo Go (Recomendado para pruebas rápidas)

1. **Instala Expo Go** en tu dispositivo móvil:
   - [Android - Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)

2. **Ejecuta el proyecto:**
   ```bash
   npm start
   ```

3. **Escanea el código QR:**
   - En Android: abre la app Expo Go y escanea el código QR
   - En iOS: abre la cámara y escanea el código QR

## 🏗️ Estructura del Proyecto

```
TPReactNative1/
├── App.js                 # Componente principal con Provider de Redux
├── index.js              # Punto de entrada de la aplicación
├── package.json          # Dependencias y scripts del proyecto
├── app.json             # Configuración de Expo
└── src/
    ├── features/
    │   └── posts/
    │       └── postsSlice.js    # Slice de Redux para posts
    ├── screens/
    │   └── HomeScreen.js        # Pantalla principal
    └── store/
        └── store.js             # Configuración del store de Redux
```

## 🔧 Tecnologías Utilizadas

- **React Native** 0.72.6 - Framework para desarrollo móvil
- **Expo** ~49.0.15 - Plataforma para desarrollo rápido
- **Redux Toolkit** ^1.9.7 - Manejo del estado de la aplicación
- **React Redux** ^8.1.3 - Integración de Redux con React

## 🐛 Solución de Problemas

### Error: "Metro bundler error"
```bash
# Limpia la caché y reinicia
expo start -c
```

### Error: "Dependencies not found"
```bash
# Elimina node_modules y reinstala
rm -rf node_modules
npm install
```

### Error en Android: "SDK location not found"
- Asegúrate de tener Android Studio instalado y configurado correctamente
- Configura la variable de entorno ANDROID_HOME

## 📝 Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo de Expo
- `npm run android` - Ejecuta la app en Android
- `npm run ios` - Ejecuta la app en iOS (solo macOS)
- `npm run web` - Ejecuta la app en el navegador

## 📄 Licencia

Este proyecto es privado y está destinado para fines educativos.

---

**¿Necesitas ayuda?** Si encuentras algún problema durante la instalación o ejecución, asegúrate de tener todas las dependencias instaladas correctamente y que tu versión de Node.js sea compatible.

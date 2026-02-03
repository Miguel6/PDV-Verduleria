# 🖥️ Setup Electron - PDV Verdulería Desktop

## Información Actual

Electron ya está instalado:
```json
{
  "electron": "^40.1.0",
  "electron-builder": "^26.7.0"
}
```

## Próximos Pasos para Activar Desktop

### 1. Crear Archivo Principal de Electron

**Crear**: `electron/main.ts`

```typescript
import { app, BrowserWindow } from 'electron';
import * as path from 'path';

let mainWindow: BrowserWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  const isDev = process.env.NODE_ENV === 'development';
  const startUrl = isDev
    ? 'http://localhost:4200'
    : `file://${path.join(__dirname, '../dist/index.html')}`;

  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null as any;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
```

### 2. Crear Script de Precarga

**Crear**: `electron/preload.ts`

```typescript
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  invoke: (channel: string, ...args: unknown[]) =>
    ipcRenderer.invoke(channel, ...args),
  on: (channel: string, listener: (...args: unknown[]) => void) =>
    ipcRenderer.on(channel, (event, ...args) => listener(...args)),
  send: (channel: string, ...args: unknown[]) =>
    ipcRenderer.send(channel, ...args),
});
```

### 3. Actualizar `package.json`

```json
{
  "main": "dist/electron/main.js",
  "homepage": "./",
  "scripts": {
    "electron": "ng build --watch && electron .",
    "electron:build": "ng build && electron-builder",
    "electron:dev": "concurrently \"npm start\" \"wait-on http://localhost:4200 && electron .\"",
    "pack": "electron-builder --dir",
    "dist": "electron-builder"
  },
  "devDependencies": {
    "electron": "^40.1.0",
    "electron-builder": "^26.7.0",
    "concurrently": "^8.0.0",
    "wait-on": "^7.0.0"
  }
}
```

### 4. Crear Configuración Electron Builder

**Crear**: `electron-builder.yml`

```yaml
appId: com.pdv-verduleria.app
productName: PDV Verdulería

files:
  - dist/**/*
  - node_modules/**/*
  - package.json

directories:
  buildResources: assets
  output: release

win:
  target:
    - nsis
    - portable
  certificateFile: null

mac:
  target:
    - dmg
    - zip
  category: public.app-category.business

linux:
  target:
    - AppImage
    - deb
  category: Office

nsis:
  oneClick: false
  allowToChangeInstallationDirectory: true
  createDesktopShortcut: true
  createStartMenuShortcut: true

publish:
  provider: github
  owner: tu-usuario
  repo: PDV-Verduleria
```

### 5. Compilar Electron TypeScript

**Actualizar**: `tsconfig.json`

```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./",
    "include": ["src/**/*", "electron/**/*"]
  }
}
```

## Comandos Disponibles

```bash
# Desarrollo (con hot reload)
npm run electron:dev

# Build
npm run build

# Compilar para distribución
npm run electron:build

# Probar packaging
npm run pack

# Distribuir
npm run dist
```

## Características de Desktop

### Ventajas de Electron
✅ Una sola codebase (web + desktop)
✅ Actualizaciones automáticas
✅ Acceso a APIs del sistema
✅ Múltiples plataformas
✅ Instalador profesional

### Capacidades Adicionales Posibles
- 📝 Guardar archivos locales
- 🖨️ Integración con impresoras
- 📊 Exportar reportes a PDF
- 🔐 Almacenamiento seguro de datos
- 🔔 Notificaciones del sistema
- ⚙️ Servicios de fondo

## Distribución

### Windows
- Instalador NSIS
- Versión portable

### macOS
- DMG para instalación
- ZIP comprimido

### Linux
- AppImage
- Paquete DEB

## Próximas Integraciones

```typescript
// IPC Communication
ipcMain.handle('save-file', async (event, content) => {
  const { filePath } = await dialog.showSaveDialog(mainWindow, {
    filters: [{ name: 'Text Files', extensions: ['txt'] }],
  });
  if (filePath) {
    fs.writeFileSync(filePath, content);
    return filePath;
  }
});

// System Tray
const tray = new Tray(path.join(__dirname, 'assets/icon.png'));
const contextMenu = Menu.buildFromTemplate([
  { label: 'Show', click: () => mainWindow.show() },
  { label: 'Quit', click: () => app.quit() },
]);
tray.setContextMenu(contextMenu);
```

## Problemas Comunes

### Error: Cannot find module 'electron'
```bash
npm install electron --save-dev
```

### App no inicia en desarrollo
```bash
# Asegúrate que ng serve esté corriendo en puerto 4200
npm start  # En otra terminal
npm run electron:dev
```

### Build inestable
```bash
npm run build  # Build completo
npm run dist   # Luego distribuir
```

## Recursos

- [Electron Docs](https://www.electronjs.org/docs)
- [Electron Builder](https://www.electron.build/)
- [Electron Security](https://www.electronjs.org/docs/tutorial/security)

---

**Estado**: 🟡 Preparado (Falta activación)
**Versión**: 1.0.0-alpha

Para activar Electron completamente, sigue los pasos 1-5 anteriores.

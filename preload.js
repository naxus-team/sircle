const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld("electron", {
  getVersion: () => app.getVersion(),
  onShowTitleBar: (callback) => ipcRenderer.on("show-title-bar", (_, show) => callback(show)),
  toggleTitleBar: (show) => ipcRenderer.send("toggle-title-bar", show),
  closeWindow: () => ipcRenderer.send("window-close"),
  maximizeWindow: () => ipcRenderer.send("window-maximize"),
  minimizeWindow: () => ipcRenderer.send("window-minimize"),
  showWindow: () => ipcRenderer.send("window-show"),
});

export { }

declare global {
  interface Window {
    // Expose some Api through preload script
    fs: typeof import("fs")
    ipcRenderer: import("electron").IpcRenderer
    electronContext: import("@preload/context").IElectronRendererContext
    removeLoading: () => void
  }
}

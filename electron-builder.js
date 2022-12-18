/**
 * @see https://www.electron.build/configuration/configuration
 */
module.exports = {
  appId: "electron.boilerplate.app",
  productName: "Electron Typescript Vite React",
  copyright: "Copyright © 2022 ${author}",
  asar: true,
  compression: "maximum",
  directories: {
    output: "release/${version}",
    buildResources: "resources",
  },
  extraResources: [
    "./resources/**/*",
    "packages/electron/shared/infra/prisma/dev.db",
    "node_modules/.prisma/**/*",
    "node_modules/@prisma/client/**/*"
  ],
  files: [
    "dist"
  ],
  publish: [
    {
      provider: "github",
      owner: "matheusgomesbs",
      repo: "electron-ts-vite-react"
    }
  ],
  win: {
    target: [
      {
        target: "nsis",
        arch: ["x64"],
      },
    ],
    artifactName: "${productName}-${version}-Setup.${ext}",
  },
  nsis: {
    oneClick: false,
    perMachine: false,
    allowToChangeInstallationDirectory: true,
    deleteAppDataOnUninstall: true,
  },
  mac: {
    target: ["dmg"],
    artifactName: "${productName}-${version}-Installer.${ext}",
  },
  linux: {
    target: ["AppImage"],
    artifactName: "${productName}-${version}-Installer.${ext}",
  }
}

# electron-ts-vite-react

Boilerplate utilizando Electron + Vite + React + Typescript

![image](https://user-images.githubusercontent.com/11359652/208282512-074a79c2-0643-4ba4-96f2-b1c972568c20.png)

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento.

```
git clone https://github.com/matheusgomesbs/electron-ts-vite-react.git
```

### 📋 Pré-requisitos

De que coisas você precisa para instalar o software e como instalá-lo?

```
Yarn => Caso não utilize o yarn substituía no package.json
```

### 🔧 Instalação

Uma série de exemplos passo-a-passo que informam o que você deve executar para ter um ambiente de desenvolvimento em execução.

Diga como essa etapa será:

```
yarn install
```

Termine com um exemplo de como obter dados do sistema ou como usá-los para uma pequena demonstração.

## ⚙️ Comandos

Executar somente o Vite (Web)
```
yarn start
```

Gerar o build do projeto na pasta "dist"
```
yarn build
```

Executar aplicativo electron
```
yarn dev
```

Gerar executável para distribuição.
```
yarn dist
```

## 📦 Implantação
Veja o exemplo que esta dentro de "modules/user", para criar módulos com as
funcionalidades que deseja. Para expor seus módulos utilize o arquivo "context.ts" que esta dentro da pasta "preload".

Exemplo: 
```typescript
// electron/modules/teste/index.ts
import { BrowserWindow, ipcMain } from "electron";

const testModule = async (window: BrowserWindow | null) => {
  ipcMain.handle('test-module', async (event, args) => {
    return window?.setTitle("test title changed");
  });
}

export { testModule };
```
Adicione a chamada ao modulo:
```typescript
// electron/modules/index.ts
import { BrowserWindow } from "electron";

import { userModule } from "@modules/user";
import { testModule } from "./teste";

export const useModules = (window: BrowserWindow | null) => {
  userModule(window);
  testModule(window);
}
```
Cre a chamada da API ao modulo:
```typescript
// preload/context.ts
import { ipcRenderer } from "electron";

export interface IElectronRendererContext {
  getUsers(): Promise<string[]>;
  testeModule(): Promise<void>;
}

export const electronContext: IElectronRendererContext = {
  getUsers: async function (): Promise<string[]> {
    return await ipcRenderer.invoke('list-users');
  },
  testeModule: async function (): Promise<void> {
    return await ipcRenderer.invoke('test-module');
  }
}
```

Execute a chamada da API no seu front-end:
```typescript
import React from "react";

const App = () => {
  async function testeModule() {
    return await window.electronContext.testeModule();
  }

  return (
    <div>
      <h1>Hello world!</h1>
      <button onClick={testeModule}>Mudar titulo</button>
    </div>
  );
};

export default App;
```
## 🛠️ Construído com

Mencione as ferramentas que você usou para criar seu projeto

* [Electron](https://www.electronjs.org/) - Build cross-platform desktop apps with JavaScript, HTML, and CSS
* [Electron Builder](https://www.electron.build/) - A complete solution to package and build a ready for distribution Electron app for macOS, Windows and Linux
* [React](https://reactjs.org/) - A JavaScript library for building user interfaces
* [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
* [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
* [Prisma](https://www.prisma.io/) - Next-generation Node.js and TypeScript ORM

## 🖇️ Colaborando

Fique a vontade para deixar sua colaboração com o projeto com correções ou dicas de melhorias

## 📌 Versão

Versão 0.0.0

## ✒️ Autores

* **Matheus Gomes** - [matheusgomesbs](https://github.com/matheusgomesbs)
* **Tasin Ishmam**- *Exemplo de implementação do Prima* - [TasinIshmam](https://github.com/TasinIshmam)
* **YeonV** - *Projeto Base* - [YeonV](https://github.com/YeonV/Vitron)

Você também pode ver a lista de todos os [colaboradores](https://github.com/matheusgomesbs/electron-ts-vite-react/colaboradores) que participaram deste projeto.

## 📄 Licença

Este projeto está sob a licença (MIT) - veja o arquivo [LICENSE.md](https://github.com/matheusgomesbs/electron-ts-vite-react/licenca) para detalhes.

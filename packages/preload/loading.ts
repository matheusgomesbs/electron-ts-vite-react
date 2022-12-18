/**
 * https://tobiasahlin.com/spinkit
 * https://connoratherton.com/loaders
 * https://projects.lukehaas.me/css-loaders
 * https://matejkustec.github.io/SpinThatShit
 */
export function useLoading() {
  const className = `loaders-css__square-spin`
  const styleContent =
    `
    @keyframes loading{
      0%{
        transform: translateY(0px);
        background-color: #fcdc29;
      }
      50%{
        transform: translateY(50px);
        background-color: #ef584a;
      }
      100%{
        transform: translateY(0px);
        background-color: #fcdc29;
      }
    }
    .${className} {
      display: flex;
      gap: 10px
    }
    .app-loading-wrap {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #1E1E1E;
      z-index: 9;
    }
    .circle{
      display: inline-block;
      width: 15px;
      height: 15px;
      background-color: #fcdc29;
      border-radius: 50%;
      animation: loading 1s cubic-bezier(.8, .5, .2, 1) infinite;
      transform-origin: bottom center;
      position: relative;
    }
    .circle-1{
      animation-delay: 0.1s;
    }
    .circle-2{
      animation-delay: 0.2s;
    }
    .circle-3{
      animation-delay: 0.3s;
    }
  `
  const oStyle = document.createElement('style')
  const oDiv = document.createElement('div')

  oStyle.id = 'app-loading-style'
  oStyle.innerHTML = styleContent
  oDiv.className = 'app-loading-wrap'
  oDiv.innerHTML = `<div class="${className}"><div class="circle circle-1"></div><div class="circle circle-2"></div><div class="circle circle-3"></div></div>`

  return {
    appendLoading() {
      safe.append(document.head, oStyle)
      safe.append(document.body, oDiv)
    },
    removeLoading() {
      safe.remove(document.head, oStyle)
      safe.remove(document.body, oDiv)
    },
  }
}

const safe = {
  append(parent: HTMLElement, child: HTMLElement) {
    if (!Array.from(parent.children).find(e => e === child)) {
      return parent.appendChild(child)
    }
  },
  remove(parent: HTMLElement, child: HTMLElement) {
    if (Array.from(parent.children).find(e => e === child)) {
      return parent.removeChild(child)
    }
  },
}
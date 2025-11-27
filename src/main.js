import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>

  </div>
`

setupCounter(document.querySelector('#counter'))

import { PluginChannel } from "rcade-monorepo/sdk";

const div = document.querySelector("#app").children[0];

div.innerHTML += `<p>Hi!</p>`;

(async () => {
  const channel = await PluginChannel.acquire("@rcade/input-classic", "1.0.0");

  div.innerHTML += `<p>got channel!</p>`

  channel.getPort().onmessage = (message) => {
    div.innerHTML += `<code>${JSON.stringify(message.data)}</code>`
  }
})()
console.log("working just fine!")

//OOP - Inheritence
class MyHeader extends HTMLElement {
  connectedCallback() {
      this.innerHTML = `
      <div id="navigation">
        <button onclick="showScreen()"><img></button>
      </div>
    `
  }
}

class DarkToggle extends HTMLElement {
  connectedCallback() {
      this.innerHTML = `<button onclick="toggleColour()"><img>Toggle Dark Mode</button>`
  }
}

customElements.define('main-nav', MyHeader)
customElements.define('change-colour', DarkToggle)

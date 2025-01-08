import { Component } from '../interfaces/Component'

export class HeaderCreator implements Component {
  #$header: HTMLElement

  constructor() {
    this.#$header = Object.assign(document.createElement('h1'), {
      className: 'header',
      textContent: 'Weather sounds',
    })
  }

  render(): HTMLElement {
    return this.#$header
  }
}

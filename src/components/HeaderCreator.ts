import { Component } from '../abstractions/Component'

export class HeaderCreator implements Component {
  private $header: HTMLElement
  constructor() {
    this.$header = Object.assign(document.createElement('h1'), {
      className: 'header',
      textContent: 'Weather sounds',
    })
  }

  render(): HTMLElement {
    return this.$header
  }
}

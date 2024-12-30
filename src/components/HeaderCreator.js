import { Component } from '../abstractions/Component'

export class HeaderCreator extends Component {
  constructor() {
    super()
    this.$header = Object.assign(document.createElement('h1'), {
      className: 'header',
      textContent: 'Weather sounds',
    })
  }

  render() {
    return this.$header
  }
}

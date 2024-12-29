export function HeaderCreator() {
  this.$header = Object.assign(document.createElement('h1'), {
    className: 'header',
    textContent: 'Weather sounds',
  })

  this.render = () => this.$header
}

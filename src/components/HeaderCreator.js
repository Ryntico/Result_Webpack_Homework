export function HeaderCreator() {
  this.$header = document.createElement('h1')
  this.$header.className = 'header'
  this.$header.textContent = 'Weather sounds'
  this.render = () => this.$header
}
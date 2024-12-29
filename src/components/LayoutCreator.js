export function LayoutCreator() {
  this.$mainContainer = document.createElement('div')
  this.setLayoutClassName = className => this.$mainContainer.className = className
  this.setLayoutClassName('layout default')
  this.render = ($elementForRenderInto, [...elementsForRender]) => {
    elementsForRender.forEach(element => this.$mainContainer.append(element.render()))
    $elementForRenderInto.append(this.$mainContainer)
  }
}
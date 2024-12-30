export class LayoutCreator {
  constructor() {
    this.$mainContainer = document.createElement('div')

    this.setLayoutClassName = (className) => {
      this.$mainContainer.className = className
    }

    this.setLayoutClassName('layout default')
  }

  render($container, elementsForRender = []) {
    if (!$container || !(elementsForRender instanceof Array)) {
      throw new Error('Invalid arguments: $container must be a DOM element and elementsForRender must be an array.')
    }

    elementsForRender.forEach((element) => {
      if (typeof element.render === 'function') {
        this.$mainContainer.append(element.render())
      } else {
        console.warn('Element does not have a render method:', element)
      }
    })

    $container.append(this.$mainContainer)
  }
}
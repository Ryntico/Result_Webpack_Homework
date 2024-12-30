import {Component} from '../abstractions/Component'

export class LayoutCreator {
  private $mainContainer: HTMLElement = document.createElement('div')

  setLayoutClassName(className: string): void {
    this.$mainContainer.className = className
  }

  constructor() {
    this.setLayoutClassName = this.setLayoutClassName.bind(this)
    this.setLayoutClassName('layout default')
  }

  render($container: Element, elementsForRender: Component[] = []) {
    elementsForRender.forEach((element: Component): void => {
      this.$mainContainer.append(element.render())
    })
    $container.append(this.$mainContainer)
  }
}
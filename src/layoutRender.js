const $mainContainer = document.createElement('div')

export function setLayoutClassName(className) {
  $mainContainer.className = className
}

export function layoutRender($elementForRenderInto, [...elementsForRender]) {
  $mainContainer.className = 'layout default'

  elementsForRender.forEach(element => $mainContainer.append(element))
  $elementForRenderInto.append($mainContainer)
}
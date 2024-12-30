import { buttons, pauseIcon } from '../data'
import { isFileExistsOnUrl } from '../accessoriesEntities'
import { Component } from '../abstractions/Component'
import { ButtonObject } from '../abstractions/ButtonObjectType'

export class ButtonsContent implements Component {
  private audioList: HTMLAudioElement[]
  private $buttonsContainer: HTMLElement

  constructor(layoutClassNameSetter?: Function) {
    this.audioList = []

    this.$buttonsContainer = document.createElement('div')
    this.$buttonsContainer.className = 'buttons-container'

    const buttonList: ButtonObject[] = []

    buttons.forEach((button) => {
      if (!isFileExistsOnUrl(button.sound)) return

      const $audio = new Audio(button.sound)
      $audio.loop = true
      this.audioList.push($audio)

      const createIcon = (additionalClass: string = '') => {
        const $icon = document.createElement('span')
        $icon.className = `icon ${additionalClass}`
        return $icon
      }

      const $iconDefault = createIcon(`${button.title}-icon`)

      const $buttonElement = document.createElement('div')
      $buttonElement.className = `button ${button.title}`
      $buttonElement.append($iconDefault)

      const buttonObject: ButtonObject = {
        id: button.id,
        title: button.title,
        audio: $audio,
        iconDefault: $iconDefault,
        el: $buttonElement
      }

      buttonList.push(buttonObject)

      $buttonElement.addEventListener('click', () => {
        layoutClassNameSetter?.(`layout ${button.title}`)

        buttonList.forEach((btn) => {
          const isCurrent = btn.id === buttonObject.id

          if (isCurrent) {
            if (btn.audio.paused) {
              btn.audio.play()
              btn.iconDefault.classList.remove(`${button.title}-icon`)
              btn.iconDefault.classList.add('pause-icon')
            } else {
              btn.audio.pause()
              btn.iconDefault.classList.remove('pause-icon')
              btn.iconDefault.classList.add(`${button.title}-icon`)
              layoutClassNameSetter?.('layout default')
            }
          } else if (!btn.audio.paused) {
            btn.audio.pause()
            btn.iconDefault.classList.remove('pause-icon')
            btn.iconDefault.classList.add(`${btn.title}-icon`)
          }
        })
      })

      this.$buttonsContainer.append($buttonElement)
    })
  }

  render() {
    return this.$buttonsContainer
  }

  getAudioList() {
    return this.audioList
  }
}

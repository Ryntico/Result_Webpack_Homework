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

      const createIcon = (src: string, alt: string, additionalClass: string = '') => {
        const $icon = document.createElement('img')
        $icon.src = src
        $icon.alt = alt
        $icon.className = `icon ${additionalClass}`
        return $icon
      }

      const $iconDefault = createIcon(button.icon, button.title)
      const $iconPause = createIcon(pauseIcon, 'пауза', 'd-none')

      const $buttonElement = document.createElement('div')
      $buttonElement.className = `button ${button.title}`
      $buttonElement.append($iconDefault, $iconPause)

      const buttonObject: ButtonObject = {
        id: button.id,
        audio: $audio,
        iconDefault: $iconDefault,
        iconPause: $iconPause,
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
              btn.iconDefault.classList.add('d-none')
              btn.iconPause.classList.remove('d-none')
            } else {
              btn.audio.pause()
              btn.iconDefault.classList.remove('d-none')
              btn.iconPause.classList.add('d-none')
              layoutClassNameSetter?.('layout default')
            }
          } else if (!btn.audio.paused) {
            btn.audio.pause()
            btn.iconDefault.classList.remove('d-none')
            btn.iconPause.classList.add('d-none')
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

import { buttons, pauseIcon } from '../data'
import { isFileExistsOnUrl } from '../accessoriesEntities'

export function ButtonsContent(layoutClassNameSetter) {
  this.audioList = []

  this.$buttonsContainer = document.createElement('div')
  this.$buttonsContainer.className = 'buttons-container'

  const buttonList = []

  buttons.forEach((button) => {
    if (!isFileExistsOnUrl(button.sound)) return

    const buttonObject = {id: button.id}
    buttonList.push(buttonObject)

    const $audio = new Audio(button.sound)
    $audio.loop = true
    buttonObject.audio = $audio
    this.audioList.push($audio)

    const createIcon = (src, alt, additionalClass = '') => {
      const $icon = document.createElement('img')
      $icon.src = src
      $icon.alt = alt
      $icon.className = `icon ${ additionalClass }`
      return $icon
    }

    const $iconDefault = createIcon(button.icon, button.title)
    const $iconPause = createIcon(pauseIcon, 'пауза', 'd-none')
    buttonObject.iconDefault = $iconDefault
    buttonObject.iconPause = $iconPause

    const $buttonElement = document.createElement('div')
    $buttonElement.className = `button ${ button.title }`
    $buttonElement.append($iconDefault, $iconPause)
    buttonObject.el = $buttonElement

    $buttonElement.addEventListener('click', () => {
      layoutClassNameSetter?.(`layout ${ button.title }`)

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

  this.render = () => this.$buttonsContainer

  this.getAudioList = () => this.audioList
}

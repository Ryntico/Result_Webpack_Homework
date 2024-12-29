import { buttons, pauseIcon } from '../data'
import { isFileExistsOnUrl } from '../accessoriesEntities'


export function ButtonsContent(layoutClassNameSetter) {
  this.audioList = []

  this.$buttonsContainer = document.createElement('div')
  this.$buttonsContainer.className = 'buttons-container'

  const buttonList = []
  buttons.forEach(button => {
    try {
      if (!isFileExistsOnUrl(button.sound)) return
      const buttonObject = {id: button.id}
      buttonList.push(buttonObject)

      const $audio = new Audio(button.sound)
      $audio.loop = true
      buttonObject.audio = $audio
      this.audioList.push($audio)

      const $iconDefault = document.createElement('img')
      $iconDefault.src = button.icon
      $iconDefault.alt = button.title
      $iconDefault.className = 'icon'
      buttonObject.iconDefault = $iconDefault

      const $iconPause = document.createElement('img')
      $iconPause.src = pauseIcon
      $iconPause.alt = 'пауза'
      $iconPause.className = 'icon d-none'
      buttonObject.iconPause = $iconPause

      const $el = document.createElement('div')
      $el.className = `button ${ button.title }`
      $el.append($iconDefault, $iconPause)
      buttonObject.el = $el

      $el.addEventListener('click', () => {
        layoutClassNameSetter && layoutClassNameSetter(`layout ${ button.title }`)

        for (let btn of buttonList) {
          if (btn.id === buttonObject.id) {
            if (btn.audio.paused) {
              btn.audio.play()
              btn.iconDefault.classList.add('d-none')
              btn.iconPause.classList.remove('d-none')
            } else {
              btn.audio.pause()
              btn.iconDefault.classList.remove('d-none')
              btn.iconPause.classList.add('d-none')
              layoutClassNameSetter && layoutClassNameSetter(`layout default`)
            }
          } else {
            if (!btn.audio.paused) {
              btn.audio.pause()
              btn.iconDefault.classList.remove('d-none')
              btn.iconPause.classList.add('d-none')
            }
          }
        }

        buttonList.filter(buttonObj => buttonObj.audio !== $audio).forEach(buttonObj => {
          if (!buttonObj.audio.paused) buttonObj.audio.pause()
        })
      })
      this.$buttonsContainer.append($el)
    } catch (e) {
      console.log('Some error during creating buttons', e)
    }
  })

  this.render = () => this.$buttonsContainer
  this.getAudioList = () => this.audioList
}
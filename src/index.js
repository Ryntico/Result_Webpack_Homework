import './assets/css/index.scss'
import { buttons, pauseIcon } from './data'

// список, который будет заполнен ссылками на DOM-элементы кнопок и их наполнением (звуки, иконки, фоны)
const buttonList = []

const $root = document.querySelector('#app')
$root.className = 'layout'

const buttonsContainer = document.createElement('div')
buttonsContainer.className = 'buttons-container'
$root.append(buttonsContainer)

const $volumeControl  = document.createElement('input')
$volumeControl.type = 'range'
$volumeControl.value = 1
$volumeControl.min = 0
$volumeControl.max = 1
$volumeControl.step = 0.01
$volumeControl.className = 'volume'
$volumeControl.addEventListener('input', event => {
  audioList.forEach(item => item.volume = event.target.value)
})
$root.append($volumeControl)

function renderItem(button) {
  const buttonObject = {id: button.id}
  buttonList.push(buttonObject)

  const $audio = new Audio(button.sound)
  $audio.onerror = () => console.error(`Failed to load audio: ${button.sound}`)
  $audio.loop = true
  buttonObject.audio = $audio

  const $iconDefault = document.createElement('img')
  $iconDefault.src = `url(${button.icon})`
  $iconDefault.alt = button.title
  $iconDefault.className = 'icon-default'
  buttonObject.iconDefault = $iconDefault

  const $iconPause = document.createElement('img')
  $iconPause.src = `url(${pauseIcon})`
  $iconPause.alt = 'пауза'
  $iconPause.className = 'icon-pause d-none'
  buttonObject.iconPause = $iconPause

  const $el = document.createElement('div')
  $el.className = `button ${button.title}` // описать класс title для отрисовки фона
  // $el.style.backgroundImage = `url(${button.backgroundImage})`
  $el.append($iconDefault, $iconPause)
  buttonObject.el = $el

  $el.addEventListener('click', () => {
    buttonsContainer.style.backgroundImage = `url(${ button.backgroundImage })`

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
        }
      } else {
        if (!btn.audio.paused) {
          btn.audio.pause()
          btn.iconDefault.classList.remove('d-none')
          btn.iconPause.classList.add('d-none')
        }
      }
    }

    buttonList.map(button => button.audio).filter(audio => audio !== $audio).forEach(audio => {
      if (!audio.paused) audio.pause()
    })
  })
  buttonsContainer.append($el)
}

buttons.forEach(renderItem)



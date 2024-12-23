import './assets/css/index.scss'
import { buttons, pauseIcon } from './data'

// список, который будет заполнен ссылками на DOM-элементы кнопок и их наполнением (звуки, иконки, фоны)
const buttonList = []

const $root = document.querySelector('#app')
$root.className = 'layout'

const $header = document.createElement('h1')
$header.className = 'header'
$header.textContent = 'Weather sounds'
$root.append($header)

const $buttonsContainer = document.createElement('div')
$buttonsContainer.className = 'buttons-container'
$root.append($buttonsContainer)

const $volumeControl  = document.createElement('input')
$volumeControl.type = 'range'
$volumeControl.value = 1
$volumeControl.min = 0
$volumeControl.max = 1
$volumeControl.step = 0.01
$volumeControl.className = 'volume'
$volumeControl.addEventListener('input', event => {
  buttonList.forEach(buttonObj => buttonObj.audio.volume = event.target.value)
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
  $el.className = `button ${button.title}`
  $el.append($iconDefault, $iconPause)
  buttonObject.el = $el

  $el.addEventListener('click', () => {
    $root.className = `layout ${button.title}`

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
          $root.className = `layout`
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
  $buttonsContainer.append($el)
}

buttons.forEach(renderItem)



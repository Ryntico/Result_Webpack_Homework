import { buttons, pauseIcon } from './data'

export function createHeader() {
  const $header = document.createElement('h1')
  $header.className = 'header'
  $header.textContent = 'Weather sounds'

  return $header
}

export function createVolumeControl(audioList){
  const $volumeControl  = document.createElement('input')
  $volumeControl.type = 'range'
  $volumeControl.value = 1
  $volumeControl.min = 0
  $volumeControl.max = 1
  $volumeControl.step = 0.01
  $volumeControl.className = 'volume'
  $volumeControl.addEventListener('input', event => {
    audioList.forEach(audio => audio.volume = event.target.value)
  })

  return $volumeControl
}

export function createWeatherButtonsAndAudioList(layoutClassNameSetter) {
  // список, который будет заполнен ссылками на DOM-элементы кнопок и их наполнением (звуки, иконки, фоны)
  const buttonList = []

  const $buttonsContainer = document.createElement('div')
  $buttonsContainer.className = 'buttons-container'

  buttons.forEach(button => {
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
      layoutClassNameSetter(`layout ${button.title}`)

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
            layoutClassNameSetter(`layout default`)
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
  })

  return {$buttonsContainer, audioList: buttonList.map(button => button.audio)}
}
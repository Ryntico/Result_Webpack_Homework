import './assets/css/index.scss'
import { buttons, pauseIcon } from './data'

const root = document.querySelector('#app')
root.className = 'layout'

const audioList = []

const buttonHTMLCollection = document.getElementsByClassName('button')

const buttonsContainer = document.createElement('div')
buttonsContainer.className = 'buttons'
root.append(buttonsContainer)

const volumeControl  = document.createElement('input')
volumeControl.type = 'range'
volumeControl.value = 1
volumeControl.min = 0
volumeControl.max = 1
volumeControl.step = 0.01
volumeControl.className = 'volume'
volumeControl.addEventListener('input', event => {
  audioList.forEach(item => item.volume = event.target.value)
})
root.append(volumeControl)

function renderItem(button) {
  const audio = new Audio(button.sound)
  audio.onerror = () => console.error(`Failed to load audio: ${button.sound}`)
  audio.loop = true
  audioList.push(audio)
  const $el = document.createElement('div')
  $el.className = `button ${button.title}`
  $el.style.backgroundImage = `url(${button.backgroundImage})`
  $el.innerHTML = `<img src="${button.icon}" alt="${button.title}" />`

  $el.addEventListener('click', () => {
    buttonsContainer.style.backgroundImage = `url(${button.backgroundImage})`
    
    const buttonList = Array.from(buttonHTMLCollection)
    buttonList.filter(but => but !== $el).forEach(but => {
      but.style.backgroundImage = `url(${but.backgroundImage})`
    })
    
    audioList.filter(item => item !== audio).forEach(item => {
      if(!item.paused) item.pause()
    })
    
    if (audio.paused) {
      audio.play()
      $el.innerHTML = `<img src="${pauseIcon}" alt="пауза" />`
    } else {
      audio.pause()
      $el.innerHTML = `<img src="${button.icon}" alt="${button.title}" />`
    }
  })
  buttonsContainer.append($el)
}

buttons.forEach(renderItem)



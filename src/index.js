import './assets/css/index.scss'
import { layoutRender, setLayoutClassName } from './layoutRender'
import { createHeader, createVolumeControl, CreateObjectOfWeatherButtonsListAndButtonsAudioListConstructor } from './creates'

const $root = document.querySelector('#app')

const $header = createHeader()
const ButtonsAndAudioList =
  new CreateObjectOfWeatherButtonsListAndButtonsAudioListConstructor(setLayoutClassName)
const $volumeControl = createVolumeControl(ButtonsAndAudioList.audioList)

layoutRender($root, [$header, ButtonsAndAudioList.$buttonsContainer, $volumeControl])










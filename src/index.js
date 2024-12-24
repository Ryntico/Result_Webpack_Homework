import './assets/css/index.scss'
import { layoutRender, setLayoutClassName } from './layoutRender'
import { createHeader, createVolumeControl, createWeatherButtonsAndAudioList } from './creates'

const $root = document.querySelector('#app')

const $header = createHeader()
const buttonsAndAudioList = createWeatherButtonsAndAudioList(setLayoutClassName)
const $buttons = buttonsAndAudioList.$buttonsContainer
const $volumeControl = createVolumeControl(buttonsAndAudioList.audioList)

layoutRender($root, [$header, $buttons, $volumeControl])










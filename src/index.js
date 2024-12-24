import './assets/css/index.scss'
import { layoutRender, setLayoutClassName } from './layoutRender'
import { createHeader, createVolumeControl, createObjectOfWeatherButtonsListAndButtonsAudioList } from './creates'

const $root = document.querySelector('#app')

const $header = createHeader()
const buttonsAndAudioList =  createObjectOfWeatherButtonsListAndButtonsAudioList(setLayoutClassName)
const $buttons = buttonsAndAudioList.$buttonsContainer
const $volumeControl = createVolumeControl(buttonsAndAudioList.audioList)

layoutRender($root, [$header, $buttons, $volumeControl])










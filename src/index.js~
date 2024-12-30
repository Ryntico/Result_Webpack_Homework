import './assets/css/index.scss'
import { ButtonsContent } from './components/ButtonsContent'
import { LayoutCreator } from './components/LayoutCreator'
import { HeaderCreator } from './components/HeaderCreator'
import { VolumeControl } from './components/VolumeControl'

const Layout = new LayoutCreator()
const HeaderInstance = new HeaderCreator()
const Buttons = new ButtonsContent(Layout.setLayoutClassName)
const Volume = new VolumeControl(Buttons.getAudioList())

const $root = document.querySelector('#app')
Layout.render($root, [HeaderInstance, Buttons, Volume])










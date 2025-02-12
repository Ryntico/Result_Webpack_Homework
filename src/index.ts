import './assets/css/index.scss'
import { ButtonsContent } from './components/ButtonsContent'
import { LayoutCreator } from './core/LayoutCreator'
import { HeaderCreator } from './components/HeaderCreator'
import { VolumeControl } from './components/VolumeControl'

const Layout = new LayoutCreator()
const Header = new HeaderCreator()
const Buttons = new ButtonsContent(Layout.setLayoutClassName)
const Volume = new VolumeControl(Buttons.getAudioList())

const $root = document.querySelector('#app')

if (!$root) throw new Error('Root element not found')

Layout.render($root, [Header, Buttons, Volume])













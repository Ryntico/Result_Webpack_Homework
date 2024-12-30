import {Component} from '../abstractions/Component'

export class VolumeControl implements Component {
  private $volumeControl: HTMLInputElement

  constructor(audioList: HTMLAudioElement[]) {
    this.$volumeControl = Object.assign(document.createElement('input'), {
      type: 'range',
      value: '1',
      min: '0',
      max: '1',
      step: '0.01',
      className: 'volume',
    })

    this.$volumeControl.addEventListener('input', (event) => {
      const target = event.target as HTMLInputElement
      const value = target.value

      audioList.forEach(audio => {
        audio.volume = parseFloat(value)
      })
    })
  }

  render(): HTMLInputElement {
    return this.$volumeControl
  }
}
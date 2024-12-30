import { Component } from '../abstractions/Component'

export class VolumeControl extends Component {
  constructor(audioList) {
    super()
    this.$volumeControl = Object.assign(document.createElement('input'), {
      type: 'range',
      value: '1',
      min: '0',
      max: '1',
      step: '0.01',
      className: 'volume',
    })

    this.$volumeControl.addEventListener('input', ({target: {value}}) => {
      audioList.forEach(audio => {
        audio.volume = parseFloat(value)
      })
    })
  }

  render() {
    return this.$volumeControl
  }
}
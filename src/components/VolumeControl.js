export function VolumeControl(audioList) {
  this.$volumeControl = document.createElement('input')
  this.$volumeControl.type = 'range'
  this.$volumeControl.value = '1'
  this.$volumeControl.min = '0'
  this.$volumeControl.max = '1'
  this.$volumeControl.step = '0.01'
  this.$volumeControl.className = 'volume'
  this.$volumeControl.addEventListener('input', event => {
    audioList.forEach(audio => audio.volume = event.target.value)
  })
  this.render = () => this.$volumeControl
}
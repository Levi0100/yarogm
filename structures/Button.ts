export default class Button {
  type: number
  style?: number
  label?: string
  custom_id?: string
  emoji?: {
    name?: string
    id?: string
  }
  url?: string
  disabled?: boolean

  public constructor () {
    this.type = 2
  }

  public setStyle (style: 'PRIMARY' | 'SECONDARY' | 'SUCCESS' | 'DANGER' | 'LINK') {
    switch (style) {
      case 'PRIMARY': this.style = 1
      break
      case 'SECONDARY': this.style = 2
      break
      case 'SUCCESS': this.style = 3
      break
      case 'DANGER': this.style = 4
      break
      case 'LINK': this.style = 5
    }
    return this
  }

  public setLabel(label: string) {
    this.label = label
    return this
  }

  public setCustomId (id: string) {
    this.custom_id = id
    return this
  }

  public forceCustomId (id: string) {
    this.custom_id = id
    return this
  }

  public setEmoji (emoji: string) {
    if (isNaN(Number(emoji))) this.emoji! = { name: emoji }
    else this.emoji = { id: emoji }
    return this
  }

  public setURL (url: string) {
    this.url = url
    return this
  }

  public setDisabled () {
    this.disabled = true
    return this
  }

  public setEnabled () {
    this.disabled = false
    return this
  }

  public build (content?: string) {
    return {
      content,
      components: [{
        type: 1,
        components: [this]
      }]
    }
  }
}
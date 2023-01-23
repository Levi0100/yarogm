import { EmbedField } from 'eris'

interface EmbedAuthorOptions {
  name: string
  icon_url?: string
  url?: string
}

interface EmbedImageOption {
  url: string
}

interface EmbedFooterOptions {
  text: string
  icon_url?: string
}

class Embed {
  author?: EmbedAuthorOptions
  title?: string
  url?: string
  description?: string
  fields?: EmbedField[]
  image?: EmbedImageOption
  thumbnail?: EmbedImageOption
  timestamp?: Date
  footer?: EmbedFooterOptions
  color?: number

  public constructor () {
    this.color = 0x7289DA
    this.fields = []
  }

  public setAuthor (name: string, icon_url?: string, url?: string) {
    this.author = {
      name,
      icon_url,
      url
    }
    return this
  }

  public setTitle (title:  string) {
    this.title = title
    return this
  }

  public setDescription (description: string) {
    this.description = description
    return this
  }

  public addField (name: string, value: string, inline?: boolean) {
    this.fields?.push(
      {
        name,
        value,
        inline
      }
    )
    return this
  }

  public addFields (fields: EmbedField[]) {
    fields.forEach(field => {
      this.fields?.push(
        {
          ...field
        }
      )
    })
    return this
  }

  public setImage (url: string) {
    this.image =  { url }
    return this
  }

  public setThumbnail (url: string) {
    this.thumbnail =  { url }
    return this
  }

  public setTimestamp (timestamp?: Date) {
    this.timestamp = timestamp ? timestamp : new Date()
    return this
  }

  public setFooter (text: string, icon_url?: string) {
    this.footer = {
      text,
      icon_url
    }
    return this
  }

  public setColor (color: string) {
    this.color = parseInt(color.toUpperCase().replace('#', ''), 16)
    return this
  }

  public build (content?: string) {
    if (!content) content = ''

    return {
      content,
      embed: this
    }
  }
}

export default Embed
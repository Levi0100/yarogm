import { ActionRowComponents, Client, Message } from 'eris'
import 'dotenv/config'
import Embed from './structures/Embed'
import Button from './structures/Button'
const client = new Client(process.env.TOKEN)

client.on('ready', () => {
  console.log('ready!')
  client.editStatus('dnd')
  
  setInterval(async() => {
    try {
      const status = await fetch('https://api.discloud.app/v2/app/716738171681112065/status', {
        headers: {
          'api-token': process.env.DISCLOUD_API_TOKEN
        }
      })
      const logs = await fetch('https://api.discloud.app/v2/app/716738171681112065/logs', {
        headers: {
          'api-token': process.env.DISCLOUD_API_TOKEN
        }
      })
      var response = await status.json()
  
      const statusEmbed = new Embed()
      .setTitle('Status do Yaro')
      .addFields([
        {
          name: 'Contêiner',
          value: response.apps.container,
          inline: true
        },
        {
          name: 'CPU',
          value: response.apps.cpu,
          inline: true
        },
        {
          name: 'Memória RAM',
          value: response.apps.memory,
          inline: true
        },
        {
          name: 'SSD NVMe',
          value: response.apps.ssd,
          inline: true
        },
        {
          name: 'Network',
          value: `Download: \`${response.apps.netIO.down}\`\nUpload: \`${response.apps.netIO.up}\``,
          inline: true
        },
        {
          name: 'Uptime',
          value: response.apps.last_restart,
          inline: true
        }
      ])
  
      response = await logs.json()
  
      const logEmbed = new Embed()
      .setTitle('Terminal do Yaro')
      .setDescription(`\`\`\`${response.apps.terminal.small}\`\`\``)
  
      if (response.apps.terminal.url) {
        const button = new Button()
        .setStyle('LINK')
        .setLabel('Terminal Completo')
        .setURL(response.apps.terminal.url)
        
        client.editMessage(process.env.LOGS, '1066882282901737543', {
          embeds: [statusEmbed, logEmbed],
          components: [{
            type: 1,
            components: [button] as ActionRowComponents[]
          }]
        })
      }
      else {
        client.editMessage(process.env.LOGS, '1066882282901737543', { embeds: [statusEmbed, logEmbed] })
      }
    }
    catch(e) {
      console.log(e)
    }
  }, 1000 * 7)
})

client.on("messageCreate", async(message: Message) => {
  const command = message.content.split(" ")[0]
  const prefix: string = "ygm"
  const args = message.content.split(" ")
  args.shift()

  if (process.env.OWNER_IDS == undefined) return
  if (!process.env.OWNER_IDS.includes(message.author.id)) return

  if (command == prefix+"stop") {
    const msg = await message.channel.createMessage({
      content: "Processando requisição, aguarde...",
      messageReference: { messageID: message.id }
    })

    await fetch('https://api.discloud.app/v2/app/716738171681112065/stop', {
        method: "PUT",
        headers: {
          'api-token': process.env.DISCLOUD_API_TOKEN
        }
      })

    msg.edit("O yaro foi parado.")
  }

  if (command == prefix+"restart") {
    const msg = await message.channel.createMessage({
      content: "Processando requisição, aguarde...",
      messageReference: { messageID: message.id }
    })

    await fetch('https://api.discloud.app/v2/app/716738171681112065/restart', {
        method: "PUT",
        headers: {
          'api-token': process.env.DISCLOUD_API_TOKEN
        }
      })

    msg.edit("O yaro foi reiniciado.")
  }

  if (command == prefix+"start") {
    const msg = await message.channel.createMessage({
      content: "Processando requisição, aguarde...",
      messageReference: { messageID: message.id }
    })
    
    await fetch('https://api.discloud.app/v2/app/716738171681112065/start', {
        method: "PUT",
        headers: {
          'api-token': process.env.DISCLOUD_API_TOKEN
        }
      })

    msg.edit("O yaro foi iniciado.")
  }
})

client.connect()
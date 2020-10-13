const discord = require("discord.js")
const client = new discord.Client()
const chalk = require("chalk")

client.on("ready", () => {
    client.user.setPresence({
		status: "online",
		activity: {
			name: `на ${client.guilds.cache.size} сервер/серверов`,
			type: "WATCHING"
		}
	});
})

client.on("message", async (message) => {
    // if(message.author.bot == true) return
    // if(message.channel.type == "dm") return 
    if(message.content.startsWith(";eval") || message.content.startsWith(";e")) {
        if(message.author.id !== "536225590618095626") return
        let args = message.content.split(" ")
        args = args.slice(1)
        let evaled = eval(args.join(" "))
        message.channel.send("```js\n" + evaled + "```")
    }
    if(message.content.startsWith(":")) {
        // message.channel.createWebhook("Some webhook")
        message.guild.fetchWebhooks()
            .then(webhooks => {
                let webhookClient = webhooks.find(col => col.channelID == `${message.channel.id}`)
                let name = message.content.split(":")
                let emoji = client.emojis.cache.find(emoji => emoji.name === name[1])
                // const webhookClient = new discord.WebhookClient('764398642085101598', 'XSi9ZWqyuWmv07xk2vhK7fYpZ7mNw-EnnV2TH1W7rzeZ4iAD_B05NmG-lVUmTM7ABeyX')
                // const webhookClient = message.channel.createWebhook("some user")
                if(!webhookClient) {
                    message.channel.createWebhook("FULLERBOOK #1")
                    message.channel.send(":white_check_mark: Произошла ошибка, был создан вебхук. Пожалуйста повторите данную команду после этого сообщения.")
                    return
                }
                webhookClient.send(`${emoji}`, {
                    username: message.author.username,
                    avatarURL: message.author.displayAvatarURL({ dynamic: true})
                })
                    .catch(() => {
                        message.channel.createWebhook("FULLERBOOK #1")
                        message.channel.send(":white_check_mark: Произошла ошибка, был создан вебхук. Пожалуйста повторите данную команду после этого сообщения.")
                    })
                    return
            })
    }
})

client.login("NzY0Mzk0MDIxODc5MjgzNzI0.X4FnaA.40WCw4K6FsdwG6E9f0yjnsljZ8w")
    .catch(err => console.log(chalk.bold(chalk.red("[401] Я не смог авторизироваться"))))
    .then(() => console.log(chalk.bold(chalk.green(`[200] Я зашел от ${client.user.tag}`))))
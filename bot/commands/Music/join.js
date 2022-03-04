const Discord = require(`discord.js`);
const { MessageEmbed } = require(`discord.js`);
const config = require(`../../configs/config.json`);
const embed = require(`../../configs/embed.json`);
const emojis = require(`../../configs/emojis.json`);

module.exports = {
  name: "join",
  aliases: [`summon`, `create`],
  execute: async (client, message, args) => {
    try {
      let { channel } = message.member.voice;
      if (!channel) {
        return message.channel.send(
          new MessageEmbed()
            .setColor(embed.WRONG_COLOR)
            .setFooter(embed.FOOTER_TEXT, embed.FOOTER_ICON)
            .setTitle(
              `${emojis.MESSAGE.ERROR} ERROR | You are not connected to a Voice Channel`,
            ),
        );
      }
    } catch (e) {
      console.log(e);
    }
  },
};

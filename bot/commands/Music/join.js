const Discord = require(`discord.js`);
const { MessageEmbed } = require(`discord.js`);

const config = require(`../../configs/config.json`);
const embed = require(`../../configs/embed.json`);
const emojis = require(`../../configs/emojis.json`);

const { deleteMessageAuthor, checkBotJoined } = require('../../utils/utils');

module.exports = {
  name: "join",
  aliases: ['j'],
  execute: async (client, message) => {
    try {
      deleteMessageAuthor(client, message);
      checkBotJoined(message);
      let player = client.manager.players.get(message.guild.id);
      if (!player) {
        player = client.manager.create({
          guild: message.guild.id,
          voiceChannel: message.member.voice.channel.id,
          textChannel: message.channel.id
        });
      }

      if (player.state !== "CONNECTED") { 
        player.connect();
        player.stop();
      }

    } catch (e) {
      console.log(e);
      return message.channel.send(new MessageEmbed()
        .setColor(embed.wrongcolor)
        .setFooter(embed.footertext, embed.footericon)
        .setTitle(`${emojis.MESSAGE.ERROR} ERROR | An error occurred`)
        .setDescription(`\`\`\`${e.message}\`\`\``)
      );
    }
  },
};

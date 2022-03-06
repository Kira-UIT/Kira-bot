const { MessageEmbed } = require("discord.js");

const config = require(`../../configs/config.json`);
const embed = require(`../../configs/embed.json`);
const emojis = require(`../../configs/emojis.json`);

const {
  formatTime,
  deleteMessageAuthor,
  checkBotJoined,
} = require("../../utils/utils");

module.exports = {
  name: "queue",
  aliases: [`q`],
  execute: async (client, message, args, player) => {
    try {
      deleteMessageAuthor(client, message);
      const tracks = player.queue;
      console.log(tracks);

      let queue = tracks.slice(0, tracks.length);
      let text = ``;
      let messageEmbed = new MessageEmbed();
      if (!tracks.length) {
        return message.channel
          .send(
            new MessageEmbed()
              .setColor(embed.WRONG_COLOR)
              .setFooter(embed.FOOTER_TEXT, embed.FOOTER_ICON)
              .setTitle(
                `${emojis.MESSAGE.ERROR} Error | No song`,
              ),
          )
          .then((msg) => {
            msg
              .delete({ timeout: 5000 })
              .catch((e) =>
                console.log("Could not delete, this prevents a bug"),
              );
          });
      }
      if (queue.length >= 0) {
        for (let i = 0; i < queue.length; i++) {
          if (i === 0) {
            text += `\`${i + 1}.\` - ${tracks[i].title} | \` ${
              tracks[i].isStream
                ? "LIVE STREAM"
                : formatTime(tracks[i].duration)
            } \` | \` Requested by ${tracks[i].requester.tag} \``;
          } else {
            text += `\n\`${i + 1}.\` - ${tracks[i].title} | \` ${
              tracks[i].isStream
                ? "LIVE STREAM"
                : formatTime(tracks[i].duration)
            } \` | \` Requested by ${tracks[i].requester.tag} \``;
          }
        }
        messageEmbed.setAuthor(
          `Queue for ${message.guild.name}  -  [ ${player.queue.length} Tracks ]`,
          message.guild.iconURL({
            dynamic: true,
          }),
        );
        messageEmbed.setColor(embed.COLOR);
        messageEmbed.addField(
          `${emojis.MESSAGE.PLAYING}** CURRENT TRACK**`,
          `**${player.queue.current.title.substr(0, 60)}** - \`${
            player.queue.current.isStream
              ? `LIVE STREAM`
              : formatTime(player.queue.current.duration)
          }\` \`request by ${player.queue.current.requester.tag}\``,
        );
        if (text) {
          messageEmbed.addField(`${emojis.MESSAGE.SHOW_QUEUE} **QUEUE**`, text);
        }
        messageEmbed.setTimestamp();
        messageEmbed.setFooter(embed.FOOTER_TEXT, embed.FOOTER_ICON);
        return message.channel.send(messageEmbed).then((msg) => {
          msg
            .delete({ timeout: 10000 })
            .catch((e) => console.log("Could not delete, this prevents a bug"));
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
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
      if (tracks.length !== 0) {
        return message.channel
          .send(
            new MessageEmbed()
              .setAuthor(
                `Queue for ${message.guild.name}  -  [ ${player.queue.length} Tracks ]`,
                message.guild.iconURL({
                  dynamic: true,
                }),
              )
              .setFooter(embed.footertext, embed.footericon)
              .setColor(embed.color)
              .addField(
                `**0) CURRENT TRACK**`,
                `**${player.queue.current.title.substr(0, 60)}** - \`${
                  player.queue.current.isStream
                    ? `LIVE STREAM`
                    : formatTime(player.queue.current.duration).split(` | `)[0]
                }\`\n*request by: ${player.queue.current.requester.tag}*`,
              )
              .setDescription(`${emojis.MESSAGE.ERROR} No tracks in the queue`),
          )
          .then((msg) => {
            msg
              .delete({ timeout: 5000 })
              .catch((e) =>
                console.log("Could not delete, this prevents a bug"),
              );
          });
      }
    } catch (error) {
      console.log(error);
    }
  },
};

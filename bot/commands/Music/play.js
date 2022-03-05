const { MessageEmbed } = require("discord.js");

const config = require(`../../configs/config.json`);
const embed = require(`../../configs/embed.json`);
const emojis = require(`../../configs/emojis.json`);

const playermanager = require("../../handlers/playermanager");
const { deleteMessageAuthor, checkBotJoined } = require('../../utils/utils');

module.exports = {
  name: "play",
  aliases: ["p"],
  execute: async (client, message, args, player) => {
    deleteMessageAuthor(client, message);
    checkBotJoined(message);
    let text = args.join(" ");
    try {
      if (!text) {
        return message.channel
          .send(
            new MessageEmbed()
              .setColor(embed.WRONG_COLOR)
              .setFooter(embed.FOOTER_TEXT, embed.FOOTER_ICON)
              .setTitle(
                `${emojis.MESSAGE.ERROR} Error | You need to give me a URL or Search term.`,
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
      message.channel
        .send(
          new MessageEmbed()
            .setColor(embed.COLOR)
            .setTitle(`**Searching** 🔎`)
            .setDescription(`\`\`\`${text}\`\`\``),
        )
        .then((msg) => {
          msg
            .delete({ timeout: 5000 })
            .catch((e) => console.log("Could not delete, this prevents a bug"));
        });
    } catch (e) {
      console.log(e);
    }

    playermanager(client, message, args);
  },
};

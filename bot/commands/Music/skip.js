const { MessageEmbed, Message } = require("discord.js");

const config = require(`../../configs/config.json`);
const embed = require(`../../configs/embed.json`);
const emojis = require(`../../configs/emojis.json`);

const { deleteMessageAuthor, checkBotJoined } = require("../../utils/utils");

module.exports = {
  name: "skip",
  aliases: [],
  execute: async (client, message, args, player) => {
    try {
      deleteMessageAuthor(client, message);
      checkBotJoined(message);
      if (!player) {
        if (message.guild.me.voice.channel) {
          message.guild.me.voice.channel.leave().catch((e) => console.log(e));
          return message.channel.send(
            new MessageEmbed()
              .setTitle(
                `${emojis.MESSAGE.SUCCESS} Success | ${emojis.MESSAGE.STOP} Stopped and left your Channel`,
              )
              .setColor(embed.COLOR)
              .setFooter(embed.FOOTER_TEXT, embed.FOOTER_ICON),
          ).then((msg) => {
            msg
              .delete({ timeout: 5000 })
              .catch((e) =>
                console.log("Could not delete, this prevents a bug"),
              );
          });
        } else {
          return message.channel
            .send(
              new MessageEmbed()
                .setColor(embed.WRONG_COLOR)
                .setFooter(embed.FOOTER_TEXT, embed.FOOTER_ICON)
                .setTitle(
                  `${emojis.MESSAGE.ERROR} Error | No song is currently playing in this guild.`,
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
        return;
      }
      console.log(message);
      const { channel } = message.member.voice;
      if (player.state !== "CONNECTED") {
        return message.channel
          .send(
            new MessageEmbed()
              .setColor(embed.WRONG_COLOR)
              .setFooter(embed.FOOTER_TEXT, embed.FOOTER_ICON)
              .setTitle(
                `${emojis.MESSAGE.ERROR} Error | You need to be in my voice channel to use this command!`,
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
      if (player.queue.size === 0) {
        player.destroy();
        return message.channel
        .send(
          new MessageEmbed()
            .setColor(embed.COLOR)
            .setFooter(embed.FOOTER_TEXT, embed.FOOTER_ICON)
            .setTitle(
              `${emojis.MESSAGE.SUCCESS} Success | ${emojis.MESSAGE.STOP} Stopped and left your channel`,
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
      player.stop();
      return message.channel.send(new MessageEmbed()
        .setTitle(`${emojis.MESSAGE.SUCCESS} Success | ${emojis.MESSAGE.NEXT_TRACK} Skipped to the next Song`)
        .setColor(embed.COLOR)
        .setFooter(embed.FOOTER_TEXT, embed.FOOTER_ICON)
      );
    } catch (error) {
      console.log(error);
    }
  },
};

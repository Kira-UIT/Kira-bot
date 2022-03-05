const embed = require('../configs/embed.json');
const emojis = require('../configs/emojis.json');

module.exports.formatTime = formatTime;
module.exports.deleteMessageAuthor = deleteMessageAuthor;
module.exports.checkBotJoined = checkBotJoined;

function formatTime(time) {
  try {
    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor(time / 60000);
    let seconds = ((time % 6000) / 1000).toFixed(0);
    if (hours < 1)
      return (
        "00:" +
        (minutes < 10 ? "0" : "") +
        minutes +
        ":" +
        (seconds < 10 ? "0" : "") +
        seconds
      );
    else
      return (
        (hours < 10 ? "0" : "") +
        hours +
        ":" +
        (minutes < 10 ? "0" : "") +
        minutes +
        ":" +
        (seconds < 10 ? "0" : "") +
        s
      );
  } catch (error) {
    console.log(error);
  }
}

function deleteMessageAuthor(client, message) {
  if (message.author.id === client.user.id)
    message
      .delete({ timeout: 4000 })
      .catch((e) =>
        console.log("Couldn't delete msg, this is for preventing a bug"),
      );
  else
    message
      .delete({ timeout: 4000 })
      .catch((e) =>
        console.log("Couldn't delete msg, this is for preventing a bug"),
      );
}

function checkBotJoined(message) {
  const { channel } = message.member.voice;
  if (!channel)
    return message.channel
      .send(
        new MessageEmbed()
          .setColor(embed.WRONG_COLOR)
          .setFooter(embed.FOOTER_TEXT, embed.FOOTER_ICON)
          .setTitle(
            `${emojis.MESSAGE.ERROR} Error | You need to join a voice channel.`,
          ),
      )
      .then((msg) => {
        msg
          .delete({ timeout: 5000 })
          .catch((e) => console.log("Could not delete, this prevents a bug"));
      });
}


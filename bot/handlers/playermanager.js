const { MessageEmbed } = require("discord.js");
const config = require("../configs/config.json");
const embed = require("../configs/embed.json");

module.exports = async (client, message, args) => {
  if (!message.guild) return;

  let { channel } = message.member.voice;
  const permissions = channel.permissionsFor(client.user);
  if (!permissions.has("CONNECT"))
    return message.channel.send(
      new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle("❌ Error | I need permissions to join your channel"),
    );
  if (!permissions.has("SPEAK"))
    return message.channel.send(
      new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle("❌ Error | I need permissions to speak in your channel"),
    );

  let search = args.join(" ");
  let res;

  let player = client.manager.create({
    guild: message.guild.id,
    voiceChannel: message.member.voice.channel.id,
    textChannel: message.channel.id,
  });
  if (player.state !== "CONNECTED") {
    player.set("message", message);
    player.set("playerauthor", message.author.id);
    player.connect();
    player.stop();
  }
  try {
    if (search.includes("youtube.com")) {
      res = await client.manager.search(
        {
          query: search,
          source: "youtube.com",
        },
        message.author,
      );
    } else {
      res = await client.manager.search(search, message.author);
    }
  } catch (error) {
    console.log(error);
    return message.channel.send(
      new MessageEmbed()
        .setColor(embed.wrongcolor)
        .setFooter(embed.footertext, embed.footericon)
        .setTitle(`❌ Error | There was an error while searching:`)
        .setDescription(`\`\`\`${error.message}\`\`\``),
    );
  }

  if (!res.tracks[0]) {
    return message.channel.send(
      new MessageEmbed()
        .setColor(embed.wrongcolor)
        .setFooter(embed.footertext, embed.footericon)
        .setTitle(
          String("❌ Error | Found nothing for: **`" + search).substr(
            0,
            256 - 3,
          ) + "`**",
        )
        .setDescription(`Please retry!`),
    );
  }
  console.log(res.tracks[0]);

  if (player.state !== "CONNECTED") {
    player.set("message", message);
    player.set("playerauthor", message.author.id);
    player.connect();
    player.queue.add(res.tracks[0]);
    player.play();
    player.pause(false);

    // var irc = await isrequestchannel(
    //     client,
    //     player.textChannel,
    //     player.guild
    // );
    // if (irc) {
    //     edit_request_message_track_info(
    //         client,
    //         player,
    //         player.queue.current
    //     );
    //     edit_request_message_queue_info(client, player);
    // }
  } else {
    player.queue.add(res.tracks[0]);
    // var irc = await isrequestchannel(client, player.textChannel, player.guild);
    // if (irc) {
    //   edit_request_message_queue_info(client, player);
    // }
    let playEmbed = new MessageEmbed()
      .setTitle(
        `Added to Queue 🩸 **\`${res.tracks[0].title}`.substr(0, 256 - 3) +
          "`**",
      )
      .setColor(embed.COLOR)
      .setThumbnail(
        `https://img.youtube.com/vi/${res.tracks[0].identifier}/mqdefault.jpg`,
      )
      .addField("⌛ Duration: ", `${res.tracks[0].duration}`, true)
      .addField("💯 Song By: ", `\`${res.tracks[0].author}\``, true)
      .addField("🔂 Queue length: ", `\`${player.queue.length} Songs\``, true)
      .setFooter(
        `Requested by: ${res.tracks[0].requester.tag}`,
        res.tracks[0].requester.displayAvatarURL({
          dynamic: true,
        }),
      );
    return message.channel.send(playEmbed);
    // .then(msg => {
    //     if (msg) msg.delete({
    //         timeout: 10000
    //     })
    //     .catch (e => console.log("couldn't delete message this is a catch to prevent a crash"))
    // })
  }
};

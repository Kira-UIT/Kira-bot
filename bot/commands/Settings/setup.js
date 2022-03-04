const { MessageEmbed } = require("discord.js");
const config = require("../../configs/config.json");
const embed = require("../../configs/embed.json");
const emojis = require("../../configs/emojis.json");

module.exports = {
  name: "setup",
  aliases: ["musicsetup"],
  execute: async (client, message, args, cmduser, text, prefix) => {
    try {
      musiccmds = [];
      message.guild.channels
        .create(`Music - Request`, {
          type: "category",
          permissionOverwrites: {
            id: message.guild.id,
            allow: ["VIEW_CHANNEL"],
          },
        })
        .then((channel1) => {
          try {
            let maxbitrate = 96000;
            let boosts = message.guild.premiumSubscriptionCount;
            if (boosts >= 2) maxbitrate = 128000;
            if (boosts >= 15) maxbitrate = 256000;
            if (boosts >= 30) maxbitrate = 384000;

            message.guild.channels
              .create(`🎧｜Music`, {
                type: "voice",
                bitrate: maxbitrate,
                userLimit: 10,
                parent: channel1.id,
                permissionOverwrites: [
                  {
                    id: message.guild.id,
                    allow: ["VIEW_CHANNEL", "CONNECT"],
                  },
                ],
              })
              .then((channel2) => {
                try {
                  message.guild.channels
                    .create(`🎵｜requests`, {
                      type: "text",
                      rateLimitPerUser: 6,
                      topic: `To request a Track, simply Type the **SONG NAME** into the Channel or the **URL** and the Bot will play it! Make sure that you are in the **right** Voice Channel (🎧｜Music)!\n\n`,
                      parent: channel1.id,
                      permissionOverwrites: [
                        {
                          id: message.guild.id,
                          allow: [
                            "VIEW_CHANNEL",
                            "SEND_MESSAGES",
                            "ADD_REACTIONS",
                          ],
                        },
                        {
                          id: client.user.id,
                          allow: [
                            "MANAGE_MESSAGES",
                            "MANAGE_CHANNELS",
                            "ADD_REACTIONS",
                            "SEND_MESSAGES",
                            "MANAGE_ROLES",
                          ],
                        },
                      ],
                    })
                    .then(async (channel3) => {
                      message.reply(`Setting up in <#${channel3.id}>`);
                      let embed1 = new MessageEmbed()
                        .setColor(embed.color)
                        .setFooter(embed.footertext, embed.footericon)
                        .setTitle("Advance Music | Request | Guide")
                        .setDescription(
                          `Enter the song name or URL to play a song\n\nYou can also type \`${prefix}command <Parameters>\``,
                        )
                        .addField(`Commands`, musiccmds.join(", "))
                        .addField(
                          `Reactions`,
                          `${emoji.msg.rewind} Rewind 20 seconds\n${emoji.msg.forward} Forward 20 seconds\n${emoji.msg.pause_resume} Pause/Resume\n${emoji.msg.stop} Stop Track\n${emoji.msg.previous_track} Play previous\n`,
                          true,
                        )
                        .addField(
                          `\u200b`,
                          `${emoji.msg.skip_track} Skip / Next\n${emoji.msg.replay_track} Replay Track\n${emoji.msg.reduce_volume} Volume -10 %\n${emoji.msg.raise_volume} Volume +10 %\n${emoji.msg.toggle_mute} Toggle Volume Mute`,
                          true,
                        )
                        .addField(
                          `\u200b`,
                          `${emoji.msg.repeat_mode} Change repeat mode\n${emoji.msg.autoplay_mode} Toggle Autoplay\n${emoji.msg.shuffle} Shuffle the queue\n${emoji.msg.show_queue} Show the Queue\n${emoji.msg.show_current_track} Shows Current Track`,
                          true,
                        );

                      let embed2 = new MessageEmbed()
                        .setColor(embed.color)
                        .setFooter(embed.footertext, embed.footericon)
                        .setTitle("Advance Music | Music Queue")
                        .setDescription(
                          `Empty\nJoin a voice channel and queue songs by name or url in here.`,
                        )
                        .setImage(
                          "https://static.wixstatic.com/media/f93e5a_743546c08b32481dbdea1b484f3ac673~mv2.gif",
                        );

                      let embed3 = new MessageEmbed()
                        .setColor(embed.color)
                        .setFooter(embed.footertext, embed.footericon)
                        .setTitle(
                          "Advance Music | Currently no song is playing!",
                        )
                        .setDescription(
                          `Join a voice channel and enter a song name or url to play.\n**[Invite Link](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)\`|\`[Support Server](https://discord.gg/KRX2tgNA7R)\`|\`[Youtube](https://www.youtube.com/channel/UCINCfgiBYCykOemiuVhqtIQ/)\`**`,
                        )
                        .setImage(
                          "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
                        );
                    });
                } catch (e) {
                  console.log(e);
                }
              });
          } catch (e) {
            console.log(e);
          }
        });
    } catch (e) {
      console.log(e);
    }
  },
};

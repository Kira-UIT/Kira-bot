const Discord = require("discord.js");
const fs = require("fs");
const { Manager } = require("erela.js");
const Deezer = require("erela.js-deezer");

const config = require("../configs/config.json");
const embed = require("../configs/embed.json");
const emojis = require("../configs/emojis.json");

module.exports = (client) => {
  try {
    client.commands = new Discord.Collection();
    client.aliases = new Discord.Collection();
    client.cooldowns = new Discord.Collection();

    client.manager = new Manager({
      nodes: config.NODES,
      send(id, payload) {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
      },
    })
      .on("nodeConnect", (node) =>
        console.log(`Node ${node.options.identifier} connected`),
      )
      .on("nodeError", (node, error) =>
        console.log(
          `Node ${node.options.identifier} had an error: ${error.message}`,
        ),
      )
      .on("trackStart", (player, track) => {
        client.channels.cache
          .get(player.textChannel)
          .send(`Now playing: ${track.title}`);
      })
      .on("queueEnd", (player) => {
        client.channels.cache.get(player.textChannel).send("Queue has ended.");

        player.destroy();
      });
  } catch (error) {
    console.log(error);
  }
};

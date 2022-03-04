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
    });
  } catch (error) {
    console.log(error);
  }
};

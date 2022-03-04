const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const config = require("../configs/config.json");
const embed = require("../configs/embed.json");

module.exports = async (client, message) => {
  client.on("message", (message) => {
    if (!message.content.startsWith(config.PREFIX)) return;
    let args = message.content
      .trim()
      .substring(config.PREFIX.length)
      .split(/ +/);
    let cmd = args.shift().toLowerCase();
    if (!cmd.length) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    try {
      command.execute(client, message, args, player);
    } catch (e) {
      console.log(e);
    }
  });
};

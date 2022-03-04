const Discord = require("discord.js");
const lavalink = require("@lavacord/discord.js");

const config = require("./configs/config.json");

const client = new Discord.Client();

client.once("ready", () => {
  console.log("I am ready!");
  client.user.setActivity(`${config.PREFIX}play`);
  client.manager.init(client.user.id);
  client.user.setActivity(`${config.PREFIX}play`);
  client.on("warn", (info) => console.log(info));
  client.on("error", console.error);
});

["variables", "commands", "requestcmds"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

client.on("raw", d => client.manager.updateVoiceState(d));

client.login(config.TOKEN);

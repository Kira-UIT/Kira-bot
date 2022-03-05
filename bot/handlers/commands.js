const { readdirSync } = require("fs");
const AsciiTable = require("ascii-table");

const table = new AsciiTable("Commands");
table.setHeading("", "Command", "Aliases", "Load status");

module.exports = (client) => {
  try {
    let index = 1;
    readdirSync("./commands/").forEach((dir) => {
      const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
        file.endsWith(".js"),
      );
      commands.forEach((file) => {
        let command = require(`../commands/${dir}/${file}`);
        if (command.name) {
          if (command.aliases && command.aliases.length !== 0) {
            client.commands.set(command.name, command);
            table.addRow(`${index}`, command.name, command.aliases, "Ready");
          } else {
            client.commands.set(command.name, command);
            table.addRow(`${index}`, command.name, "Empty", "Ready");
          }
        } else {
          table.addRow(`${index}`, file.slice(0, -3), "Error");
        }
        if (command.aliases) {
          command.aliases.forEach((aliases) =>
            client.aliases.set(aliases, command.name),
          );
        }
        index++;
      });
    });
    console.log(table.toString());
  } catch (e) {
    console.log(String(e.stack));
  }
};

# 🤖 **Kira Bot (Discord Music Bot)**
> Kira-bot is a Discord Music Bot built with discord.js & uses Command Handler from [discordjs.guide](https://discordjs.guide)
## Requirements
1. Discord Bot Token **[Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)**
2. Install **[Node.js](https://nodejs.org/en/download/)**
3. Download **[Java](https://www.oracle.com/java/technologies/downloads/)** and **[Lavalink](https://ci.fredboat.com/repository/download/Lavalink_Build/9347:id/Lavalink.jar)**

## 🚀 **Getting Started**

```sh
git clone https://github.com/Kira-UIT/Kira-Bot.git
cd Kira-Bot/bot
npm install
```

## 📂 **Directory Structure**

```
Kira-bot
├── bot
│   ├── commands
│   ├── configs
│   ├── handlers
│   ├── node_modules
│   ├── utils
│   ├── index.js
│   ├── package-lock.json
│   └── package.json
├── server
│   ├── logs
│   ├── application.yml
│   └── Lavalink.jar
├── .gitignore
└── README.md
```

## 🛠️ **Configuration**
Fill in the parameters in `configs/config.json`  
⚠️ **Note: Never commit or share your token or api keys publicly** ⚠️
```json
{
  "TOKEN": "your_bot_token",
  "PREFIX": "your_prefix",

  "NODES": [
    {
      "id": "1",
      "host": "localhost",
      "port": 2333,
      "password": "youshallnotpass"
    }
  ],

  "SPOTIFY": {
    "CLIENT_SECRECT": "",
    "CLIENT_ID": ""
  },
  "SETTINGS": {
    "PROGRESS_EMOJI": "🔶"
  },
  "OWNER_ID": "870323935940595763"
}
```

## 🪄 **How to use the bot**
> **Start server**
```sh
cd Kira-Bot/server
java -jar Lavalink.jar
```
> **Start bot**
```sh
cd Kira-Bot/bot
npm start
```

## 📝 **Features & Commands**
> Note: The default prefix is `,`
* 🎶 Play music from YouTube via url  
`,play <url> || ,p <url>`
* 🔎 Play music from YouTube via search query  
`,play <query> || ,p <query>`
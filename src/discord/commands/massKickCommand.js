const HypixelDiscordChatBridgeError = require("../../contracts/errorHandler.js");
const { EmbedBuilder } = require("discord.js");
const config = require("../../../config.json");

module.exports = {
    name: `${config.minecraft.guild.guildName}-masskick`,
    description: "Kick the given users from the Guild.",
    options: [
        {
            name: "names",
            description: "Minecraft Usernames to kick, separated by spaces",
            type: 3,
            required: true,
        },
        {
            name: "reason",
            description: "Reason",
            type: 3,
            required: true,
        },
    ],

    execute: async (interaction) => {
        const user = interaction.member;
        if (user.roles.cache.has(config.discord.roles.modRole) === false) {
            throw new HypixelDiscordChatBridgeError("You do not have permission to use this command.");
        }

        const [nameList, reason] = [interaction.options.getString("names"), interaction.options.getString("reason")];
        const names = nameList.split(' ');
        for(let name of names) {
            bot.chat("/g kick " + name + " " + reason);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        const embed = new EmbedBuilder()
            .setColor(5763719)
            .setAuthor({ name: "Kick" })
            .setDescription(`Successfully kicked {names}`)
            .setFooter({
                text: `by @phoenix.owo | /help [command] for more information`,
                iconURL: "https://imgur.com/tgwQJTX.png",
            });

        await interaction.followUp({
            embeds: [embed],
        });
    },
};

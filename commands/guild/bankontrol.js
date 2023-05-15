const { EmbedBuilder } = require('discord.js');
const delay = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

module.exports = {
    name: "bankontrol",
    category: "guild",
    aliases: [],
    run: async (client, message, args) => {

        const kişi = args[0];
    if (!message.member.permissions.has("BanMembers")) return message.channel.send("Bu komut için yeterli yetkin yok!")

    message.guild.bans.fetch()
        .then(bans => {
            if (!bans.has(kişi)) {
                const adamyok = new EmbedBuilder()
                .setDescription("Bu kullanıcı yasaklanmamış!")
                .setColor("#FF0000")
                .setFooter({
                    text: `Justify | Ban Kontrol`,
                    iconURL: message.author.displayAvatarURL()
                })
                .setTimestamp()
                return message.channel.send({embeds: [adamyok]})
            }
        })
    message.guild.bans.fetch(kişi).then(({ user, reason }) => {
        const banneden = new EmbedBuilder()
        .setDescription(`**${user.tag}** isimli kullanııcı **\`${reason}\`** sebebi ile sunucudan yasaklanmış.`)
        .setFooter({
            text: `Justify | Ban Kontrol`,
            iconURL: message.author.displayAvatarURL()
        })
        .setColor("#FF0000")
        .setTimestamp()
        message.channel.send({embeds: [banneden]})

    })
    }
}
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "userinfo",
  category: "user",
  aliases: ['bilgi'],
  run: async (client, message) => {

    let eleman = message.mentions.users.first() || message.author;
    if(!eleman) return message.reply("You must tag a person.")
    const eleman2 = message.guild.members.cache.get(eleman.id)


        const emb = new EmbedBuilder()
        .setAuthor({ name: `${eleman.tag}`, iconURL: eleman.displayAvatarURL()})
        .setDescription("İşte kullanıcın bilgileri.")
        .addFields(
            { name: "Ad ve etiket", value: `${eleman.tag}`, inline: true},
            { name: "ID", value: eleman.id, inline: true},
            //{ name: "Status", value: eleman.user.presence.status, inline: true},
            { name: "Avatar", value: `**[JPG](${eleman.displayAvatarURL().replace(eleman.displayAvatarURL().includes(".gif") ? ".gif" : ".png", ".jpg")})**`, inline: true},
            { name: "Roller", value: `${eleman2.roles.cache.map(r => r).join(' ').replace("@everyone", " ")}`, inline: true},
            { name: "Sunucuya giriş tarihi", value: `${new Date(eleman2.joinedTimestamp).toLocaleDateString()} | ${new Date(eleman2.joinedTimestamp).toLocaleTimeString()}`, inline: true},
            { name: "Hesap oluşturma tarihi", value: `${new Date(eleman.createdTimestamp).toLocaleDateString()} | ${new Date(eleman.createdTimestamp).toLocaleTimeString()}`, inline: true}
        )
        .setFooter({
            text: `Requested by ${message.author.username}`,
            iconURL: message.author.displayAvatarURL()
        })
        .setTimestamp()
        .setColor("Random")
        message.channel.send({embeds: [emb]})

  },
};

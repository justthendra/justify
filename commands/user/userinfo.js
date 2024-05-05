const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "userinfo",
  category: "user",
  aliases: ['bilgi'],
  run: async (client, message) => {

    let user = message.mentions.users.first() || message.author;
    if(!user) return message.reply("You must tag a person.")
    const memberr = message.guild.members.cache.get(user.id)


        const emb = new EmbedBuilder()
        .setAuthor({ name: `${user.tag}`, iconURL: user.displayAvatarURL()})
        .setDescription("İşte kullanıcın bilgileri.")
        .addFields(
            { name: "Ad ve etiket", value: `${user.tag}`, inline: true},
            { name: "ID", value: user.id, inline: true},
            //{ name: "Status", value: eleman.user.presence.status, inline: true},
            { name: "Avatar", value: `**[JPG](${user.displayAvatarURL().replace(user.displayAvatarURL().includes(".gif") ? ".gif" : ".png", ".jpg")})**`, inline: true},
            { name: "Roller", value: `${member.roles.cache.map(r => r).join(' ').replace("@everyone", " ")}`, inline: true},
            { name: "Sunucuya giriş tarihi", value: `${new Date(member.joinedTimestamp).toLocaleDateString()} | ${new Date(member.joinedTimestamp).toLocaleTimeString()}`, inline: true},
            { name: "Hesap oluşturma tarihi", value: `${new Date(user.createdTimestamp).toLocaleDateString()} | ${new Date(user.createdTimestamp).toLocaleTimeString()}`, inline: true}
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

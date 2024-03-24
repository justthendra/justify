const { Client, GatewayIntentBits, Partials, Collection, ActivityType, EmbedBuilder, PermissionsBitField, ChannelType } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ],
    partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction]
});

const prefix = "j/";

client.commands = new Collection();
client.aliases = new Collection();
const voice = new Collection();

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on('ready', () => {

    client.user.setStatus('online');
    client.user.setPresence({ activities: [{
        name: `Yaşasın Justify Topluluğu!`,
        type: ActivityType.Watching
    }]})

    console.log("Aktif")
});

client.on("messageCreate", async message => {

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) 
        command.run(client, message, args);
});

client.on('guildMemberAdd', (member) => {
  const mesajlar = [
    `🥳 **${member.user.username}** geldiğine çok sevindik.`,
    `🍕 Merhaba **${member.user.username}**, umarım yanında pizza getirmişsindir.`,
    `**${member.user.username}** burada.`,
    `🖐🏻 Justify topluluğuna hoş geldin **${member.user.username}**. Millete merhaba desene!`,
    `🥳 **${member.user.username}** geldi, Herkes merhaba desin.`,
    `Seni görmek ne güzel, **${member.user.username}**.`,
    `🐾 Vahşi bir **${member.user.username}** belirdi.`,
    `🎉 **${member.user.username}** partiye katıldı.`,
    `🥳 **${member.user.username}** çıkageldi.`,
    `✨ **${member.user.username}** seni görmek güzel, Hadi herkese merhaba de!`,
    `🎉 Sunucuya katılmayı başardın **${member.user.username}**.`
  ];

  const mesajBoyutu = mesajlar.length;
  const rastgeleMesaj = Math.random() * mesajBoyutu;
  const rastgele = Math.floor(rastgeleMesaj);

  const rastgelemesaj = mesajlar[rastgele];

  const kanal = "1105863983266799616";
  const kanall = member.guild.channels.cache.find(c => c.id === kanal)

  const rol = "1105862221675900939";
  const roll = member.guild.roles.cache.find(r => r.id === rol)
  member.roles.add(roll)

  const girişMesaj = new EmbedBuilder()
  .setAuthor({name: "Bir kullanıcı topluluğumuza katıldı.", iconURL: member.user.displayAvatarURL()})
  .setColor("Random")
  .setDescription(rastgelemesaj + ` Seninle birlikte \`${member.guild.memberCount}\` kişi olduk!`)
  .setFooter({text: "Justify", iconURL: client.user.displayAvatarURL()})
  .setTimestamp()
  kanall.send({embeds: [girişMesaj]})
})

client.on('voiceStateUpdate', async (eskiKanal, yeniKanal) => {
  const üye = await client.users.fetch(yeniKanal.id);
  const kullanıcı = yeniKanal.guild.members.fetch(üye);

  if(!eskiKanal.channel && yeniKanal.channel.id === '1105864771087122572') {
    const kanal = await yeniKanal.guild.channels.create({
      name: üye.username,
      type: ChannelType.GuildVoice,
      parent: yeniKanal.channel.parentId,
      permissionOverwrites: [
        {
          id: üye.id,
          allow: [
            PermissionsBitField.Flags.Speak,
            PermissionsBitField.Flags.Connect,
            PermissionsBitField.Flags.Stream
          ],
        },
        {
          id: yeniKanal.guild.id,
          deny: [PermissionsBitField.Flags.Connect]
        }
      ]
    })
    voice.set(kanal.id, yeniKanal.member);
    (await kullanıcı).voice.setChannel(kanal.id)
  }

  if (voice.get(eskiKanal.channelId) && eskiKanal.channel.members.size == 0) return eskiKanal.channel.delete().catch(() => {});
})

client.login("")

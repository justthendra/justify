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
  const messages = [
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

  const messageLength = messages.length;
  const randomMessage = Math.random() * messagessLength;
  const random = Math.floor(randomMessage);

  const randommessage = messages[random];

  const channel = "1105863983266799616";
  const channell = member.guild.channels.cache.find(c => c.id === channel)

  const role = "1105862221675900939";
  const rolee = member.guild.roles.cache.find(r => r.id === role)
  member.roles.add(rolee)

  const loginMessage = new EmbedBuilder()
  .setAuthor({name: "Bir kullanıcı topluluğumuza katıldı.", iconURL: member.user.displayAvatarURL()})
  .setColor("Random")
  .setDescription(randommessage + ` Seninle birlikte \`${member.guild.memberCount}\` kişi olduk!`)
  .setFooter({text: "Justify", iconURL: client.user.displayAvatarURL()})
  .setTimestamp()
  channell.send({embeds: [loginMessage]})
})

client.on('voiceStateUpdate', async (oldChannel, newChannel) => {
  const member = await client.users.fetch(newChannel.id);
  const user = newChannel.guild.members.fetch(member);

  if(!oldChannel.channel && newChannel.channel.id === '1105864771087122572') {
    const channel = await newChannel.guild.channels.create({
      name: member.username,
      type: ChannelType.GuildVoice,
      parent: newChannel.channel.parentId,
      permissionOverwrites: [
        {
          id: member.id,
          allow: [
            PermissionsBitField.Flags.Speak,
            PermissionsBitField.Flags.Connect,
            PermissionsBitField.Flags.Stream
          ],
        },
        {
          id: newChannel.guild.id,
          deny: [PermissionsBitField.Flags.Connect]
        }
      ]
    })
    voice.set(channel.id, newChannel.member);
    (await user).voice.setChannel(channel.id)
  }

  if (voice.get(newChannel.channelId) && newChannel.channel.members.size == 0) return newChannel.channel.delete().catch(() => {});
})

client.login("")

const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, NoSubscriberBehavior } = require('@discordjs/voice');
const { createCanvas, loadImage } = require('canvas');
const PokerGame = require('discord-poker').PokerGame;

const client = new Discord.Client();
const prefix = '+';

client.on('ready', () => {
  console.log(`Connecté en tant que ${client.user.tag}`);
});

client.on('message', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'play') {
    // Code pour jouer de la musique
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.channel.send('Va en vocal ta tête là!');
    }

    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });

    const stream = ytdl(args[0], { filter: 'audioonly' });
    const resource = createAudioResource(stream);
    const player = createAudioPlayer();
    connection.subscribe(player);
    player.play(resource);

    message.channel.send('Rayan la musique commence mais te met pas à poil steuplé!');
  }

  if (command === 'poker') {
    // Code pour jouer au poker
    const pokerGame = new PokerGame(message);
    pokerGame.play();
  }

  if (command === 'kick') {
    // Code pour expulser un utilisateur du serveur
    if (!message.member.hasPermission('KICK_MEMBERS')) {
      return message.channel.send('Pourquoi t\'essais toi même tu sais t\'as pas le droit');
    }

    const user = message.mentions.users.first();
    if (!user) {
      return message.channel.send('Mentionnes le ya z3bi');
    }

    const member = message.guild.member(user);
    if (!member) {
      return message.channel.send('Tu cherches qui jcrois il est pas là');
    }

    try {
      await member.kick();
      message.channel.send(`Eh tu vois ${user.tag} il s'est fait tej`);
    } catch (error) {
      console.error(error);
      message.channel.send('Eh gros j\'ai pas réussis à le faire ');
    }
  }

  if (command === 'ban') {
    // Code pour bannir un utilisateur du serveur
    if (!message.member.hasPermission('BAN_MEMBERS')) {
      return message.channel.send('Pourquoi t\'essais toi même tu sais t\'as pas le droit ');
    }

    const user = message.mentions.users.first();
    if (!user) {
      return message.channel.send('Mentionnes le ya z3bi,avec un chien la');
    }

    const member = message.guild.member(user);
    if (!member) {
      return message.channel.send('Cet utilisateur n\'est pas sur ce serveur !, fromage');
    }

    try {
      await member.ban();
      message.channel.send(`Eh tu vois ${user.tag} il s'est fait ban!`);
    } catch (error) {
      console.error(error);
      message.channel.send('Eh gros j\'ai pas réussis à le faire ');
    }
    }
    
    if (command === 'canvas') {
    // Code pour dessiner sur un canvas
    const canvas = createCanvas(500, 500);
    const ctx = canvas.getContext('2d');
    // Dessiner un rectangle rouge
ctx.fillStyle = 'red';
ctx.fillRect(50, 50, 100, 100);

// Dessiner un cercle bleu
ctx.fillStyle = 'blue';
ctx.beginPath();
ctx.arc(300, 300, 50, 0, 2 * Math.PI);
ctx.fill();

// Envoyer l'image dans le canal
const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'canvas.png');
message.channel.send(attachment);
}
});

client.login('NzM1NjcwMDA5MzgwMjA4Njcx.GJG_o0.8Z5MZFp7bxy6oAqU420CsdTNU7KItP6jMv1ilU');



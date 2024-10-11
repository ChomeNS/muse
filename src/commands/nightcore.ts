import {inject, injectable} from 'inversify';
import {ChatInputCommandInteraction} from 'discord.js';
import {SlashCommandBuilder} from '@discordjs/builders';
import {TYPES} from '../types.js';
import PlayerManager from '../managers/player.js';
import Command from './index.js';

@injectable()
export default class implements Command {
  public readonly slashCommand = new SlashCommandBuilder()
    .setName('nightcore')
    .setDescription('nightcoreifies the songs')
    .addBooleanOption(option => option
      .setName('enabled')
      .setDescription('just enabled'));

  public requiresVC = true;

  private readonly playerManager: PlayerManager;

  constructor(@inject(TYPES.Managers.Player) playerManager: PlayerManager) {
    this.playerManager = playerManager;
  }

  public async execute(interaction: ChatInputCommandInteraction) {
    this.playerManager.get(interaction.guild!.id).setNightcore(interaction.options.getBoolean('enabled') ?? false);

    await interaction.reply('nightcore enabled');
  }
}

import { InteractionResponseType, InteractionType } from "discord-interactions";

export interface DiscordInteractionRequest {
	data: any,
	id: string,
	type: InteractionType
}

export interface DiscordInteractionResponse {
	type: InteractionResponseType,
}

export interface DiscordApplicationCommand {
  id: unknown,
  name: string,
  type: unknown
}
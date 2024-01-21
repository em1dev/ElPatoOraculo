import { DiscordWebhookPayload } from "../types"

export async function pushToWebhook(url: string, payload: DiscordWebhookPayload): Promise<void> {
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload)
  });
}

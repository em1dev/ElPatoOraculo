export enum ApplicationCommandType {
  ChatInput = 1,
  Messaage = 2,
  User = 3
}

export interface CommandRequestBody {
  name: string,
  description: string,
  options?: Array<{
    type: 1 | 2 | 3,
    name: string,
    description: string,
    required: boolean,
    choices: any
  }>,
  type: number,
}
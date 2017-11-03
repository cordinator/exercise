export class Message {
  type: MessageType;
  message: string;
}

export enum MessageType {
  error,
  success
}
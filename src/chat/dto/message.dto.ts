export class MessageDto {
  id: string;
  conversationId: string;
  senderType: 'User' | 'LLM';
  content: string;
  timestamp: Date;
}

export class CreateMessageDto {
  conversationId: string;
  content: string;
}

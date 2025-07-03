import { MessageDto } from './message.dto';

export class ConversationDto {
  id: string;
  userId: string;
  title: string;
  messages: MessageDto[];
  createdAt: Date;
  lastUpdated: Date;
}

export class CreateConversationDto {
  title?: string;
}

import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { LlmService } from './llm/llm.service';

@Module({
  providers: [ChatService, LlmService],
  controllers: [ChatController]
})
export class ChatModule {}

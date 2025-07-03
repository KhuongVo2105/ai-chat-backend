import { Injectable } from '@nestjs/common';
import { LlmService } from './llm/llm.service';
import { UserDto } from './dto/user.dto';
import { v4 as uuidv4 } from 'uuid';
import { ConversationDto, CreateConversationDto } from './dto/conversation.dto';
import { CreateMessageDto, MessageDto } from './dto/message.dto';

@Injectable()
export class ChatService {
  constructor(private readonly llmService: LlmService) {}

  /**
   * Tạo một cuộc trò chuyện mới.
   * Do dữ liệu cuộc trò chuyện được lưu trữ ở frontend, backend chỉ trả về một cấu trúc cơ bản.
   * @param user Thông tin người dùng tạo cuộc trò chuyện.
   * @param createConversationDto Dữ liệu để tạo cuộc trò chuyện mới (ví dụ: tiêu đề).
   * @returns Đối tượng ConversationDto cơ bản.
   */
  createNewConversation(
    user: UserDto,
    createConversationDto?: CreateConversationDto,
  ): ConversationDto {
    const conversationId = uuidv4();
    const now = new Date();
    const title =
      createConversationDto?.title || `New Chat - ${now.toLocaleString()}`; // Tiêu đề mặc định

    // Trả về cấu trúc ConversationDto cơ bản. Frontend sẽ quản lý mảng messages.
    return {
      id: conversationId,
      userId: user.userId,
      title: title,
      messages: [], // Mảng tin nhắn rỗng, frontend sẽ điền vào
      createdAt: now,
      lastUpdated: now,
    };
  }


  /**
   * Xử lý tin nhắn từ người dùng, gọi LLM và trả về câu trả lời.
   * Đây là phương thức chính cho luồng hỏi đáp.
   * @param user Thông tin người dùng gửi tin nhắn.
   * @param createMessageDto Dữ liệu tin nhắn từ frontend (conversationId, content).
   * @returns Một mảng chứa tin nhắn của người dùng và tin nhắn phản hồi của LLM.
   */
  async handleUserMessage(
    user: UserDto,
    createMessageDto: CreateMessageDto,
  ): Promise<MessageDto[]> {
    const { conversationId, content } = createMessageDto;
    const now = new Date();

    // 1. Tạo tin nhắn của người dùng
    const userMessage: MessageDto = {
      id: uuidv4(),
      conversationId: conversationId,
      senderType: 'User',
      content: content,
      timestamp: now,
    };

    // 2. Gọi LLM để lấy phản hồi
    const llmResponseContent = await this.llmService.generateResponse(
      content,
    );

    // 3. Tạo tin nhắn phản hồi từ LLM
    const llmMessage: MessageDto = {
      id: uuidv4(),
      conversationId: conversationId,
      senderType: 'LLM',
      content: llmResponseContent,
      timestamp: new Date(), // Cập nhật thời gian cho tin nhắn LLM
    };

    // Trả về cả tin nhắn của người dùng và tin nhắn của LLM
    return [userMessage, llmMessage];
  }

  /**
   * [Emulated] Phương thức mô phỏng tương tác với LLM để lấy lịch sử hội thoại cho ngữ cảnh.
   * Trong thực tế, bạn có thể cần gửi một phần hoặc toàn bộ lịch sử tin nhắn
   * từ frontend lên backend để LLM có ngữ cảnh.
   * @param messages Lịch sử tin nhắn hiện tại từ frontend.
   * @returns Prompt được xây dựng từ lịch sử tin nhắn.
   */
  private buildLlmContextPrompt(messages: MessageDto[]): string {
    // [Emulated] Mô phỏng việc xây dựng prompt từ lịch sử tin nhắn.
    // Trong thực tế, bạn sẽ gửi các tin nhắn này tới LLM Service để nó xử lý ngữ cảnh.
    // Ví dụ đơn giản: nối các tin nhắn lại.
    const context = messages
      .map((msg) => `${msg.senderType}: ${msg.content}`)
      .join('\n');
    return `Given the conversation history:\n${context}\n\nUser:`;
  }

}

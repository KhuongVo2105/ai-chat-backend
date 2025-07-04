import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { ConversationDto, CreateConversationDto } from './dto/conversation.dto';
import { UserDto } from './dto/user.dto';
import { CreateMessageDto, MessageDto } from './dto/message.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  /**
   * Endpoint để tạo một cuộc trò chuyện mới.
   * Frontend sẽ gọi API này khi người dùng muốn bắt đầu một cuộc trò chuyện mới.
   * @param req Đối tượng Request từ Express (hoặc Fastify), dùng để lấy thông tin user từ JWT.
   * @param createConversationDto Dữ liệu để tạo cuộc trò chuyện mới (tùy chọn tiêu đề).
   * @returns Đối tượng ConversationDto cơ bản.
   */
  @Post('new') // POST /chat/new
  @HttpCode(HttpStatus.CREATED) // Trả về mã trạng thái 201 Created
  createNewConversation(
    @Req() req: any, // Trong thực tế, bạn sẽ dùng một Guard hoặc Decorator để trích xuất User.
    @Body() createConversationDto?: CreateConversationDto,
  ): ConversationDto {
    console.log('[Create new conversation]', new Date())
    // [LƯU Ý]: Giả sử thông tin người dùng được đính kèm vào req.user bởi một Auth Guard.
    // Trong môi trường thật, bạn sẽ cần một Auth Guard để xác thực JWT và đính kèm user vào request.
    // Ví dụ đơn giản:
    const user: UserDto = req.user || {
      userId: 'mock-user-id',
      email: 'mock@example.com',
      name: 'Mock User',
    };

    return this.chatService.createNewConversation(user, createConversationDto);
  }

  /**
   * Endpoint để gửi tin nhắn của người dùng và nhận phản hồi từ LLM.
   * Frontend sẽ gọi API này mỗi khi người dùng gửi một tin nhắn.
   * @param req Đối tượng Request từ Express (hoặc Fastify), dùng để lấy thông tin user từ JWT.
   * @param createMessageDto Dữ liệu tin nhắn từ người dùng (conversationId, content).
   * @returns Một mảng chứa tin nhắn của người dùng và tin nhắn phản hồi của LLM.
   */
  @Post('message') // POST /chat/message
  @HttpCode(HttpStatus.OK) // Trả về mã trạng thái 200 OK
  async handleMessage(
    @Req() req: any, // Tương tự, thông tin user sẽ được lấy từ đây.
    @Body() createMessageDto: CreateMessageDto,
  ): Promise<MessageDto[]> {
    // [LƯU Ý]: Giả sử thông tin người dùng được đính kèm vào req.user bởi một Auth Guard.
    const user: UserDto = req.user || {
      userId: 'mock-user-id',
      email: 'mock@example.com',
      name: 'Mock User',
    };

    return this.chatService.handleUserMessage(user, createMessageDto);
  }
}

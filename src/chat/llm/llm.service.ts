import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LlmService {
  private readonly logger = new Logger(LlmService.name);

  /**
   * [Emulated] Mô phỏng việc gọi API của mô hình LLM và trả về câu trả lời.
   * Trong thực tế, phương thức này sẽ chứa logic để gửi yêu cầu HTTP đến API của LLM (ví dụ: OpenAI, Google Gemini).
   * @param prompt Nội dung câu hỏi/prompt sẽ gửi đến LLM.
   * @returns Promise<string> Câu trả lời mô phỏng từ LLM.
   */
  async generateResponse(prompt: string): Promise<string> {
    this.logger.log(`[Emulated] LLM received prompt: "${prompt}"`);

    // [Emulated] Mô phỏng độ trễ của mạng hoặc xử lý LLM
    await new Promise((resolve) =>
      setTimeout(resolve, 500 + Math.random() * 1000),
    ); // Độ trễ từ 0.5s đến 1.5s

    // [Emulated] Trả về một câu trả lời mô phỏng dựa trên prompt
    let response: string;
    const lowerCasePrompt = prompt.toLowerCase();

    if (
      lowerCasePrompt.includes('nest js') ||
      lowerCasePrompt.includes('nestjs')
    ) {
      response =
        'NestJS là một framework Node.js lũy tiến để xây dựng các ứng dụng phía máy chủ hiệu quả, đáng tin cậy và có thể mở rộng. Nó sử dụng TypeScript và kết hợp các yếu tố của OOP, FP và FRP.';
    } else if (
      lowerCasePrompt.includes('xin chào') ||
      lowerCasePrompt.includes('bạn khỏe không')
    ) {
      response =
        'Chào bạn! Tôi là một mô hình ngôn ngữ lớn, được huấn luyện bởi Google. Tôi rất sẵn lòng giúp bạn.';
    } else if (lowerCasePrompt.includes('vite')) {
      response =
        'Vite là một công cụ xây dựng và phát triển frontend hiện đại, được thiết kế để phát triển web nhanh hơn và mượt mà hơn.';
    } else if (lowerCasePrompt.includes('fastapi')) {
      response =
        'FastAPI là một framework web Python hiện đại, nhanh (hiệu suất cao) để xây dựng API với Python 3.7+ dựa trên các chú thích kiểu chuẩn của Python.';
    } else if (
      lowerCasePrompt.includes('sơ đồ lớp') ||
      lowerCasePrompt.includes('class diagram')
    ) {
      response =
        'Sơ đồ lớp (Class Diagram) là một loại sơ đồ cấu trúc tĩnh trong UML, mô tả cấu trúc của một hệ thống bằng cách hiển thị các lớp, thuộc tính của chúng, các hoạt động (phương thức) và mối quan hệ giữa các lớp.';
    } else if (lowerCasePrompt.includes('tên của bạn')) {
      response = 'Tôi không có tên. Tôi là một mô hình ngôn ngữ lớn.';
    } else if (lowerCasePrompt.includes('thời tiết')) {
      response =
        'Xin lỗi, tôi không có khả năng truy cập thông tin thời tiết theo thời gian thực.';
    } else {
      response =
        'Tôi đã nhận được câu hỏi của bạn: "' +
        prompt +
        '". Đây là một câu trả lời mô phỏng. Làm thế nào tôi có thể giúp bạn thêm?';
    }

    this.logger.log(`[Emulated] LLM generated response: "${response}"`);
    return response;
  }
}

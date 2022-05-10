import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository-interface";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if (!type || !comment) {
      throw new Error("Type & Comment are both required.");
    }

    if (type !== ("BUG" || "IDEA" || "OTHER")) {
      throw new Error("Type must be one of ['BUG', 'IDEA', 'OTHER'] ");
    }

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Invalid screenshot format.");
    }

    const feedback = await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: `Novo feedback [${feedback.type}]`,
      body: [
        `<div style="font-family: sans-serif; font-size: 16p; color: #111;">`,
        `<h2>Tipo de feedback: ${feedback.type}</h2>`,
        `<h3>ID do Feedback: ${feedback.id}</h4>`,
        `<p>Comentário: ${feedback.comment}</p>`,
        `<h2>Screenshot:</h2>`,
        `<img src="${feedback.screenshot}" alt="Não há Screenshot Disponível" />`,
        `</div>`,
      ].join("\n"),
    });
  }
}

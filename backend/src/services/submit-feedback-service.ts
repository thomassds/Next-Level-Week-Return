import { MailAdapter } from "../adpters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackServiceRequest {
    type: string,
    comment: string,
    screenshot?: string
}

export class SubmitFeedbackService {    
    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
    ) {}

    async execute(request: SubmitFeedbackServiceRequest) {
        const { type, comment, screenshot } = request;

        if(!type) {
            throw new Error("Type is required");
        }

        if(!comment) {
            throw new Error("Comment is required");
        }

        if(screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format.');
        }

        const feedback = await this.feedbacksRepository.create({
            type,
            comment,
            screenshot
        })

        await this.mailAdapter.sendMail({
            subject: "Novo Feedback",
            body: [
				`<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; font-family: sans-serif; font-size: 16px; color: #111;">`,
					`<p>Tipo do Feedback: ${type}</p>`,
					`<p>Comentario: ${comment}</p>`,
                    screenshot ? `<img src="${screenshot}" />` : ' ',
				`</div>`
			].join('\n')
        })

        return feedback;
    }
}
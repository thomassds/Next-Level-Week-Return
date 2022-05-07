import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface GetFeedbackServiceRequest {
    type: string,
    comment: string,
    screenshot?: string
}

export class GetFeedbackService {    
    constructor(
        private feedbacksRepository: FeedbacksRepository,
    ) {}
        async execute() {
            const response = this.feedbacksRepository.indexAll();

            return response;
        }    
}
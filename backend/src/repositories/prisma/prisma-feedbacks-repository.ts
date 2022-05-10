import { prisma } from "../../prisma";
import {
  FeedbackCreationData,
  FeedbackReturnData,
  FeedbacksRepository,
} from "../feedbacks-repository-interface";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create({
    type,
    comment,
    screenshot,
  }: FeedbackCreationData): Promise<FeedbackReturnData> {
    const feedback = await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      },
    });

    return feedback;
  }
}

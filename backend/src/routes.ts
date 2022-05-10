import express from "express";
import { SubmitFeedbackUseCase } from "./services/submit-feedback-use-case";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma-feedbacks-repository";
import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailer-mail-adapter";
import { SendgridMailAdapter } from "./adapters/sendgrid/sendgrid-mail-adapter";

export const routes = express.Router();

routes.post("/feedbacks/create", async (request, response) => {
  const { type, comment, screenshot } = request.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();
  const sendgridMailAdapter = new SendgridMailAdapter();

  const submitFeedbackService = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
  );

  await submitFeedbackService.execute({
    type,
    comment,
    screenshot,
  });

  return response.status(201).send();
});

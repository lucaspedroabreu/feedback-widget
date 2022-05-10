import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";
import { FeedbackReturnData } from "../repositories/feedbacks-repository-interface";

const createFeedbackSpy = jest.fn(async () => {
  return {} as FeedbackReturnData;
});
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
  it("should be able to submit a new feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "example comment",
        screenshot: "data:image/png;base64",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should be able to submit a new feedback without screenshot", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "example comment",
      })
    ).resolves.not.toThrow();
  });

  it("should not be able to submit a new feedback without type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "Hello",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a new feedback without comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a new feedback with inexistent feedback type", async () => {
    await expect(
      submitFeedback.execute({
        type: "AWKWARD",
        comment: "This should not be a valid feedback",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a new feedback with invalid screenshot type", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "Essa screenshot tá bugada",
        screenshot: "test.jpg",
      })
    ).rejects.toThrow();
  });
});

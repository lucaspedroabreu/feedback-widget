import { ArrowLeft, Camera } from 'phosphor-react'
import { FormEvent, useState } from 'react'
import { FeedbackType, feedbackTypes } from '.'
import { CloseButton } from '../CloseButton'
import { ScreenshotButton } from './ScreenshotButton'

interface FormFeedbackContentProps {
  feedbackType: FeedbackType
  resetFeedback: () => void
  onFeedbackSubmission: () => void
}

export function FormFeedbackContent({ feedbackType, resetFeedback, onFeedbackSubmission }: FormFeedbackContentProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [feedbackComment, setFeedbackComment] = useState('')

  const feedbackObject = feedbackTypes[feedbackType]

  function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault()

    console.log({
      screenshot,
      feedbackComment,
    })
  }

  return (
    <>
      <header>
        <button type="button" onClick={resetFeedback} className="feedback-back-button">
          <ArrowLeft weight="bold" className="h-4 w-4" />
        </button>
        <span className="flex items-center gap-2 text-xl leading-6">
          <img src={feedbackObject.image.source} alt={feedbackObject.image.alt} className="h-6 w-6" />
          {feedbackObject.title}
        </span>

        <CloseButton />
      </header>

      <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
        <textarea
          className="feedback-textarea"
          placeholder="Conte em detalhes o que está acontecendo..."
          onChange={(event) => setFeedbackComment(event.target.value)}
        />

        <footer className="mt-2 flex gap-2">
          <ScreenshotButton onScreenshotRequest={setScreenshot} screenshot={screenshot} />

          <button
            type="submit"
            onClick={onFeedbackSubmission}
            className="feedback-submit-button disabled:opacity-50 disabled:hover:bg-brand-standard"
            disabled={feedbackComment.length === 0}
          >
            Enviar Feedback
          </button>
        </footer>
      </form>
    </>
  )
}

import { ArrowLeft, Camera } from 'phosphor-react'
import { FormEvent, useState } from 'react'
import { FeedbackType, feedbackTypes } from '.'
import { api } from '../../../lib/api'
import { Loading } from '../../Loading'
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
  const [isSendingFeedback, setIsSendingFeedback] = useState(false)

  const feedbackCategory = feedbackTypes[feedbackType]

  async function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault()

    console.log({
      screenshot,
      feedbackComment,
    })

    try {
      setIsSendingFeedback(true)
      await api.post('/feedbacks/create', {
        type: feedbackType,
        comment: feedbackComment,
        screenshot: screenshot,
      })
    } catch (error) {
      setIsSendingFeedback(false)
      console.warn(error)
    } finally {
      setIsSendingFeedback(false)
      onFeedbackSubmission()
    }
  }

  return (
    <>
      <header>
        <button type="button" onClick={resetFeedback} className="feedback-back-button" disabled={isSendingFeedback}>
          <ArrowLeft weight="bold" className="h-4 w-4" />
        </button>
        <span className="flex items-center gap-2 text-xl leading-6">
          <img src={feedbackCategory.image.source} alt={feedbackCategory.image.alt} className="h-6 w-6" />
          {feedbackCategory.title}
        </span>

        <CloseButton />
      </header>

      <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
        <textarea
          contentEditable={!isSendingFeedback}
          disabled={isSendingFeedback}
          className="feedback-textarea"
          placeholder="Conte em detalhes o que está acontecendo..."
          onChange={(event) => setFeedbackComment(event.target.value)}
        />

        <footer className="mt-2 flex gap-2">
          <ScreenshotButton onScreenshotRequest={setScreenshot} screenshot={screenshot} />

          <button
            type="submit"
            onClick={handleSubmitFeedback}
            className="feedback-submit-button disabled:opacity-50 disabled:hover:bg-brand-standard"
            disabled={isSendingFeedback || feedbackComment.length === 0}
          >
            {isSendingFeedback ? <Loading /> : 'Enviar Feedback'}
          </button>
        </footer>
      </form>
    </>
  )
}

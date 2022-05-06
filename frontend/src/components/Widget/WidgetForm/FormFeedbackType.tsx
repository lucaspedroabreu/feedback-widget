import { FeedbackType, feedbackTypes } from '.'
import { CloseButton } from '../CloseButton'

interface FormFeedbackTypeProps {
  onFeedbackSelection: (type: FeedbackType) => void
}

export function FormFeedbackType({
  onFeedbackSelection,
}: FormFeedbackTypeProps) {
  return (
    <>
      <header>
        <span className="text-xl leading-6">Deixe seu feedback</span>

        <CloseButton />
      </header>
      <div className="flex w-full gap-2 py-8">
        {Object.entries(feedbackTypes).map(([key, value]) => {
          return (
            <button
              key={key}
              className="feedback-type-button"
              onClick={() => onFeedbackSelection(key as FeedbackType)}
              type="button"
            >
              <img src={value.image.source} alt={value.image.alt} />
              <span>{value.title}</span>
            </button>
          )
        })}
      </div>
    </>
  )
}

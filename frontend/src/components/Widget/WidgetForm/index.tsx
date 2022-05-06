import React, { useState } from 'react'

import bugImageUrl from '../../../assets/img/bug.svg'
import lightbulbImageUrl from '../../../assets/img/lightBulb.svg'
import thoughtcloudImageUrl from '../../../assets/img/thoughtCloud.svg'
import { FormFeedbackType } from './FormFeedbackType'
import { FormFeedbackContent } from './FormFeedbackContent'
import { FormSubmissionSuccess } from './FormSubmissionSuccess'

export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugImageUrl,
      alt: 'Imagem de um bug',
    },
  },
  IDEA: {
    title: 'Ideia',
    image: {
      source: lightbulbImageUrl,
      alt: 'Imagem de uma lâmpada',
    },
  },
  OTHER: {
    title: 'Outro',
    image: {
      source: thoughtcloudImageUrl,
      alt: 'Imagem de um balão de pensamento',
    },
  },
}

export type FeedbackType = keyof typeof feedbackTypes

export function WidgetForm() {
  const [userFeedbackType, setUserFeedbackType] = useState<FeedbackType | null>(null)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)

  function handleResetFeedback() {
    setFeedbackSubmitted(false)
    setUserFeedbackType(null)
  }

  return (
    <div className="feedback-widget-form">
      {feedbackSubmitted ? (
        <FormSubmissionSuccess resetFeedback={handleResetFeedback} />
      ) : !userFeedbackType ? (
        <FormFeedbackType onFeedbackSelection={setUserFeedbackType} />
      ) : (
        <FormFeedbackContent
          resetFeedback={handleResetFeedback}
          feedbackType={userFeedbackType}
          onFeedbackSubmission={() => setFeedbackSubmitted(true)}
        />
      )}

      <footer className="text-xs text-darkTheme-textSecondary">
        Feito com ♥ pela{' '}
        <a
          className="underline underline-offset-2 focus:rounded-sm focus:border-2 focus:border-brand-hover focus:outline-none"
          href="https://solar-check.vercel.app/"
        >
          SolarCheck
        </a>
      </footer>
    </div>
  )
}

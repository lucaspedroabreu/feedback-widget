import React from 'react'
import { CloseButton } from '../CloseButton'
import okImageUrl from '../../../assets/img/ok.svg'

interface FormSubmissionSuccessProps {
  resetFeedback: () => void
}

export function FormSubmissionSuccess({ resetFeedback }: FormSubmissionSuccessProps) {
  return (
    <>
      <header>
        <CloseButton />
      </header>

      <main className="flex w-[304px] flex-col items-center py-10">
        <img src={okImageUrl} alt="Feedback enviado com sucesso" />

        <span className="mt-2 text-xl">Agradecemos o seu feedback!</span>

        <button
          type="button"
          onClick={resetFeedback}
          className="custom-button-focus mt-6 rounded-md border-transparent bg-zinc-800 py-2 px-6 text-sm leading-6 transition-colors hover:bg-zinc-700"
        >
          Quero enviar outro
        </button>
      </main>
    </>
  )
}

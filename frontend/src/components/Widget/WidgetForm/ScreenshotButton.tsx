import html2canvas from 'html2canvas'
import { Camera, Trash } from 'phosphor-react'
import { useState } from 'react'
import { Loading } from '../../Loading'

interface ScreenshotButtonProps {
  screenshot: string | null
  onScreenshotRequest: (screenshot: string | null) => void
}

export function ScreenshotButton({ onScreenshotRequest, screenshot }: ScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false)

  async function handleScreenshotRequest() {
    setIsTakingScreenshot(true)

    const canvas = await html2canvas(document.querySelector('html')!)
    const base64image = canvas.toDataURL('image/png')

    console.log(base64image)
    onScreenshotRequest(base64image)
    setIsTakingScreenshot(false)
  }

  if (screenshot) {
    return (
      <button
        type="button"
        className="text:zinc-400 flex h-10 w-10 items-end justify-end rounded-md border-transparent p-1 transition-colors hover:text-zinc-100"
        onClick={() => onScreenshotRequest(null)}
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: 'right bottom',
          backgroundSize: 180,
        }}
      >
        <Trash weight="fill" />
      </button>
    )
  }

  return (
    <button type="button" onClick={handleScreenshotRequest} className="feedback-screenshot-button">
      {isTakingScreenshot ? <Loading /> : <Camera className="h-6 w-6" />}
    </button>
  )
}

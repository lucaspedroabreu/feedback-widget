import { Popover } from '@headlessui/react'
import { ChatTeardropDots } from 'phosphor-react'
import { useState } from 'react'
import { WidgetForm } from './WidgetForm'

export function Widget() {
  return (
    <Popover className="absolute bottom-5 right-5 flex flex-col items-end">
      <Popover.Panel>
        <WidgetForm />
      </Popover.Panel>
      <Popover.Button className="feedback-widget-popover-button group">
        <ChatTeardropDots className="h-6 w-6" />

        <span className="max-w-0 overflow-hidden transition-all duration-500 ease-linear group-hover:max-w-sm">
          Feedback
        </span>
      </Popover.Button>
    </Popover>
  )
}

import { Popover } from '@headlessui/react'
import { X } from 'phosphor-react'

export function CloseButton() {
  return (
    <Popover.Button className="absolute top-5 right-5 text-darkTheme-textSecondary hover:text-darkTheme-textPrimary focus:rounded-sm focus:border-2 focus:border-brand-hover focus:outline-none">
      <X className="h-4 w-4" weight="bold" />
    </Popover.Button>
  )
}

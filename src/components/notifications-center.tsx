import { BellRing } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function NotificationsCenter() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <BellRing className="size-6 cursor-pointer shadow-lg" />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem>hey</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

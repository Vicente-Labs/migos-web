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
      <DropdownMenuTrigger className="flex items-center justify-center rounded-full bg-border/20 p-2 text-muted-foreground transition-colors hover:bg-border/40 hover:text-foreground">
        <BellRing className="size-6 cursor-pointer" />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem>hey</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

import { UserRoundCog } from 'lucide-react'

import type { User } from '@/types/user'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export default function AvatarHeader({ user }: { user: User }) {
  if (!user) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-12 cursor-pointer border-2 border-primary shadow-black/30 shadow-lg">
          {user.avatarUrl ? (
            <AvatarImage src={user.avatarUrl} />
          ) : (
            <AvatarFallback>
              {user.name
                .split(' ')
                .map((name) => name[0])
                .join('')}
            </AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="center" className="mr-2 mt-2">
        <DropdownMenuItem className="text-neutral-600 cursor-pointer">
          <UserRoundCog className="size-4 mr-2" />
          Profile configuration
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

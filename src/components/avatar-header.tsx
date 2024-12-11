'use client'

import { LogOut, UserRoundCog } from 'lucide-react'

import { logout } from '@/actions/auth/logout'
import { useLanguage } from '@/context/language'
import type { User } from '@/types/user'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export default function AvatarHeader({ user }: { user: User }) {
  const { language } = useLanguage()

  if (!user) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-12 cursor-pointer shadow-black/30 shadow-lg transition-all duration-300 hover:shadow-black/50">
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

        <DropdownMenuItem
          className="text-neutral-600 cursor-pointer"
          onSelect={() => {
            logout(language)
          }}
        >
          <LogOut className="size-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

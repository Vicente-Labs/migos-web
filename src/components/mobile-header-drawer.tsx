'use client'

import { Button } from './ui/button'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from './ui/drawer'

type MobileHeaderDrawerProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  navLinks: { href: string; label: string }[]
  authLinks: { href: string; label: string; variant: 'outline' | 'default' }[]
}

export function MobileHeaderDrawer({
  isOpen,
  setIsOpen,
  navLinks,
  authLinks,
}: MobileHeaderDrawerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="pb-12">
        <DrawerHeader>
          <DrawerTitle className="font-cooperBlack text-3xl font-semibold text-center">
            migos
          </DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-row gap-4 items-center justify-center">
          {navLinks.map((a) => (
            <Button variant="outline" className="text-xl font-medium">
              {a.label}
            </Button>
          ))}

          <div className="bg-muted h-2 w-2 rounded-full" />

          {authLinks.map((link) => (
            <Button variant={link.variant} className="text-xl font-medium">
              {link.label}
            </Button>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

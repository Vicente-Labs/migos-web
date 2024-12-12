'use client'

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from './ui/drawer'

type MobileHeaderDrawerProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export function MobileHeaderDrawer({
  isOpen,
  setIsOpen,
}: MobileHeaderDrawerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="font-cooperBlack text-3xl font-semibold text-center">
            migos
          </DrawerTitle>
        </DrawerHeader>
        {/* WHAT STRUCTURE SHOULD I USE HERE? */}
      </DrawerContent>
    </Drawer>
  )
}

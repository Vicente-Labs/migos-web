'use client'

import { motion } from 'framer-motion'
import { Loader2, ShuffleIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useLanguage } from '@/context/language'
import { animations } from '@/utils/animations'

type ConfirmDrawParticipantsModalProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  isLoading?: boolean
}

export function ConfirmDrawParticipantsModal({
  isOpen,
  onOpenChange,
  onConfirm,
  isLoading,
}: ConfirmDrawParticipantsModalProps) {
  const { dictionary } = useLanguage()

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <motion.div
          variants={animations.container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-4"
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShuffleIcon className="h-5 w-5 text-primary" />
              {dictionary.drawParticipants}
            </DialogTitle>
            <DialogDescription>
              {dictionary.drawParticipantsDescription}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="gap-2 sm:gap-0 w-full">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              {dictionary.cancel}
            </Button>

            <Button
              onClick={onConfirm}
              disabled={isLoading}
              className="gap-2 w-full"
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              {dictionary.drawParticipants}
            </Button>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}

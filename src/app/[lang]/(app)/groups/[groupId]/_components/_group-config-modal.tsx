'use client'

import { motion } from 'framer-motion'
import { CogIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useLanguage } from '@/context/language'
import type { Group } from '@/http/groups/get-group'
import { animations } from '@/utils/animations'

interface GroupsConfigModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  group: Group | undefined
}

export function GroupsConfigModal({
  isOpen,
  onOpenChange,
  group,
}: GroupsConfigModalProps) {
  const { dictionary } = useLanguage()
  const defaultDate = new Date().toISOString().split('T')[0]

  const [formData, setFormData] = useState({
    name: group?.name ?? '',
    budget: group?.budget ?? 0,
    description: group?.description ?? '',
    drawDate: group?.drawDate
      ? new Date(group.drawDate).toISOString().split('T')[0]
      : defaultDate,
    giftingDate: group?.endDate
      ? new Date(group.endDate).toISOString().split('T')[0]
      : defaultDate,
  })
  const [nameError, setNameError] = useState(false)

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (field === 'name') setNameError(false)
  }

  const handleSubmit = () => {
    if (!formData.name) {
      setNameError(true)
      return
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <motion.div
          variants={animations.container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-4"
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CogIcon className="h-5 w-5 text-primary" />
              {dictionary.groupsConfig}
            </DialogTitle>
            <DialogDescription>
              {dictionary.groupsConfigDescription}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label>{dictionary.groupName}</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={nameError ? 'border-destructive' : ''}
                  placeholder={dictionary.groupName}
                />
                {nameError && (
                  <p className="text-destructive text-sm mt-1">
                    {dictionary.thisFieldIsRequired}
                  </p>
                )}
              </div>

              <div>
                <Label>{dictionary.budget}</Label>
                <Input
                  type="number"
                  value={formData.budget}
                  onChange={(e) => handleChange('budget', e.target.value)}
                  placeholder={dictionary.budget}
                />
              </div>

              <div>
                <Label>{dictionary.description}</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="resize-none"
                  rows={4}
                  placeholder={dictionary.description}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>{dictionary.drawDate}</Label>
                <Input
                  type="date"
                  value={formData.drawDate}
                  onChange={(e) => handleChange('drawDate', e.target.value)}
                />
              </div>

              <div>
                <Label>{dictionary.giftingDate}</Label>
                <Input
                  type="date"
                  value={formData.giftingDate}
                  onChange={(e) => handleChange('giftingDate', e.target.value)}
                />
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-row gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {dictionary.cancel}
            </Button>
            <Button onClick={handleSubmit}>{dictionary.save}</Button>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}

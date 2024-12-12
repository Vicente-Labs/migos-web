import { motion } from 'framer-motion'
import { CalendarIcon, ChevronDown } from 'lucide-react'
import * as React from 'react'
import type { UseFormReturn } from 'react-hook-form'

import { cn } from '@/lib/utils'

import type { FormValues } from './new-group-modal'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

const animations = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  },
}

export function NewGroupFormFields({
  form,
  step,
}: {
  form: UseFormReturn<FormValues>
  step: 1 | 2
}) {
  const today = new Date()

  switch (step) {
    case 1:
      return (
        <motion.div
          variants={animations.container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={animations.item}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your group name"
                      autoComplete="off"
                      autoFocus
                      maxLength={50}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div variants={animations.item}>
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group budget</FormLabel>
                  <FormControl>
                    <div className="relative flex gap-2">
                      <FormField
                        control={form.control}
                        name="currency"
                        render={({ field: currencyField }) => (
                          <Select
                            defaultValue="USD"
                            onValueChange={currencyField.onChange}
                          >
                            <SelectTrigger className="w-[70px] gap-2 bg-card border border-primary rounded-md flex flex-row items-center justify-center p-2">
                              <SelectValue placeholder="$" />
                              <ChevronDown className="size-4 text-accent-foreground" />
                            </SelectTrigger>
                            <SelectContent className="w-fit p-0" align="center">
                              <SelectItem value="USD">$</SelectItem>
                              <SelectItem value="EUR">€</SelectItem>
                              <SelectItem value="BRL">R$</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      <Input
                        {...field}
                        placeholder="Enter budget amount"
                        type="number"
                        min={0}
                        step={0.01}
                        inputMode="decimal"
                        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    This is the suggested budget per person for gift exchanges
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
        </motion.div>
      )
    case 2:
      return (
        <motion.div
          variants={animations.container}
          initial="hidden"
          animate="show"
          className="flex flex-row gap-2 items-center justify-between w-full"
        >
          <motion.div variants={animations.item} className="w-full">
            <FormField
              control={form.control}
              name="drawDate"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel>Draw date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            <span>{field.value.toDateString()}</span>
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => {
                          const endDate = form.getValues('endDate')
                          return date < today || (endDate && date > endDate)
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div variants={animations.item} className="w-full">
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col items-end w-full">
                  <FormLabel>Gift exchanges date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            <span>{field.value.toDateString()}</span>
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => {
                          const drawDate = form.getValues('drawDate')

                          return date < today || (drawDate && date <= drawDate)
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
        </motion.div>
      )
  }
}

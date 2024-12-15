import { motion } from 'framer-motion'
import {
  BellIcon,
  EyeIcon,
  GiftIcon,
  HandHeart,
  PencilIcon,
} from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useLanguage } from '@/context/language'
import type { GetGroup200 } from '@/http/groups/get-group'
import { animations } from '@/utils/animations'

export function GroupInfo({
  data,
  isPending,
}: {
  data: GetGroup200 | undefined
  isPending: boolean
}) {
  const { dictionary } = useLanguage()

  return (
    <div className="w-full lg:w-3/4 flex flex-col gap-4">
      <motion.div
        variants={animations.item}
        className="flex flex-col lg:flex-row gap-4"
      >
        <Card className="w-full lg:w-2/3 shadow-md rounded-lg h-[140px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 h-[48px]">
            <CardTitle className="font-poppins text-sm flex items-center gap-2">
              <GiftIcon className="h-4 w-4 text-primary" />
              {dictionary.giftBudgetLimit}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => toast.info(dictionary.weAreWorkingOnItRightNow)}
            >
              <PencilIcon className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-3 h-[92px]">
            <div className="flex flex-col items-end gap-1">
              {isPending ? (
                <div className="flex flex-col items-end gap-2">
                  <Skeleton className="h-8 w-[150px]" />
                  <Skeleton className="h-3 w-[200px]" />
                </div>
              ) : (
                <>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-semibold tracking-tight">
                      R$ {data?.group.budget?.toLocaleString() ?? 0}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      /{dictionary.perPerson}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {dictionary.setABudgetToHelpGuideGiftChoices}
                  </span>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="w-full lg:w-1/3 shadow-md rounded-lg h-[140px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 h-[48px]">
            <CardTitle className="font-poppins text-sm flex items-center gap-2">
              <HandHeart className="h-4 w-4 text-primary" />
              {dictionary.secretMatch}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 h-[92px]">
            {isPending ? (
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-8 w-full" />
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <p className="text-xs text-muted-foreground">
                  {dictionary.findOutWhoToGift}
                </p>
                <Button
                  id="view-my-match"
                  variant="default"
                  className="w-full gap-2 h-8 text-xs"
                  onClick={() =>
                    toast.info(dictionary.weAreWorkingOnItRightNow)
                  }
                >
                  <EyeIcon className="h-4 w-4" />
                  {dictionary.viewMyMatch}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={animations.item}>
        <Card className="w-full shadow-md rounded-lg h-[140px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 h-[48px]">
            <CardTitle className="font-poppins text-sm flex items-center gap-2">
              <BellIcon className="h-4 w-4 text-primary" />
              {dictionary.announcements}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 h-[92px]">
            {isPending ? (
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-8 w-full" />
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">
                No announcements yet. Stay tuned for updates from the group
                owner.
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

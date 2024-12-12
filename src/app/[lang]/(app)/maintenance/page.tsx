'use client'

import { motion } from 'framer-motion'

import { useLanguage } from '@/context/language'

export default function Maintenance() {
  const { dictionary } = useLanguage()

  return (
    <motion.main className="font-cooperBlack p-5 sm:p-6 lg:p-8 2xl:p-10 flex flex-col justify-center items-center min-h-[80vh] rounded-lg shadow-lg">
      <motion.h1
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-primary"
      >
        {dictionary.maintenance_title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-4 text-lg text-gray-700 text-center font-poppins font-medium"
      >
        {dictionary.maintenance_description}
      </motion.p>
    </motion.main>
  )
}

'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import * as Icons from 'lucide-react'
import type { Course } from '@/types'

const gradients = [
  'from-violet-900/40 via-zinc-900 to-zinc-900',
  'from-blue-900/40 via-zinc-900 to-zinc-900',
  'from-emerald-900/40 via-zinc-900 to-zinc-900',
  'from-rose-900/40 via-zinc-900 to-zinc-900',
]

export default function CourseTile({ course, index }: { course: Course; index: number }) {
  const Icon = (Icons as any)[course.icon_name] ?? Icons.BookOpen
  const [width, setWidth] = useState(0)
  const gradient = gradients[index % gradients.length]

  useEffect(() => {
    const t = setTimeout(() => setWidth(course.progress), 400)
    return () => clearTimeout(t)
  }, [course.progress])

  return (
    <motion.article
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`relative rounded-2xl p-5 bg-gradient-to-br ${gradient}
                 border border-zinc-800 hover:border-violet-500/40
                 hover:shadow-[0_0_30px_rgba(139,92,246,0.12)]
                 transition-all overflow-hidden cursor-pointer`}
    >
      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />

      {/* Glow */}
      <div className="absolute -top-6 -right-6 w-20 h-20 bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10">
        <div className="w-10 h-10 rounded-xl bg-zinc-800/80 flex items-center justify-center mb-4">
          <Icon className="w-5 h-5 text-violet-400" />
        </div>
        <h3 className="text-sm font-semibold text-white mb-1 leading-snug">{course.title}</h3>
        <p className="text-xs text-zinc-500 mb-4">{course.progress}% complete</p>
        <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-violet-500 to-indigo-400 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${width}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </div>
      </div>
    </motion.article>
  )
}
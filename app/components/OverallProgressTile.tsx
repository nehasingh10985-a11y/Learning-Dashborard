'use client'
import { motion } from 'framer-motion'
import ProgressRing from './ProgressRing'
import type { Course } from '@/types'

export default function OverallProgressTile({ courses }: { courses: Course[] }) {
  const avg = Math.round(
    courses.reduce((sum, c) => sum + c.progress, 0) / (courses.length || 1)
  )

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="relative rounded-2xl p-6 bg-zinc-900/80 border border-zinc-800
                 hover:border-violet-500/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]
                 transition-all overflow-hidden col-span-full lg:col-span-1"
    >
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />
      <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-violet-600/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10">
        <h2 className="text-sm font-semibold text-white mb-1">Overall Progress</h2>
        <p className="text-xs text-zinc-500 mb-5">Across all active courses</p>

        <div className="flex items-center gap-5">
          <ProgressRing progress={avg} size={90} />
          <div className="flex-1">
            {courses.map((c) => (
              <div key={c.id} className="mb-2">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-zinc-400 truncate max-w-[120px]">{c.title}</span>
                  <span className="text-xs text-zinc-500">{c.progress}%</span>
                </div>
                <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-violet-500 to-indigo-400 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${c.progress}%` }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
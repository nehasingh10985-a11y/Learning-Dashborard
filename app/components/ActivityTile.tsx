'use client'
import { motion } from 'framer-motion'

const weeks = Array.from({ length: 15 }, () =>
  Array.from({ length: 7 }, () => Math.floor(Math.random() * 5))
)

const colors = ['#1f1f23', '#3b1f6e', '#5b21b6', '#7c3aed', '#a78bfa']

export default function ActivityTile() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.15 }}
      className="rounded-2xl p-6 bg-zinc-900 border border-zinc-800 col-span-full lg:col-span-2"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-white">Learning Activity</h2>
        <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded-lg">Last 15 weeks</span>
      </div>

      <div className="flex gap-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((val, di) => (
              <motion.div
                key={di}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: wi * 0.03 + di * 0.01 }}
                className="w-3.5 h-3.5 rounded-sm"
                style={{ backgroundColor: colors[val] }}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-3">
        <span className="text-xs text-zinc-500">Less</span>
        {colors.map((c, i) => (
          <div key={i} className="w-3 h-3 rounded-sm" style={{ backgroundColor: c }} />
        ))}
        <span className="text-xs text-zinc-500">More</span>
      </div>
    </motion.section>
  )
}
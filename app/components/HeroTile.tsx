'use client'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'
import { Flame, Trophy, Clock, TrendingUp } from 'lucide-react'

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { stiffness: 80, damping: 20 })
  const display = useTransform(spring, (v) => `${Math.round(v)}${suffix}`)

  useEffect(() => { motionVal.set(value) }, [value])

  return <motion.span>{display}</motion.span>
}

const stats = [
  { icon: Flame, value: 7, suffix: '', label: 'Streak', color: 'text-orange-400', bg: 'bg-orange-500/10' },
  { icon: Trophy, value: 12, suffix: '', label: 'Badges', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  { icon: Clock, value: 48, suffix: 'h', label: 'Learned', color: 'text-blue-400', bg: 'bg-blue-500/10' },
]

export default function HeroTile() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative rounded-2xl p-6 overflow-hidden border border-zinc-800
                 bg-gradient-to-br from-violet-950/50 via-zinc-900 to-zinc-900
                 col-span-full lg:col-span-1"
    >
      {/* Glow */}
      <div className="absolute -top-10 -left-10 w-48 h-48 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-zinc-400">Active learner</span>
          <div className="ml-auto flex items-center gap-1 bg-violet-500/10 border border-violet-500/20 rounded-lg px-2 py-1">
            <TrendingUp className="w-3 h-3 text-violet-400" />
            <span className="text-xs text-violet-400">+12% this week</span>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white mb-1">Neha</h2>
        <p className="text-zinc-400 text-sm mb-6">Keep up the great work! 🚀</p>

        <div className="grid grid-cols-3 gap-2">
          {stats.map(({ icon: Icon, value, suffix, label, color, bg }) => (
            <div key={label} className={`${bg} rounded-xl p-3 text-center border border-zinc-800/50`}>
              <Icon className={`w-4 h-4 ${color} mx-auto mb-1`} />
              <p className={`font-bold text-sm ${color}`}>
                <AnimatedCounter value={value} suffix={suffix} />
              </p>
              <p className="text-zinc-500 text-xs">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
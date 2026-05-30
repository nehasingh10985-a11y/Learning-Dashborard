'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, BookOpen, BarChart3,
  Settings, ChevronLeft, Zap
} from 'lucide-react'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'courses', label: 'Courses', icon: BookOpen },
  { id: 'statistics', label: 'Statistics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  const [active, setActive] = useState('dashboard')
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      {/* Desktop + Tablet Sidebar */}
      <motion.nav
        animate={{ width: collapsed ? 68 : 220 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="hidden md:flex flex-col bg-zinc-950 border-r border-zinc-800/60 p-3 shrink-0 overflow-hidden"
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-2 mb-8 mt-1">
          <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 text-white" />
          </div>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-bold text-white text-sm"
            >
              LearnOS
            </motion.span>
          )}
        </div>

        {/* Nav Items */}
        <ul className="flex flex-col gap-1 flex-1">
          {navItems.map(({ id, label, icon: Icon }) => (
            <li key={id}>
              <button
                onClick={() => setActive(id)}
                className="relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors group"
              >
                {active === id && (
                  <motion.div
                    layoutId="nav-highlight"
                    className="absolute inset-0 bg-violet-500/10 rounded-xl border border-violet-500/20"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className={`w-4 h-4 relative z-10 shrink-0 transition-colors
                  ${active === id ? 'text-violet-400' : 'text-zinc-500 group-hover:text-zinc-300'}`}
                />
                {!collapsed && (
                  <span className={`relative z-10 transition-colors
                    ${active === id ? 'text-white font-medium' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                    {label}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Collapse Button — only on desktop */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex items-center justify-center w-full p-2 rounded-xl
                     hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 transition-colors mt-2"
        >
          <motion.div animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronLeft className="w-4 h-4" />
          </motion.div>
        </button>
      </motion.nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur-lg border-t border-zinc-800 px-4 py-2">
        <ul className="flex items-center justify-around">
          {navItems.map(({ id, label, icon: Icon }) => (
            <li key={id}>
              <button
                onClick={() => setActive(id)}
                className="relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors"
              >
                {active === id && (
                  <motion.div
                    layoutId="mobile-nav-highlight"
                    className="absolute inset-0 bg-violet-500/10 rounded-xl"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className={`w-5 h-5 relative z-10 transition-colors
                  ${active === id ? 'text-violet-400' : 'text-zinc-500'}`}
                />
                <span className={`text-[10px] relative z-10 transition-colors
                  ${active === id ? 'text-violet-400' : 'text-zinc-500'}`}>
                  {label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
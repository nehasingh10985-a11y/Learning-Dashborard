import { supabase } from '@/lib/supabase'
import { Suspense } from 'react'
import Sidebar from '@/components/Sidebar'
import HeroTile from '@/components/HeroTile'
import ActivityTile from '@/components/ActivityTile'
import CourseGrid from '@/components/CourseGrid'
import OverallProgressTile from '@/components/OverallProgressTile'
import { Search, Bell } from 'lucide-react'

export default async function Dashboard() {
  const { data: courses, error } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: true })

  return (
    <div className="flex h-screen bg-[#09090b] overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]
                      bg-violet-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px]
                      bg-indigo-600/8 rounded-full blur-[100px] pointer-events-none z-0" />

      <Sidebar />

      <main className="flex-1 overflow-y-auto relative z-10 pb-24 md:pb-0">
        <header className="sticky top-0 z-20 bg-[#09090b]/80 backdrop-blur-xl border-b border-zinc-800/50 px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search courses, topics..."
                className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl
                           pl-10 pr-4 py-2 text-sm text-zinc-300 placeholder:text-zinc-600
                           focus:outline-none focus:border-violet-500/50 focus:bg-zinc-900
                           transition-all"
              />
            </div>
            <div className="flex items-center gap-3 ml-auto">
              <button className="relative w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800
                                 flex items-center justify-center hover:border-zinc-700 transition-colors">
                <Bell className="w-4 h-4 text-zinc-400" />
                <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-violet-500 rounded-full" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600
                                flex items-center justify-center text-sm font-bold shadow-lg shadow-violet-500/20">
                  N
                </div>
                <div className="hidden md:block">
                  <p className="text-xs font-medium text-white leading-none">Neha</p>
                  <p className="text-[10px] text-zinc-500 mt-0.5">Pro Plan</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-6 lg:p-8">
          <div className="mb-6">
            <p className="text-zinc-500 text-sm">Good evening ✨</p>
            <h1 className="text-2xl md:text-3xl font-bold text-white mt-0.5">
              Welcome back, Neha 👋
            </h1>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
            <HeroTile />
            <ActivityTile />
            <OverallProgressTile courses={courses ?? []} />

            <Suspense fallback={
              <div className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-40 rounded-2xl bg-zinc-900 animate-pulse border border-zinc-800" />
                ))}
              </div>
            }>
              {error ? (
                <div className="col-span-full rounded-2xl bg-red-950/30 border border-red-800/50 p-6 text-red-400">
                  ⚠️ Failed to load courses from database.
                </div>
              ) : (
                <CourseGrid courses={courses ?? []} />
              )}
            </Suspense>
          </section>
        </div>
      </main>
    </div>
  )
}
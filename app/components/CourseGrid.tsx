'use client'
import { motion } from 'framer-motion'
import CourseTile from './CourseTile'
import type { Course } from '@/types'

export default function CourseGrid({ courses }: { courses: Course[] }) {
  return (
    <>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="col-span-full flex items-center justify-between mt-2"
      >
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Active Courses</h2>
        <span className="text-xs text-violet-400 cursor-pointer hover:text-violet-300 transition-colors">View all →</span>
      </motion.div>

      {courses.map((course, i) => (
        <motion.div
          key={course.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.25 + i * 0.1 }}
        >
          <CourseTile course={course} index={i} />
        </motion.div>
      ))}
    </>
  )
}
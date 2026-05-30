export default function Loading() {
  return (
    <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-36 rounded-2xl bg-zinc-900 animate-pulse" />
      ))}
    </div>
  )
}
export default function SkeletonTile({ count = 4 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-36 rounded-2xl bg-zinc-900 animate-pulse border border-zinc-800"
        />
      ))}
    </>
  )
}
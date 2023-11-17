export default function GroupTag({ group }: { group: string }) {
  return (
    <span className='absolute text-xs font-medium px-3 py-1 left-2 top-2 bg-white border border-white rounded-full'>
      {group}
    </span>
  )
}

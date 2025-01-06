import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'

const Chart = dynamic(
  () => import('react-chartjs-2').then((mod) => mod.Line),
  {
    loading: () => (
      <Skeleton className="h-[400px] w-full rounded-lg" />
    ),
    ssr: false,
  }
)

export function DynamicChart({ data }: { data: any }) {
  return (
    <div className="aspect-video w-full">
      <Chart data={data} />
    </div>
  )
}

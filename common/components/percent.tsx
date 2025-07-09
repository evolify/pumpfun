import { cn } from "@/lib/utils"

interface Props {
  value: number
  className?: string
}

export default function Percent(props: Props) {
  const { value, className } = props
  return (
    <span
      className={cn(
        "text-sm",
        value > 0 ? "text-green-200" : "text-red-200",
        className
      )}
    >
      {value.toFixed(1)}%
    </span>
  )
}

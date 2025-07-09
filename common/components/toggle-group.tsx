import {
  ToggleGroup as _ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useMobile } from "@/hooks/media"

interface Props {
  value: string
  onChange: (value: string) => void
  responsive?: boolean
  className?: string
  options: {
    label: string
    value: string
  }[]
}

export default function ToggleGroup(props: Props) {
  const { value, onChange, responsive = true, options } = props

  const isMobile = useMobile()
  if (isMobile && responsive) {
    return (
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }

  return (
    <_ToggleGroup
      type="single"
      variant="outline"
      value={value}
      onValueChange={onChange}
    >
      {options.map(option => (
        <ToggleGroupItem key={option.value} value={option.value}>
          {option.label}
        </ToggleGroupItem>
      ))}
    </_ToggleGroup>
  )
}

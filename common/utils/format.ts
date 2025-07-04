export function formatNumber(value: number) {
  if (value >= 1e9) {
    return `${(value / 1e9).toFixed(2)}B`
  } else if (value >= 1e6) {
    return `${(value / 1e6).toFixed(2)}M`
  } else if (value >= 1e3) {
    return `${(value / 1e3).toFixed(2)}K`
  } else {
    return `${value.toFixed(2)}`
  }
}

export function percent(numerator: number, denominator: number) {
  if (denominator === 0) {
    return "-"
  }
  return `${((numerator / denominator) * 100).toFixed(2)}%`
}

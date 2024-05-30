import dayjs from "dayjs"

export function formatMarketCap(val: number){
  if(val < 1000){
    return val.toFixed(2)
  }
  return (val / 1000).toFixed(2) + "k"
}

export function formatTime(time: number){
  return dayjs(time * 1000).format("MM-DD HH:mm")
}

export function formatAddress(addr: string){
  return addr.substring(0, 5) + "..." + addr.substr(-4)
}

export function formatPrice(price: number){
  return price.toFixed(8)
}

import { PumpCoin, PumpDetail } from "common/types"

const BASE_URL = 'https://ngapi.vercel.app/api/ngmg'

export async function getPumpList(): Promise<PumpCoin[]>{
  const res = await fetch(`${BASE_URL}/list`, {cache: "no-store"})
  const data = await res.json()
  if(data.code === 0){
    return data.data.rank
  }
  return []
}

export async function getPumpDetail(addr: string): Promise<PumpDetail>{
  const res = await fetch(`${BASE_URL}/detail?address=${addr}`)
  const data = await res.json()
  if(data.code === 0){
    return data.data.token
  }
}

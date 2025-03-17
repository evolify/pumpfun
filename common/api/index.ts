import { PumpCoin, PumpDetail } from "common/types"
import { withProxy } from "common/utils/env"

const proxy = process.env.PROXY

const BASE_URL = 'https://ngapi.vercel.app/api/ngmg'

export async function getPumpList(): Promise<PumpCoin[]>{
  const options = withProxy({ cache: "no-store"}) as unknown as RequestInit
  console.log(options)
  const res = await fetch(`${BASE_URL}/list`, options)
  const data = await res.json()
  return data.rank
}

export async function getPumpDetail(addr: string): Promise<PumpDetail>{
  const res = await fetch(`${BASE_URL}/detail?address=${addr}`)
  const data = await res.json()
  return data
}

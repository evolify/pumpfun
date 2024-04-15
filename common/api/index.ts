import { Coin } from "common/types"

const PAGE_SIZE = 50
const MIN_MC = 15 * 1000

function getUrl(offset: number) {
  return `https://client-api-2-74b1891ee9f9.herokuapp.com/coins?offset=${offset}&limit=${PAGE_SIZE}&sort=last_trade_timestamp&order=DESC&includeNsfw=false`
}

async function getList(page: number): Promise<Coin[]> {
  try {
    const res = await fetch(getUrl(page * PAGE_SIZE))
    return (await res.json()) || []
  } catch {
    return []
  }
}

export async function getData(pages = 3){
  const data: Coin[] = []
  for(let i = 0; i < pages; i++){
    console.log("--- load page", i+1)
    const list = await getList(i)
    list.forEach(t=>{
      if(t.complete) return
      if(t.usd_market_cap < MIN_MC) return
      data.push(t)
    })
  }
  return data.sort((a, b) => b.usd_market_cap - a.usd_market_cap)
}

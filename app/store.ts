import Store from "common/utils/store"
import { PumpCoin } from "common/types"
// import { getPumpList } from "common/api"


export const { state, update, use } = new Store({
  coin: null as PumpCoin,
  list: [] as PumpCoin[]
})

// export async function load() {
//   const list = await getPumpList()
//   update({ list })
// }

export function open(coin: PumpCoin){
  update({coin})
}

export function close(){
  update({coin: null})
}

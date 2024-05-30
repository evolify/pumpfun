import Store from "common/utils/store"
import { PumpCoin } from "common/types"


export const { state, update, use } = new Store({
  coin: null as PumpCoin
})

export function open(coin: PumpCoin){
  update({coin})
}

export function close(){
  update({coin: null})
}

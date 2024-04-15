import { Store } from "@evolify/tiny"
import { getData } from "common/api"
import { Coin } from "common/types"

const PAGES = 10

export const { state, update, use } = new Store({
  list: [] as Coin[],
  loading: true,
})

export async function load() {
  update({loading: true})
  const list = await getData(PAGES)
  update({
    list,
    loading: false
  })
}

load()

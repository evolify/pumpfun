import { PumpDetail } from "common/types"
import { fetcher } from "common/utils/request"
import useSwr from "swr"

export function usePumpDetail(address: string){
  return useSwr<PumpDetail>(address && `/api/pump/${address}`, fetcher)
}

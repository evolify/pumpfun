import { Stack, } from "@mui/material"
import { PumpCoin } from "common/types"
import CoinCard from "./item"

export default function List({ data }: { data: PumpCoin[] }) {
  return (
    <Stack p={1.5} direction="row" flexWrap="wrap" gap={1.5}>
      {data.map(t => (
        <CoinCard key={t.address} data={t} />
      ))}
    </Stack>
  )
}

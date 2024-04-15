import {
  Card,
  CardActions,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from "@mui/material"
import { use } from "../store"
import { Coin } from "common/types"
import { formatAddress, formatMarketCap, formatTime } from "common/utils/format"
import {
  AutoFixHigh,
  Home,
  OpenInBrowser,
  Telegram,
  Twitter,
} from "@mui/icons-material"
import { copy, pumpBot, pumpFun } from "common/utils"
import Loading from "./loading"

interface Props {
  data: Coin
}

function renderParam(label: string, value: string, onClick?: () => void) {
  return (
    <Stack direction="row" onClick={onClick}>
      <Typography>{label}:</Typography>
      <Typography ml="auto">{value}</Typography>
    </Stack>
  )
}

function renderAction(
  Icon: React.ComponentType,
  action?: string | (() => void),
  condition: string | boolean | null = true
) {
  if (!Boolean(condition)) {
    return null
  }
  function onClick() {
    if (action) {
      if (typeof action === "string") {
        window.open(action)
      } else {
        action()
      }
    }
  }
  return (
    <IconButton onClick={onClick}>
      <Icon />
    </IconButton>
  )
}

function CoinCard({ data }: Props) {
  return (
    <Card variant="outlined" sx={{ borderRadius: 4, mb: 1.5 }}>
      <Stack direction="row" position="relative">
        <CardMedia
          component="img"
          sx={{
            width: "150px",
            height: "150px",
            objectFit: "cover",
            flexShrink: 0,
          }}
          image={data.image_uri}
        />
        <Stack width={0} flexGrow={1}>
          <Stack p={1}>
            <Typography
              variant="body1"
              mb={1}
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {data.symbol}-{data.name}
            </Typography>
            {renderParam("MarketCap", formatMarketCap(data.usd_market_cap))}
            {renderParam("Create Time", formatTime(data.created_timestamp))}
            {renderParam("Mint", formatAddress(data.mint), () =>
              copy(data.mint)
            )}
          </Stack>

          <CardActions disableSpacing sx={{ p: 0, mt: "auto" }}>
            {renderAction(Twitter, data.twitter, data.twitter)}
            {renderAction(Telegram, data.telegram, data.telegram)}
            {renderAction(Home, data.website, data.website)}
            {renderAction(AutoFixHigh, () => {
              copy(data.mint)
              window.open(pumpBot())
            })}
            {renderAction(OpenInBrowser, pumpFun(data.mint))}
          </CardActions>
        </Stack>
      </Stack>
    </Card>
  )
}

export default function List() {
  const { list, loading } = use()
  if (loading) {
    return <Loading />
  }
  return (
    <Stack p={1.5}>
      {list.map(t => (
        <CoinCard key={t.mint} data={t} />
      ))}
    </Stack>
  )
}

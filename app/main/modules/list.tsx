import {
  Card,
  CardActionArea,
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
import { copy, toPumpBot, toPumpFun } from "common/utils"
import Loading from "./loading"

interface Props {
  data: Coin
}

function renderParam(label: string, value: string, onClick?: ()=>void) {

  return (
    <Stack direction="row" onClick={onClick}>
      <Typography>{label}:</Typography>
      <Typography ml="auto">{value}</Typography>
    </Stack>
  )
}

function CoinCard({ data }: Props) {
  return (
    <Card variant="outlined" sx={{ borderRadius: 4, mb: 1 }}>
      <CardActionArea component="div">
        <Stack direction="row" position="relative">
          <CardMedia
            component="img"
            sx={{ width: "150px", height: "150px", objectFit: "cover" }}
            image={data.image_uri}
          />
          <Stack>
            <Stack p={1}>
              <Typography variant="body1" mb={1} sx={{whiteSpace: "nowrap"}}>
                {data.symbol}-{data.name}
              </Typography>
              {renderParam("MarketCap", formatMarketCap(data.usd_market_cap))}
              {renderParam("Create Time", formatTime(data.created_timestamp))}
              {renderParam("Mint", formatAddress(data.mint), ()=>copy(data.mint))}
            </Stack>

            <CardActions disableSpacing sx={{ p: 0, mt: "auto" }}>
              {data.twitter && (
                <IconButton onClick={() => window.open(data.twitter)}>
                  <Twitter />
                </IconButton>
              )}
              {data.telegram && (
                <IconButton onClick={() => window.open(data.telegram)}>
                  <Telegram />
                </IconButton>
              )}
              {data.website && (
                <IconButton onClick={() => toPumpBot(data.mint)}>
                  <AutoFixHigh />
                </IconButton>
              )}
              <IconButton onClick={() => window.open(data.website)}>
                <Home />
              </IconButton>
              <IconButton onClick={() => toPumpFun(data.mint)}>
                <OpenInBrowser />
              </IconButton>
            </CardActions>
          </Stack>
        </Stack>
      </CardActionArea>
    </Card>
  )
}

export default function List() {
  const { list, loading } = use()
  if(loading){
    return <Loading />
  }
  return (
    <Stack m={1}>
      {list.map(t => (
        <CoinCard key={t.mint} data={t} />
      ))}
    </Stack>
  )
}

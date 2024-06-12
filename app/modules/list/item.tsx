"use client"
import {
  ContentCopy,
  ExpandMore,
  Home,
  Public,
  Telegram,
  Twitter,
} from "@mui/icons-material"
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CircularProgress,
  IconButton,
  IconButtonProps,
  Stack,
  Typography,
  styled,
} from "@mui/material"
import { PumpCoin } from "common/types"
import { copy, pumpFun, twitter } from "common/utils"
import { formatAddress, formatMarketCap, formatTime } from "common/utils/format"
import { open, use } from "app/store"

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

const Expand = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}))

function renderParam(label: string, value: string) {
  return (
    <Stack direction="row">
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
  function onClick(e: React.MouseEvent) {
    e.stopPropagation()
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

export default function CoinCard({ data }: { data: PumpCoin }) {
  const { coin } = use()
  const selected = coin?.address === data.address
  function toDetail() {
    open(data)
  }
  return (
    <Card
      variant="outlined"
      sx={{ borderRadius: 4, flexGrow: 1, minWidth: 360, maxWidth: 720 }}
      onClick={toDetail}
    >
      <Stack direction="row" position="relative">
        <img
          className="h-full aspect-ratio-square"
          style={{flexShrink: 0}}
          src={data.logo}
          width={152}
          height={152}
          alt=""
        />
          <Stack width="0" flexGrow={1} >
            <CardActionArea>
            <Stack p={1}>
              <Stack mb={1} direction="row" alignItems="center">
                <Typography
                  variant="body1"
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {data.symbol}
                </Typography>

                <Box
                  ml="auto"
                  sx={{ position: "relative", display: "inline-flex" }}
                >
                  <CircularProgress
                    variant="determinate"
                    size={28}
                    value={data.progress * 100}
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: "absolute",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="caption"
                      component="div"
                      color="text.secondary"
                    >{`${Math.round(data.progress * 100)}`}</Typography>
                  </Box>
                </Box>
              </Stack>
              {renderParam("MarketCap", formatMarketCap(+data.usd_market_cap))}
              {renderParam("Create Time", formatTime(data.created_timestamp))}
              {renderParam("Address", formatAddress(data.address))}
            </Stack>
            </CardActionArea>
            <CardActions disableSpacing sx={{ p: 0, mt: "auto" }}>
              {renderAction(Public, pumpFun(data.address), true)}
              {renderAction(Twitter, twitter(data.twitter), data.twitter)}
              {renderAction(Telegram, data.telegram, data.telegram)}
              {renderAction(Home, data.website, data.website)}
              {renderAction(ContentCopy, () => copy(data.address), true)}
              <Expand expand={selected}>
                <ExpandMore />
              </Expand>
            </CardActions>
          </Stack>
      </Stack>
    </Card>
  )
}

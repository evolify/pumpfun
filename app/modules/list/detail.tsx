"use client"
import { Button, Divider, Drawer, Stack, Typography } from "@mui/material"
import { close, use } from "app/store"
import {
  formatMarketCap,
  formatPercent,
  formatPrice,
} from "common/utils/format"
import { bonkbot, copy, pumpill } from "common/utils"
import { click } from "common/utils/track"
import { usePumpDetail } from "common/hooks/pump"

export default function Detail() {
  const { coin } = use()

  const { data, isLoading } = usePumpDetail(coin?.address)

  function getSwaps() {
    return (
      (coin.swaps_1m || 0) +
      "(1m)—" +
      (coin.swaps_5m || 0) +
      "(5m)—" +
      (coin.swaps_1h || 0) +
      "(1h)"
    )
  }

  function getVolume() {
    return (
      formatMarketCap(coin.volume_1m) +
      "(1m)—" +
      formatMarketCap(coin.volume_5m) +
      "(5m)—" +
      formatMarketCap(coin.volume_1h) +
      "(1h)"
    )
  }

  function renderLink(text: string, link: string, copyAddr?: boolean) {
    function onClick() {
      if (copyAddr) {
        copy(coin.address)
      }
      click(text.toLocaleLowerCase().replace(/\s/g, "_"))
      window.open(link)
    }
    return (
      <Button size="small" variant="outlined" onClick={onClick}>
        {text}
      </Button>
    )
  }

  function renderDetails() {
    const {
      creator_percentage,
      top_10_holder_rate,
      holder_rugged_num,
      holder_token_num,
    } = data || {}
    return (
      <>
        <Divider sx={{ mt: 2 }} />
        <Typography mt={2} variant="h6">
          Safe Analytics
        </Typography>
        <Stack direction="row" alignItems="center">
          <Typography width={90}>Dev Hold:</Typography>
          <Typography>{formatPercent(creator_percentage)}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography width={90}>Top 10 Hold:</Typography>
          <Typography>{formatPercent(top_10_holder_rate)}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography width={90}>Rug:</Typography>
          <Typography>
            {holder_rugged_num || 0} / {holder_token_num || 0}
          </Typography>
        </Stack>
      </>
    )
  }

  function renderContent() {
    if (!coin) {
      return ""
    }
    return (
      <Stack p={2} pb={4} maxWidth={600} width="100%" mx="auto">
        <Stack direction="row" alignItems="center">
          <img
            style={{ width: 42, height: 42, borderRadius: "50%" }}
            src={coin.logo}
            alt=""
          />
          <Stack ml={1}>
            <Typography variant="h5">{coin.name}</Typography>
            <Typography variant="caption">{coin.address}</Typography>
          </Stack>
        </Stack>

        <Divider sx={{ mt: 2 }} />

        <Typography mt={2} variant="h6">
          Basic Info
        </Typography>
        <Stack direction="row" alignItems="center">
          <Typography width={70}>Holder:</Typography>
          <Typography>{coin.holder_count}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography width={70}>Price:</Typography>
          <Typography>${formatPrice(coin.price)}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography width={70}>Swaps:</Typography>
          <Typography> {getSwaps()} </Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography width={70}>Volume:</Typography>
          <Typography> {getVolume()} </Typography>
        </Stack>

        {renderDetails()}

        <Divider sx={{ mt: 2 }} />
        <Typography mt={2} variant="h6">
          Fast Buy
        </Typography>
        <Stack
          mt={1}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {renderLink("Bonkbot", bonkbot(coin.address))}
          {renderLink("Pepeboost", bonkbot(coin.address))}
          {renderLink("GMGN Bot", bonkbot(coin.address))}
          {renderLink("PumPill", pumpill(coin.address), true)}
        </Stack>
      </Stack>
    )
  }
  return (
    <Drawer
      anchor="bottom"
      open={Boolean(coin)}
      onClose={close}
      disableScrollLock
      PaperProps={{
        sx: {
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
        },
      }}
    >
      {renderContent()}
    </Drawer>
  )
}

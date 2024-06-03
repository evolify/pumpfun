"use client"
import Image from "next/image"
import { Button, Drawer, Stack, Typography } from "@mui/material"
import { sendGTMEvent } from "@next/third-parties/google"
import { close, use } from "app/store"
import { formatMarketCap, formatPrice } from "common/utils/format"
import { bonkbot } from "common/utils"

export default function Detail() {
  const { coin } = use()

  function getSwaps(){
    return coin.swaps_1m+ "(1m)—" + 
      coin.swaps_5m+ "(5m)—" +
      coin.swaps_1h+ "(1h)"
  }

  function getVolume(){
    return formatMarketCap(coin.volume_1m) + "(1m)—" + 
      formatMarketCap(coin.volume_5m) + "(5m)—" +
      formatMarketCap(coin.volume_1h) + "(1h)"
  }

  function renderLink(text: string, link: string) {
    sendGTMEvent({
      event: "click",
      type: text
    })
    function click(){
      window.open(link)
    }
    return (
      <Button variant="outlined" onClick={click} >{text}</Button>
    )
  }

  function renderContent() {
    if (!coin) {
      return ""
    }
    return (
      <Stack p={2} pb={4} maxWidth={600} width="100%" mx="auto">
        <Stack direction="row" alignItems="center">
          <Image
            style={{ width: 50, height: 50, borderRadius: "50%" }}
            src={coin.logo}
            alt=""
            width={100}
            height={100}
          />
          <Typography ml={2} variant="h5">
            {coin.name}
          </Typography>
        </Stack>
        <Typography variant="caption" my={1}>{coin.address}</Typography>
        <Stack direction="row" alignItems="center">
          <Typography width={70}>Price:</Typography>
          <Typography>{formatPrice(coin.price)}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography width={70}>Swaps:</Typography>
          <Typography> { getSwaps() } </Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography width={70}>Volume:</Typography>
          <Typography> { getVolume() } </Typography>
        </Stack>

        <Typography align="center" mt={2} variant="button">Fast Buy</Typography>
        <Stack mt={1} direction="row" alignItems="center" justifyContent="space-between">
          {renderLink("Bonkbot", bonkbot(coin.address))}
          {renderLink("Pepeboost", bonkbot(coin.address))}
          {renderLink("GMGN Bot", bonkbot(coin.address))}
        </Stack>
      </Stack>
    )
  }
  return (
    <Drawer
      anchor="bottom"
      open={Boolean(coin)}
      onClose={close}
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

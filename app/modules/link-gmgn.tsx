"use client"

import { ArrowOutward } from "@mui/icons-material"
import { Button, Typography } from "@mui/material"
import { gmgn } from "common/utils"
import { click } from "common/utils/track"

export default function GmgnLink() {
  function toGmgn() {
    click("gmgn")
    window.open(gmgn())
  }
  return (
    <Button sx={{ mr: 4 }} color="inherit" onClick={toGmgn}>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        GMGN
      </Typography>
      <ArrowOutward sx={{ ml: 1 }} fontSize="small" />
    </Button>
  )
}

"use client"

import { ArrowOutward } from "@mui/icons-material"
import { Button, Typography } from "@mui/material"
import { axiom, gmgn } from "common/utils"
import { click } from "common/utils/track"

export default function Link() {
  function toAxiom() {
    click("gmgn")
    window.open(axiom())
  }
  function toGmgn() {
    click("gmgn")
    window.open(gmgn())
  }
  return (
    <>
      <Button sx={{ mr: 1 }} color="inherit" onClick={toAxiom}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Axiom
        </Typography>
        <ArrowOutward sx={{ ml: 0.5 }} fontSize="small" />
      </Button>
      <Button sx={{ mr: 1 }} color="inherit" onClick={toGmgn}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          GMGN
        </Typography>
        <ArrowOutward sx={{ ml: 0.5 }} fontSize="small" />
      </Button>
    </>
  )
}

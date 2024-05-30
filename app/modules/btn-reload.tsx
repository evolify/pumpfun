"use client"
import { Refresh } from "@mui/icons-material"
import { IconButton } from "@mui/material"

export default function Reload() {
  function refresh() {
    location.reload()
  }
  return (
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      onClick={refresh}
    >
      <Refresh />
    </IconButton>
  )
}

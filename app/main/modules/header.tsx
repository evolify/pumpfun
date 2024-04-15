import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import { Menu, Refresh } from "@mui/icons-material"
import { load } from "../store"

export default function Header() {
  function refresh(){
    load()
  }
  return (
    <AppBar>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <Menu />
        </IconButton>
        <Typography variant="h6" sx={{flexGrow: 1}}>PumpFun</Typography>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={refresh}
        >
          <Refresh />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

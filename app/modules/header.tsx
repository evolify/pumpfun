import { AppBar, IconButton, Toolbar, Typography, } from "@mui/material"
import { Menu } from "@mui/icons-material"
import Reload from "./btn-reload"
import Links from "./links"

export default function Header() {

  return (
    <AppBar>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <Menu />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          PumpFun
        </Typography>
        <Links />
        <Reload />
      </Toolbar>
    </AppBar>
  )
}

import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material"
import { Menu } from "@mui/icons-material"
import Reload from "./btn-reload"

export default function Header() {
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
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          PumpFun
        </Typography>
        <Reload />
      </Toolbar>
    </AppBar>
  )
}

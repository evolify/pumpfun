import {
  AppBar,
  CircularProgress,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material"
import { Menu, Refresh } from "@mui/icons-material"
import { load, use } from "../store"

export default function Header() {
  const { loading } = use()
  function refresh() {
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
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          PumpFun
        </Typography>
        {loading ? (
          <CircularProgress color="inherit" size={14} />
        ) : (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={refresh}
          >
            <Refresh />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  )
}

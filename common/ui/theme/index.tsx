import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material"
import React, { useMemo } from "react"
// import "./style.scss"

interface Props extends React.ComponentProps<any> {}

export default function Theme({ children }: Props) {
  const darkMode = useMediaQuery("(prefers-color-scheme: dark)")
  function color(light: string, dark: string) {
    return darkMode ? dark : light
  }
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          background: {
            default: color("#f7f7f7", "#000"),
          },
          color: {
            cardBg: color("#1E88E5", "#121212"),
          },
        },
        components: {
          MuiAppBar: {
            styleOverrides: {
              colorPrimary: {
                backgroundColor: color("#1976d2", "#2d2d2d")
              }
            }
          }
        }
      }),
    [darkMode]
  )

  console.log(theme)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

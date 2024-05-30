"use client"
import { Alert, Slide } from "@mui/material"
import { createRoot, Root } from "react-dom/client"

let root: Root
function ensureRoot() {
  if (root) {
    return root
  }
  let container = document.querySelector(".alert-container")
  if (!container) {
    container = document.createElement("div")
    container.className = "alert-container"
    document.body.appendChild(container)
  }
  root = createRoot(container)
  return root
}

type Severity = "success" | "info" | "warning" | "error"

interface Props {
  children: string
  visible: boolean
  severity?: Severity
}
function AlertModal({ children, severity = "info", visible }: Props) {
  return (
    <Slide direction="down" in={visible} mountOnEnter unmountOnExit>
      <Alert
        className="alert"
        sx={{
          position: "fixed",
          top: 65,
          left: 10,
          right: 10,
          zIndex: 1000,
          borderRadius: 2.5,
        }}
        variant="filled"
        severity={severity}
      >
        {children}
      </Alert>
    </Slide>
  )
}

export function notify(msg: string, security: Severity = "info", duration = 2000) {
  const root = ensureRoot()
  root.render(<AlertModal visible={true} severity={security}>{msg}</AlertModal>)
  setTimeout(() => {
    root.render(<AlertModal visible={false} severity={security}>{msg}</AlertModal>)
  }, duration)
}

export function success(msg: string, duration = 2000){
  return notify(msg, "success", duration)
}

export function info(msg: string, duration = 2000){
  return notify(msg, "info", duration)
}

export function warning(msg: string, duration = 2000){
  return notify(msg, "warning", duration)
}

export function error(msg: string, duration = 2000){
  return notify(msg, "error", duration)
}

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material"
import { createRoot, Root } from "react-dom/client"

let root: Root
function ensureRoot() {
  if (root) {
    return root
  }
  let container = document.querySelector(".confirm-container")
  if (!container) {
    container = document.createElement("div")
    container.className = "confirm-container"
    document.body.appendChild(container)
  }
  root = createRoot(container)
  return root
}

interface ConfirmOptions {
  title: string
  desc?: string
  onConfirm: () => void
  onCancel?: () => void
}

interface Props extends ConfirmOptions {
  visible: boolean
}
function Confirm({ title, desc, onConfirm, onCancel, visible }: Props) {
  return (
    <Dialog
      open={visible}
      onClose={onCancel}
      fullWidth
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      {desc && (
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {desc}
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button color="error" onClick={onCancel}>
          Cancel
        </Button>
        <Button color="primary" onClick={onConfirm} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export function confirm(options: ConfirmOptions) {
  const root = ensureRoot()
  function close() {
    root.render(<Confirm visible={false} {...options} />)
  }
  const {onConfirm, onCancel} = options
  options.onConfirm = () => {
    onConfirm()
    close()
  }
  options.onCancel = () => {
    onCancel && onCancel()
    close()
  }
  root.render(<Confirm visible={true} {...options} />)
}

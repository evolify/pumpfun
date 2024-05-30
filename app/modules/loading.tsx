import { CircularProgress, Stack } from "@mui/material";

export default function Loading() {
  return (
    <Stack alignItems="center" justifyContent="center" mt={20}>
      <CircularProgress />
    </Stack>
  )
}

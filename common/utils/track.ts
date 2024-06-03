import { sendGTMEvent } from "@next/third-parties/google"

export enum EventName {
  Click = "g_click"
}

export function click(type: string) {
  sendGTMEvent({
    event: EventName.Click,
    type: type,
  })
}

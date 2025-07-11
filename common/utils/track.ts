import { sendGTMEvent } from "@next/third-parties/google"

export enum TrackLabel {
  GMGN = "gmgn",
  AXIOM = "axiom",
  TWITTER = "twitter",
  TELEGRAM = "telegram",
  DISCORD = "discord",
  WEBSITE = "website",
  GMGN_BOT = "gmgn_bot",
  BONK_BOT = "bonk_bot",
  PEPEBOOST_BOT = "pepeboost_bot",
  LAUNCHPAD = "launchpad",
}

export enum EventName {
  Click = "g_click",
}

export function click(type: TrackLabel) {
  sendGTMEvent({
    event: EventName.Click,
    type: type,
  })
}

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  getAxiomLink,
  getBonkbotLink,
  getGmgnbotLink,
  getGmgnLink,
  getPepeboostLink,
} from "@/utils"
import { NavigationMenuItem } from "@radix-ui/react-navigation-menu"
import { MenuIcon } from "lucide-react"
import { LaunchpadConfig } from "@/constants"
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet"
import { cn } from "@/lib/utils"
import { TrackLabel } from "@/utils/track"
import { NavLink } from "./nav-link"

const menus = [
  {
    label: "Launchpads",
    children: Object.values(LaunchpadConfig).map(t => ({
      label: t.name,
      value: t.url,
      trackLabel: TrackLabel.LAUNCHPAD,
    })),
  },
  {
    label: "Telegram Bot",
    children: [
      {
        label: "GMGN Bot",
        value: getGmgnbotLink(),
        trackLabel: TrackLabel.GMGN_BOT,
      },
      {
        label: "Bonk Bot",
        value: getBonkbotLink(),
        trackLabel: TrackLabel.BONK_BOT,
      },
      {
        label: "Pepeboost Bot",
        value: getPepeboostLink(),
        trackLabel: TrackLabel.PEPEBOOST_BOT,
      },
    ],
  },
  {
    label: "Axiom",
    value: getAxiomLink(),
    trackLabel: TrackLabel.AXIOM,
  },
  {
    label: "GMGM",
    value: getGmgnLink(),
    trackLabel: TrackLabel.GMGN,
  },
]

interface Props {
  title?: string
  subTitle?: React.ReactNode
}

export default function Header(props: Props) {
  const { title = "Dumpfun", subTitle } = props
  return (
    <header className="flex flex-row items-center h-14 px-4">
      {/* sidebar menu */}
      <div className="mr-4 md:hidden flex flex-row items-center">
        <Sheet>
          <SheetTrigger>
            <MenuIcon />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>Dumpfun</SheetHeader>
            <ul>
              {menus.map(item => (
                <li
                  key={item.label}
                  className={cn(
                    "flex flex-col px-6",
                    item.children && "text-sm text-gray-400"
                  )}
                >
                  {item.children ? (
                    <>
                      <ul className="w-50 py-2">
                        <span>{item.label}</span>
                        {item.children.map(t => (
                          <NavLink
                            key={t.label}
                            label={t.label}
                            value={t.value}
                            trackLabel={t.trackLabel}
                          />
                        ))}
                      </ul>
                    </>
                  ) : (
                    <NavLink
                      label={item.label}
                      value={item.value}
                      trackLabel={item.trackLabel}
                    />
                  )}
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </div>
      <div className="text-xl font-bold">{title}</div>
      {subTitle && (
        <div className="ml-auto text-sm text-blue-100">{subTitle}</div>
      )}

      {/* top menu */}
      <NavigationMenu
        className="ml-auto hidden md:block"
        orientation="vertical"
      >
        <NavigationMenuList>
          {menus.map(item => (
            <NavigationMenuItem key={item.label}>
              {item.children ? (
                <>
                  <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-50">
                      {item.children.map(t => (
                        <NavLink
                          key={t.label}
                          label={t.label}
                          value={t.value}
                          trackLabel={t.trackLabel}
                        />
                      ))}
                    </div>
                  </NavigationMenuContent>
                </>
              ) : (
                <NavLink
                  label={item.label}
                  value={item.value}
                  trackLabel={item.trackLabel}
                />
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}

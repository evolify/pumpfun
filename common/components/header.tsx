import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuLink,
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
import { MenuIcon, MoveUpRight } from "lucide-react"
import { LaunchpadConfig } from "@/constants"
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet"
import { cn } from "@/lib/utils"

const menus = [
  {
    label: "Launchpads",
    children: Object.values(LaunchpadConfig).map(t => ({
      label: t.name,
      value: t.url,
    })),
  },
  {
    label: "Telegram Bot",
    children: [
      {
        label: "GMGN Bot",
        value: getGmgnbotLink(),
      },
      {
        label: "Bonk Bot",
        value: getBonkbotLink(),
      },
      {
        label: "Pepeboost Bot",
        value: getPepeboostLink(),
      },
    ],
  },
  {
    label: "Axiom",
    value: getAxiomLink(),
  },
  {
    label: "GMGM",
    value: getGmgnLink(),
  },
]

console.log(menus)

interface Props {
  title?: string
}

export default function Header(props: Props) {
  const { title = "Dumpfun" } = props
  return (
    <header className="flex flex-row items-center h-14 px-4">
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
                    "flex flex-col px-6 py-4",
                    item.children && "text-sm text-gray-400"
                  )}
                >
                  {item.children ? (
                    <>
                      <span>{item.label}</span>
                      <ul className="w-50">
                        {item.children.map(t => (
                          <a key={t.label} href={t.value} target="_blank">
                            <span className="flex flex-row items-center justify-between text-md text-gray-200">
                              {t.label}
                              <MoveUpRight style={{ width: 12, height: 12 }} />
                            </span>
                          </a>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <a href={item.value} target="_blank">
                      <span className="flex flex-row items-center text-md text-gray-200">
                        {item.label}
                        <MoveUpRight
                          style={{ width: 12, height: 12 }}
                          className="ml-1"
                        />
                      </span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </div>
      <div className="text-xl font-bold">{title}</div>

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
                        <NavigationMenuLink
                          key={t.label}
                          href={t.value}
                          target="_blank"
                        >
                          <span className="flex flex-row items-center justify-between">
                            {t.label}
                            <MoveUpRight style={{ width: 12, height: 12 }} />
                          </span>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </>
              ) : (
                <NavigationMenuLink href={item.value} target="_blank">
                  <span className="flex flex-row items-center">
                    {item.label}
                    <MoveUpRight
                      style={{ width: 12, height: 12 }}
                      className="ml-1"
                    />
                  </span>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}

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
import { MoveUpRight } from "lucide-react"

const menus = [
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

export default function Header() {
  return (
    <header className="flex flex-row items-center h-14 px-4">
      <div className="text-xl font-bold">Dump Fun - Launchpads</div>

      <div className="text-sm text-gray-400 ml-auto">Trade Now:</div>
      <NavigationMenu className="ml-2">
        <NavigationMenuList>
          {menus.map(item => (
            <NavigationMenuItem key={item.label}>
              {item.children ? (
                <>
                  <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-50">
                      {item.children.map(t => (
                        <NavigationMenuLink key={t.label}>
                          <a
                            href={item.value}
                            target="_blank"
                            className="flex flex-row items-center justify-between"
                          >
                            {item.label}
                            <MoveUpRight style={{ width: 12, height: 12 }} />
                          </a>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </>
              ) : (
                <NavigationMenuLink>
                  <a
                    href={item.value}
                    className="flex flex-row items-center"
                    target="_blank"
                  >
                    {item.label}
                    <MoveUpRight
                      style={{ width: 12, height: 12 }}
                      className="ml-1"
                    />
                  </a>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}

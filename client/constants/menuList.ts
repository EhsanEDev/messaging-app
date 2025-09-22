import {
  Calendar,
  Home,
  Inbox,
  LogOut,
  Search,
  Settings,
  User,
  CreditCard,
  Bell
} from "lucide-react";

export interface Item {
  type: "item";
  title: string;
  url: string;
  icon: React.ElementType;
}
export interface Misc {
  type: "separator";
}
// export interface Group {
//   type: "group";
//   label: string;
//   items: MenuItem[];
// }
export type MenuItem = Item | Misc;

export const asideProfileItems: Item[] = [
  {
    type: "item",
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    type: "item",
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    type: "item",
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    type: "item",
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    type: "item",
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export const asideAppItems: Item[] = [
  {
    type: "item",
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    type: "item",
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    type: "item",
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    type: "item",
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    type: "item",
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export const asideUserItems: MenuItem[] = [
  {
    type: "item",
    title: "My Profile",
    url: "#",
    icon: User,
  },
  {
    type: "item",
    title: "Account Settings",
    url: "#",
    icon: Settings,
  },
  {
    type: "item",
    title: "Billing",
    url: "#",
    icon: CreditCard,
  },
  {
    type: "item",
    title: "Notifications",
    url: "#",
    icon: Bell,
  },
  {
    type: "separator",
  },
  {
    type: "item",
    title: "Sign out",
    url: "#",
    icon: LogOut,
  },
];

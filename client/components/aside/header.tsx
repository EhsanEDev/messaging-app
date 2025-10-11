import { SidebarHeader } from "../shadcn/sidebar";
import UserMenu from "./header/userMenu";

const AsideHeader: React.FC = () => {
  return (
    <SidebarHeader className="px-4 py-1 h-16">
      <UserMenu />
    </SidebarHeader>
  );
};

export default AsideHeader;

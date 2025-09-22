import { SidebarHeader } from "../ui/sidebar";
import UserMenu from "./header/userMenu";

interface IProps {}

const AsideHeader: React.FC<IProps> = () => {
  return (
    <SidebarHeader className="px-4 py-1 h-16">
      <UserMenu />
    </SidebarHeader>
  );
};

export default AsideHeader;

import { SidebarHeader } from "../ui/sidebar";
import UserSwitch from "./header/userSwitch";

interface IProps {}

const AsideHeader: React.FC<IProps> = () => {
  return (
      <SidebarHeader className="px-4 py-1 h-16">
        <UserSwitch />
      </SidebarHeader>
  );
};

export default AsideHeader;
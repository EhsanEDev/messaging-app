import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import MainMenuContent from "./mainMenuContent";

interface IProps {}

const MainMenu: React.FC<IProps> = () => {
  return (
    <SidebarGroup>
      {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
      <SidebarGroupContent>
        <MainMenuContent />
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default MainMenu;

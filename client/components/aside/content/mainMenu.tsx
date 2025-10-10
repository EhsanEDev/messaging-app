import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import MainMenuContent from "./mainMenuContent";

const MainMenu: React.FC = () => {
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

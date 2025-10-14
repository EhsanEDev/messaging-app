import { SidebarGroup, SidebarGroupContent } from "@/components/shadcn/sidebar";
import MainMenuContent from "./mainMenuContent";

const MainMenu: React.FC = () => {
  return (
    <SidebarGroup>
      {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
      <SidebarGroupContent className="p-0">
        <MainMenuContent />
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default MainMenu;

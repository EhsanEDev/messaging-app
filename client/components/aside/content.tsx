import { SidebarContent } from "@/components/shadcn/sidebar";
import MainMenu from "./content/mainMenu";

const AsideContent: React.FC = () => {
  return (
    <SidebarContent className="px-2">
      <MainMenu />
    </SidebarContent>
  );
};

export default AsideContent;

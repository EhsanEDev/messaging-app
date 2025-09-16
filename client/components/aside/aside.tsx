import { Sidebar } from "@/components/ui/sidebar";
import AsideContent from "./content";
import AsideFooter from "./footer";
import AsideHeader from "./header";

const Asidebar: React.FC = () => {
  return (
    <Sidebar side="left" variant="sidebar" collapsible="offcanvas">
      <AsideHeader />
      <AsideContent />
      <AsideFooter />
    </Sidebar>
  );
};

export default Asidebar;

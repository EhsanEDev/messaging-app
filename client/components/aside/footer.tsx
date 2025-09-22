import { SidebarFooter } from "../ui/sidebar";
import pkg from "@/package.json";

interface IProps {}

const AsideFooter: React.FC<IProps> = () => {
  return (
    <SidebarFooter className="px-4 pb-8">
      <h3 className="text-xs text-muted-foreground">
        <span className="text-sm font-semibold">
          {pkg.name.charAt(0).toUpperCase() + pkg.name.slice(1)}{" "}
        </span>
        v{pkg.version}
      </h3>
      <p className="text-xs text-muted-foreground">
        Built by{" "}
        <a className="hover:underline" href="https://github.com/EhsanEDev">
          {pkg.author}
        </a>
      </p>
    </SidebarFooter>
  );
};

export default AsideFooter;

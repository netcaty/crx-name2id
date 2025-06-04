import { HomeIcon, SearchIcon, GridIcon, StarIcon, DownloadIcon } from "lucide-react";
import Index from "./pages/Index.jsx";

export const navItems = [
  {
    title: "首页",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "浏览",
    to: "/browse",
    icon: <GridIcon className="h-4 w-4" />,
    page: <div>浏览页面</div>,
  },
  {
    title: "热门",
    to: "/popular",
    icon: <StarIcon className="h-4 w-4" />,
    page: <div>热门页面</div>,
  },
  {
    title: "已安装",
    to: "/installed",
    icon: <DownloadIcon className="h-4 w-4" />,
    page: <div>已安装页面</div>,
  },
];

import { Navbar } from "@/components/molecules/navbar/navbar";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <div className="md:container md:mx-auto flex">
      <div className="hidden md:block basis-1/4">
        <div className="top-0 sticky">
          <Navbar />
        </div>
      </div>
      <div className="basis-full md:basis-1/2">
        <Outlet />
      </div>
      <div className="hidden md:block basis-1/4 h-screen"></div>
    </div>
  );
};

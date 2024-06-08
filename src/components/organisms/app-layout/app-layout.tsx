import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <div className="md:container md:mx-auto flex">
      <div className="hidden md:block basis-1/4 bg-neutral-100 h-screen"></div>
      <div className="basis-full md:basis-1/2">
        <Outlet />
      </div>
      <div className="hidden md:block basis-1/4 bg-neutral-100 h-screen"></div>
    </div>
  );
};

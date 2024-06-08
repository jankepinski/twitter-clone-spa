import { Route, Routes } from "react-router-dom";
import { AppPaths } from "./paths";
import { Home } from "../../features/home/home";
import { AppLayout } from "@/components/organisms/app-layout/app-layout";

export const AppRouting = () => {
  return (
    <Routes>
      <Route path={AppPaths.HOME} element={<AppLayout />}>
        <Route path="" element={<Home />}></Route>
      </Route>
    </Routes>
  );
};

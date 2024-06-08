import { Route, Routes } from "react-router-dom";
import { AppPaths } from "./paths";
import { Home } from "../../features/home/home";
import { AppLayout } from "@/components/organisms/app-layout/app-layout";
import { PostPage } from "@/features/post-page/post-page";

export const AppRouting = () => {
  return (
    <Routes>
      <Route path={AppPaths.HOME} element={<AppLayout />}>
        <Route path="" element={<Home />}></Route>
        <Route path={AppPaths.POST} element={<PostPage />}></Route>
      </Route>
    </Routes>
  );
};

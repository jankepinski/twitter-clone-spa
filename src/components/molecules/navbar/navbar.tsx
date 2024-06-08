import { useAuth } from "@/+shared/hooks/use-auth";
import { useModal } from "@/+shared/hooks/use-modal";
import { AppPaths } from "@/+shared/routes/paths";
import { LoginModal } from "@/features/auth/components/login-modal/login-modal";
import { generatePath, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();

  const auth = useAuth();

  const buttons = [
    { action: () => navigate(AppPaths.HOME), text: "Home" },
    {
      action: auth
        ? () => navigate(generatePath(AppPaths.PROFILE, { id: auth.id }))
        : () => openModal(<LoginModal />),
      text: "Profile",
    },
  ];
  return (
    <div className="flex flex-col gap-2 items-start ml-16 mt-4">
      {buttons.map((button) => (
        <button
          onClick={button.action}
          className="text-center py-2 px-4 rounded-full hover:bg-neutral-200 text-xl"
        >
          {button.text}
        </button>
      ))}
    </div>
  );
};

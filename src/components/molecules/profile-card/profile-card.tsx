import { useAuth } from "@/+shared/hooks/use-auth";
import { useModal } from "@/+shared/hooks/use-modal";
import { queryClient } from "@/+shared/setup/react-query/setup";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { LoginModal } from "@/features/auth/components/login-modal/login-modal";
import { SignUpModal } from "@/features/auth/components/sign-up-modal/sign-up-modal";
import { AuthApi } from "@/services/auth/auth-api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const ProfileCard = () => {
  const { openModal } = useModal();
  const navigate = useNavigate();
  const auth = useAuth();
  const logoutMutation = useMutation({
    mutationFn: AuthApi.logout,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["auth"] }),
  });
  return auth ? (
    <Card>
      <CardHeader className="flex items-center flex-row">
        <div className="min-w-10 max-w-10 min-h-10 max-h-10 bg-neutral-500 rounded-full" />
        <div className="ml-4">
          <a
            onClick={() => {
              navigate("/profile/" + auth.id);
            }}
            className="text-xl font-semibold leading-6 cursor-pointer hover:underline underline-offset-2"
          >
            {auth.name}
          </a>
          <p className="text-sm">Posts: {auth.postCount}</p>
        </div>
      </CardHeader>
      <div className="flex justify-end p-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            logoutMutation.mutate();
          }}
        >
          Log out
        </Button>
      </div>
    </Card>
  ) : (
    <Card className="p-4 flex justify-center gap-6">
      <Button
        size="sm"
        onClick={() => {
          openModal(<LoginModal />);
        }}
      >
        Log in
      </Button>
      <Button
        size="sm"
        onClick={() => {
          openModal(<SignUpModal />);
        }}
        variant="outline"
      >
        Sign up
      </Button>
    </Card>
  );
};

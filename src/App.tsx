import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./+shared/setup/react-query/setup";
import { BrowserRouter } from "react-router-dom";
import { AppRouting } from "./+shared/routes/routes";
import { AuthProvider } from "./components/organisms/auth-provider/auth-provider";
import { Toaster } from "sonner";
import { ModalProvider } from "./components/organisms/modal-provider/modal-provider";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <AuthProvider>
          <BrowserRouter>
            <AppRouting />
          </BrowserRouter>
          <Toaster />
        </AuthProvider>
      </ModalProvider>
    </QueryClientProvider>
  );
}

export default App;

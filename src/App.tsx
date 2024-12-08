import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import Sidebar from "@/components/Sidebar";

// Pages
import SignUp from "@/pages/SignUp";
import SignIn from "@/pages/SignIn";
import Index from "@/pages/Index";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import Analytics from "@/pages/Analytics";
import Notifications from "@/pages/Notifications";
import Transactions from "@/pages/Transactions";
import Workspaces from "@/pages/Workspaces";
import Projects from "@/pages/Projects";
import Users from "@/pages/Users";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Router>
          <div className="flex h-screen bg-background">
            <Sidebar />
            <main className="flex-1 overflow-auto p-8">
              <Routes>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/" element={<Index />} />
                <Route path="/workspaces" element={<Workspaces />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/users" element={<Users />} />
              </Routes>
            </main>
          </div>
          <Toaster />
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
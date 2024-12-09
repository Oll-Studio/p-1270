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

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Router>
          <div className="flex h-screen bg-background">
            <Routes>
              <Route path="/signup" element={<SignIn />} />
              <Route path="/signin" element={<SignIn />} />
              <Route
                path="/"
                element={
                  <>
                    <Sidebar />
                    <div className="flex-1 pl-64">
                      <main className="h-full overflow-y-auto">
                        <div className="container mx-auto p-8">
                          <Index />
                        </div>
                      </main>
                    </div>
                  </>
                }
              />
              <Route
                path="/workspaces"
                element={
                  <>
                    <Sidebar />
                    <div className="flex-1 pl-64">
                      <main className="h-full overflow-y-auto">
                        <div className="container mx-auto p-8">
                          <Workspaces />
                        </div>
                      </main>
                    </div>
                  </>
                }
              />
              <Route
                path="/projects"
                element={
                  <>
                    <Sidebar />
                    <div className="flex-1 pl-64">
                      <main className="h-full overflow-y-auto">
                        <div className="container mx-auto p-8">
                          <Projects />
                        </div>
                      </main>
                    </div>
                  </>
                }
              />
              <Route
                path="/profile"
                element={
                  <>
                    <Sidebar />
                    <div className="flex-1 pl-64">
                      <main className="h-full overflow-y-auto">
                        <div className="container mx-auto p-8">
                          <Profile />
                        </div>
                      </main>
                    </div>
                  </>
                }
              />
              <Route
                path="/settings"
                element={
                  <>
                    <Sidebar />
                    <div className="flex-1 pl-64">
                      <main className="h-full overflow-y-auto">
                        <div className="container mx-auto p-8">
                          <Settings />
                        </div>
                      </main>
                    </div>
                  </>
                }
              />
              <Route
                path="/analytics"
                element={
                  <>
                    <Sidebar />
                    <div className="flex-1 pl-64">
                      <main className="h-full overflow-y-auto">
                        <div className="container mx-auto p-8">
                          <Analytics />
                        </div>
                      </main>
                    </div>
                  </>
                }
              />
              <Route
                path="/notifications"
                element={
                  <>
                    <Sidebar />
                    <div className="flex-1 pl-64">
                      <main className="h-full overflow-y-auto">
                        <div className="container mx-auto p-8">
                          <Notifications />
                        </div>
                      </main>
                    </div>
                  </>
                }
              />
              <Route
                path="/transactions"
                element={
                  <>
                    <Sidebar />
                    <div className="flex-1 pl-64">
                      <main className="h-full overflow-y-auto">
                        <div className="container mx-auto p-8">
                          <Transactions />
                        </div>
                      </main>
                    </div>
                  </>
                }
              />
            </Routes>
          </div>
          <Toaster />
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
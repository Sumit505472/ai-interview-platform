import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { Landing } from "./pages/Landing/Landing";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { PlaceholderPage } from "./pages/PlaceholderPage";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Resume } from "./pages/Resume/Resume";
import { ResumeAnalysis } from "./pages/ResumeAnalysis/ResumeAnalysis";
export default function App() {
  const applicationRoutes = [
    ["/resume", "Resume", "Resume management coming next."],
    ["/interviews", "Interviews", "Interview practice coming next."],
    ["/practice", "Practice", "Practice sessions coming next."],
    ["/history", "History", "Your practice history is coming next."],
    ["/profile", "Settings", "Profile and settings are coming next."],
  ];

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resume/:id/analysis" element={<ResumeAnalysis />} />
        <Route path="/resume/:id" element={<Resume />} />
        {applicationRoutes.map(([path, title, description]) => (
          <Route
            key={path}
            path={path}
            element={
              <PlaceholderPage
                eyebrow="Workspace"
                title={title}
                description={description}
              />
            }
          />
        ))}
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

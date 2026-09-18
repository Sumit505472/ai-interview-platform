import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { Landing } from "./pages/Landing/Landing";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Resume } from "./pages/Resume/Resume";
import { ResumeAnalysis } from "./pages/ResumeAnalysis/ResumeAnalysis";
import { PlaceholderPage } from "./pages/PlaceholderPage";
import api from "./services/api";
export default function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/auth/me")
      .then(({ data }) => setUser(data.user || data))
      .catch(() => setUser(null))
      .finally(() => setAuthLoading(false));
  }, []);

  const protectedRoutes = !authLoading && user ? (
    <Route element={<AppLayout user={user} setUser={setUser} />}>
      {" "}
      <Route path="/dashboard" element={<Dashboard user={user} />} />{" "}
      <Route path="/resume" element={<Resume />} />{" "}
      <Route path="/resume/:id/analysis" element={<ResumeAnalysis />} />{" "}
      <Route path="/resume/:id" element={<Resume />} />{" "}
      <Route
        path="/interviews"
        element={
          <PlaceholderPage
            title="Interview room"
            eyebrow="Coming next"
            description="Your interview practice workspace will live here."
          />
        }
      />{" "}
      <Route
        path="/history"
        element={
          <PlaceholderPage
            title="Your progress, in one view"
            eyebrow="History"
            description="Past practice sessions will appear here once you start interviewing."
          />
        }
      />{" "}
      <Route
        path="/profile"
        element={
          <PlaceholderPage
            title="Profile & preferences"
            eyebrow="Settings"
            description="Personalize your preparation workspace."
          />
        }
      />{" "}
    </Route>
  ) : null;
  return (
    <Routes>
      {" "}
      <Route path="/" element={<Landing />} />{" "}
      <Route path="/login" element={<Login onAuth={setUser} />} />{" "}
      <Route path="/register" element={<Register onAuth={setUser} />} />{" "}
      {protectedRoutes}{" "}
      <Route
        path="*"
        element={
          authLoading ? null : <Navigate to={user ? "/dashboard" : "/"} replace />
        }
      />{" "}
    </Routes>
  );
}

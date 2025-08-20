import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/globals.css";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import SendEmail from "./pages/SendEmail";
import { ListEmail } from "./pages/ListEmail";
import ProtectedRoute from "./routes/ProtectedRoute";
import LogsPage from "./pages/LogsPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/send-email"
            element={
              <ProtectedRoute>
                <SendEmail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/list-email"
            element={
              <ProtectedRoute>
                <ListEmail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/logs"
            element={
              <ProtectedRoute>
                <LogsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/globals.css";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import EmailBuilder from "./components/EmailBuilder";
import SendEmail from "./pages/SendEmail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/send-email" element={<SendEmail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/globals.css";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import SendEmail from "./pages/SendEmail";
import { ListEmail } from "./pages/ListEmail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/send-email" element={<SendEmail />} />
          <Route path="/send-email" element={<SendEmail />} />
          <Route path="/list-email" element={<ListEmail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

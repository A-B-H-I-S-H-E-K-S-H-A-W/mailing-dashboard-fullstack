import EmailBuilder from "../components/EmailBuilder";
import DashboardPage from "./DashboardPage";

const SendEmail = () => {
  return (
    <div>
      <DashboardPage>
        <EmailBuilder />
      </DashboardPage>
    </div>
  );
};

export default SendEmail;

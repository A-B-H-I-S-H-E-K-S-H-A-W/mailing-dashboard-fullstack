import useEmailStore from "../store/emailStroe";
import DashboardPage from "./DashboardPage";

const LogsPage = () => {
  const results = useEmailStore((state) => state.results);
  console.log(results);

  return (
    <>
      <DashboardPage>
        <div className="p-5">
          <h1 className="text-4xl font-bold pb-10">All send emails logs</h1>
          <div className="flex flex-col w-full min-h-40">
            {results.map((item) => (
              <div
                key={item.recipient}
                className="text-foreground border-4 p-4 rounded-2xl"
              >
                <h4 className="text-xl font-semibold mb-3">
                  Recipient: {item.recipient}
                </h4>
                <p className="text-base text-primary">
                  <span className="text-foreground">Message:</span>{" "}
                  {item.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </DashboardPage>
    </>
  );
};

export default LogsPage;

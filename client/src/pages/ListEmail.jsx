import { useEffect, useState } from "react";
import useEmailStore from "../store/emailStroe";
import DashboardPage from "./DashboardPage";
import { InputDailogBox } from "../components/ui/InputDailogBox";
import { ConfirmDialog } from "../components/dialog-box";
import { Trash2 } from "lucide-react";
import { ToasterMain } from "../components/Toaster";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/store";
import Loader from "../components/ui/Loader";

export function ListEmail() {
  const [data, setData] = useState(null);
  const fetchEmail = useEmailStore((state) => state.fetchEmail);
  const loading = useUserStore((state) => state.loading);
  const deleteEmail = useEmailStore((state) => state.deleteEmail);
  const navigate = useNavigate();

  const fetchEmailData = async () => {
    try {
      const response = await fetchEmail();

      if (response.success) {
        setData(response.emailData);
      } else {
        console.log("Error fetching data");
      }
    } catch (error) {
      console.log("Error fetching email :::::", error);
      ToasterMain("Failed to fetch email", "Error", false);
    }
  };

  const handleDelete = async (id) => {
    try {
      useUserStore.setState({ loading: true });
      const response = await deleteEmail(id);

      if (response.success) {
        ToasterMain(
          response?.message,
          "Email deleted successfully",
          response?.success,
          "/list-email",
          navigate
        );

        fetchEmailData();
      } else {
        ToasterMain(
          response?.message,
          "Can't delete email",
          response?.success,
          "/list-email",
          navigate
        );
      }
    } catch (error) {
      console.log("Error deleting email :::::", error);
      ToasterMain("Failed to delete email", "Error", false);
    } finally {
      useUserStore.setState({ loading: false });
    }
  };

  useEffect(() => {
    fetchEmailData();
  }, []);

  return (
    <DashboardPage>
      <div className="p-4">
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-background">
            <thead className="bg-accent">
              <tr>
                <th className="px-8 py-6 text-left">Title</th>
                <th className="px-8 py-6 text-left">Html</th>
                <th className="px-8 py-6 text-center">Send Email</th>
                <th className="px-8 py-6 text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {!data || data.length === 0 ? (
                <>
                  <tr className="border-t hover:bg-accent transition-colors border">
                    <td className="px-8 py-6">No data found</td>
                  </tr>
                </>
              ) : (
                <>
                  {data?.map((row) => (
                    <tr
                      key={row._id}
                      className="border-t hover:bg-accent transition-colors border"
                    >
                      <td className="px-8 py-6">{row.title}</td>
                      <td className="px-8 py-6 truncate max-w-[150px]">
                        {row.html}
                      </td>
                      <td className="px-8 py-6 text-center">
                        <InputDailogBox emailData={row} />
                      </td>
                      <td className="px-8 py-6 text-center">
                        <ConfirmDialog
                          title={"Warning"}
                          description={
                            "Do you really want to delete this email template"
                          }
                          confirmLable="Delete"
                          confirmVarient="destructive"
                          triggerLabel={"Delete"}
                          variant="destructive"
                          triggerIcon={Trash2}
                          onConfirm={() => handleDelete(row._id)}
                          loading={loading}
                          Loader={Loader}
                        />
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardPage>
  );
}

export default ListEmail;

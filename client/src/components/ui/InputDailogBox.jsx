export function InputDailogBox({ open, setOpen, emailData }) {
  const loading = useUserStore((state) => state.loading);
  const [subject, setSubject] = useState("");
  const [recipient, setRecipient] = useState("");
  const [recipients, setRecipients] = useState([]);

  const handleSubmit = async () => {
    try {
      useUserStore.setState({ loading: true });

      const response = await sendEmail(
        subject,
        recipients,
        emailData?.html, // <-- html from clicked row
        emailData?.title // <-- title from clicked row
      );

      if (response.success) {
        ToasterMain(
          response.message,
          "Email sent Successfully",
          true,
          "/logs",
          navigate
        );
      } else {
        ToasterMain(
          response.message,
          "Failed to send email",
          false,
          "/logs",
          navigate
        );
      }
    } catch (error) {
      console.log("Error sending email :::::", error);
      ToasterMain("Failed to send email", "Error", false);
    } finally {
      useUserStore.setState({ loading: false });
      setOpen(false); // close dialog after sending
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send Email - {emailData?.title}</DialogTitle>
          <DialogDescription>
            You are about to send this saved email template.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              type="text"
              placeholder="Enter email subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="email">To</Label>
            <div className="flex gap-2">
              <Input
                id="email"
                type="email"
                placeholder="Enter recipient email"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
              <Button
                type="button"
                onClick={() => {
                  if (recipient) {
                    setRecipients([...recipients, recipient]);
                    setRecipient("");
                  }
                }}
              >
                Add
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {recipients.map((email, idx) => (
              <span
                key={idx}
                className="flex items-center bg-gray-200 px-2 py-1 rounded-full text-sm"
              >
                {email}
                <button
                  onClick={() =>
                    setRecipients(recipients.filter((r) => r !== email))
                  }
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit}>
            {loading ? <Loader /> : "Send Email"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

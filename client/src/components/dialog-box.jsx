import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LogOut } from "lucide-react";
import useUserStore from "../store/store";
import { Navigate, useNavigate } from "react-router-dom";

export function DialogBox() {
  const navigate = useNavigate();
  const logout = useUserStore((state) => state.logout);
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Dialog>
      <div>
        <DialogTrigger asChild>
          <Button variant="outline">
            <LogOut />
            Log out
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Warning</DialogTitle>
            <DialogDescription>Do you really want to logout.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleLogout} variant="destructive" type="submit">
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  );
}

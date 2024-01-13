"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";

import useDisclosure from "@/hooks/useDisclosure";
import { DialogClose } from "@radix-ui/react-dialog";
import { XCircleIcon } from "lucide-react";
import { useLeaderboard } from "@/hooks/api/useLeaderboard";
import LeaderBoardTable from "./LeaderboardTable";
import { useUsers } from "@/hooks/api/useUsers";

type ModalBubbleProps = {
  open: () => void;
};

const ModalBubble = ({ open }: ModalBubbleProps) => {
  return (
    <div
      onClick={open}
      className="cursor-pointer bg-gradient-to-r from-green-200 font-semibold to-gray-500 absolute bottom-8 flex justify-center items-center rounded-full right-8 w-16 h-16 text-white"
    >
      Stats
    </div>
  );
};

type StatsModalProps = {
  isOpen: boolean;
  close: () => void;
};

const StatsModal = ({ isOpen, close }: StatsModalProps) => {
  const { fullLeaderboard } = useLeaderboard();
  const { data } = useUsers();

  const usersWithoutPoints =
    data?.filter((user) => !fullLeaderboard.some((leaderboardUser) => leaderboardUser.userId === user.userId)) || [];
  return (
    <Dialog open={isOpen}>
      <DialogContent className="px-0 py-8 bg-gradient-to-r from-green-100 rounded-lg h-[90svh] overflow-y-auto font-semibold to-gray-500 text-white border-0 max-w-[95vw] w-[600px] scale-100 lg:scale-110">
        <DialogHeader>
          <div className="relative flex flex-col items-center gap-8">
            <DialogTitle>Full Leaderboard</DialogTitle>

            <DialogClose onClick={close} className="absolute right-8 top-0">
              <XCircleIcon />
            </DialogClose>
            <LeaderBoardTable usersWithoutPoints={usersWithoutPoints} leaderboard={fullLeaderboard} currPoints={0} />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

const AdminDataModal = () => {
  const { close, isOpen, open } = useDisclosure();
  return (
    <>
      <ModalBubble open={open} />
      <StatsModal isOpen={isOpen} close={close} />
    </>
  );
};

export default AdminDataModal;

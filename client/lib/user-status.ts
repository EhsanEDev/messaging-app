import { UserStatus } from "@/shared/types";
import { formatLastSeen } from "./date-fns";

export const formatStatus = (status: UserStatus | null) => {
  if (!status) return "last seen recently";
  return status.isOnline
    ? "online"
    : (status.lastSeenAt
    ? formatLastSeen(new Date(status.lastSeenAt))
    : "last seen recently");
};
export const isOnlineInDirect = (status: string | null): boolean | undefined => {
  return !status ? undefined : status === "online";
};

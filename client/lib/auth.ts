import { User } from "@/constants/types";

export const getCurrentUser = (): User => {
  return {
    id: "0",
    name: "Ehsan",
    avatarUrl: "https://i.pravatar.cc/150?img=0",
  };
}

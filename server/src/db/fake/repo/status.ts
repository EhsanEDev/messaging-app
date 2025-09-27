import type { UserStatus } from "@/shared/types.js";

const StatusMap: Record<string, UserStatus> = {};

export const StatusRepo = {
  getAll() {
    return Object.values(StatusMap);
  },

  findByUserId(userId: string) {
    return StatusMap[userId] || null;
  },

  setOnline(userId: string): void {
    StatusMap[userId] = {
      id: userId,
      isOnline: true,
      lastSeenAt: null,
    };
  },

  setOffline(userId: string): string {
    const status = (StatusMap[userId] = {
      id: userId,
      isOnline: false,
      lastSeenAt: String(new Date()),
    });
    return status.lastSeenAt;
  },
};

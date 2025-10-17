import { EmailOTP } from "@/shared/types.js";

const OTPs: Record<string, EmailOTP> = {};

export const OTPRepo = {
  add(data: EmailOTP): void {
    OTPs[data.email] = data;
  },

  delete(email: string): void {
    delete OTPs[email];
  },

  findByEmail(email: string): EmailOTP | undefined {
    return OTPs[email];
  },
};

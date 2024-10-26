import "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      role: "user";
      authenticated: boolean;
      username: string;
      first_name: string;
      last_name: string;
      email: string;
      image: IFile | null;
      permissions: string[];
      _id: string;
      phone: string;
      email_verified: string;
      is_banned: string;
      address: string;
      data: {
        access_token: JWT;
        refresh_token: string;
        iat: number;
        exp: number;
      };
    };
  }
}

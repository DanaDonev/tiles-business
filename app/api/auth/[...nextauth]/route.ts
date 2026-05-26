// import NextAuth from "next-auth";
// import { authOptions } from "@/lib/auth";

// export const { handlers, auth } = NextAuth(authOptions);
// export const { GET, POST } = handlers;
import { handlers } from "@/auth";

export const { GET, POST } = handlers;
// // import CredentialsProvider from "next-auth/providers/credentials";
// import { supabaseServer, db } from "./supabaseClient";

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Email and password required");
//         }

//         const { data, error } = await supabaseServer.auth.signInWithPassword({
//           email: credentials.email,
//           password: credentials.password,
//         });

//         if (error || !data.user) {
//           throw new Error("Invalid email or password");
//         }

//         const { data: userProfile } = await db
//           .from("users")
//           .select("*")
//           .eq("id", data.user.id)
//           .single();

//         return {
//           id: data.user.id,
//           email: data.user.email,
//           name: userProfile?.name || data.user.user_metadata?.name,
//         };
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/auth/login",
//     error: "/auth/login",
//   },
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

import CredentialsProvider from "next-auth/providers/credentials";
import { supabaseServer, db } from "./supabaseClient";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (typeof email !== "string" || typeof password !== "string") {
          throw new Error("Email and password required");
        }
        // if (!credentials?.email || !credentials?.password) {
        //   throw new Error("Email and password required");
        // }

        const { data, error } = await supabaseServer.auth.signInWithPassword({
          email,
          password
        });

        if (error || !data.user) {
          throw new Error("Invalid email or password");
        }

        const { data: userProfile } = await supabaseServer
          .from("users")
          .select("*")
          .eq("id", data.user.id)
          .single();

        return {
          id: data.user.id,
          email: data.user.email,
          name: userProfile?.name || data.user.user_metadata?.name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
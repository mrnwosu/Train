import NextAuth from "next-auth";

import { authOptions } from "~/server/auth";



authOptions.pages = {
    signIn: "/auth/signin",
    // signOut: "/auth/signout",
    // error: "/auth/error",
    // verifyRequest: "/auth/verify-request",
    // newUser: "/auth/new-user",
    };

export default NextAuth(authOptions);

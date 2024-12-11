import NextAuth from "next-auth";

import { authConfig } from "~/server/auth/config";



authConfig.pages = {
    signIn: "/auth/signin",
    // signOut: "/auth/signout",
    // error: "/auth/error",
    // verifyRequest: "/auth/verify-request",
    // newUser: "/auth/new-user",
    };

export default NextAuth(authConfig);

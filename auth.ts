import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "@/lib/zod";
// Your own logic for dealing with plaintext password strings; be careful!
// import { saltAndHashPassword } from "@/utils/password";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {
                    type: "email",
                    label: "Email",
                },
                password: {
                    type: "password",
                    label: "Password",
                },
            },

            authorize: async (credentials) => {
                const parsedCredentials =
                    await signInSchema.safeParseAsync(credentials);

                parsedCredentials.data;

                if (parsedCredentials.success) {
                    console.log(parsedCredentials.data);
                }

                return null;
            },
        }),
    ],
});

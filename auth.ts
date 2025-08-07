import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "@/auth.config";
import { signInSchema } from "@/lib/zod";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
// Your own logic for dealing with plaintext password strings; be careful!
// import { saltAndHashPassword } from "@/utils/password";

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(prisma),
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

                if (!parsedCredentials.success) {
                    parsedCredentials.error;
                } else {
                    const { email, password } = parsedCredentials.data;
                    const user = await prisma.user.findUnique({
                        where: {
                            email,
                        },
                    });

                    if (!user) {
                        return null;
                    }

                    const passwordsMatch = await bcrypt.compare(
                        password,
                        user.password,
                    );

                    if (passwordsMatch) {
                        return user;
                    }
                }

                return null;
            },
        }),
    ],
});

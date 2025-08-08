import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "@/auth.config";
import { signInSchema } from "@/lib/zod";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
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

                console.log("Invalid credentials");

                return null;
            },
        }),
    ],
});

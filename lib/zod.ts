import { z } from "zod";

export const signInSchema = z.object({
    email: z.email({ message: "Please enter a valid email." }).trim(),
    password: z.string().min(6),
});

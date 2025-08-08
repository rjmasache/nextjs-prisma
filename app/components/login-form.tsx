"use client";

import { useActionState } from "react";
import { authenticate } from "@/app/utils/actions";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
    const searchParams = useSearchParams();
    const callbackUrl =
        searchParams.get("callbackUrl") || "/dashboard-designer";
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );

    return (
        <form
            action={formAction}
            className="flex flex-col items-center justify-center gap-5"
        >
            <label>
                Email
                <input
                    id="email"
                    name="email"
                    type="email"
                    className="m-5 rounded-sm border-[0.5]"
                />
            </label>
            <label>
                Password
                <input
                    id="password"
                    name="password"
                    type="password"
                    className="m-5 rounded-sm border-[0.5]"
                />
            </label>
            <input type="hidden" name="redirectTo" value={callbackUrl} />
            <button
                type="submit"
                className="cursor-pointer rounded-sm border-[0.5] bg-black px-5 py-2 text-sm text-white"
                aria-disabled={isPending}
            >
                Sign In
            </button>
            {errorMessage && (
                <>
                    <p className="text-sm text-red-500">{errorMessage}</p>
                </>
            )}
        </form>
    );
}

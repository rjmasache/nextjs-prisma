import { Suspense } from "react";
import LoginForm from "@/app/components/login-form";

export default function Page() {
    return (
        <>
            <h1 className="text-center text-3xl">Welcome</h1>
            <Suspense>
                <LoginForm />
            </Suspense>
        </>
    );
}

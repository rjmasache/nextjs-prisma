import { Suspense } from "react";
import LoginForm from "@/app/components/login-form";

export default function Page() {
    return (
        <>
            <div>Welcome</div>
            <Suspense>
                <LoginForm />
            </Suspense>
        </>
    );
}

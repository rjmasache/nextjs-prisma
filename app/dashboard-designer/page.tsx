import { signOut } from "@/auth";

export default function Page() {
    return (
        <>
            <h1>Welcome to Dashboard</h1>
            <SignOut />
        </>
    );
}

export function SignOut() {
    return (
        <form
            action={async () => {
                "use server";
                await signOut();
            }}
        >
            <button type="submit">Sign Out</button>
        </form>
    );
}

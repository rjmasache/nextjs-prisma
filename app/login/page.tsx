import { signIn } from "@/auth";

export default function Page() {
    return (
        <form
            action={async (formData) => {
                "use server";
                await signIn("credentials", formData);
            }}
            className="flex flex-col items-center justify-center gap-5"
        >
            <label>
                Email
                <input
                    name="email"
                    type="email"
                    className="m-5 rounded-sm border-[0.5]"
                />
            </label>
            <label>
                Password
                <input
                    name="password"
                    type="password"
                    className="m-5 rounded-sm border-[0.5]"
                />
            </label>
            <button className="rounded-sm border-[0.5] bg-black p-2 text-sm text-white">
                Sign In
            </button>
        </form>
    );
}

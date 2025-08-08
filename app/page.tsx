import Link from "next/link";

export default function Page() {
    return (
        <div className="-mt-16 flex min-h-screen flex-col items-center justify-center bg-gray-50">
            <h1 className="mb-8 font-[family-name:var(--font-geist-sans)] text-4xl font-bold text-[#333333]">
                Welcome to Edigenity
            </h1>
            <Link href="/login">
                <button className="cursor-pointer rounded-sm border-[0.5] bg-black p-2 text-white">
                    Iniciar sesión
                </button>
            </Link>
        </div>
    );
}

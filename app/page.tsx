import prisma from "@/lib/prisma";

export default async function Page() {
    const designer = await prisma.user.findMany({
        where: {
            email: "designer@email.com",
        },
    });

    return (
        <div className="-mt-16 flex min-h-screen flex-col items-center justify-center bg-gray-50">
            <h1 className="mb-8 font-[family-name:var(--font-geist-sans)] text-4xl font-bold text-[#333333]">
                Superblog
            </h1>
            <ol className="list-inside list-decimal font-[family-name:var(--font-geist-sans)]">
                {designer.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ol>
        </div>
    );
}

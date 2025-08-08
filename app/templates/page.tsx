import prisma from "@/lib/prisma";

export default async function Posts() {
    const templates = await prisma.template.findMany({
        include: {
            author: true,
        },
    });

    return (
        <div className="-mt-16 flex min-h-screen flex-col items-center justify-center bg-gray-50">
            <h1 className="mb-8 font-[family-name:var(--font-geist-sans)] text-4xl font-bold text-[#333333]">
                Fichas instruccionales
            </h1>
            <ul className="max-w-2xl space-y-4 font-[family-name:var(--font-geist-sans)]">
                {templates.map((template) => (
                    <li key={template.id}>
                        <span className="font-semibold">{template.title}</span>
                        <br />
                        <span className="font-semibold">{template.status}</span>
                        <br />
                        <span className="font-semibold">
                            {template.createdAt.toLocaleString()}
                        </span>
                        <br />
                        <span className="ml-2 text-sm text-gray-600">
                            by {template.author.name}
                        </span>
                        <br />
                        <span className="ml-2 text-sm text-gray-600">
                            email {template.author.email}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

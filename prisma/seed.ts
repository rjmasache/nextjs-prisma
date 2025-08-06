import {
    PrismaClient,
    Role,
    TemplateStatus,
} from "@/app/generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
    const designer = await prisma.user.upsert({
        where: { email: "designer@email.com" },
        update: {},
        create: {
            name: "Instructional designer",
            email: "designer@email.com",
            role: Role.DESIGNER,
        },
    });

    await prisma.template.upsert({
        where: { slug: "test-instructional-template" },
        update: {},
        create: {
            title: "Ficha instruccional de prueba",
            description: "Ficha instruccional de prueba para desarrollo",
            slug: "test-instructional-template",
            status: TemplateStatus.DRAFT,
            author: {
                connect: { id: designer.id },
            },
        },
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

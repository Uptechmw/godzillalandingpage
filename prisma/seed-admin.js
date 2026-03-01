const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const email = 'hello@sayhelo.app';
    const passwordHash = 'Codeking@95'; // In production, this MUST be hashed with bcrypt. 
    // Godzilla Coder currently uses direct comparison for admin passwords (to be hashed by user later).

    const superAdmin = await prisma.adminUser.upsert({
        where: { email },
        update: {
            role: 'SUPER_ADMIN',
            active: true
        },
        create: {
            email,
            passwordHash,
            role: 'SUPER_ADMIN',
            name: 'Godzilla SuperAdmin',
            active: true
        }
    });

    console.log(`[SEED] SuperAdmin created/updated: ${superAdmin.email}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

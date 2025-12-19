const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const now = new Date();
    // Set to 5 minutes ago to be sure
    now.setMinutes(now.getMinutes() - 5);

    await prisma.systemConfig.updateMany({
        data: {
            probStmtsLiveTime: now
        }
    });
    console.log("Updated probStmtsLiveTime to now (LIVE).");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

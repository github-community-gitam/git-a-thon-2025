const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding ...');

    
    // 3. Seed Users from CSV
    const csvPath = path.join(__dirname, '../teams.csv');
    try {
        const csvData = fs.readFileSync(csvPath, 'utf8');
        const lines = csvData.split('\n').filter(l => l.trim()).slice(1);

        const defaultPassword = "12345678";
        console.log(`Found ${lines.length} rows in CSV to process...`);

        let count = 0;
        let currentTeam = null;

        for (const line of lines) {
            // Simple CSV parser
            const values = [];
            let currentVal = '';
            let inQuote = false;
            for (let i = 0; i < line.length; i++) {
                const char = line[i];
                if (char === '"') {
                    inQuote = !inQuote;
                } else if (char === ',' && !inQuote) {
                    values.push(currentVal.trim());
                    currentVal = '';
                } else {
                    currentVal += char;
                }
            }
            values.push(currentVal.trim());

            // Columns: S No, Team Name, Names, Roll Number, Email ID, Phone Number, Attendance, Classroom alloted, Problem Statement
            // Index:   0     1          2      3            4         5             6           7                  8
            
            if (values.length < 5) continue; // Ensure enough columns

            const sNo = values[0];
            const teamName = values[1];
            const name = values[2];
            const rollNumber = values[3];
            const email = values[4];
            const phone = values[5];
            // const attendance = values[6];
            const classroom = values[7];
            // const problemStatement = values[8];

            // Handle Team Creation/Retrieval
            if (sNo && teamName) {
                // New Team or First Member of Team
                const teamIdString = sNo;
                
                // Check if team exists
                currentTeam = await prisma.team.findUnique({ where: { teamIdString } });
                
                if (!currentTeam) {
                    currentTeam = await prisma.team.create({
                        data: {
                            teamIdString,
                            name: teamName,
                            roomNumber: classroom || null,
                            // serialIndex will autoincrement
                        }
                    });
                } else {
                    // Update team details if needed (e.g. room number might have changed)
                     await prisma.team.update({
                        where: { id: currentTeam.id },
                        data: {
                            name: teamName,
                            roomNumber: classroom || null
                        }
                    });
                }
            }

            if (!email || !currentTeam) continue;

            // Upsert User
            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (!existingUser) {
                const newUser = await prisma.user.create({
                    data: {
                        email,
                        name: name?.replace(/"/g, '') || "Unknown",
                        password: defaultPassword,
                        phone,
                        year: rollNumber, // Mapping Roll Number to Year as a placeholder
                        role: "STUDENT",
                        status: "ABSENT",
                        teamId: currentTeam.id
                    }
                });
                count++;

                // If team has no leader, make this user the leader
                if (!currentTeam.leaderId) {
                     await prisma.team.update({
                        where: { id: currentTeam.id },
                        data: { leaderId: newUser.id }
                    });
                    // Update local object to avoid setting multiple leaders
                    currentTeam.leaderId = newUser.id;
                }
            }
        }
        console.log(`✅ Seeded ${count} students from CSV`);

    } catch (err) {
        console.error("Failed to read or parse CSV:", err.message);
    }


    console.log('✅ Admin and Volunteer seeded');

    console.log('Seeding finished.');
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

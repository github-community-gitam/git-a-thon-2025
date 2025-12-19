const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding ...');

    // 1. Seed System Config
    const launchTime = new Date();
    launchTime.setHours(launchTime.getHours() + 1); // Live in 1 hour by default

    await prisma.systemConfig.upsert({
        where: { id: 1 },
        update: {},
        create: {
            probStmtsLiveTime: launchTime,
            maxTeamPerProblem: 5,
            showLeaderboard: true,
        },
    });
    console.log('✅ System Config seeded');

    // 2. Seed Problem Statements
    const problems = [
        {
            title: "Smart Campus Issue Tracker",
            description: "Build a comprehensive platform for students and staff to report, track, and resolve campus issues efficiently. The system should support multimedia uploads, location tagging, and automated routing to relevant departments.\n\n**User Perspective:** As a student or staff member, I want to easily report campus issues so they can be resolved quickly and transparently without needing to follow up manually.\n\n**Deliverables:** A web and mobile application with reporting workflows, real-time tracking dashboards, and automated notification features.\n\n**Constraints:** Must comply with campus data privacy policies and be accessible to all users, including differently abled individuals.\n\n**Evaluation Criteria:** User adoption rate, average resolution time, stakeholder satisfaction levels, and security compliance."
        },
        {
            title: "AI Attendance Automation System",
            description: "Create a smart attendance management solution using facial recognition and secure user verification. The system should work in varied lighting conditions and handle large class sizes efficiently.\n\n**User Perspective:** As a faculty member, I want attendance to be automated so that class time is not wasted and records are error-free.\n\n**Deliverables:** AI-powered face detection module, secure attendance logging dashboard, attendance reports, and a teacher control panel.\n\n**Constraints:** Must ensure data privacy, avoid racial or gender bias in recognition, and provide fallback manual attendance options.\n\n**Evaluation Criteria:** Recognition accuracy, latency, robustness in real-world conditions, and usability feedback."
        },
        {
            title: "Campus Navigation & Accessibility App",
            description: "Build a dynamic campus navigation system that supports real-time directions, department search, accessibility-friendly routes, and building-level guidance for new students and visitors.\n\n**User Perspective:** As a new student, I want to navigate campus buildings easily so I don't get lost or late to my classes.\n\n**Deliverables:** Interactive campus map, indoor routing support, accessibility route options, and location-based notifications.\n\n**Constraints:** Indoor mapping accuracy and battery efficiency must be optimized for all devices.\n\n**Evaluation Criteria:** Route accuracy, app usability, accessibility compliance, and performance across devices."
        },
        {
            title: "Hostel Complaint & Maintenance Management",
            description: "Design a centralized solution to handle hostel maintenance issues, track resolution timelines, and allow warden-level approvals. Include automated reminders for unresolved complaints.\n\n**User Perspective:** As a hostel resident, I want to report issues like water leakage or WiFi downtime and be updated on their resolution.\n\n**Deliverables:** Complaint submission portal, warden dashboard, technician assignment system, and live status updates.\n\n**Constraints:** Must ensure tenant identity verification and quick load times even on slow connections.\n\n**Evaluation Criteria:** Average fix time, real-time responsiveness, and reduction in repeated complaints."
        },
        {
            title: "Library Book Recommendation & Availability System",
            description: "Create a smart library assistant that recommends books based on user preferences, tracks real-time book availability, and offers waitlist features with notifications.\n\n**User Perspective:** As a student, I want personalized book suggestions and easy access to availability status so I can plan my study routines.\n\n**Deliverables:** Recommendation engine, live availability tracker, waitlist & notification workflow, and admin management panel.\n\n**Constraints:** Database reads must be optimized to prevent slowdowns during peak usage.\n\n**Evaluation Criteria:** Recommendation accuracy, waitlist efficiency, and system reliability."
        },
        {
            title: "Smart Canteen Ordering & Queue Management",
            description: "Develop a system that allows students to pre-order food, reduces queue times, and provides real-time order preparation updates to improve the campus dining experience.\n\n**User Perspective:** As a student, I want to order food quickly without waiting long in queues during short breaks.\n\n**Deliverables:** Ordering interface, order status tracking, vendor dashboard, push notifications, and analytics for peak hours.\n\n**Constraints:** Must handle heavy usage during lunch hours without crashing or slowing down.\n\n**Evaluation Criteria:** Queue reduction percentage, vendor satisfaction, and order accuracy."
        },
        {
            title: "Eco-Friendly Campus Energy Monitoring Dashboard",
            description: "Build a real-time energy monitoring system that tracks electricity usage across buildings, identifies wastage patterns, and visualizes trends for university administrators.\n\n**User Perspective:** As a campus sustainability officer, I want to analyze energy data so I can propose initiatives to reduce waste.\n\n**Deliverables:** Energy monitoring dashboards, trend analysis charts, automated alerts for abnormal consumption, and a reporting module.\n\n**Constraints:** Data ingestion frequency must be optimized to avoid unnecessary server load.\n\n**Evaluation Criteria:** Data accuracy, dashboard clarity, and actionable insights discovered."
        },
        {
            title: "Campus Event Discovery & Participation App",
            description: "Develop a platform where students can discover events, register, join waitlists, receive reminders, and track event attendance.\n\n**User Perspective:** As a student, I want to easily find events relevant to my interests and register in one click.\n\n**Deliverables:** Event boards, registration workflows, personalized recommendations, and event analytics.\n\n**Constraints:** Must handle concurrent registrations and prevent double booking.\n\n**Evaluation Criteria:** Engagement rate, retention, and event attendance improvement."
        },
        {
            title: "Smart Bus Tracking & Route Optimization",
            description: "Create a system that tracks campus buses in real-time, predicts arrival times, and optimizes routes based on traffic patterns.\n\n**User Perspective:** As a commuter, I want accurate arrival times so I can plan my commute without waiting for long.\n\n**Deliverables:** GPS-based bus tracking, ETA prediction engine, driver dashboard, and route management tools.\n\n**Constraints:** GPS data refresh rates must be efficient and not drain mobile battery.\n\n**Evaluation Criteria:** Prediction accuracy, reduced wait time, and improved route efficiency."
        },
        {
            title: "Smart Timetable & Schedule Conflict Detector",
            description: "Build a smart timetable generator that automatically resolves class collisions, lab overlaps, and room availability conflicts.\n\n**User Perspective:** As an academic coordinator, I want an automated system so I don't spend hours resolving timetable issues.\n\n**Deliverables:** Timetable generation engine, conflict detection system, teacher availability module, and student view portal.\n\n**Constraints:** Algorithm must be efficient, especially for large batches and multiple departments.\n\n**Evaluation Criteria:** Conflict resolution accuracy, algorithm performance, and timetable clarity."
        },
        {
            title: "Placement Preparation & Mock Interview Portal",
            description: "Develop a platform that provides customized learning paths, coding assessments, mock interviews, and AI-based resume analysis.\n\n**User Perspective:** As a placement aspirant, I want guided preparation so I can focus on improving my weak areas.\n\n**Deliverables:** Learning modules, mock interview simulator, resume scoring engine, and personalized progress tracking.\n\n**Constraints:** AI feedback must be meaningful and not generic or repetitive.\n\n**Evaluation Criteria:** Accuracy of feedback, improvement metrics, and student engagement."
        },
        {
            title: "Lost & Found Automation System",
            description: "Build a simple platform where users can report lost or found items with photo evidence, location details, and contact preferences.\n\n**User Perspective:** As a student, I want a quick way to report lost items and find matching recovered items.\n\n**Deliverables:** Lost-found item catalog, matching algorithm, photo upload system, and moderation dashboard.\n\n**Constraints:** Duplicate item reports must be detected and merged automatically.\n\n**Evaluation Criteria:** Match accuracy, reporting speed, and user satisfaction."
        },
        {
            title: "Smart Lab Equipment Reservation System",
            description: "Create an equipment scheduling system that avoids double bookings, tracks usage history, and enforces time limits.\n\n**User Perspective:** As a student, I want to reserve lab equipment in advance so I can complete my experiments without delays.\n\n**Deliverables:** Reservation calendar, booking restrictions, admin controls, and usage analytics.\n\n**Constraints:** Must prevent overlapping reservations and ensure identity verification.\n\n**Evaluation Criteria:** Booking efficiency, reduced conflicts, and resource utilization."
        },
        {
            title: "Campus Health Center Appointment & Records System",
            description: "Build a digital appointment scheduler for the campus health center that stores visit history, prescriptions, and follow-up reminders.\n\n**User Perspective:** As a student, I want quick access to medical help without waiting in long queues.\n\n**Deliverables:** Appointment booking, doctor portal, health records system, and automated follow-up reminders.\n\n**Constraints:** Sensitive health data must follow strict security and encryption standards.\n\n**Evaluation Criteria:** Reduced wait times, improvement in follow-ups, and system reliability."
        },
        {
            title: "AI Study Companion & Note Summarizer",
            description: "Create an AI-powered assistant that summarizes lectures, generates flashcards, and helps students revise efficiently using their uploaded notes.\n\n**User Perspective:** As a student, I want quick summaries and revision aids so I can study smarter and retain more.\n\n**Deliverables:** Note summarizer, flashcard generator, progress tracker, and personalized study recommendations.\n\n**Constraints:** Summaries must be context-aware and avoid hallucinations or incorrect facts.\n\n**Evaluation Criteria:** Summary accuracy, student performance improvements, and long-term engagement."
        }
    ];

    for (const p of problems) {
        const existing = await prisma.problemStatement.findFirst({ where: { title: p.title } });
        if (existing) {
            console.log(`Updating problem: ${p.title}`);
            await prisma.problemStatement.update({
                where: { id: existing.id },
                data: { description: p.description }
            });
        } else {
            console.log(`Creating problem: ${p.title}`);
            await prisma.problemStatement.create({ data: p });
        }
    }
    console.log('✅ 15 Problem Statements seeded/updated');

    // 3. Seed Users from CSV
    const csvPath = path.join(__dirname, '../all teams.csv');
    try {
        const csvData = fs.readFileSync(csvPath, 'utf8');
        const lines = csvData.split('\n').filter(l => l.trim()).slice(1);

        const defaultPassword = await bcrypt.hash("12345678", 10);
        console.log(`Found ${lines.length} rows in CSV to process...`);

        let count = 0;
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

            if (values.length < 4) continue;

            // Columns: team_id,role,name,email,phone,college,year,github,created_at
            const [teamIdString, roleStr, name, email, phone, college, year, github, createdAt] = values;

            if (!email || !teamIdString) continue;

            // Upsert Team
            let team = await prisma.team.findUnique({ where: { teamIdString } });
            if (!team) {
                team = await prisma.team.create({
                    data: {
                        teamIdString,
                        // serialIndex will autoincrement
                    }
                });
            }

            // Upsert User
            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (!existingUser) {
                await prisma.user.create({
                    data: {
                        email,
                        name: name?.replace(/"/g, '') || "Unknown",
                        password: defaultPassword,
                        phone,
                        college,
                        year,
                        github,
                        role: "STUDENT",
                        status: "ABSENT", // New Enum default
                        teamId: team.id
                    }
                });
                count++;

                // Update leader
                if (roleStr?.toLowerCase().includes('leader')) {
                    const newUser = await prisma.user.findUnique({ where: { email } });
                    await prisma.team.update({
                        where: { id: team.id },
                        data: { leaderId: newUser.id }
                    });
                }
            }
        }
        console.log(`✅ Seeded ${count} students from CSV`);

    } catch (err) {
        console.error("Failed to read or parse CSV:", err.message);
    }

    // 4. Seed Admin/Volunteer
    await prisma.user.upsert({
        where: { email: 'admin@gitathon.com' },
        update: {},
        create: {
            email: 'admin@gitathon.com',
            name: 'Super Admin',
            password: await bcrypt.hash("gitathon2025", 10),
            role: 'ADMIN',
            status: "ABSENT"
        }
    });

    await prisma.user.upsert({
        where: { email: 'volunteer@gitathon.com' },
        update: {},
        create: {
            email: 'volunteer@gitathon.com',
            name: 'Volunteer One',
            password: await bcrypt.hash("gitathon2025", 10),
            role: 'VOLUNTEER',
            status: "ABSENT"
        }
    });
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

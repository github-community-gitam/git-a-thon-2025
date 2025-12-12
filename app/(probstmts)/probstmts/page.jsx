"use client"; // if this is a client component (Next 13+ app router)

import React, { useState } from "react";
import Navbar from "@/components/Navbar";

export default function ProbStmtsPage() {
  const [selectedCard, setSelectedCard] = useState(null);

  const cards = [
  {
  id: 1,
  title: "Smart Campus Issue Tracker",
  overview:
    "Build a comprehensive platform for students and staff to report, track, and resolve campus issues efficiently. The system should support multimedia uploads, location tagging, and automated routing to relevant departments.",
  userPerspective:
    "As a student or staff member, I want to easily report campus issues so they can be resolved quickly and transparently without needing to follow up manually.",
  deliverables:
    "A web and mobile application with reporting workflows, real-time tracking dashboards, and automated notification features.",
  constraints:
    "Must comply with campus data privacy policies and be accessible to all users, including differently abled individuals.",
  evaluationCriteria:
    "User adoption rate, average resolution time, stakeholder satisfaction levels, and security compliance.",
},
{
  id: 2,
  title: "AI Attendance Automation System",
  overview:
    "Create a smart attendance management solution using facial recognition and secure user verification. The system should work in varied lighting conditions and handle large class sizes efficiently.",
  userPerspective:
    "As a faculty member, I want attendance to be automated so that class time is not wasted and records are error-free.",
  deliverables:
    "AI-powered face detection module, secure attendance logging dashboard, attendance reports, and a teacher control panel.",
  constraints:
    "Must ensure data privacy, avoid racial or gender bias in recognition, and provide fallback manual attendance options.",
  evaluationCriteria:
    "Recognition accuracy, latency, robustness in real-world conditions, and usability feedback.",
},
{
  id: 3,
  title: "Campus Navigation & Accessibility App",
  overview:
    "Build a dynamic campus navigation system that supports real-time directions, department search, accessibility-friendly routes, and building-level guidance for new students and visitors.",
  userPerspective:
    "As a new student, I want to navigate campus buildings easily so I don't get lost or late to my classes.",
  deliverables:
    "Interactive campus map, indoor routing support, accessibility route options, and location-based notifications.",
  constraints:
    "Indoor mapping accuracy and battery efficiency must be optimized for all devices.",
  evaluationCriteria:
    "Route accuracy, app usability, accessibility compliance, and performance across devices.",
},
{
  id: 4,
  title: "Hostel Complaint & Maintenance Management",
  overview:
    "Design a centralized solution to handle hostel maintenance issues, track resolution timelines, and allow warden-level approvals. Include automated reminders for unresolved complaints.",
  userPerspective:
    "As a hostel resident, I want to report issues like water leakage or WiFi downtime and be updated on their resolution.",
  deliverables:
    "Complaint submission portal, warden dashboard, technician assignment system, and live status updates.",
  constraints:
    "Must ensure tenant identity verification and quick load times even on slow connections.",
  evaluationCriteria:
    "Average fix time, real-time responsiveness, and reduction in repeated complaints.",
},
{
  id: 5,
  title: "Library Book Recommendation & Availability System",
  overview:
    "Create a smart library assistant that recommends books based on user preferences, tracks real-time book availability, and offers waitlist features with notifications.",
  userPerspective:
    "As a student, I want personalized book suggestions and easy access to availability status so I can plan my study routines.",
  deliverables:
    "Recommendation engine, live availability tracker, waitlist & notification workflow, and admin management panel.",
  constraints:
    "Database reads must be optimized to prevent slowdowns during peak usage.",
  evaluationCriteria:
    "Recommendation accuracy, waitlist efficiency, and system reliability.",
},
{
  id: 6,
  title: "Smart Canteen Ordering & Queue Management",
  overview:
    "Develop a system that allows students to pre-order food, reduces queue times, and provides real-time order preparation updates to improve the campus dining experience.",
  userPerspective:
    "As a student, I want to order food quickly without waiting long in queues during short breaks.",
  deliverables:
    "Ordering interface, order status tracking, vendor dashboard, push notifications, and analytics for peak hours.",
  constraints:
    "Must handle heavy usage during lunch hours without crashing or slowing down.",
  evaluationCriteria:
    "Queue reduction percentage, vendor satisfaction, and order accuracy.",
},
{
  id: 7,
  title: "Eco-Friendly Campus Energy Monitoring Dashboard",
  overview:
    "Build a real-time energy monitoring system that tracks electricity usage across buildings, identifies wastage patterns, and visualizes trends for university administrators.",
  userPerspective:
    "As a campus sustainability officer, I want to analyze energy data so I can propose initiatives to reduce waste.",
  deliverables:
    "Energy monitoring dashboards, trend analysis charts, automated alerts for abnormal consumption, and a reporting module.",
  constraints:
    "Data ingestion frequency must be optimized to avoid unnecessary server load.",
  evaluationCriteria:
    "Data accuracy, dashboard clarity, and actionable insights discovered.",
},
{
  id: 8,
  title: "Campus Event Discovery & Participation App",
  overview:
    "Develop a platform where students can discover events, register, join waitlists, receive reminders, and track event attendance.",
  userPerspective:
    "As a student, I want to easily find events relevant to my interests and register in one click.",
  deliverables:
    "Event boards, registration workflows, personalized recommendations, and event analytics.",
  constraints:
    "Must handle concurrent registrations and prevent double booking.",
  evaluationCriteria:
    "Engagement rate, retention, and event attendance improvement.",
},
{
  id: 9,
  title: "Smart Bus Tracking & Route Optimization",
  overview:
    "Create a system that tracks campus buses in real-time, predicts arrival times, and optimizes routes based on traffic patterns.",
  userPerspective:
    "As a commuter, I want accurate arrival times so I can plan my commute without waiting for long.",
  deliverables:
    "GPS-based bus tracking, ETA prediction engine, driver dashboard, and route management tools.",
  constraints:
    "GPS data refresh rates must be efficient and not drain mobile battery.",
  evaluationCriteria:
    "Prediction accuracy, reduced wait time, and improved route efficiency.",
},
{
  id: 10,
  title: "Smart Timetable & Schedule Conflict Detector",
  overview:
    "Build a smart timetable generator that automatically resolves class collisions, lab overlaps, and room availability conflicts.",
  userPerspective:
    "As an academic coordinator, I want an automated system so I don't spend hours resolving timetable issues.",
  deliverables:
    "Timetable generation engine, conflict detection system, teacher availability module, and student view portal.",
  constraints:
    "Algorithm must be efficient, especially for large batches and multiple departments.",
  evaluationCriteria:
    "Conflict resolution accuracy, algorithm performance, and timetable clarity.",
},
{
  id: 11,
  title: "Placement Preparation & Mock Interview Portal",
  overview:
    "Develop a platform that provides customized learning paths, coding assessments, mock interviews, and AI-based resume analysis.",
  userPerspective:
    "As a placement aspirant, I want guided preparation so I can focus on improving my weak areas.",
  deliverables:
    "Learning modules, mock interview simulator, resume scoring engine, and personalized progress tracking.",
  constraints:
    "AI feedback must be meaningful and not generic or repetitive.",
  evaluationCriteria:
    "Accuracy of feedback, improvement metrics, and student engagement.",
},
{
  id: 12,
  title: "Lost & Found Automation System",
  overview:
    "Build a simple platform where users can report lost or found items with photo evidence, location details, and contact preferences.",
  userPerspective:
    "As a student, I want a quick way to report lost items and find matching recovered items.",
  deliverables:
    "Lost-found item catalog, matching algorithm, photo upload system, and moderation dashboard.",
  constraints:
    "Duplicate item reports must be detected and merged automatically.",
  evaluationCriteria:
    "Match accuracy, reporting speed, and user satisfaction.",
},
{
  id: 13,
  title: "Smart Lab Equipment Reservation System",
  overview:
    "Create an equipment scheduling system that avoids double bookings, tracks usage history, and enforces time limits.",
  userPerspective:
    "As a student, I want to reserve lab equipment in advance so I can complete my experiments without delays.",
  deliverables:
    "Reservation calendar, booking restrictions, admin controls, and usage analytics.",
  constraints:
    "Must prevent overlapping reservations and ensure identity verification.",
  evaluationCriteria:
    "Booking efficiency, reduced conflicts, and resource utilization.",
},
{
  id: 14,
  title: "Campus Health Center Appointment & Records System",
  overview:
    "Build a digital appointment scheduler for the campus health center that stores visit history, prescriptions, and follow-up reminders.",
  userPerspective:
    "As a student, I want quick access to medical help without waiting in long queues.",
  deliverables:
    "Appointment booking, doctor portal, health records system, and automated follow-up reminders.",
  constraints:
    "Sensitive health data must follow strict security and encryption standards.",
  evaluationCriteria:
    "Reduced wait times, improvement in follow-ups, and system reliability.",
},
{
  id: 15,
  title: "AI Study Companion & Note Summarizer",
  overview:
    "Create an AI-powered assistant that summarizes lectures, generates flashcards, and helps students revise efficiently using their uploaded notes.",
  userPerspective:
    "As a student, I want quick summaries and revision aids so I can study smarter and retain more.",
  deliverables:
    "Note summarizer, flashcard generator, progress tracker, and personalized study recommendations.",
  constraints:
    "Summaries must be context-aware and avoid hallucinations or incorrect facts.",
  evaluationCriteria:
    "Summary accuracy, student performance improvements, and long-term engagement.",
}

  ];
  return (
    <div>
      <Navbar />
      <div className="py-25 px-4">
        <h1 className="text-center text-white text-4xl font-bold mb-4">
          All Problem Statements
        </h1>
        <h2 className="text-center text-lg mb-12 text-gray-300">
          Choose a challenge that pushes your Creativity, Technical skills and
          UX Thinking
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {cards.map((card) => (
            <div
              key={card.id}
              className="
        bg-gray-800 p-6 rounded-lg border border-gray-700 text-center
        h-full flex flex-col justify-between
        min-h-[200px] sm:min-h-[220px] md:min-h-[240px] lg:min-h-[260px]
      "
            >
              <h3 className="text-2xl font-semibold mb-4 text-white">
                {card.title}
              </h3>

              <p className="text-gray-400 text-md mb-6 leading-relaxed max-h-24 overflow-hidden">
                {card.overview}
              </p>

              <button
                className="w-full py-2.5 px-4 bg-transparent border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300 font-medium flex items-center justify-center gap-2"
                onClick={() => setSelectedCard(card)}
              >
                View Details
              </button>
            </div>
          ))}

          {/* {selectedCard && (
                <>
                     <div className="fixed inset-0 bg-black/50 z-40" />

                     <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6">
                        <header className="flex justify-between items-start">
                            <h2 className="text-xl font-semibold">{selectedCard.title}</h2>
                            <button onClick={() => setSelectedCard(null)} aria-label="Close details view">X</button>
                        </header>

                        <main className="mt-4">
                            <p className="text-gray-700">Problem Overview: {selectedCard.overview}</p>
                            <p className="text-gray-700">User Perspective: {selectedCard.userPerspective}</p>
                            <p className="text-gray-700">Deliverables: {selectedCard.deliverables}</p>
                            <p className="text-gray-700">Constraints: {selectedCard.constraints}</p>
                            <p className="text-gray-700">Evaluation Criteria: {selectedCard.evaluationCriteria}</p>
                        </main>
                     </div>    
                </>
            )} */}

          {selectedCard && (
            <>
              <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                onClick={() => setSelectedCard(null)}
              />

              {/* Modal */}
              <div
                className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-3xl -translate-x-1/2 -translate-y-1/2 
                bg-[#0f172a] text-white rounded-xl shadow-2xl border border-slate-700 p-8 max-h-[75vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold">{selectedCard.title}</h2>

                  <button
                    onClick={() => setSelectedCard(null)}
                    className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-slate-700 transition"
                  >
                    ✕
                  </button>
                </div>

                {/* Body */}
                <div className="space-y-6 text-[15px] leading-relaxed">
                  <div>
                    <h3 className="text-lg font-medium mb-1 text-slate-300">
                      Problem Overview
                    </h3>
                    <p className="text-slate-400">{selectedCard.overview}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-1 text-slate-300">
                      User&apos;s Perspective
                    </h3>
                    <p className="text-slate-400">
                      {selectedCard.userPerspective}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2 text-slate-300">
                      Expected Deliverables
                    </h3>
                    <ul className="list-disc list-inside text-slate-400 space-y-1">
                      {String(selectedCard.deliverables)
                        .split(",")
                        .map((item, i) => (
                          <li key={i}>{item.trim()}</li>
                        ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2 text-slate-300">
                      Constraints & Considerations
                    </h3>
                    <ul className="list-disc list-inside text-slate-400 space-y-1">
                      {String(selectedCard.constraints)
                        .split(",")
                        .map((item, i) => (
                          <li key={i}>{item.trim()}</li>
                        ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2 text-slate-300">
                      Evaluation Criteria
                    </h3>
                    <ul className="list-disc list-inside text-slate-400 space-y-1">
                      {String(selectedCard.evaluationCriteria)
                        .split(",")
                        .map((item, i) => (
                          <li key={i}>{item.trim()}</li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

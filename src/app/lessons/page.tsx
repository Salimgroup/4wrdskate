"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import "./lessons.css";



const SESSIONS = [
    { id: "sat-2pm", time: "2:00 PM — 3:00 PM", name: "Beginner", day: "Saturday", spots: 50 },
    { id: "sat-3pm", time: "3:00 PM — 4:00 PM", name: "Intermediate", day: "Saturday", spots: 50 },
];

const PRICING = [
    { id: "single", amount: 65, label: "Single Class", desc: "Pre-paid per session", popular: false },
    { id: "dayof", amount: 75, label: "Day of Class", desc: "Walk-in rate", popular: false },
    { id: "course", amount: 600, label: "Full Course", desc: "12 Classes — best value", popular: true },
];

const APPS_SCRIPT_URL: string = "https://script.google.com/macros/s/AKfycbw_T8vVeF19U0PtqzShQ1u3OxFADTUDxWROYFAJCg9aTtrzQDCI0q7lrEUz0wDlMVap/exec";

export default function LessonsPage() {
    const [selectedSession, setSelectedSession] = useState<string | null>(null);
    const [selectedPricing, setSelectedPricing] = useState<string | null>(null);
    const [studentInfo, setStudentInfo] = useState({
        studentName: "", dob: "", grade: "", school: "",
        parentName: "", relationship: "", email: "", phone: "",
        emergencyName: "", emergencyPhone: "",
        skillLevel: "", shoeSize: "", medicalNotes: "",
        photoRelease: false, liability: false,
    });
    
    const isStudentComplete = studentInfo.liability; // Only require liability to proceed
    const [isBooking, setIsBooking] = useState(false);
    
    // Scroll Animation Observer
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                }
            });
        }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

        const elements = document.querySelectorAll(".scroll-reveal");
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    // Derived state
    const sessionData = SESSIONS.find(s => s.id === selectedSession);
    const pricingData = PRICING.find(p => p.id === selectedPricing);

    
    const handleCheckout = async () => {
        if (!selectedSession || !selectedPricing) return;
        setIsBooking(true);
        
        // 1. Google Sheets via Apps Script
        const sheetRow = [
            new Date().toISOString(),
            studentInfo.studentName || "—", studentInfo.dob || "—", studentInfo.grade || "—", studentInfo.school || "—",
            studentInfo.parentName || "—", studentInfo.relationship || "—", studentInfo.email || "—", studentInfo.phone || "—",
            studentInfo.emergencyName || "—", studentInfo.emergencyPhone || "—",
            studentInfo.skillLevel || "—", sessionData?.day || "—", studentInfo.shoeSize || "—", studentInfo.medicalNotes || "—",
            studentInfo.liability ? "Yes" : "No",
            studentInfo.photoRelease ? "Yes" : "No",
        ];

        if (APPS_SCRIPT_URL !== "YOUR_APPS_SCRIPT_URL_HERE") {
            try {
                // Remove await to prevent blocking checkout if this fails/is slow
                fetch(APPS_SCRIPT_URL, {
                    method: "POST",
                    mode: "no-cors",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ row: sheetRow }),
                }).catch(e => console.warn("Sheet export failed:", e));
            } catch (e) {
                console.warn("Sheet export failed:", e);
            }
        }

        // 2. Send email via Anthropic API + Gmail MCP (fire and forget)
        try {
            fetch("/api/checkout", { 
                method: "POST", 
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    sessionId: selectedSession, 
                    pricingId: selectedPricing,
                    studentInfo,
                    isEmailTrigger: true 
                }) 
            }).catch(e => console.warn("Email API call failed:", e));
            
        } catch (e) {
            console.warn("Email send prep failed:", e);
        }

        // 3. Redirect to Square Checkout
        setTimeout(() => {
            alert(`✅ Details saved!\n\nYou will now be redirected to Square to complete your purchase.`);
            window.location.href = "https://checkout.square.site/merchant/MLFW3X8RMKVW2/checkout/VVQJ2ZJFQPEZULDJUYDP6RBH";
        }, 800);
    };


    return (
        <div className="lessons-custom-theme relative z-20" style={{ minHeight: "100vh", paddingBottom: "100px" }}>
            <div className="bg-nodes"></div>
            <div className="bg-blob-2"></div>
            <div className="bg-blob-3"></div>
            <div className="grid-overlay"></div>
            <div className="scanline"></div>

            <div className="page-wrapper">
                {/* BACK NAV */}
                <nav className="back-nav">
                    <Link href="https://4wrdskate.4playglobal.com/" className="back-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
                        Back
                    </Link>

                </nav>

                {/* HERO */}
                <header className="hero-header scroll-reveal scale-up">
                    <div className="logo-badge flex gap-2 items-center text-xs">
                        <Image src="/logo.png" alt="4WRD Logo" width={20} height={20} className="rounded-full" />
                        4WRD Kids • Family • Roller Skating
                    </div>
                    <h1 className="hero-title">Saturday<br/>Sessions</h1>
                    <p className="hero-subtitle">Book your 1-hour class — <span><br/><span className="mt-2 block text-sm leading-relaxed text-slate-300">P.S. 11 Brooklyn<br/>419 Washington Ave, Brooklyn, NY 11238</span></span></p>
                </header>

                {/* IMAGES */}
                <section className="mb-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative h-64 w-full rounded-2xl overflow-hidden border border-[rgba(0,229,255,0.18)] shadow-[0_0_20px_rgba(0,229,255,0.1)] group scroll-reveal slide-left">
                            <Image src="/kids-skate-1.jpg" alt="Kids Roller Skating Lesson" fill style={{ objectFit: "cover" }} className="transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>
                        <div className="relative h-64 w-full rounded-2xl overflow-hidden border border-[rgba(236,72,153,0.18)] shadow-[0_0_20px_rgba(236,72,153,0.1)] group scroll-reveal slide-right">
                            <Image src="/kids-skate-2.jpg" alt="Roller Skating Group" fill style={{ objectFit: "cover" }} className="transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>
                    </div>
                </section>

                {/* STEPPER */}
                <div className="stepper scroll-reveal delay-100">
                    <div className={`step ${selectedSession ? "completed" : "active"}`}>
                        <div className="step-number">1</div>
                        <span className="hidden sm:inline">Lesson</span>
                    </div>
                    <div className="step-connector"></div>
                    <div className={`step ${selectedSession ? (selectedPricing ? "completed" : "active") : ""}`}>
                        <div className="step-number">2</div>
                        <span className="hidden sm:inline">Plan</span>
                    </div>
                    <div className="step-connector"></div>
                    <div className={`step ${(selectedSession && selectedPricing) ? (isStudentComplete ? "completed" : "active") : ""}`}>
                        <div className="step-number">3</div>
                        <span className="hidden sm:inline">Student</span>
                    </div>
                    <div className="step-connector"></div>
                    <div className={`step ${(selectedSession && selectedPricing && isStudentComplete) ? "active" : ""}`}>
                        <div className="step-number">4</div>
                        <span className="hidden sm:inline">Confirm</span>
                    </div>
                </div>

                {/* SESSIONS */}
                <section className="sessions-container scroll-reveal slide-left delay-200">
                    <div className="section-label">Select Session</div>
                    <div className="timeline-wrapper">
                        {SESSIONS.map(s => (
                            <div key={s.id} className={`session-card ${selectedSession === s.id ? "selected" : ""}`} onClick={() => setSelectedSession(s.id)}>
                                <div className="session-top">
                                    <div className="session-time">{s.time}</div>
                                    <div className="session-badge">{s.day}</div>
                                </div>
                                <div className="session-name">{s.name}</div>
                                <div className="session-spots"><span className="spot-dot"></span> LIMITED SPOTS AVAILABLE</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* PRICING */}
                <section className="pricing-container scroll-reveal slide-right delay-200">
                    <div className="section-label">Pricing Plans</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {PRICING.map(p => (
                            <div key={p.id} className={`pricing-card ${p.popular ? "popular" : ""} ${selectedPricing === p.id ? "selected" : ""} ${p.id === "course" ? "md:col-span-2" : ""}`} onClick={() => setSelectedPricing(p.id)}>
                                {p.popular && <div className="popular-tag">Best Value</div>}
                                <div className="pricing-amount">${p.amount}</div>
                                <div className="pricing-label">{p.label}</div>
                                <div className="pricing-desc">{p.desc}</div>
                            </div>
                        ))}
                    </div>
                </section>



                {/* DIRECT BUY BUTTONS */}
                <div className="mt-8 border-t border-white/10 pt-12 pb-12 flex flex-col items-center justify-center gap-6 scroll-reveal scale-up relative z-20">
                    <p className="text-white/40 text-xs font-bold tracking-widest uppercase mb-2">Quick Purchase Options</p>
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-center">
                        <div className="flex flex-col items-center gap-3">
                           <span className="text-xs text-[#00e5ff] font-bold tracking-wider">SINGLE CLASS</span>
                           <a href="https://checkout.square.site/merchant/MLFW3X8RMKVW2/checkout/VVQJ2ZJFQPEZULDJUYDP6RBH" target="_blank" rel="noreferrer" className="bg-[#00e5ff] text-black px-6 py-3 rounded-full font-bold uppercase tracking-wider text-sm hover:scale-105 transition-transform shadow-[0_0_15px_rgba(0,229,255,0.4)] block text-center min-w-[160px]">
                               Book Now
                           </a>
                        </div>

                        <div className="flex flex-col items-center gap-3">
                           <span className="text-[10px] text-[#f5e642] font-bold tracking-wider bg-black/40 px-2 py-1 rounded-md border border-white/10">BEST VALUE</span>
                           <span className="text-xs text-[#f5e642] font-bold tracking-wider">FULL COURSE</span>
                           <a href="https://checkout.square.site/merchant/MLFW3X8RMKVW2/checkout/VVQJ2ZJFQPEZULDJUYDP6RBH" target="_blank" rel="noreferrer" className="bg-[#f5e642] text-black px-6 py-3 rounded-full font-bold uppercase tracking-wider text-sm hover:scale-105 transition-transform shadow-[0_0_15px_rgba(245,230,66,0.4)] block text-center min-w-[160px]">
                               Book Now
                           </a>
                        </div>

                        <div className="flex flex-col items-center gap-3">
                           <span className="text-xs text-[#ff00a0] font-bold tracking-wider">DAY OF CLASS</span>
                           <a href="https://checkout.square.site/merchant/MLFW3X8RMKVW2/checkout/VVQJ2ZJFQPEZULDJUYDP6RBH" target="_blank" rel="noreferrer" className="bg-[#ff00a0] text-white px-6 py-3 rounded-full font-bold uppercase tracking-wider text-sm hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,0,160,0.4)] block text-center min-w-[160px]">
                               Book Now
                           </a>
                        </div>
                    </div>
                </div>

                {/* STUDENT INFO FORM */}
                <section className={`pricing-container scroll-reveal scale-up delay-300 ${(!selectedSession || !selectedPricing) ? "opacity-30 pointer-events-none" : ""}`}>
                    <div className="section-label">Student Details</div>
                    <div className="bg-[#1e2332]/45 backdrop-blur-xl border border-[rgba(0,229,255,0.18)] rounded-[16px] p-6 transition-all duration-300 space-y-6">
                        {/* 1. Skater Info */}
                        <div>
                            <h3 className="text-[#00e5ff] font-bold tracking-widest uppercase mb-3 text-sm">Skater Info</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[0.65rem] font-bold text-white/60 uppercase mb-1">Student Full Name</label>
                                    <input type="text" placeholder="e.g. Jane Doe" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-[#f0f4ff] placeholder-white/30 focus:outline-none focus:border-[#00e5ff]" value={studentInfo.studentName} onChange={e => setStudentInfo({...studentInfo, studentName: e.target.value})} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[0.65rem] font-bold text-white/60 uppercase mb-1">Date of Birth (Optional)</label>
                                        <input type="date" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-[#f0f4ff] placeholder-white/30 focus:outline-none focus:border-[#00e5ff] transition-colors" value={studentInfo.dob} onChange={e => setStudentInfo({...studentInfo, dob: e.target.value})} />
                                    </div>
                                    <div>
                                        <label className="block text-[0.65rem] font-bold text-white/60 uppercase mb-1">Grade (Optional)</label>
                                        <select className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-[#f0f4ff] focus:outline-none focus:border-[#00e5ff] transition-colors appearance-none" value={studentInfo.grade} onChange={e => setStudentInfo({...studentInfo, grade: e.target.value})}>
                                            <option value="" className="bg-slate-900 text-white">Select</option>
                                            {["K","1","2","3","4","5","6","7","8","9","10","11","12"].map(g=><option key={g} value={g} className="bg-slate-900 text-white">Grade {g}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[0.65rem] font-bold text-white/60 uppercase mb-1">School Name (Optional)</label>
                                    <input type="text" placeholder="e.g., PS 11 Brooklyn" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-[#f0f4ff] placeholder-white/30 focus:outline-none focus:border-[#00e5ff]" value={studentInfo.school} onChange={e => setStudentInfo({...studentInfo, school: e.target.value})} />
                                </div>
                            </div>
                        </div>

                        {/* 2. Guardian & Emergency */}
                        <div className="pt-4 border-t border-white/10">
                            <h3 className="text-[#00e5ff] font-bold tracking-widest uppercase mb-3 text-sm">Parent / Guardian</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[0.65rem] font-bold text-white/60 uppercase mb-1">Guardian Name (Optional)</label>
                                    <input type="text" placeholder="Full Name" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-[#f0f4ff] placeholder-white/30 focus:outline-none focus:border-[#00e5ff]" value={studentInfo.parentName} onChange={e => setStudentInfo({...studentInfo, parentName: e.target.value})} />
                                </div>
                                <div>
                                    <label className="block text-[0.65rem] font-bold text-white/60 uppercase mb-1">Relationship (Optional)</label>
                                    <select className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-[#f0f4ff] focus:outline-none focus:border-[#00e5ff] transition-colors appearance-none" value={studentInfo.relationship} onChange={e => setStudentInfo({...studentInfo, relationship: e.target.value})}>
                                        <option value="" className="bg-slate-900 text-white">Select</option>
                                        {["Parent","Guardian","Grandparent","Sibling (18+)","Other"].map(r=><option key={r} value={r} className="bg-slate-900 text-white">{r}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[0.65rem] font-bold text-white/60 uppercase mb-1">Email</label>
                                    <input type="email" placeholder="you@example.com" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-[#f0f4ff] placeholder-white/30 focus:outline-none focus:border-[#00e5ff]" value={studentInfo.email} onChange={e => setStudentInfo({...studentInfo, email: e.target.value})} />
                                </div>
                                <div>
                                    <label className="block text-[0.65rem] font-bold text-white/60 uppercase mb-1">Phone (Optional)</label>
                                    <input type="tel" placeholder="(718) 000-0000" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-[#f0f4ff] placeholder-white/30 focus:outline-none focus:border-[#00e5ff]" value={studentInfo.phone} onChange={e => setStudentInfo({...studentInfo, phone: e.target.value})} />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/10">
                            <h3 className="text-[#ff00a0] font-bold tracking-widest uppercase mb-3 text-sm">Emergency Contact</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[0.65rem] font-bold text-white/60 uppercase mb-1">Emergency contact name (Optional)</label>
                                    <input type="text" placeholder="Full Name" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-[#f0f4ff] placeholder-white/30 focus:outline-none focus:border-[#ff00a0]" value={studentInfo.emergencyName} onChange={e => setStudentInfo({...studentInfo, emergencyName: e.target.value})} />
                                </div>
                                <div>
                                    <label className="block text-[0.65rem] font-bold text-white/60 uppercase mb-1">Emergency phone (Optional)</label>
                                    <input type="tel" placeholder="(718) 000-0000" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-[#f0f4ff] placeholder-white/30 focus:outline-none focus:border-[#ff00a0]" value={studentInfo.emergencyPhone} onChange={e => setStudentInfo({...studentInfo, emergencyPhone: e.target.value})} />
                                </div>
                            </div>
                        </div>

                        {/* 3. Skate Info */}
                        <div className="pt-4 border-t border-white/10">
                            <h3 className="text-[#00e5ff] font-bold tracking-widest uppercase mb-3 text-sm">Experience</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[0.65rem] font-bold text-white/60 uppercase mb-1">Skill Level</label>
                                    <select className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-[#f0f4ff] focus:outline-none focus:border-[#00e5ff] transition-colors appearance-none" value={studentInfo.skillLevel} onChange={e => setStudentInfo({...studentInfo, skillLevel: e.target.value})}>
                                        <option value="" className="bg-slate-900 text-white">Select</option>
                                        <option value="beginner" className="bg-slate-900 text-white">Beginner (Never skated)</option>
                                        <option value="intermediate" className="bg-slate-900 text-white">Intermediate (Some experience)</option>
                                        <option value="advanced" className="bg-slate-900 text-white">Advanced</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[0.65rem] font-bold text-white/60 uppercase mb-1">Shoe Size (Optional)</label>
                                    <input type="text" placeholder="e.g. 4 Youth" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-[#f0f4ff] placeholder-white/30 focus:outline-none focus:border-[#00e5ff]" value={studentInfo.shoeSize} onChange={e => setStudentInfo({...studentInfo, shoeSize: e.target.value})} />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-[0.65rem] font-bold text-white/60 uppercase mb-1">Medical Notes / Allergies</label>
                                    <textarea placeholder="Any conditions our instructors should know..." rows={2} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-[#f0f4ff] placeholder-white/30 focus:outline-none focus:border-[#00e5ff] transition-colors resize-none" value={studentInfo.medicalNotes} onChange={e => setStudentInfo({...studentInfo, medicalNotes: e.target.value})}></textarea>
                                </div>
                            </div>
                        </div>

                        {/* 4. Agreements */}
                        <div className="pt-4 border-t border-white/10 space-y-4">
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <input type="checkbox" className="mt-1 w-5 h-5 accent-[#00e5ff] cursor-pointer" checked={studentInfo.liability} onChange={e => setStudentInfo({...studentInfo, liability: e.target.checked})} />
                                <div className="text-sm">
                                    <span className="text-[#f0f4ff] font-bold block">Liability Waiver & Assumption of Risk *</span>
                                    <span className="text-white/60 text-xs">I understand that roller skating involves physical activity and acknowledge the inherent risks. I release 4WRD Skate from liability for injuries sustained during participation.</span>
                                </div>
                            </label>
                            
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <input type="checkbox" className="mt-1 w-5 h-5 accent-[#00e5ff] cursor-pointer" checked={studentInfo.photoRelease} onChange={e => setStudentInfo({...studentInfo, photoRelease: e.target.checked})} />
                                <div className="text-sm">
                                    <span className="text-[#f0f4ff] font-bold block">Photo & Media Release (Optional)</span>
                                    <span className="text-white/60 text-xs">I grant 4WRD Skate permission to photograph or film the student for promotional and social media use.</span>
                                </div>
                            </label>
                        </div>
                    </div>
                </section>

                {/* SUMMARY */}
                <div className={`summary-bar scroll-reveal ${sessionData || pricingData ? "visible is-visible !flex" : "hidden"}`}>
                    <div className="summary-info">
                        <div className="summary-session">{sessionData ? `${sessionData.time} — ${sessionData.name}` : "—"}</div>
                        <div className="summary-price">{pricingData ? pricingData.label : "—"}</div>
                    </div>
                    <div className="summary-total">${pricingData ? pricingData.amount : "0"}</div>
                </div>

                {/* BOOK */}
                <div className="book-section scroll-reveal scale-up delay-400 pb-12 relative z-20">
                    <button className="book-btn" onClick={handleCheckout} disabled={!selectedSession || !selectedPricing || !isStudentComplete || isBooking}>
                        {isBooking ? "Processing..." : "Book Now"}
                    </button>
                    <div className="book-hint">
                        {(!selectedSession) ? "Select a session to continue" 
                            : (!selectedPricing) ? "Select a pricing plan to continue" 
                            : (!isStudentComplete) ? "Complete student details to continue"
                            : "Proceed to Square Checkout"}
                    </div>
                </div>
            </div>


            {/* MASCOT */}
            <div className="mascot-float hidden md:block">
                <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="30" cy="30" r="28" fill="rgba(0,229,255,0.1)" stroke="rgba(0,229,255,0.3)" strokeWidth="1.5"/>
                    <text x="30" y="38" textAnchor="middle" fontSize="28">⛸️</text>
                </svg>
            </div>

        </div>
    );
}

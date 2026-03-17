export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeKey = process.env.STRIPE_SECRET_KEY && (process.env.STRIPE_SECRET_KEY.startsWith("sk_test") || process.env.STRIPE_SECRET_KEY.startsWith("sk_live") || process.env.STRIPE_SECRET_KEY.startsWith("mk_")) ? process.env.STRIPE_SECRET_KEY : null;
const stripe = stripeKey ? new Stripe(stripeKey) : null;

const GMAIL_MCP = "https://gmail.mcp.claude.com/mcp";
const TO_EMAIL = "info@4playglobal.com";
const SUBJECT = "4WRD Roller Skating Lessons Registration";

const buildEmailHTML = (form: any, sessionName: string, pricingLabel: string) => `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><style>
  body { font-family: Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
  .card { background: #fff; max-width: 600px; margin: 0 auto; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
  .header { background: #0a0a0a; padding: 28px 32px; }
  .logo { color: #f5e642; font-size: 28px; font-weight: 900; letter-spacing: 4px; margin: 0; }
  .sub { color: #666; font-size: 12px; letter-spacing: 2px; margin: 4px 0 0; }
  .body { padding: 32px; }
  .section-title { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #aaa; border-bottom: 1px solid #eee; padding-bottom: 6px; margin: 24px 0 12px; }
  .row { display: flex; margin-bottom: 8px; }
  .key { font-size: 13px; color: #888; width: 160px; flex-shrink: 0; }
  .val { font-size: 13px; color: #111; font-weight: 500; }
  .badge { display: inline-block; background: #f5e642; color: #0a0a0a; padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: 700; letter-spacing: 1px; }
  .footer { background: #0a0a0a; padding: 16px 32px; color: #555; font-size: 11px; text-align: center; letter-spacing: 1px; }
</style></head>
<body>
<div class="card">
  <div class="header">
    <p class="logo">🛼 4WRD SKATE</p>
    <p class="sub">ROLLERWAVE LESSONS — NEW REGISTRATION</p>
  </div>
  <div class="body">
    <p style="color:#111;font-size:15px;margin:0 0 4px;">New registration prep received on <strong>${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</strong>.</p>
    
    <div class="section-title">Order Details</div>
    <div class="row"><span class="key">Session</span><span class="val">${sessionName || "Not Selected"}</span></div>
    <div class="row"><span class="key">Plan</span><span class="val">${pricingLabel || "Not Selected"}</span></div>
    
    <div class="section-title">Student Information</div>
    <div class="row"><span class="key">Full Name</span><span class="val">${form.studentName || "—"}</span></div>
    <div class="row"><span class="key">Date of Birth</span><span class="val">${form.dob || "—"}</span></div>
    <div class="row"><span class="key">Grade</span><span class="val">${form.grade || "—"}</span></div>
    <div class="row"><span class="key">School</span><span class="val">${form.school || "—"}</span></div>

    <div class="section-title">Parent / Guardian</div>
    <div class="row"><span class="key">Name</span><span class="val">${form.parentName || "—"} (${form.relationship || "—"})</span></div>
    <div class="row"><span class="key">Email</span><span class="val">${form.email || "—"}</span></div>
    <div class="row"><span class="key">Phone</span><span class="val">${form.phone || "—"}</span></div>

    <div class="section-title">Emergency Contact</div>
    <div class="row"><span class="key">Name</span><span class="val">${form.emergencyName || "—"}</span></div>
    <div class="row"><span class="key">Phone</span><span class="val">${form.emergencyPhone || "—"}</span></div>

    <div class="section-title">Session Preferences</div>
    <div class="row"><span class="key">Skill Level</span><span class="val"><span class="badge">${(form.skillLevel || "—").toUpperCase()}</span></span></div>
    <div class="row"><span class="key">Shoe Size</span><span class="val">${form.shoeSize || "—"}</span></div>
    <div class="row"><span class="key">Medical Notes</span><span class="val">${form.medicalNotes || "None"}</span></div>

    <div class="section-title">Agreements</div>
    <div class="row"><span class="key">Liability Waiver</span><span class="val">${form.liability ? "✅ Signed" : "❌ Not signed"}</span></div>
    <div class="row"><span class="key">Photo Release</span><span class="val">${form.photoRelease ? "✅ Granted" : "❌ Declined"}</span></div>
  </div>
  <div class="footer">4WRD SKATE · ROLLERWAVE · A 4PLAY GLOBAL LLC PROGRAM · LAS VEGAS & NEW YORK</div>
</div>
</body>
</html>`;

export async function POST(req: Request) {
  try {
    const { sessionId, pricingId, studentInfo, isEmailTrigger } = await req.json();

    const prices: { [key: string]: number } = {
      single: 6500, // $65.00
      course: 72000, // $600.00
      dayof: 7500, // $75.00
    };
    
    const names: { [key: string]: string } = {
      single: "Single Class (Pre-paid)",
      course: "Full Course (12 Classes)",
      dayof: "Day of Class",
    };

    const amount = prices[pricingId] || 6500;
    const name = names[pricingId] || "Skating Lesson";

    if (isEmailTrigger) {
      if (!process.env.ANTHROPIC_API_KEY) {
         console.warn("ANTHROPIC_API_KEY not set. Skipping email send.");
         return NextResponse.json({ success: false, message: "No API key" });
      }

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "x-api-key": process.env.ANTHROPIC_API_KEY,
            "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
            model: "claude-3-5-sonnet-20241022",
            max_tokens: 1000,
            tools: [{ type: "url", url: GMAIL_MCP, name: "gmail" }],
            messages: [{
                role: "user",
                content: `Send an email using Gmail with these exact details:\nTo: ${TO_EMAIL}\nSubject: ${SUBJECT}\nBody (HTML): ${buildEmailHTML(studentInfo, sessionId, name)}\n\nSend it now and confirm with just the word: SENT`,
            }],
        }),
      });

      const data = await response.json();
      return NextResponse.json({ success: true, data });
    }

    if (!stripe) {
      console.warn("Valid test STRIPE_SECRET_KEY is not set. Mocking checkout success URL.");
      return NextResponse.json({ url: "http://localhost:3000/lessons?success=true" });
    }

    const sessionData = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      metadata: {
        sessionId: sessionId || "",
        pricingId: pricingId || "",
        studentName: studentInfo?.studentName || "",
        dob: studentInfo?.dob || "",
        grade: studentInfo?.grade || "",
        school: studentInfo?.school || "",
        parentName: studentInfo?.parentName || "",
        relationship: studentInfo?.relationship || "",
        email: studentInfo?.email || "",
        phone: studentInfo?.phone || "",
        emergencyName: studentInfo?.emergencyName || "",
        emergencyPhone: studentInfo?.emergencyPhone || "",
        skillLevel: studentInfo?.skillLevel || "",
        shoeSize: studentInfo?.shoeSize || "",
        medicalNotes: studentInfo?.medicalNotes || "",
        photoRelease: studentInfo?.photoRelease ? "Yes" : "No",
        liability: studentInfo?.liability ? "Yes" : "No",
      },
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `4wrdskate - ${name}`,
              description: `Session: ${sessionId} on April 4th, 2026`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/lessons?success=true`,
      cancel_url: `${req.headers.get("origin")}/lessons?canceled=true`,
    });

    return NextResponse.json({ url: sessionData.url });
  } catch (error: any) {
    console.error("RAW_ERROR:", error); return NextResponse.json({ error: error.message, stack: error.stack, type: error.type }, { status: 500 });
  }
}

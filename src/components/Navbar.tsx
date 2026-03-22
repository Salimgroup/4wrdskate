import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="glass-panel" style={{ position: "fixed", top: "20px", left: "50%", transform: "translateX(-50%)", width: "90%", maxWidth: "1200px", zIndex: 100, padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Link href="/" style={{ fontSize: "1.5rem", fontWeight: "bold" }} className="gradient-text">
        4WRD ROLLER SKATING LESSONS
      </Link>
      <div style={{ display: "flex", gap: "24px" }}>
        <Link href="/" style={{ fontWeight: 500, transition: "color 0.3s" }}>Home</Link>
        <Link href="/lessons" style={{ fontWeight: 500, transition: "color 0.3s" }}>Lessons</Link>
      </div>
    </nav>
  );
}

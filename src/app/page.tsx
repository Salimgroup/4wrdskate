<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>4WRD Skate — We Bring The Rink To You</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet">
  <style>
    :root {
      --brand: hsl(345 73% 44%); /* #C41E3A */
      --brand-foreground: hsl(0 0% 100%);
      --gold: hsl(51 100% 50%); /* #FFD700 */
      --maroon: hsl(0 100% 21%); /* #6B0000 */
      --goldenrod: hsl(43 89% 36%); /* #B8860B */
      --mint: hsl(120 73% 75%); /* #90EE90 */
      --text: hsl(222.2 84% 4.9%);
      --bg: hsl(0 0% 100%);
    }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, Helvetica, sans-serif; color: var(--text); background: var(--bg); }
    .container { width: min(1200px, 100%); margin-inline: auto; padding-inline: 2rem; }
    .topline { background:#000; color:#fff; text-align:center; padding:.5rem 1rem; font-weight:600; letter-spacing:.35em; font-size:.7rem; }
    header { position: sticky; top: 0; z-index: 50; backdrop-filter: blur(8px); background: rgba(255,255,255,.9); border-bottom: 1px solid hsl(214 32% 91%); }
    header .bar { display:flex; align-items:center; justify-content:space-between; padding: 1rem 0; }
    .logo { display:flex; align-items:center; gap:.75rem; text-decoration:none; color: inherit; }
    .logo-badge { width: 40px; height: 40px; border-radius: 999px; background: var(--brand); color: var(--brand-foreground); display:grid; place-items:center; font-weight:900; }
    nav { display:none; gap:1rem; align-items:center; }
    nav a, nav button { background:none; border:0; color:inherit; font: inherit; cursor:pointer; padding:.5rem .75rem; border-radius:999px; }
    nav a.cta { background: var(--gold); color:#000; font-weight:800; text-transform:uppercase; letter-spacing:.12em; }
    @media (min-width: 768px){ nav { display:flex; } }

    .hero { position: relative; min-height: 520px; display:grid; place-items:center; overflow:hidden; }
    .hero::before { content:""; position:absolute; inset:0; background: radial-gradient(circle at 30% 20%, hsl(51 100% 50% / .25), transparent 35%), radial-gradient(circle at 70% 80%, hsl(345 73% 44% / .18), transparent 35%); }
    .hero .inner { position: relative; text-align:center; padding: 4rem 0; }
    .badge { font-size:.7rem; text-transform:uppercase; letter-spacing:.35em; font-weight:600; color: rgba(0,0,0,.8); }
    .logo-circle { width:min(14rem,40vw); aspect-ratio:1/1; margin:2rem auto 0; border-radius:999px; display:grid; place-items:center; font-weight:900; font-size: clamp(3rem, 10vw, 5rem); color:#fff; background: var(--brand); box-shadow: 0 20px 60px rgba(0,0,0,.15); }
    h1 { margin: 1.5rem 0 0; font-size: clamp(1.75rem, 3vw + 1rem, 3rem); line-height:1.1; letter-spacing:-.02em; }
    .muted { color: hsl(215.4 16.3% 46.9%); max-width: 56ch; margin: .75rem auto 0; }
    .row { display:flex; gap:.75rem; justify-content:center; margin-top:1.25rem; flex-wrap:wrap; }
    .btn { display:inline-flex; align-items:center; gap:.5rem; padding:.85rem 1.25rem; border-radius:999px; font-weight:800; text-decoration:none; }
    .btn.gold { background: var(--gold); color:#000; text-transform:uppercase; letter-spacing:.12em; }
    .btn.ghost { border:1px solid hsl(214 32% 91%); color:inherit; }

    .strip { display:grid; grid-template-columns: repeat(4, 1fr); height:auto; }
    .strip .tile { background: url('/placeholder.svg') center/cover no-repeat; height: 220px; }
    @media (min-width: 1024px){ .strip { height: 320px; } .strip .tile { height: auto; } }

    .block-red { background: var(--brand); color:#fff; text-align:center; padding: 4rem 2rem; }
    .block-red h2 { margin:0; font-size: clamp(1.5rem, 2vw + 1rem, 3rem); text-transform:uppercase; letter-spacing:.12em; }
    .block-red p { max-width: 70ch; margin: 1rem auto 0; }

    .programs { background: var(--brand); color: #fff; padding: 4rem 0; }
    .grid { display:grid; gap: 2rem; }
    @media (min-width: 1024px){ .grid { grid-template-columns: repeat(4, 1fr); } }
    .card { background: rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.2); backdrop-filter: blur(6px); border-radius: 1rem; padding: 1.25rem; }
    .card h3 { color: var(--gold); letter-spacing:.15em; font-weight:900; }
    .card p { line-height:1.7; }

    .newsletter { background: var(--maroon); color:#fff; text-align:center; padding: 4rem 2rem; }
    .newsletter input { width:min(480px, 100%); background:transparent; border:none; border-bottom:2px solid rgba(255,255,255,.8); color:#fff; padding: .9rem; text-align:center; }
    .newsletter input::placeholder { color: rgba(255,255,255,.7); }

    .feature { background: linear-gradient(120deg, var(--goldenrod), hsl(51 100% 50% / .85)); color:#000; }
    .feature .wrap { display:grid; gap:2rem; align-items:center; padding: 3.5rem 0; }
    @media (min-width: 768px){ .feature .wrap { grid-template-columns: 1fr 1fr; } }
    .imgbox { border-radius: 1rem; overflow: hidden; border:1px solid hsl(214 32% 91%); box-shadow: 0 10px 30px rgba(0,0,0,.2); }
    .imgbox img { display:block; width:100%; height:100%; object-fit:cover; }

    .pricing { padding: 3rem 0; }
    table { width:100%; border-collapse: separate; border-spacing: 0 10px; }
    th, td { text-align:left; padding:.75rem 1rem; background:#fff; }
    th { background: transparent; padding-bottom: .5rem; }
    tbody tr td { border-bottom:1px solid hsl(214 32% 91%); }

    .contact { background: hsl(217.2 32.6% 17.5%); color:#fff; padding: 3rem 0; }

    footer { background: var(--brand); color:#fff; }
    footer .row { justify-content: space-between; }
    .foot-badge { width:56px; height:56px; background:#fff; color: var(--brand); border-radius:999px; display:grid; place-items:center; font-weight:900; font-size:1.4rem; }
    .social { display:flex; gap: .75rem; }
    .social a { width:40px; height:40px; background:#fff; color: var(--brand); border-radius:999px; display:grid; place-items:center; font-weight:700; text-decoration:none; }
    .social a:hover { background: var(--gold); }
  </style>
</head>
<body>
  <div class="topline">4WRD SKATE ROLLER POP UP</div>
  <header>
    <div class="container bar">
      <a class="logo" href="#">
        <div class="logo-badge">4W</div>
        <strong>4WRD Skate</strong>
      </a>
      <nav>
        <button onclick="document.getElementById('programs').scrollIntoView({behavior:'smooth'})">Programs</button>
        <button onclick="document.getElementById('pricing').scrollIntoView({behavior:'smooth'})">Pricing</button>
        <a href="https://4wrdskate.4playglobal.com/lessons" target="_blank" style="text-decoration:none">Lessons</a>
        <button onclick="document.getElementById('contact').scrollIntoView({behavior:'smooth'})">Contact</button>
        <a class="cta" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdyZr76GMkgPsf4_0XWl8XaUqg_7TFkFORDZgrrimQ-cHCw6g/viewform">Book Now</a>
      </nav>
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="container inner">
        <div class="badge">4WRD SKATE ROLLER POP UP</div>
        <div class="logo-circle">4W</div>
        <h1>We Bring The Rink To You</h1>
        <p class="muted">High-energy mobile roller skating experiences for schools, communities, brands and private events across NYC.</p>
        <div class="row">
          <a class="btn gold" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdyZr76GMkgPsf4_0XWl8XaUqg_7TFkFORDZgrrimQ-cHCw6g/viewform">Sign Up</a>
          <button class="btn ghost" onclick="document.getElementById('programs').scrollIntoView({behavior:'smooth'})">Explore Programs</button>
        </div>
      </div>
    </section>

    <section class="strip">
      <div class="tile"></div><div class="tile"></div><div class="tile"></div><div class="tile"></div>
    </section>

    <section class="block-red">
      <div class="container">
        <h2>Roll Into A One-Of-A-Kind Experience</h2>
        <p>Seasoned Event Roller Team serving Tri State Block Parties, School Functions, Fundraising and more. We bring everything to you—relax and roll into greatness!</p>
      </div>
    </section>

    <section id="programs" class="programs">
      <div class="container">
        <div class="grid">
          <div class="card">
            <h3>4PLAY</h3>
            <p>High-energy roller skating pop-ups for all ages and occasions—from private parties and brand activations to school and company events.</p>
            <p><em>(Included: Mobile rink, skate rentals, DJ and more)</em></p>
            <a class="btn gold" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdyZr76GMkgPsf4_0XWl8XaUqg_7TFkFORDZgrrimQ-cHCw6g/viewform">Book Today</a>
          </div>
          <div class="card">
            <h3>4WELLNESS</h3>
            <p>Therapeutic movement that supports physical and mental well‑being. Ideal for wellness businesses, fitness and mindfulness events.</p>
            <p><em>(Included: Mobile rink, skate rentals, DJ and more)</em></p>
            <a class="btn gold" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdyZr76GMkgPsf4_0XWl8XaUqg_7TFkFORDZgrrimQ-cHCw6g/viewform">Book Today</a>
          </div>
          <div class="card">
            <h3>CONTINUED</h3>
            <p>Sensory‑Safe Skating and Silent Roller Disco with wireless headphones—calming, adaptive, and immersive options for every learner.</p>
            <p><em>(Included: Mobile rink, skate rentals, DJ and more)</em></p>
            <a class="btn gold" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdyZr76GMkgPsf4_0XWl8XaUqg_7TFkFORDZgrrimQ-cHCw6g/viewform">Book Today</a>
          </div>
          <div class="card">
            <h3>4COMMUNITY</h3>
            <p>Designed for block parties and outreach—bringing people together through movement, music, and culture.</p>
            <p><em>(Included: Mobile rink, skate rentals, DJ and more)</em></p>
            <a class="btn gold" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdyZr76GMkgPsf4_0XWl8XaUqg_7TFkFORDZgrrimQ-cHCw6g/viewform">Book Today</a>
          </div>
        </div>
      </div>
    </section>

    <section class="newsletter">
      <div class="container">
        <h3>Join Our Newsletter</h3>
        <p>Get our latest news and updates</p>
        <form>
          <input type="email" placeholder="Email" required>
          <div class="row" style="margin-top:1rem">
            <a class="btn gold" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdyZr76GMkgPsf4_0XWl8XaUqg_7TFkFORDZgrrimQ-cHCw6g/viewform">Sign Up Here</a>
          </div>
        </form>
      </div>
    </section>

    <section class="feature">
      <div class="container wrap">
        <div>
          <h3 style="text-transform:uppercase">Easter Eggcitement Extravaganza</h3>
          <p>Family Fun Day filled with skating and more! Kids Fashion Show, Concert, Inflatable Park, Mobile Arcade, Reptile Exhibit, Exotic Car Show and Character Meet & Greets.</p>
          <a class="btn" style="background:var(--mint); color:#000" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdyZr76GMkgPsf4_0XWl8XaUqg_7TFkFORDZgrrimQ-cHCw6g/viewform">✓ Book Now</a>
        </div>
        <div class="imgbox"><img src="/placeholder.svg" alt="Event"></div>
      </div>
    </section>

    <section id="pricing" class="pricing">
      <div class="container">
        <h3 style="text-align:center; font-weight:900">Pricing & Packages (2025–2026)</h3>
        <div style="overflow-x:auto; margin-top:1rem">
          <table>
            <thead>
              <tr>
                <th>Package</th><th>Frequency</th><th>Total Sessions</th><th>Price/Session</th><th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Single Activation</td><td>One-time</td><td>1</td><td>$5,000</td><td>$5,000</td></tr>
              <tr><td>Monthly</td><td>1x/month</td><td>4</td><td>$3,750</td><td>$15,000</td></tr>
              <tr><td>Bi-Monthly</td><td>2x/month</td><td>8</td><td>$3,500</td><td>$28,000</td></tr>
              <tr><td>Weekly</td><td>1x/week</td><td>16</td><td>$3,250</td><td>$52,000</td></tr>
            </tbody>
          </table>
        </div>
        <p style="text-align:center; color:hsl(215.4 16.3% 46.9%)">All packages cover staffing, transportation, equipment, and setup.</p>
      </div>
    </section>

    <section id="contact" class="contact">
      <div class="container" style="display:grid; gap:1.25rem; align-items:center; grid-template-columns: 1fr;">
        <div>
          <h3 style="margin:0">Next Steps</h3>
          <p>Want to bring 4Play to your school? Let's talk.</p>
        </div>
        <div>
          <p><strong>Contact:</strong> Jennifer Scott, Founder</p>
          <p><a href="mailto:Jennifer.scott@buds2roses.com" style="color:#fff">Jennifer.scott@buds2roses.com</a></p>
          <p><a href="https://www.4PlayGlobal.com" target="_blank" style="color:#fff">www.4PlayGlobal.com</a></p>
          <p><a href="https://instagram.com/4PlaySkateLounge" target="_blank" style="color:#fff">@4PlaySkateLounge</a></p>
        </div>
      </div>
    </section>
  </main>

  <footer>
    <div class="container" style="padding:2rem 0; display:flex; flex-wrap:wrap; gap:1rem; align-items:center; justify-content:space-between;">
      <div style="display:flex; align-items:center; gap:1rem; color:#fff;">
        <div class="foot-badge">4W</div>
        <div>
          <div style="font-weight:900; letter-spacing:.2em;">4WRD SKATE</div>
          <div style="opacity:.9; font-size:.9rem">INFO@4PLAYGLOBAL.COM</div>
        </div>
      </div>
      <div class="social">
        <a href="https://instagram.com/4PlaySkateLounge" target="_blank" aria-label="Instagram">IG</a>
        <a href="https://www.4PlayGlobal.com" target="_blank" aria-label="Website">WWW</a>
        <a href="mailto:Jennifer.scott@buds2roses.com" aria-label="Email">@</a>
      </div>
    </div>
  </footer>
</body>
</html>

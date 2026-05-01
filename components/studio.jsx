// Direction A — Studio (Dark cinematic gaming studio)
function StudioSite({ tweaks = {} }) {
  const t = tweaks;
  const showFunding = t.showFunding ?? false;
  const brand = t.brandColor || '#1a40e8';
  const tagline = t.tagline || null;
  React.useEffect(() => {
    // Personalization viz: animated wavy lines
    const canvas = document.getElementById('viz-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    let w, h, raf;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;h = r.height;
      canvas.width = w * dpr;canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);
    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // Grid
      ctx.strokeStyle = 'rgba(255,255,255,0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 40) {
        ctx.beginPath();ctx.moveTo(x, 0);ctx.lineTo(x, h);ctx.stroke();
      }
      // Wavy player journey lines
      const lines = 6;
      for (let i = 0; i < lines; i++) {
        const phase = i * 0.7 + t;
        const baseY = h * (0.2 + 0.1 * i);
        const hue = 230 + i * 6;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 4) {
          const y = baseY + Math.sin(x * 0.012 + phase) * (12 + i * 3) + Math.sin(x * 0.04 + phase * 2) * 4;
          if (x === 0) ctx.moveTo(x, y);else ctx.lineTo(x, y);
        }
        const grad = ctx.createLinearGradient(0, 0, w, 0);
        grad.addColorStop(0, `hsla(${hue}, 90%, 60%, 0.05)`);
        grad.addColorStop(0.5, `hsla(${hue}, 90%, 65%, 0.6)`);
        grad.addColorStop(1, `hsla(${hue}, 90%, 60%, 0.05)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      // Nodes
      for (let i = 0; i < 8; i++) {
        const x = (t * 30 + i * 140) % (w + 100) - 50;
        const y = h * 0.5 + Math.sin(t + i) * 30;
        ctx.beginPath();ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(230, 90%, 70%, ${0.4 + Math.sin(t + i) * 0.3})`;
        ctx.fill();
      }
      t += 0.012;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {cancelAnimationFrame(raf);window.removeEventListener('resize', resize);};
  }, []);

  return (
    <div className="studio" style={{ '--brand': brand }}>
      {/* NAV */}
      <nav className="nav">
        <a href="#" className="nav-logo">
          <span className="mark"><AiroLogoMark size={18} /></span>
          <span>airoclip</span>
        </a>
        <div className="nav-links">
          <a href="#tech">Technology</a>
          <a href="#games">Games</a>
          <a href="#investors">Investors</a>
          <a href="#careers">Careers</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="nav-cta">
          <a href="https://app.dover.com/jobs/airoclip" target="_blank" rel="noopener" className="btn btn-ghost">We're hiring →</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-grid"></div>
        <div className="hero-inner">
          <div className="hero-tag">
            <span className="pill">SEED</span>
            <span>$2.75M led by T-Accelerate, BITKRAFT & Centre Court</span>
          </div>
          <h1>
            AI-powered<br />
            puzzle games that<br />
            <em>evolve with every player.</em>
          </h1>
          <p className="hero-sub">Play our games

          </p>
          <div className="hero-actions">
            <a
              href="https://apps.apple.com/us/developer/airoclip-pvt-ltd/id1768514553"
              target="_blank"
              rel="noopener"
              className="store-badge"
              aria-label="Play our games on the App Store">
              
              <svg viewBox="0 0 384 512" width="26" height="26" aria-hidden="true">
                <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zM256.4 84.5c25.5-30.3 23.2-57.9 22.5-67.8-22.6 1.3-48.7 15.4-63.6 32.7-16.4 18.6-26 41.6-23.9 67.3 24.4 1.9 46.7-10.6 65-32.2z" />
              </svg>
              <span className="bdg-stack">
                <span className="bdg-sm">Download on the</span>
                <span className="bdg-lg">App Store</span>
              </span>
            </a>
            <a
              href="https://play.google.com/store/apps/dev?id=5453856370847128386&hl=en_IN"
              target="_blank"
              rel="noopener"
              className="store-badge"
              aria-label="Play our games on Google Play">
              
              <svg viewBox="0 0 512 512" width="24" height="26" aria-hidden="true">
                <path fill="#00d4ff" d="M325.3 234.3 104.6 13l280.8 161.2-60.1 60.1z" />
                <path fill="#ffce00" d="M104.6 499 325.3 277.7l60.1 60.1L104.6 499z" />
                <path fill="#ff3a44" d="M504.4 256 385.4 174.2l-60.1 60.1 21.7 21.7-21.7 21.7 60.1 60.1L504.4 256z" />
                <path fill="#00f076" d="m104.6 13 220.7 221.3-220.7 221.3c-7.9-3.5-14.4-12.5-14.4-21.6V34.6c0-9.1 6.5-18.1 14.4-21.6z" />
              </svg>
              <span className="bdg-stack">
                <span className="bdg-sm">GET IT ON</span>
                <span className="bdg-lg">Google Play</span>
              </span>
            </a>
          </div>

          <div className="hero-stats" style={{ gridTemplateColumns: `repeat(${showFunding ? 4 : 3}, 1fr)` }}>
            <div className="hero-stat">
              <div className="label">MAU</div>
              <div className="value">300K<sup>+</sup></div>
              <div className="meta">USA & Europe primary markets</div>
            </div>
            <div className="hero-stat">
              <div className="label">RATING</div>
              <div className="value">4.8<sup>/5</sup></div>
              <div className="meta">50K+ Ratings on App Store + Play Store</div>
            </div>
            {showFunding && <div className="hero-stat">
              <div className="label">Funding raised</div>
              <div className="value">$2.75M</div>
              <div className="meta">Seed · Oct 2025</div>
            </div>}
            <div className="hero-stat">
              <div className="label">Founded</div>
              <div className="value">2024</div>
              <div className="meta">By Experienced Gaming Poofessionals</div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee">
        <div className="marquee-track">
          {[...Array(2)].map((_, k) => <React.Fragment key={k}>
              <span>Adaptive story progression</span>
              <span>Generative content</span>
              <span>Player-aware difficulty</span>
              <span>Live ops at scale</span>
              <span>Culturally relevant</span>
              <span>Personalization engine</span>
            </React.Fragment>
          )}
        </div>
      </div>

      {/* TECH */}
      <section className="section tech" id="tech">
        <div className="section-inner">
          <div className="eyebrow">01 — Technology</div>
          <h2 className="section-title">A personalization engine built for the casual gaming era.</h2>
          <p className="section-lede">Most games ship one experience for everyone. Ours adapt to skill, taste, time-of-day and culture using AI powered development to spin up content tuned to each player.

          </p>

          <div className="tech-grid">
            <div className="tech-card lg">
              <h3>Player-adaptive content</h3>
              <p>Difficulty, level pacing, live-ops and meta-content all tune in real time. Every session is a crafted based on the user behavious.</p>
              <div className="viz">
                <canvas id="viz-canvas"></canvas>
                <div className="viz-legend">
                  <span>player_signal_stream</span>
                  <span>live · 6 cohorts</span>
                </div>
              </div>
            </div>
            <div className="tech-cards">
              <div className="tech-card">
                <h3>Level Personalisation Agent</h3>
                <p>Auto tune levels based on user skills to drive incremental RoAS while reducing churn probability</p>
              </div>
              <div className="tech-card">
                <h3>Live ops, scaled</h3>
                <p>Rapid live ops and content testing to find what works best, using simulated user bots to make faster decisions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GAMES */}
      <section className="section games" id="games">
        <div className="section-inner">
          <div className="eyebrow">02 — Our games</div>
          <h2 className="section-title">Two flagships. Both built around adaptive play.</h2>

          <div className="game-card" style={{ marginTop: 64 }}>
            <div>
              <div className="game-meta">
                <span>Live</span>
                <span>Casual puzzle</span>
                <span>iOS · Android</span>
              </div>
              <h3>TAP Hexa</h3>
              <p>Tap Hexa is a fun puzzle game where you tap hexagon tiles to clear levels, collect stars, and complete rescue missions. Simple to play, yet challenging to master.</p>
              <div className="game-stats">
                <div><div className="v">1MN<sup>+</sup></div><div className="l">Installs</div></div>
                <div><div className="v">4.9★</div><div className="l">Play Store</div></div>
                <div><div className="v"></div><div className="l"></div></div>
              </div>
              <div className="game-actions">
                <a href="#" className="store-btn">▶ Google Play</a>
                <a href="#" className="store-btn"> App Store</a>
              </div>
            </div>
            <div className="game-art">
              <img src="assets/tap-hexa-logo-new.png" alt="Tap Hexa" />
            </div>
          </div>

          <div className="game-card alt">
            <div className="game-info">
              <div className="game-meta">
                <span className="dot" style={{ background: '#5b2ee8' }}></span>
                <span>Live · 2025</span>
                <span>·</span>
                <span>iOS · Android</span>
              </div>
              <h3>JigStory</h3>
              <p>A snappy, bite-sized hex tapper for the everyday commute. Quick to pick up, deep enough to keep coming back to.</p>
              <div className="game-stats">
                <div><div className="v">Live</div><div className="l">Status</div></div>
                <div><div className="v">4.7<sup>★</sup></div><div className="l">Rating</div></div>
                <div><div className="v">Free</div><div className="l">To play</div></div>
              </div>
              <div className="game-actions">
                <a href="#" className="store-btn">▶ Google Play</a>
                <a href="#" className="store-btn"> App Store</a>
              </div>
            </div>
            <div className="game-art">
              <img src="assets/jigstory-logo.png" alt="JigStory" />
            </div>
          </div>
        </div>
      </section>

      {/* INVESTORS */}
      <section className="investors" id="investors">
        <div className="section-inner">
          <div className="eyebrow">03 — Backed by</div>
          <h2 className="section-title">Leading Gaming Investors</h2>
          <div className="inv-row">
            <div className="inv-card">
              <div className="name">T-Accelerate Capital</div>
              <div className="role">Lead · Seed</div>
            </div>
            <div className="inv-card">
              <div className="name">Centre Court Capital</div>
              <div className="role">Co-lead · Sports & gaming</div>
            </div>
            <div className="inv-card">
              <div className="name">BITKRAFT Ventures</div>
              <div className="role">Co-lead · $1B+ AUM</div>
            </div>
          </div>
        </div>
      </section>

      {/* CAREERS BANNER */}
      <div className="careers-banner" id="careers">
        <div>
          <h2 style={{ width: "478px", fontSize: "42px" }}>Join us build games that millions of people love.</h2>
          <p>We're hiring across game growth, design, engineering, and data. Bengaluru-based, global ambition.</p>
          <div className="ca">
            <a href="https://app.dover.com/jobs/airoclip" target="_blank" rel="noopener" className="btn" style={{ background: '#fff', color: '#0c1846' }}>See open roles →</a>
            <a href="https://app.dover.com/jobs/airoclip" target="_blank" rel="noopener" className="btn btn-ghost" style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff', opacity: "0" }}>Life at Airoclip</a>
          </div>
        </div>
        <div className="careers-roles">
          <div className="careers-roles-head">Open Positions · Bengaluru</div>
          <a className="role-pill" href="https://app.dover.com/jobs/airoclip" target="_blank" rel="noopener"><span className="t">Growth Marketing Lead</span><span className="loc">In Office · Bengaluru, India</span><span className="arr">→</span></a>
          <a className="role-pill" href="https://app.dover.com/jobs/airoclip" target="_blank" rel="noopener"><span className="t">Senior Unity Game Developer</span><span className="loc">In Office · Bengaluru, India</span><span className="arr">→</span></a>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer" id="contact">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <a href="#" className="nav-logo">
                <span className="mark"><AiroLogoMark size={18} /></span>
                <span>airoclip</span>
              </a>
              <p>Crafting personalized gaming experiences. AI-powered casual puzzle games for global audiences, built from Bengaluru.</p>
              <div className="footer-socials" style={{ marginTop: 20 }}>
                <a href="#" aria-label="X"><Social.X /></a>
                <a href="#" aria-label="LinkedIn"><Social.In /></a>
                <a href="#" aria-label="YouTube"><Social.Yt /></a>
                <a href="#" aria-label="Instagram"><Social.Ig /></a>
              </div>
            </div>
            <div className="footer-col">
              <h5>Studio</h5>
              <a href="#tech">Technology</a>
              <a href="#games">Games</a>
              <a href="#investors">Investors</a>
              <a href="careers.html">Careers</a>
            </div>
            <div className="footer-col">
              <h5>Games</h5>
              <a href="games/hexa-dreams.html">Hexa Dreams</a>
              <a href="games/tap-hexa.html">Tap Hexa</a>
              <a href="#"></a>
            </div>
            <div className="footer-col">
              <h5>Company</h5>
              <a href="#">About</a>
              <a href="news.html">News</a>
              <a href="mailto:info@airoclip.com">Contact</a>
              <a href="mailto:info@airoclip.com"></a>
            </div>
            <div className="footer-col">
              <h5>Legal</h5>
              <a href="privacy.html">Privacy Policy</a>
              <a href="terms.html">Terms of Service</a>
              <a href="ads.txt">ads.txt</a>
            </div>
          </div>
          <div className="footer-bottom">
            <div>© 2025 Airoclip Technologies Pvt. Ltd. — Bengaluru, India</div>
            <div className="footer-legal">
              <a href="privacy.html">Privacy</a>
              <a href="terms.html">Terms</a>
              <a href="mailto:info@airoclip.com">info@airoclip.com</a>
            </div>
          </div>
        </div>
      </footer>
    </div>);
}

window.StudioSite = StudioSite;
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  FileSearch,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
export function Landing() {
  return (
    <div className="landing">
      <nav className="landing-nav">
        <Link to="/" className="brand">
          <span className="brand-mark">
            <BrainCircuit size={20} />
          </span>
          <span>Prepwise</span>
        </Link>
        <div>
          <Link className="text-link" to="/login">
            Log in
          </Link>
          <Link className="button button-dark" to="/register">
            Create account <ArrowRight size={16} />
          </Link>
        </div>
      </nav>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <Sparkles size={14} /> A clearer path to confident interviews
          </div>
          <h1>
            Practice with purpose.
            <br />
            <em>Show up ready.</em>
          </h1>
          <p>
            Prepwise turns your resume into a focused preparation plan, so every
            practice session moves you closer to your next great conversation.
          </p>
          <div className="hero-actions">
            <Link className="button button-coral" to="/register">
              Start preparing <ArrowRight size={17} />
            </Link>
            <a className="text-link play-link" href="#features">
              <PlayCircle size={19} /> See how it works
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />
          <div className="score-panel">
            <div className="panel-top">
              <span>Resume signal</span>
              <span className="status-dot">Live</span>
            </div>
            <div className="score-ring">
              <strong>82</strong>
              <span>/ 100</span>
            </div>
            <div className="score-caption">Your preparation snapshot</div>
            <div className="signal-row">
              <span>Experience match</span>
              <b>Strong</b>
            </div>
            <div className="signal-row">
              <span>Story clarity</span>
              <b>Build next</b>
            </div>
            <div className="signal-row">
              <span>Interview readiness</span>
              <b>On track</b>
            </div>
          </div>
          <div className="floating-note">
            <span className="mini-icon">
              <FileSearch size={16} />
            </span>
            <div>
              <strong>3 focus areas</strong>
              <small>Found in your resume</small>
            </div>
          </div>
        </div>
      </section>
      <section className="feature-section" id="features">
        <div className="section-heading">
          <span className="eyebrow">Your unfair advantage</span>
          <h2>
            Everything you need to
            <br />
            make practice count.
          </h2>
        </div>
        <div className="feature-grid">
          <Feature
            icon={FileSearch}
            number="01"
            title="Resume intelligence"
            text="Turn your experience into sharper stories and spot the gaps before a recruiter does."
          />
          <Feature
            icon={BrainCircuit}
            number="02"
            title="Deliberate practice"
            text="Build a rhythm with prompts designed around the role you actually want."
          />
          <Feature
            icon={BarChart3}
            number="03"
            title="Visible progress"
            text="See what is getting stronger, what needs work, and where to focus next."
          />
        </div>
      </section>
    </div>
  );
}
function Feature({ icon: Icon, number, title, text }) {
  return (
    <article className="feature-card">
      <div className="feature-icon">
        <Icon size={21} />
      </div>
      <span className="feature-number">{number}</span>
      <h3>{title}</h3>
      <p>{text}</p>
      <ArrowRight className="feature-arrow" size={20} />
    </article>
  );
}

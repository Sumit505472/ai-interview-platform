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
    <div className="min-h-screen overflow-hidden bg-paper">
      <nav className="mx-auto flex max-w-[1240px] items-center justify-between px-[22px] py-6 lg:px-9">
        <Link to="/" className="flex items-center gap-2.5 font-display text-[17px] font-extrabold text-ink">
          <span className="inline-flex size-[34px] items-center justify-center rounded-[9px] bg-coral text-white">
            <BrainCircuit size={20} />
          </span>
          <span>Prepwise</span>
        </Link>
        <div className="flex items-center gap-[25px]">
          <Link className="text-[13px] font-bold hover:text-coral max-[520px]:hidden" to="/login">
            Log in
          </Link>
          <Link className="inline-flex items-center justify-center gap-2 rounded-[7px] bg-navy px-4 py-3 text-[13px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#234954]" to="/register">
            Create account <ArrowRight size={16} />
          </Link>
        </div>
      </nav>
      <section className="mx-auto grid min-h-[620px] max-w-[1240px] grid-cols-1 gap-[50px] px-[22px] pt-[55px] pb-[110px] min-[801px]:grid-cols-2 min-[801px]:px-9 min-[801px]:pt-[82px]">
        <div className="max-w-[590px] self-center">
          <div className="inline-flex items-center gap-[7px] font-mono text-[11px] tracking-[0.04em] text-coral uppercase">
            <Sparkles size={14} /> A clearer path to confident interviews
          </div>
          <h1 className="my-[23px] font-display text-[clamp(42px,5.6vw,74px)] leading-[1.04] tracking-[-0.06em]">
            Practice with purpose.
            <br />
            <em className="text-coral not-italic">Show up ready.</em>
          </h1>
          <p className="max-w-[490px] text-[17px] leading-[1.7] text-muted">
            Prepwise turns your resume into a focused preparation plan, so every
            practice session moves you closer to your next great conversation.
          </p>
          <div className="mt-8 flex flex-col items-start gap-[18px] min-[521px]:flex-row min-[521px]:items-center min-[521px]:gap-6">
            <Link className="inline-flex items-center justify-center gap-2 rounded-[7px] bg-coral px-4 py-3 text-[13px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#dc5c42]" to="/register">
              Start preparing <ArrowRight size={17} />
            </Link>
            <a className="inline-flex items-center gap-2 text-[13px] font-bold hover:text-coral" href="#features">
              <PlayCircle size={19} /> See how it works
            </a>
          </div>
        </div>
        <div className="relative flex min-h-[360px] items-center justify-center min-[801px]:min-h-[440px]">
          <div className="absolute h-[510px] w-[300px] rotate-[-22deg] rounded-[50%] border border-[#d6dbd4]" />
          <div className="absolute h-[400px] w-[470px] rotate-[45deg] rounded-[50%] border border-[#e5b9ac]" />
          <div className="relative z-[1] w-[280px] rotate-[-5deg] rounded-xl bg-navy p-[25px] text-white shadow-[20px_25px_50px_#19333d24]">
            <div className="flex items-center justify-between font-mono text-[10px] text-[#b9c8c9] uppercase">
              <span>Resume signal</span>
              <span className="text-[#9acaa8]">Live</span>
            </div>
            <div className="mx-auto my-[25px] mb-3 flex size-[135px] items-baseline justify-center rounded-full border border-[#6c8789]">
              <strong className="font-display text-[50px] font-bold">82</strong>
              <span className="text-xs text-[#b9c8c9]">/ 100</span>
            </div>
            <div className="text-center text-[11px] text-[#b9c8c9]">Your preparation snapshot</div>
            <div className="mt-[17px] flex items-center justify-between border-t border-[#35535a] pt-3 text-[11px] text-[#b9c8c9]">
              <span>Experience match</span>
              <b className="text-[11px] text-white">Strong</b>
            </div>
            <div className="flex items-center justify-between border-t border-[#35535a] pt-3 text-[11px] text-[#b9c8c9]">
              <span>Story clarity</span>
              <b className="text-[11px] text-white">Build next</b>
            </div>
            <div className="flex items-center justify-between border-t border-[#35535a] pt-3 text-[11px] text-[#b9c8c9]">
              <span>Interview readiness</span>
              <b className="text-[11px] text-white">On track</b>
            </div>
          </div>
          <div className="absolute right-0 bottom-[43px] z-[2] flex rotate-1 items-center gap-2.5 rounded-[9px] border border-line bg-surface px-3.5 py-3">
            <span className="inline-flex size-[31px] items-center justify-center rounded-[7px] bg-[#f8dcd4] text-coral">
              <FileSearch size={16} />
            </span>
            <div>
              <strong className="block text-xs">3 focus areas</strong>
              <small className="mt-[3px] block text-[10px] text-muted">Found in your resume</small>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-surface px-[22px] py-[70px] min-[801px]:px-[max(36px,calc((100vw-1168px)/2))] min-[801px]:py-[90px]" id="features">
        <div>
          <span className="inline-flex items-center gap-[7px] font-mono text-[11px] tracking-[0.04em] text-muted uppercase">Your unfair advantage</span>
          <h2 className="mt-[15px] font-display text-[32px] leading-[1.15] tracking-[-0.05em] sm:text-[38px]">
            Everything you need to
            <br />
            make practice count.
          </h2>
        </div>
        <div className="mt-[45px] grid grid-cols-1 gap-[18px] min-[521px]:grid-cols-2 min-[801px]:grid-cols-3">
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
    <article className="relative min-h-[245px] border border-line p-[23px] transition duration-200 hover:-translate-y-1 hover:border-coral">
      <div className="inline-flex size-10 items-center justify-center rounded-[7px] bg-[#f8dcd4] text-coral">
        <Icon size={21} />
      </div>
      <span className="float-right font-mono text-[11px] text-[#aab3b1]">{number}</span>
      <h3 className="mt-[34px] font-display text-[19px]">{title}</h3>
      <p className="mt-2.5 max-w-[280px] text-sm leading-[1.6] text-muted">{text}</p>
      <ArrowRight className="absolute right-[23px] bottom-[22px] text-coral" size={20} />
    </article>
  );
}

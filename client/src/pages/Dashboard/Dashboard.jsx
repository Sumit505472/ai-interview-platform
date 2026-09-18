import {
  ArrowUpRight,
  CalendarDays,
  FileText,
  Mic2,
  Target,
} from "lucide-react";
export function Dashboard({ user }) {
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </span>
          <h1>Good to see you, {user?.name?.split(" ")[0] || "there"}.</h1>
          <p>Here is your preparation pulse.</p>
        </div>
        <button className="button button-dark">
          <Mic2 size={17} /> Start practice
        </button>
      </div>
      <div className="stat-grid">
        <Stat
          icon={FileText}
          label="Resumes uploaded"
          value="--"
          hint="No data yet"
        />
        <Stat
          icon={Target}
          label="Latest resume score"
          value="--"
          hint="Analyze a resume"
        />
        <Stat
          icon={Mic2}
          label="Interviews completed"
          value="--"
          hint="No data yet"
        />
        <Stat
          icon={CalendarDays}
          label="Average score"
          value="--"
          hint="No data yet"
        />
      </div>
      <section className="dashboard-grid">
        <div className="content-panel focus-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Next best action</span>
              <h2>Build your preparation base</h2>
            </div>
            <span className="panel-number">01</span>
          </div>
          <p>
            Upload your resume to get an AI-powered read on your strongest
            signals and the areas worth sharpening.
          </p>
          <button className="button button-coral">
            Review resume <ArrowUpRight size={16} />
          </button>
        </div>
        <div className="content-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Your rhythm</span>
              <h2>Practice streak</h2>
            </div>
          </div>
          <div className="empty-chart">
            <div className="chart-line" />
            <span>Start a session to see your progress here.</span>
          </div>
        </div>
      </section>
    </>
  );
}
function Stat({ icon: Icon, label, value, hint }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">
        <Icon size={18} />
      </div>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{hint}</small>
    </div>
  );
}

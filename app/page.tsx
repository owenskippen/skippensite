import { ContactForm } from "./contact-form";
import { contact, education, experience, projects, skills, type Entry, type Project } from "./content";
import { Scene } from "./scene";

function Rows({ entries }: { entries: Entry[] }) {
  return (
    <ol className="rows">
      {entries.map((entry) => (
        <li key={entry.title}>
          <p className="when">{entry.when}</p>
          <h3>{entry.title}</h3>
          <p className="place">{entry.place}</p>
          {entry.points && (
            <ul className="points">
              {entry.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const body = (
    <>
      <p className="when">{project.note}</p>
      <h3>
        {project.name} {project.href && <span aria-hidden="true">↗</span>}
      </h3>
      <p>{project.description}</p>
      <ul className="pills" aria-label="Technologies">
        {project.tech.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
    </>
  );
  return project.href ? (
    <a className="card" href={project.href} target="_blank" rel="noopener noreferrer">
      {body}
    </a>
  ) : (
    <div className="card">{body}</div>
  );
}

const panels = {
  about: (
    <>
      <p>
        I&apos;m a Computer Systems Technology student at BCIT with a strong interest in full-stack
        web development. I enjoy building applications that solve real problems, and I&apos;ve
        proven I can do it fast: winning 1st place at SystemsHacks 2026 and shipping a
        production-quality app at HackCamp 2025.
      </p>
      <p>
        I&apos;m comfortable across the stack: React and TypeScript on the front end, Node.js and
        Express on the back end, and working with external APIs, databases, and AI integrations in
        between.
      </p>
      <div className="skills">
        {skills.map((group) => (
          <div key={group.title}>
            <h3 className="when">{group.title}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  ),
  projects: (
    <ul className="cards">
      {projects.map((project) => (
        <li key={project.name}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  ),
  experience: <Rows entries={experience} />,
  education: <Rows entries={education} />,
  contact: (
    <>
      <p>
        Open to internships, co-op positions, and entry-level roles. Send a message and I&apos;ll
        reply within a couple of days.
      </p>
      <dl className="info">
        {contact.map((item) => (
          <div key={item.label}>
            <dt className="when">{item.label}</dt>
            <dd>
              {item.href ? (
                <a
                  href={item.href}
                  {...(item.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                >
                  {item.value}
                </a>
              ) : (
                item.value
              )}
            </dd>
          </div>
        ))}
      </dl>
      <ContactForm />
    </>
  ),
};

export default function HomePage() {
  return <Scene panels={panels} />;
}

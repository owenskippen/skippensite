export type Project = {
  name: string;
  href?: string;
  note: string;
  description: string;
  tech: string[];
};

export type Entry = {
  when: string;
  title: string;
  place: string;
  points?: string[];
};

export const EMAIL = "owenskippen@gmail.com";
export const GITHUB = "https://github.com/owenskippen";
export const LINKEDIN = "https://linkedin.com/in/owenskippen";
export const RESUME = "/files/owen-skippen-resume.pdf";

// Platforms on the tree: each opens a panel. x/y are the centre in the 600×900 scene.
export const platforms = [
  { id: "about", title: "About", x: 170, y: 345 },
  { id: "projects", title: "Projects", x: 440, y: 470 },
  { id: "experience", title: "Experience", x: 150, y: 585 },
  { id: "education", title: "Education", x: 455, y: 690 },
  { id: "contact", title: "Contact", x: 190, y: 800 },
];

// Orbs on short stubs: links, each opening in a new tab.
export const orbs = [
  { id: "resume", title: "Resume", href: RESUME, x: 402, y: 385 },
  { id: "github", title: "GitHub", href: GITHUB, x: 203, y: 480 },
  { id: "linkedin", title: "LinkedIn", href: LINKEDIN, x: 402, y: 610 },
];

// Played through a YouTube embed, kept out of sight, when the visitor turns the music on.
export const TRACK = {
  id: "1y8JnzXgUec",
  title: "Space Junk Road (piano)",
  by: "NintenMusic",
};

export const skills = [
  { title: "Languages", items: ["JavaScript", "TypeScript", "Java", "Python", "HTML & CSS"] },
  {
    title: "Frameworks",
    items: ["React", "Next.js", "Node.js", "Express.js", "Three.js", "Zustand", "Tailwind CSS", "Mapbox GL"],
  },
  {
    title: "Tools",
    items: ["Git & GitHub", "VS Code / Cursor", "Vite", "Bun", "Vercel", "Figma", "GitHub Copilot"],
  },
];

export const projects: Project[] = [
  {
    name: "Verdant",
    href: "https://devpost.com/software/verdant-8hf09j",
    note: "1st place · SystemsHacks 2026",
    description:
      "Climate resilience dashboard for city agencies. Analyzes real-time satellite and sensor data from NASA APIs to map urban heat islands and identify optimal locations for green infrastructure. Built with 3D Mapbox visualizations and AI-powered temperature reduction projections.",
    tech: ["React", "Next.js", "TypeScript", "Tailwind", "Mapbox", "NASA API"],
  },
  {
    name: "Nullspace",
    note: "StormHacks 2026",
    description:
      "A 3D browser experience for the StormHacks 2026 Huawei Beyond Euclid challenge, letting players explore non-Euclidean geometry and impossible spaces in a dream-like world. Portal-based room transitions in Three.js, a curved spherical world with custom planet shaders, and a scroll-driven landing page that flows into gameplay.",
    tech: ["React", "TypeScript", "Three.js", "Vite", "Zustand", "Tailwind", "Bun", "Figma"],
  },
  {
    name: "ScrapSnap AI",
    href: "https://devpost.com/software/scrapsnap-ai",
    note: "HackCamp 2025",
    description:
      "AI-powered food waste tracking app for restaurants. Converts photos of discarded food into structured insights using Google Gemini Vision. Features SHA-256 image hashing, a full analytics dashboard, and a pattern-based suggestion engine.",
    tech: ["React", "Vite", "Node.js", "Express.js", "Gemini Vision", "Tailwind"],
  },
];

export const experience: Entry[] = [
  {
    when: "Mar 2024 – Present · Part-time",
    title: "Server",
    place: "Pho Ten, Richmond, BC",
    points: [
      "Provided excellent customer service by anticipating needs and responding promptly to requests.",
      "Greeted and accommodated guests, building a positive experience from first interaction.",
      "Prioritized multiple tasks in a dynamic environment and stayed calm and composed.",
      "Checked in with guests throughout meal service, replenishing drinks and catering to additional requests.",
      "Cleaned and sanitized hands and surfaces to maintain food safety and meet health department regulations.",
    ],
  },
  {
    when: "Jul 2023 – Aug 2024 · Volunteer",
    title: "Youth Leader",
    place: "Immanuel Christian Reformed Church, Richmond, BC",
    points: [
      "Facilitated engaging activities and discussions to foster youth development.",
      "Mentored participants, providing guidance to build confidence and leadership skills.",
      "Organized community events and developed educational materials.",
      "Collaborated with team members to create inclusive programs.",
    ],
  },
];

export const education: Entry[] = [
  {
    when: "Sep 2026 – Present · Expected Apr 2028",
    title: "Diploma in Computer Systems Technology",
    place: "British Columbia Institute of Technology (BCIT), Vancouver, BC",
  },
];

export const contact = [
  { label: "Phone", value: "672-515-6571", href: "tel:6725156571" },
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  { label: "Location", value: "Vancouver, BC, Canada" },
  { label: "LinkedIn", value: "linkedin.com/in/owenskippen", href: LINKEDIN },
  { label: "GitHub", value: "github.com/owenskippen", href: GITHUB },
];

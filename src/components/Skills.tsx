import "./styles/Skills.css";

const skillGroups = [
  {
    title: "Programming",
    items: ["C", "C++", "Java", "JavaScript", "Python", "MySQL"],
  },
  {
    title: "Web Development",
    items: [
      "Next.js",
      "React.js",
      "Node.js",
      "TailwindCSS",
      "Supabase",
      "MongoDB",
    ],
  },
  {
    title: "Machine Learning",
    items: ["TensorFlow", "Keras", "Pandas", "NumPy", "FinBERT"],
  },
  {
    title: "Core CS",
    items: ["DSA", "OOP", "OS", "DBMS", "Computer Networking"],
  },
  {
    title: "Tools",
    items: ["Git/GitHub", "VS Code", "Jupyter", "Postman", "Power BI", "Linux"],
  },
  {
    title: "AI Tools",
    items: ["Claude Code", "Cursor", "Stitch", "Antigravity", "GitHub Copilot"],
  },
];

const Skills = () => {
  return (
    <section className="skills-section section-container" id="skills">
      <div className="skills-container">
        <h2>
          My <span>Skills</span>
        </h2>
        <div className="skills-grid">
          {skillGroups.map((group) => (
            <article className="skill-card" key={group.title}>
              <h3>{group.title}</h3>
              <div className="skill-tags">
                {group.items.map((item) => (
                  <span className="skill-tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

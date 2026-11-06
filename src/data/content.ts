export const profile = {
  name: "Dishan Sarkar",
  role: "AI engineer",
  location: "Kolkata, India",
  email: "dishansrkr@gmail.com",
  phone: "+91 89021 30104",
  phoneHref: "tel:+918902130104",
  resume: "/resumeDishanSarkar.pdf",
  links: [
    { label: "GitHub", href: "https://github.com/Dishan18" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/dishan-sarkar-819aab275/" },
    { label: "arXiv", href: "https://arxiv.org/abs/2606.29347" },
  ],
};

/** The hero's model card: a portfolio written the way ML models get documented. */
export const modelCard: { field: string; value: string }[] = [
  { field: "Trained on", value: "B.Tech AI & ML, BIT Mesra, 2027" },
  { field: "Fine-tuned at", value: "Accenture, 2026" },
  { field: "Next", value: "Incoming FTE, Illuminati Consulting" },
  { field: "Good at", value: "Agents, RAG, evals, the backend under them" },
  { field: "Known limits", value: "Asks for the eval set first" },
];

export const currently = [
  "Guardrails for agents",
  "Multi-agent LangGraph",
  "RAG with real evals",
  "Voice agents",
];

export const job = {
  company: "Accenture",
  role: "Associate Software Engineering Intern",
  period: "May to Jul 2026",
  place: "Kolkata",
  repo: "https://github.com/Dishan18/Incident-Platform",
  points: [
    "Built an AI incident platform that ranks, de-duplicates and routes 500+ enterprise tickets a day.",
    "Shipped a natural-language-to-SQL engine on Azure that cut reporting turnaround by 30%.",
  ],
};

export type Stat = { value: string; label: string };

export type Project = {
  name: string;
  kind: string;
  summary: string;
  stats: Stat[];
  stack: string;
  href: string;
  live?: string;
  tone: "sky" | "sage" | "manila";
};

export const featured: Project[] = [
  {
    name: "IntentGuard",
    kind: "Guardrails for AI agents",
    summary:
      "An MCP gateway between AI agents and the tools they call. The LLM proposes, deterministic code authorizes: every call is allowed, held for the owner, or blocked, with its reasons on record.",
    stats: [
      { value: "11", label: "red-team attacks" },
      { value: "0", label: "breaches" },
      { value: "3", label: "verdicts, all audited" },
    ],
    stack: "Python, MCP, Gemini, PayPal sandbox",
    href: "https://github.com/Dishan18/IntentGuard",
    live: "https://intentguard-5dd9.onrender.com",
    tone: "sage",
  },
  {
    name: "Agentic SOV",
    kind: "Multi-agent data cleansing",
    summary:
      "Four LangGraph agents turn messy insurance workbooks into a strict 17-field schema. The LLM suggests; only validated, approved transforms touch the data.",
    stats: [
      { value: "55/55", label: "real files mapped" },
      { value: "22 s", label: "max per workbook" },
      { value: "4", label: "agents" },
    ],
    stack: "LangGraph, ChromaDB, Pandas, Pandera",
    href: "https://github.com/Dishan18/Adrosonic_Hackathon",
    tone: "sky",
  },
  {
    name: "AI Codebase Explainer",
    kind: "Multi-agent RAG, fully local",
    summary:
      "Point it at a public repo and ask. A router hands each question to a debug, explain, summary or search agent, each answering from a FAISS index with memory.",
    stats: [
      { value: "4", label: "specialist agents" },
      { value: "7B", label: "Mistral on Ollama" },
      { value: "0", label: "cloud calls" },
    ],
    stack: "FastAPI, Ollama, FAISS, SentenceTransformers, React",
    href: "https://github.com/Dishan18/AI-Codebase",
    tone: "manila",
  },
];

export const research = {
  title: "Adaptive Financial Transformer with Regime-Gated Attention",
  meta: "Independent research, BIT Mesra, 2026",
  summary:
    "Five-day return forecasting with ablations, multi-seed runs and paired significance tests. Comparable accuracy with 15.2% fewer parameters and 58% fewer input features.",
  arxiv: "arXiv:2606.29347",
  links: [
    { label: "Read on arXiv", href: "https://arxiv.org/abs/2606.29347" },
    { label: "Zenodo DOI", href: "https://doi.org/10.5281/zenodo.21109642" },
  ],
};

export type ArchiveItem = {
  name: string;
  note: string;
  stack: string;
  href: string;
  image?: string;
};

export const archiveRepos = "https://github.com/Dishan18?tab=repositories";

export const archive: { group: string; items: ArchiveItem[] }[] = [
  {
    group: "AI and ML",
    items: [
      { name: "Incident Platform", note: "Routes, prioritises and de-duplicates IT incidents; an LLM drafts the root cause", stack: "scikit-learn, Gemini, Azure", href: "https://github.com/Dishan18/Incident-Platform" },
      { name: "RecoveryAI", note: "Voice agent with a policy engine and a 13-state machine", stack: "FastAPI, Gemini, Next.js", href: "https://github.com/Dishan18/RecoveryAI", image: "/images/recoveryai.webp" },
      { name: "FraudScale", note: "Streams 1,000 reviews a second and scores coordinated bots", stack: "Kafka, Spark, FAISS", href: "https://github.com/Dishan18/FraudScale" },
      { name: "Stock Research", note: "NSE dashboard with FinBERT news sentiment", stack: "FastAPI, FinBERT, Next.js", href: "https://github.com/Dishan18/StockResearch" },
      { name: "VedaAI", note: "Builds assessments for teachers, queued and streamed live", stack: "Next.js, BullMQ, Socket.IO", href: "https://github.com/Dishan18/VedaAITeacher" },
      { name: "CallUthao", note: "Voice receptionist for small businesses", stack: "TypeScript, streaming voice", href: "https://github.com/Dishan18/CallUthao" },
      { name: "AI Traffic Optimizer", note: "YOLOv8 counts cars, signals adapt in SUMO", stack: "YOLOv8, OpenCV, Node", href: "https://github.com/Dishan18/AI-Traffic-Optimizer", image: "/images/traffic-optimizer.webp" },
    ],
  },
  {
    group: "Systems",
    items: [
      { name: "LedgerFlow", note: "Double-entry ledger, 175 writes a second at p99 under 200 ms", stack: "Spring Boot, PostgreSQL, AWS", href: "https://github.com/Dishan18/LedgerFlow" },
      { name: "Smart Warehouse", note: "Concurrency-safe stock engine with idempotent writes", stack: "Spring Boot, PostgreSQL", href: "https://github.com/Dishan18/Warehouse" },
      { name: "Order Book Engine", note: "Lock-free limit order book with O(1) cancels", stack: "C++20", href: "https://github.com/Dishan18/Order-book-engine" },
    ],
  },
  {
    group: "Apps",
    items: [
      { name: "Books", note: "Android reader for PDFs, EPUBs and manga, no tracking", stack: "Kotlin, Compose", href: "https://github.com/Dishan18/Books" },
      { name: "DrainGuard", note: "Triage for blocked storm drains, Amazon Environmental Hacks", stack: "TypeScript, AWS", href: "https://github.com/Dishan18/EnvironOS" },
      { name: "Typique", note: "A typewriter in the browser, with Morse mode", stack: "React, Vite", href: "https://typique.vercel.app/", image: "/images/typique.webp" },
      { name: "Pinkasfloyd", note: "Poster store with a walk-around 3D gallery", stack: "Next.js, React Three Fiber, Supabase", href: "https://www.pinkasfloyd.in/", image: "/images/pinkasfloyd.webp" },
      { name: "SarkarPress", note: "Site for a printing press running 25+ years", stack: "Next.js, Supabase", href: "https://sarkar-press.vercel.app", image: "/images/sarkarpress.webp" },
    ],
  },
];

export const skills: { group: string; items: string[]; tape: "black" | "red" | "blue" | "green" }[] = [
  { group: "AI and ML", items: ["PyTorch", "Transformers", "RAG", "LangGraph", "Multi-agent", "FAISS", "ChromaDB", "Gemini"], tape: "black" },
  { group: "Backend", items: ["FastAPI", "Spring Boot", "Node.js", "PostgreSQL", "Redis", "Kafka"], tape: "blue" },
  { group: "Cloud", items: ["AWS", "Azure", "Docker", "Terraform", "GitHub Actions"], tape: "green" },
  { group: "Languages", items: ["Python", "Java", "C++", "SQL", "JavaScript"], tape: "red" },
];

export const recognition: { title: string; detail: string }[] = [
  { title: "Amazon ML Challenge", detail: "Top 200 teams" },
  { title: "India Innovates 2026", detail: "National finalist" },
  { title: "Smart India Hackathon", detail: "Top-30 institute team" },
  { title: "ISRO Antariksh Hackathon", detail: "Shortlisted" },
  { title: "Codeforces", detail: "Specialist, 1499" },
  { title: "LeetCode", detail: "300+ solved" },
];

export const certifications =
  "CompTIA Security+, Network+, Cloud+. Accenture GenAI and Agentic AI. DeepLearning.AI ML. Google Cloud Foundations.";

export const education = {
  school: "BIT Mesra",
  degree: "B.Tech, AI and Machine Learning",
  detail: "2023 to 2027, CGPA 8.5",
};

export const leadership = {
  role: "Vice-President, IETE Student Chapter",
  detail: "Technical programmes for 220+ students.",
};

import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "Pinkasfloyd",
    category: "Full-Stack E-commerce Platform",
    tools:
      "Next.js, React, Tailwind CSS, Supabase, SEO, Auth, Cart, Checkout, Wishlist",
    image: "/images/pro1.png",
    link: "https://www.pinkasfloyd.in/",
  },
  {
    title: "Stock Price Prediction",
    category: "Deep Learning + Sentiment Analysis",
    tools:
      "TensorFlow, Keras, LSTM, FinBERT, BeautifulSoup, Pandas, NumPy, Seaborn",
    image: "/images/pro2.png",
    link: "https://github.com/Dishan18/Stock_Predictor",
  },
  {
    title: "Job-Fit AI",
    category: "AI Resume Analysis Platform",
    tools:
      "MERN Stack, Google Gemini, Express, Multer, JWT, Google OAuth, Tailwind",
    image: "/images/pro3.png",
    link: "https://github.com/Dishan18/JobFit-AI",
  },
  {
    title: "Blockchain Loan Management",
    category: "Smart Contract + Web3 System",
    tools:
      "Solidity, Flask, Web3.py, Truffle, Ganache, KYC, Loan States, P2P Transfers",
    image: "/images/pro4.jpg",
    link: "https://github.com/Dishan18/Blockchain-based-Loan-Management-System",
  },
  {
    title: "3D Portfolio Website",
    category: "Interactive Developer Portfolio",
    tools:
      "React, TypeScript, Vite, Three.js, React Three Fiber, GSAP, Rapier, Responsive UI",
    image: "/images/pro5.png",
    link: "https://github.com/Dishan18/3DPorfolio",
  },
  {
    title: "AI Traffic Optimizer",
    category: "AI Traffic: Intelligent Intersection Control System",
    tools:
      "Python (OpenCV, YOLOv8, NumPy, Pandas), ZeroMQ IPC, Node.js, Express, Socket.io, JWT, React, SUMO, Power BI",
    image: "/images/pro6.jpg",
    link: "https://github.com/Dishan18/AI-Traffic-Optimizer",
  },
  {
    title: "Retail Sales and Vendor Performance Analysis",
    category: "Data Analytics and BI Project",
    tools:
      "Pandas, NumPy, Seaborn, Jupyter, Power BI, SQL ETL (CTEs, filtering), EDA, Hypothesis Testing, KPI Dashboards, Inventory Optimization",
    image: "/images/pro7.png",
    link: "https://github.com/Dishan18/Vendor-Performance-Analysis",
  },
  {
    title: "SarkarPress Web App",
    category: "Next.js 14 + Supabase Application",
    tools:
      "Next.js 14 (App Router), TypeScript, Custom CSS, EN/HI/BN Localization, Supabase PostgreSQL, RLS Policies, Order ID Generation, Payment Guidance, No-Auth User Flow, Vercel Deployment",
    image: "/images/pro8.png",
    link: "https://github.com/Dishan18/SarkarPress",
  },
  {
    title: "Therapy AI Chatbot",
    category: "LLM-Powered Telegram Mental Wellness Assistant",
    tools:
      "Python, python-telegram-bot, RESTful API, LLaMA2, Contextual Memory (20-message retention), Prompt Tuning (temperature 1.0, top-p 0.9), 100+ daily conversations",
    image: "/images/pro9.png",
    link: "https://github.com/Dishan18/Therapy-AI-Bot",
  },
  {
    title: "Olympic Data Analysis",
    category: "Sports Data Scraping, EDA and Prediction",
    tools:
      "Pandas, BeautifulSoup, Matplotlib, NumPy, Jupyter, Scikit-learn, Web Scraping (olympedia.org), Data Cleaning, Statistical Analysis, Medal Prediction Logistic Regression (Accuracy: 0.8578)",
    image: "/images/pro10.png",
    link: "https://github.com/Dishan18/Olympic-Data-Cleaning",
  },
  {
    title: "Typique",
    category: "Creative Writing Application, Interactive UI/UX System",
    tools:
      "React, TypeScript, Vite, Tailwind CSS, Framer Motion, Custom Input Handling, State Management, Multi-page Document Engine, PDF Export, WhatsApp API (wa.me), Local Storage Persistence",
    image: "/images/pro11.png",
    link: "https://github.com/Dishan18/Typique",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);

  const slides = [projects[projects.length - 1], ...projects, projects[0]];

  const activeProjectIndex =
    currentIndex === 0
      ? projects.length - 1
      : currentIndex === projects.length + 1
        ? 0
        : currentIndex - 1;

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setIsTransitionEnabled(true);
      setCurrentIndex(index);
    },
    [isAnimating],
  );

  const goToPrev = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const handleTransitionEnd = useCallback(() => {
    setIsAnimating(false);

    if (currentIndex === 0) {
      setIsTransitionEnabled(false);
      setCurrentIndex(projects.length);
      return;
    }

    if (currentIndex === projects.length + 1) {
      setIsTransitionEnabled(false);
      setCurrentIndex(1);
      return;
    }
  }, [currentIndex]);

  return (
    <div className="work-section" id="projects">
      <div className="work-container section-container">
        <h2>
          My <span>Projects</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              onTransitionEnd={handleTransitionEnd}
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                transition: isTransitionEnabled
                  ? "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                  : "none",
              }}
            >
              {slides.map((project, index) => {
                const projectNumber =
                  index === 0
                    ? projects.length
                    : index === slides.length - 1
                      ? 1
                      : index;

                return (
                  <div className="carousel-slide" key={index}>
                    <div className="carousel-content">
                      <div className="carousel-info">
                        <div className="carousel-number">
                          <h3>{String(projectNumber).padStart(2, "0")}</h3>
                        </div>
                        <div className="carousel-details">
                          <h4>{project.title}</h4>
                          <p className="carousel-category">
                            {project.category}
                          </p>
                          <div className="carousel-tools">
                            <span className="tools-label">
                              Tools & Features
                            </span>
                            <p>{project.tools}</p>
                          </div>
                        </div>
                      </div>
                      <div className="carousel-image-wrapper">
                        <WorkImage
                          image={project.image}
                          alt={project.title}
                          link={project.link}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${
                  index === activeProjectIndex ? "carousel-dot-active" : ""
                }`}
                onClick={() => goToSlide(index + 1)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;

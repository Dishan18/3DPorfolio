import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { text: "ABOUT", href: "#about" },
    { text: "PROJECTS", href: "#projects" },
    { text: "SKILLS", href: "#skills" },
    { text: "CONTACT", href: "#contact" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    section: string,
  ) => {
    if (window.innerWidth > 1024) {
      e.preventDefault();
      smoother.scrollTo(section, true, "top top");
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    const onResize = () => {
      ScrollSmoother.refresh(true);
      if (window.innerWidth >= 900) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          DS
        </a>
        <a
          href="mailto:dishansrkr@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
          target="_blank"
          rel="noreferrer"
        >
          dishansrkr@gmail.com
        </a>
        <button
          className={`nav-toggle ${isMenuOpen ? "nav-toggle-open" : ""}`}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          data-cursor="disable"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links ${isMenuOpen ? "nav-links-open" : ""}`}>
          {navItems.map((item) => (
            <li key={item.text}>
              <a
                data-href={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                <HoverLinks text={item.text} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;

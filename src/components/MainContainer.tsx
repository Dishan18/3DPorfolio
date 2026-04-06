import {
  lazy,
  PropsWithChildren,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import Skills from "./Skills";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024,
  );
  const [shouldRenderTechStack, setShouldRenderTechStack] = useState(false);
  const techStackTriggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [isDesktopView]);

  useEffect(() => {
    if (!isDesktopView) {
      setShouldRenderTechStack(false);
      return;
    }

    if (!techStackTriggerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldRenderTechStack(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin: "320px 0px", threshold: 0.01 },
    );

    observer.observe(techStackTriggerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isDesktopView]);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <WhatIDo />
            <Skills />
            <Career />
            <Work />
            {isDesktopView && (
              <div ref={techStackTriggerRef}>
                {shouldRenderTechStack ? (
                  <Suspense
                    fallback={<div className="techstack-placeholder" />}
                  >
                    <TechStack />
                  </Suspense>
                ) : (
                  <div className="techstack-placeholder" />
                )}
              </div>
            )}
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;

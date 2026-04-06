import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              DISHAN
              <br />
              <span>SARKAR</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>AI/ML Student &</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Full-Stack</div>
              <div className="landing-h2-2">Builder</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Machine Learning</div>
              <div className="landing-h2-info-1">Web Developer</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;

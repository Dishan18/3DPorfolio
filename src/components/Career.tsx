import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          Education <span>&</span>
          <br /> leadership
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Vice-President</h4>
                <h5>IETE Student Chapter, BIT Mesra</h5>
              </div>
              <h3>2024-Present</h3>
            </div>
            <p>
              Led technical initiatives and conducted a DSA workshop for 220+
              students, focusing on problem-solving and core CS concepts.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Technical Head</h4>
                <h5>GDSC Student Chapter, BIT Mesra</h5>
              </div>
              <h3>2024-Present</h3>
            </div>
            <p>
              Coordinated cloud engineering events and workshops for 180+
              students while supporting chapter-wide technical planning.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech (AI &amp; ML)</h4>
                <h5>Birla Institute of Technology, Mesra</h5>
              </div>
              <h3>2023-Present</h3>
            </div>
            <p>
              Bachelor of Technology in Artificial Intelligence and Machine
              Learning with CGPA 8.30.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Highlights</h4>
                <h5>Hackathons, Certifications &amp; Awards</h5>
              </div>
              <h3>2023-2026</h3>
            </div>
            <p>
              India Innovates Hackathon 2026 (Top 10), SIH (Top 30 at BIT), plus
              certifications from IEEE, DeepLearning.AI, and Google.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;

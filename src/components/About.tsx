import "./styles/About.css";

const skillStyle: React.CSSProperties = {
  display: "inline-block",
  fontWeight: 700,
  background:
    "linear-gradient(120deg, #60a5fa, #a78bfa, #34d399, #f472b6, #60a5fa)",
  backgroundSize: "300% 300%",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
  animation: "gradientMove 6s ease infinite",
};

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <div className="para">
          <p>
            Entrepreneurial Full-Stack Engineer building{" "}
            <span className="skill" style={skillStyle}>
              scalable products
            </span>
            ,{" "}
            <span className="skill" style={skillStyle}>
              distributed systems
            </span>
            , and{" "}
            <span className="skill" style={skillStyle}>
              AI-powered platforms
            </span>
            . I specialize in high-performance applications using{" "}
            <span className="skill" style={skillStyle}>
              TypeScript
            </span>
            ,{" "}
            <span className="skill" style={skillStyle}>
              React
            </span>
            ,{" "}
            <span className="skill" style={skillStyle}>
              Next.js
            </span>
            ,{" "}
            <span className="skill" style={skillStyle}>
              Node.js
            </span>
            ,{" "}
            <span className="skill" style={skillStyle}>
              NestJS
            </span>
            , and{" "}
            <span className="skill" style={skillStyle}>
              Python (FastAPI)
            </span>
            , with experience in{" "}
            <span className="skill" style={skillStyle}>
              microservices
            </span>
            ,{" "}
            <span className="skill" style={skillStyle}>
              real-time systems
            </span>
            , and{" "}
            <span className="skill" style={skillStyle}>
              event-driven architectures
            </span>
            . I also work with AI technologies such as{" "}
            <span className="skill" style={skillStyle}>
              LLMs
            </span>
            ,{" "}
            <span className="skill" style={skillStyle}>
              LangChain
            </span>
            , and{" "}
            <span className="skill" style={skillStyle}>
              RAG
            </span>
            , building intelligent systems alongside scalable backends using{" "}
            <span className="skill" style={skillStyle}>
              PostgreSQL
            </span>
            ,{" "}
            <span className="skill" style={skillStyle}>
              MongoDB
            </span>
            ,{" "}
            <span className="skill" style={skillStyle}>
              Redis
            </span>
            , and{" "}
            <span className="skill" style={skillStyle}>
              Docker
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

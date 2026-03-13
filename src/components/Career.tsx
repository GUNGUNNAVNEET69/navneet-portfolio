import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full Stack & Systems Engineer</h4>
                <h5>Independent Builder</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Started building modern full-stack systems using TypeScript,
              React.js, Next.js, Node.js and MongoDB. Focused on mastering
              software engineering fundamentals while building real-world
              applications with scalable APIs and clean frontend architectures.
              This phase laid the technical foundation for building complex
              distributed systems and large-scale technology platforms.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Distributed Systems & Microservices</h4>
                <h5>Backend Architecture</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Designed scalable microservices architectures using Node.js,
              PostgreSQL, Redis, RabbitMQ and Docker. Built event-driven
              platforms with real-time systems using Socket.IO, payment systems
              with Razorpay and Stripe, and production-ready deployments.
              Focused on building resilient backend infrastructure inspired by
              modern large-scale platforms like those used in global tech
              companies.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI Systems & Deep Tech Research</h4>
                <h5>Future Energy & AGI Builder</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Currently exploring advanced AI systems, LLM architectures,
              Agentic AI frameworks and distributed computing platforms.
              Alongside backend engineering with NestJS, Kafka, Redis and
              BullMQ, I am studying machine learning, deep learning and
              reinforcement learning to understand the core technologies behind
              intelligent systems. My long-term vision is to build
              transformative deep-tech platforms that combine advanced AI,
              large-scale computing infrastructure and breakthrough energy
              technologies such as nuclear fusion to power the next generation
              of global innovation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;

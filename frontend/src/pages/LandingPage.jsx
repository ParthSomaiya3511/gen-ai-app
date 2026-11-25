import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    FiMenu, FiX, FiChevronDown, FiCpu,
    FiTrendingUp, FiDatabase, FiShield, FiActivity, FiCopy,
    FiGithub, FiTwitter, FiSlack, FiArrowRight
} from "react-icons/fi";
import BackgroundEffects from "../components/BackgroundEffects";

function LandingPage() {
    const [selectedTab, setSelectedTab] = useState("code");
    const [terminalText, setTerminalText] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [faqActive, setFaqActive] = useState(null);
    const [processedTokens, setProcessedTokens] = useState(14829304);

    // Interactive Calculator State
    const [monthlyRequests, setMonthlyRequests] = useState(50000);

    // Interactive Newsletter State
    const [emailInput, setEmailInput] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    // Interactive Workspace Playground State
    const [demoState, setDemoState] = useState("api");
    const demoPrompts = {
        api: {
            q: "Generate a production-ready Express JWT router",
            a: "```javascript\nrouter.post('/api/v1/auth/login', async (req, res) => {\n  const token = jwt.sign({ id: req.user._id }, process.env.SECRET, {\n    expiresIn: '24h'\n  });\n  return res.status(200).json({ success: true, token });\n});\n```"
        },
        k8s: {
            q: "Create a standard Docker multi-stage build file",
            a: "```dockerfile\n# Stage 1: Build\nFROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\n# Stage 2: Serve\nFROM nginx:alpine\nCOPY --from=builder /app/dist /usr/share/nginx/html\n```"
        },
        db: {
            q: "Write a high-performance MongoDB compound index",
            a: "```javascript\n// Indexes compound keys to accelerate sorting queries\ndb.orders.createIndex(\n  { tenantId: 1, createdAt: -1, status: 1 },\n  { background: true, name: 'idx_tenant_created_status' }\n);\n```"
        }
    };

    // Live counter processed tokens simulator
    useEffect(() => {
        const interval = setInterval(() => {
            setProcessedTokens(prev => prev + Math.floor(Math.random() * 45) + 12);
        }, 1200);
        return () => clearInterval(interval);
    }, []);

    // Simulated auto-typing effect for interactive developer terminal mock
    useEffect(() => {
        let text = "";
        let index = 0;
        const codeSnippets = {
            code: `// Deploying Llama-3-Pro Pipeline\nimport { Groq } from "@groq/sdk";\n\nconst client = new Groq({ apiKey: "gsk_v..." });\nconst response = await client.chat.completions.create({\n  model: "llama3-70b-8192",\n  messages: [{ role: "user", content: "Optimize SQL index" }]\n});\nconsole.log(response.choices[0].message);`,
            devops: `# Deploying secure Kubernetes StatefulSet\napiVersion: apps/v1\nkind: StatefulSet\nmetadata:\n  name: mongodb-cluster\nspec:\n  serviceName: "mongodb"\n  replicas: 3\n  selector:\n    matchLabels:\n      app: mongodb`,
            api: `// Express server router controller\nrouter.post("/api/v1/auth/jwt", async (req, res) => {\n  const token = jwt.sign({ id: req.user._id }, secret, {\n    expiresIn: "24h"\n  });\n  return res.status(200).json({ success: true, token });\n});`
        };

        const targetText = codeSnippets[selectedTab];
        setTerminalText("");

        const interval = setInterval(() => {
            if (index < targetText.length) {
                text += targetText[index];
                setTerminalText(text);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 10);

        return () => clearInterval(interval);
    }, [selectedTab]);

    const toggleFaq = (index) => {
        setFaqActive(faqActive === index ? null : index);
    };

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (emailInput.trim()) {
            setSubscribed(true);
            setEmailInput("");
        }
    };

    // Derived Calculator Values
    const calculatedTokens = monthlyRequests * 1800; // average 1800 tokens per request
    const estimatedCostProprietary = ((calculatedTokens / 1000000) * 15.0).toFixed(2); // $15 per M tokens
    const estimatedCostLlamaGroq = ((calculatedTokens / 1000000) * 2.4).toFixed(2); // $2.4 per M tokens
    const calculatedSavings = (estimatedCostProprietary - estimatedCostLlamaGroq).toFixed(2);

    return (
        <div className="landing-page">
            <BackgroundEffects />

            {/* Mobile Responsive Navbar Header */}
            <nav className="landing-navbar">
                <div className="landing-logo">
                    <span className="logo-sparkle">✦</span> AI Assistant Pro
                </div>

                <div className="landing-actions desktop-nav">
                    <Link to="/login" className="nav-login">
                        Login
                    </Link>
                    <Link to="/register" className="nav-register">
                        Register
                    </Link>
                </div>

                <button
                    className="mobile-hamburger"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle navigation menu"
                >
                    {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </nav>

            {/* Collapsible Mobile Drawer Navigation */}
            <div className={`mobile-navbar-drawer ${mobileMenuOpen ? "drawer-open" : ""}`}>
                <Link
                    to="/login"
                    className="nav-login"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    Login
                </Link>
                <Link
                    to="/register"
                    className="nav-register"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    Get Started Free
                </Link>
            </div>

            {/* Hero Section */}
            <section className="landing-hero">
                <div className="hero-badge">
                    <span className="badge-spark">✨</span> Now powered by Groq Llama 3 API
                </div>
                <h1>
                    Enterprise <span className="gradient-text">AI Assistant</span>
                </h1>
                <p className="hero-description">
                    The high-performance workspace engineered for developers, architects, cloud DevOps, and IT systems operations teams.
                </p>

                <div className="hero-buttons">
                    <Link to="/register" className="primary-btn">
                        Get Started Free
                    </Link>
                    <Link to="/login" className="secondary-btn">
                        Access Workspace
                    </Link>
                </div>
            </section>

            {/* Real-Time Metrics & Performance Ticker */}
            <section className="stats-section">
                <div className="stats-grid">
                    <div className="stat-card live-ticker-card">
                        <h3>{processedTokens.toLocaleString()}</h3>
                        <p className="pulse-label">
                            <span className="pulse-dot"></span> Live Tokens Processed
                        </p>
                    </div>
                    <div className="stat-card">
                        <h3>&lt; 120ms</h3>
                        <p>Inference Latency</p>
                    </div>
                    <div className="stat-card">
                        <h3>99.99%</h3>
                        <p>API Uptime SLA</p>
                    </div>
                </div>
            </section>

            {/* DYNAMIC TOKEN & COST CALCULATOR */}
            <section className="calculator-section">
                <h2>ROI & Cost Efficiency Calculator</h2>
                <p className="section-subtitle-description">Compare Llama 3 Groq pricing on AI Assistant Pro vs proprietary closed-source models.</p>

                <div className="calculator-grid-wrapper">
                    <div className="calculator-controls">
                        <div className="slider-header-group">
                            <span>Estimated Monthly Queries</span>
                            <strong className="query-output-badge">{(monthlyRequests).toLocaleString()}</strong>
                        </div>
                        <input
                            type="range"
                            min="5000"
                            max="500000"
                            step="5000"
                            value={monthlyRequests}
                            onChange={(e) => setMonthlyRequests(Number(e.target.value))}
                            className="roi-range-slider"
                        />
                        <div className="slider-limits">
                            <span>5K /mo</span>
                            <span>500K /mo</span>
                        </div>
                    </div>

                    <div className="calculator-results">
                        <div className="calc-result-row">
                            <div className="result-label-col">
                                <FiCpu className="icon" />
                                <div>
                                    <h4>Tokens Processed</h4>
                                    <p>Based on 1.8K token window average</p>
                                </div>
                            </div>
                            <span className="result-value">{(calculatedTokens / 1000).toFixed(0)}k</span>
                        </div>

                        <div className="calc-result-row highlighted-row">
                            <div className="result-label-col">
                                <FiTrendingUp className="icon highlight" />
                                <div>
                                    <h4>Net Monthly Savings</h4>
                                    <p>Groq hardware compilation efficiency</p>
                                </div>
                            </div>
                            <span className="result-value green-label">${calculatedSavings}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Terminal Sandbox Section */}
            <section className="sandbox-section">
                <div className="sandbox-container">
                    <div className="sandbox-sidebar">
                        <h3>Engineered Pipelines</h3>
                        <p>Switch parameters to see instantaneous inference templates:</p>
                        <div className="sandbox-tabs">
                            <button
                                className={selectedTab === "code" ? "active" : ""}
                                onClick={() => setSelectedTab("code")}
                            >
                                💻 Llama-3 Inference SDK
                            </button>
                            <button
                                className={selectedTab === "devops" ? "active" : ""}
                                onClick={() => setSelectedTab("devops")}
                            >
                                📦 Kubernetes Deployments
                            </button>
                            <button
                                className={selectedTab === "api" ? "active" : ""}
                                onClick={() => setSelectedTab("api")}
                            >
                                ⚡ JWT API Controllers
                            </button>
                        </div>
                    </div>

                    <div className="terminal-mockup">
                        <div className="terminal-header">
                            <span className="dot dot-red"></span>
                            <span className="dot dot-yellow"></span>
                            <span className="dot dot-green"></span>
                            <span className="terminal-title">bash - assistant_compiled.js</span>
                        </div>
                        <pre className="terminal-body">
                            <code>{terminalText}</code>
                        </pre>
                    </div>
                </div>
            </section>

            {/* Enterprise Security Section */}
            <section className="security-certification-section">
                <div className="security-card">
                    <FiShield className="security-shield-icon" />
                    <h3>Zero-Data Retention Compliance</h3>
                    <p>We do not train on your inputs. Prompts are isolated inside safe workspace sandboxes with local persistence storage rules to protect sensitive codebase data.</p>
                </div>
            </section>

            {/* Features Grid Spotlight */}
            <section className="features-spotlight">
                <h2>Designed for High Uptime Workspaces</h2>
                <p className="features-sub">Accelerating operations with custom templates and clean contextual search filters.</p>
                <div className="features-grid">
                    <div className="feature-spotlight-card">
                        <div className="icon">🛡️</div>
                        <h4>Enterprise Isolation</h4>
                        <p>Fully compliant context window processing with protected server databases.</p>
                    </div>
                    <div className="feature-spotlight-card">
                        <div className="icon">⚙️</div>
                        <h4>Git & CI Automations</h4>
                        <p>Generate secure environment manifests, statefulsets, and robust code reviews.</p>
                    </div>
                    <div className="feature-spotlight-card">
                        <div className="icon">🔄</div>
                        <h4>Persistent Log Histories</h4>
                        <p>Instantly retrieve, search, and reload previous generations with offline persistence.</p>
                    </div>
                </div>
            </section>

            {/* Accordion FAQ Component Section */}
            <section className="faq-section">
                <h2>Frequently Asked Questions</h2>
                <p className="faq-subtitle">Everything you need to know about AI Assistant Pro.</p>
                <div className="faq-container">
                    {[
                        {
                            q: "What artificial intelligence models power this application?",
                            a: "This application is powered by the Meta Llama 3 70B model, served through Groq's high-speed inference pipeline to deliver answers with sub-second latency."
                        },
                        {
                            q: "Is my source code secure and private?",
                            a: "Yes. All processed prompts and contextual queries run within sandbox containers and are stored locally in your browser's persistence state."
                        },
                        {
                            q: "Can I use it to configure Docker or deployment manifests?",
                            a: "Absolutely. The task manager supports specialized pipelines for Kubernetes StatefulSets, Docker containers, and Express.js backends."
                        }
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className={`faq-card ${faqActive === idx ? "active" : ""}`}
                            onClick={() => toggleFaq(idx)}
                        >
                            <div className="faq-question">
                                <h4>{item.q}</h4>
                                <FiChevronDown className="arrow-icon" />
                            </div>
                            <div className="faq-answer">
                                <p>{item.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <footer className="landing-footer">
                <div className="footer-container">

                    {/* Brand Meta Column */}
                    <div className="footer-col brand-col">
                        <div className="footer-logo">
                            <span className="logo-sparkle">✦</span> AI Assistant Pro
                        </div>
                        <p className="brand-description">
                            High-speed enterprise assistant serving secure developers, DevOps pipelines, and cloud architects worldwide.
                        </p>
                        <div className="compliance-mini-badges">
                            <span>SOC2 Certified</span>
                            <span>•</span>
                            <span>HIPAA Compliant</span>
                        </div>
                    </div>

                    {/* Direct Links Column */}
                    <div className="footer-col">
                        <h4>Product</h4>
                        <ul>
                            <li><Link to="/register">Workspace Playground</Link></li>
                            <li><Link to="/login">Inference Dashboard</Link></li>
                            <li><a href="#playground">Interactive Sandbox</a></li>
                        </ul>
                    </div>

                    {/* Technical Column */}
                    <div className="footer-col">
                        <h4>Technical Resources</h4>
                        <ul>
                            <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">Llama3 SDK</a></li>
                            <li><a href="https://groq.com" target="_blank" rel="noopener noreferrer">Groq Hardware API</a></li>
                            <li><a href="#compliance">Security Protocol</a></li>
                        </ul>
                    </div>

                    {/* Custom Newsletter Plugin Block */}
                    <div className="footer-col newsletter-col">
                        <h4>Stay Updated</h4>
                        <p>Subscribe to our engineering newsletter for model release logs and system updates.</p>

                        {subscribed ? (
                            <div className="newsletter-success-badge">
                                <FiCheck className="success-icon" /> Subscribed successfully!
                            </div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="newsletter-form-element">
                                <input
                                    type="email"
                                    placeholder="name@company.com"
                                    value={emailInput}
                                    onChange={(e) => setEmailInput(e.target.value)}
                                    required
                                    className="newsletter-text-input"
                                />
                                <button type="submit" className="newsletter-submit-btn">
                                    <FiArrowRight />
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                <div className="footer-bottom-bar">
                    <div className="bottom-bar-wrapper">
                        <div className="footer-copyright-text">
                            © 2026 AI Assistant Pro. All rights reserved.
                        </div>

                        {/* Pulsing Live Systems Operations Widget */}
                        <div className="status-monitor-pill">
                            <span className="live-uptime-dot"></span> All Systems Operational (100% Uptime)
                        </div>

                        <div className="social-links-list">
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub Link"><FiGithub /></a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter Link"><FiTwitter /></a>
                            <a href="https://slack.com" target="_blank" rel="noopener noreferrer" aria-label="Slack Link"><FiSlack /></a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;
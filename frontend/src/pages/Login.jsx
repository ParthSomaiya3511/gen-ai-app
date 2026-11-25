import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BackgroundEffects from "../components/BackgroundEffects";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alertConfig, setAlertConfig] = useState({ isOpen: false, type: "success", message: "" });

    const login = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8000/login",
                {
                    email,
                    password
                }
            );

            if (!response.data.success) {
                setAlertConfig({ isOpen: true, type: "error", message: response.data.message });
                return;
            }

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userName", response.data.name);
            localStorage.setItem("userEmail", response.data.email);
            localStorage.setItem("userId", response.data.user_id);

            // Show a premium success alert before redirecting to the workspace
            setAlertConfig({
                isOpen: true,
                type: "success",
                message: "Login Successful. Welcome back to AI Assistant Pro!"
            });

        } catch {
            setAlertConfig({ isOpen: true, type: "error", message: "Invalid credentials. Please verify your email and password." });
        }
    };

    const handleAcknowledge = () => {
        setAlertConfig({ ...alertConfig, isOpen: false });
        if (alertConfig.type === "success") {
            window.location.href = "/dashboard";
        }
    };

    return (
        <div className="auth-page">
            <BackgroundEffects />

            <div className="auth-card">
                <div className="auth-header">
                    <span className="auth-logo">✦</span>
                    <h2>Welcome Back</h2>
                    <p>Sign in to your AI Assistant Pro account</p>
                </div>

                <div className="auth-form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        placeholder="name@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="auth-form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button className="auth-submit-btn" onClick={login}>
                    Sign In
                </button>

                <p className="auth-footer-text">
                    Don't have an account? <Link to="/register">Create one</Link>
                </p>
            </div>

            {/* Custom styled modal popup */}
            {alertConfig.isOpen && (
                <div className="custom-alert-backdrop" onClick={handleAcknowledge}>
                    <div className="custom-alert-card" onClick={(e) => e.stopPropagation()}>
                        <div className={`alert-icon-container ${alertConfig.type}`}>
                            {alertConfig.type === "success" ? "✓" : "✕"}
                        </div>
                        <h3>{alertConfig.type === "success" ? "Login Successful" : "Sign In Error"}</h3>
                        <p>{alertConfig.message}</p>
                        <button
                            type="button"
                            className="alert-confirm-btn"
                            onClick={handleAcknowledge}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;
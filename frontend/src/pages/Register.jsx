import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BackgroundEffects from "../components/BackgroundEffects";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alertConfig, setAlertConfig] = useState({ isOpen: false, type: "success", message: "" });

    const register = async () => {
        try {
            await axios.post(
                "http://localhost:8000/register",
                {
                    name,
                    email,
                    password
                }
            );

            setAlertConfig({
                isOpen: true,
                type: "success",
                message: "Registration Successful! Welcome to AI Assistant Pro. Please proceed to login."
            });
        } catch {
            setAlertConfig({
                isOpen: true,
                type: "error",
                message: "Registration failed. Please verify your details."
            });
        }
    };

    const handleAcknowledge = () => {
        setAlertConfig({ ...alertConfig, isOpen: false });
        if (alertConfig.type === "success") {
            window.location.href = "/login";
        }
    };

    return (
        <div className="auth-page">
            <BackgroundEffects />

            <div className="auth-card">
                <div className="auth-header">
                    <span className="auth-logo">✦</span>
                    <h2>Create Account</h2>
                    <p>Get started with AI Assistant Pro today</p>
                </div>

                <div className="auth-form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
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

                <button className="auth-submit-btn" onClick={register}>
                    Create Account
                </button>

                <p className="auth-footer-text">
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </div>

            {/* Custom styled modal popup */}
            {alertConfig.isOpen && (
                <div className="custom-alert-backdrop" onClick={handleAcknowledge}>
                    <div className="custom-alert-card" onClick={(e) => e.stopPropagation()}>
                        <div className={`alert-icon-container ${alertConfig.type}`}>
                            {alertConfig.type === "success" ? "✓" : "✕"}
                        </div>
                        <h3>{alertConfig.type === "success" ? "Account Created" : "Registration Error"}</h3>
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

export default Register;
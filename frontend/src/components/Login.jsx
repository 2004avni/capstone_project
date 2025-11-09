import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, Droplets, Shield, Heart } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css"; // <-- custom animations + gradient

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {

      const res = await axios.post("http://localhost:4000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setIsAuthenticated(true);
      navigate("/home");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center min-vh-100">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Section */}
          <motion.div
            className="col-lg-6 text-center text-lg-start mb-5 mb-lg-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="display-4 fw-bold text-gradient">
              Stay Hydrated. Stay Healthy.
            </h1>
            <p className="lead text-light mt-3">
              Protecting communities from water-borne diseases with awareness and
              health monitoring solutions.
            </p>

            <div className="d-flex gap-4 justify-content-center justify-content-lg-start mt-4 text-white fs-5">
              <motion.div whileHover={{ scale: 1.2 }} className="d-flex align-items-center gap-2">
                <Shield className="text-success" /> Secure
              </motion.div>
              <motion.div whileHover={{ scale: 1.2 }} className="d-flex align-items-center gap-2">
                <Heart className="text-danger" /> Trusted
              </motion.div>
              <motion.div whileHover={{ scale: 1.2 }} className="d-flex align-items-center gap-2">
                <Droplets className="text-info" /> Reliable
              </motion.div>
            </div>
          </motion.div>

          {/* Right Section - Login Form */}
          <motion.div
            className="col-lg-6 d-flex justify-content-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="card glass-card p-4 shadow-lg border-0 w-100" style={{ maxWidth: "400px" }}>
              <div className="text-center mb-4">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-circle d-flex align-items-center justify-content-center bg-gradient mb-3"
                  style={{ width: "70px", height: "70px" }}
                >
                  <Droplets className="text-white fs-2" />
                </motion.div>
                <h2 className="fw-bold text-white">Welcome Back</h2>
                <p className="text-light">Sign in to continue your journey</p>
              </div>

              <form onSubmit={handleLogin}>
                {/* Email */}
                <div className="mb-3">
                  <label className="form-label text-white">Email Address</label>
                  <input
                    type="email"
                    className="form-control form-control-lg bg-dark text-white border-0"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label text-white">Password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control form-control-lg bg-dark text-white border-0"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-light"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-lg w-100 btn-gradient text-white fw-bold shadow-sm"
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </motion.button>
              </form>

              <div className="d-flex justify-content-between mt-4">
  <Link
    to="/forgot"
    className="font-monospace text-decoration-none text-white"
  >
    Forgot Password?
  </Link>
  <Link
    to="/signup"
    className="font-monospace text-decoration-none text-white"
  >
    Create Account
  </Link>


              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Login;

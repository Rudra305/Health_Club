import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Form, Button, Toast, ToastContainer, Badge } from "react-bootstrap";
import { FaDumbbell, FaUser, FaLock, FaArrowRight } from "react-icons/fa";
import { getUserAuthTokenApi } from "../../api/authentication";
import { fetchApiWrapper } from "../../api/FetchApiWrapper";

const LoginComponent = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (
      window.localStorage.getItem("token") !== null &&
      window.localStorage.getItem("role") !== null
    ) {
      history.push("/");
    }
  }, [history]);

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const onChnageInput = (event) => {
    const { value, name } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleQuickFill = (username, password) => {
    setValues({ username, password });
  };

  const onSubmitValue = async (e) => {
    if (e) e.preventDefault();
    if (!values.username || !values.password) {
      setErrorMsg("Please enter both username and password");
      return;
    }
    setLoading(true);
    const [{ statusCode, data }] = await fetchApiWrapper(
      () => getUserAuthTokenApi(values.username, values.password),
      "Invalid username or password"
    );
    setLoading(false);
    if (statusCode === 200) {
      window.localStorage.setItem("token", "Bearer " + data.jwt);
      window.localStorage.setItem("role", data.role);
      window.localStorage.setItem("username", data.username);
      setSuccessMsg("Login Successful! Redirecting...");
      setTimeout(() => history.push("/"), 400);
    } else {
      setErrorMsg(typeof data === "string" ? data : "Invalid credentials");
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-card">
        <div className="text-center mb-4">
          <div
            className="d-inline-flex align-items-center justify-content-center mb-3 shadow-sm"
            style={{
              width: "60px",
              height: "60px",
              background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
              borderRadius: "16px",
              color: "#fff",
              fontSize: "26px",
            }}
          >
            <FaDumbbell />
          </div>
          <h3 className="fw-bold mb-1" style={{ color: "#0f172a", letterSpacing: "-0.02em" }}>
            Health Club
          </h3>
          <p className="text-muted small mb-0">Gym & Fitness Club Management System</p>
        </div>

        {/* Demo Quick-Fill Buttons */}
        <div className="p-3 mb-4 rounded-3" style={{ background: "#f8fafc", border: "1px dashed #cbd5e1" }}>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <small className="fw-bold text-uppercase" style={{ fontSize: "0.72rem", color: "#64748b" }}>
              Quick Demo Logins:
            </small>
          </div>
          <div className="d-flex flex-wrap gap-2">
            <Badge
              as="button"
              className="border-0 text-decoration-none px-2 py-1"
              bg="primary"
              style={{ cursor: "pointer" }}
              onClick={() => handleQuickFill("admin", "admin123")}
            >
              👑 Admin
            </Badge>
            <Badge
              as="button"
              className="border-0 text-decoration-none px-2 py-1"
              bg="success"
              style={{ cursor: "pointer" }}
              onClick={() => handleQuickFill("trainer_john", "password123")}
            >
              🏋️ Trainer
            </Badge>
            <Badge
              as="button"
              className="border-0 text-decoration-none px-2 py-1"
              bg="secondary"
              style={{ cursor: "pointer" }}
              onClick={() => handleQuickFill("customer1", "password123")}
            >
              🏃 Member
            </Badge>
          </div>
        </div>

        <Form onSubmit={onSubmitValue}>
          <Form.Group className="mb-3">
            <Form.Label className="small fw-semibold text-muted mb-1">
              <FaUser className="me-1" /> Username
            </Form.Label>
            <Form.Control
              placeholder="Enter your username"
              name="username"
              value={values.username}
              onChange={onChnageInput}
              autoComplete="username"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="small fw-semibold text-muted mb-1">
              <FaLock className="me-1" /> Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              name="password"
              value={values.password}
              onChange={onChnageInput}
              autoComplete="current-password"
            />
          </Form.Group>

          <Button
            type="submit"
            className="w-100 d-flex align-items-center justify-content-center py-2 mb-3"
            variant="primary"
            disabled={loading}
          >
            {loading ? "Signing In..." : <><span>Sign In</span> <FaArrowRight className="ms-2" /></>}
          </Button>
        </Form>

        <div className="text-center mt-3 pt-3 border-top">
          <span className="text-muted small">Don't have an account? </span>
          <a href="/signup" className="small fw-bold text-decoration-none" style={{ color: "#0d9488" }}>
            Sign Up here
          </a>
        </div>
      </div>

      <ToastContainer className="p-3" position="bottom-end">
        <Toast
          show={errorMsg !== ""}
          autohide
          delay={5000}
          onClose={() => setErrorMsg("")}
          bg="danger"
        >
          <Toast.Header closeButton>
            <strong className="me-auto">Authentication Error</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{errorMsg}</Toast.Body>
        </Toast>

        <Toast
          show={successMsg !== ""}
          autohide
          delay={3000}
          onClose={() => setSuccessMsg("")}
          bg="success"
        >
          <Toast.Header closeButton>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{successMsg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default LoginComponent;

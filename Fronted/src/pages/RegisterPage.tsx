import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import background from "../img/backgroundLogin.jpg";
import axios from "axios";

interface FormData {
  username: string;
  password: string;
  confirmPassword: string;
}

const RegisterUserPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const errorRef = useRef<HTMLParagraphElement>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    setErrorMsg("");
  }, [formData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("The passwords do not match");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/users/register', formData);
      console.log("response: ", response.data);
      navigate("/");
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.msg) {
        setErrorMsg(error.response.data.msg);
      } else {
        setErrorMsg("Error al registrar el usuario. Por favor, intenta de nuevo más tarde.");
      }
      console.error(error);
    }
  };

  const styles: React.CSSProperties = {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
  };

  return (
<div className="d-flex align-items-center justify-content-center" style={styles}>
    <p
        ref={errorRef}
        className={errorMsg ? "errmsg alert alert-danger" : "offscreen"}
        aria-live="assertive"
    >
        {errorMsg}
    </p>
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title text-center">Registration</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    name="username"
                                    onChange={handleInputChange}
                                    value={formData.username}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    onChange={handleInputChange}
                                    value={formData.password}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    onChange={handleInputChange}
                                    value={formData.confirmPassword}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Register</button>
                        </form>
                        <div className="mt-3 text-center">
                            <Link to="/login" className="text-decoration-underline">Already have an account? Log in</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  );
};

export default RegisterUserPage;

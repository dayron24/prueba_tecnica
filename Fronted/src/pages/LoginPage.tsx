import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import marvelCharactersService from "../services/MarvelService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import background from "../img/backgroundLogin.jpg";

interface LoginPageProps {}

export const LoginPage: React.FC<LoginPageProps> = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const userRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    userRef?.current?.focus();
  }, []);

  useEffect(() => {
    setErrorMsg("");
  }, [username, password]);

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:3000/api/users/login', {username,password});
        console.log("response: ", response.data);
      
      let usernameResponse = response?.data?.username;
      
      setAuth({ username:usernameResponse });
    
      setUsername("");
      setPassword("");
      navigate("/");
    } catch (err: any) {
      if (!err?.response) {
        console.log(err);
        setErrorMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrorMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrorMsg("Unauthorized");
      } else {
        setErrorMsg("Login Failed");
      }
      errorRef.current?.focus();
    }
  };

  const styles: React.CSSProperties = {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh"
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
                        <h1 className="card-title text-center">Log In</h1>
                        <p className="text-center">Enter your credentials to log in!</p>
                        <form onSubmit={loginUser}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    name="username"
                                    ref={userRef}
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
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
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Log In</button>
                        </form>
                        <div className="mt-3 text-center">
                            <Link to="/register" className="text-decoration-underline">Not registered yet?</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  );
};

export default LoginPage;

import {
  useState
} from "react";

import {
  signInWithEmailAndPassword
} from "firebase/auth";

import {
  auth
} from "../firebase/firebaseConfig";

import {
  useNavigate,
  Link
} from "react-router-dom";

function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    setError("");

    setLoading(true);

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      navigate("/blogs");

    } catch (error: any) {

      setError(error.message);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div>

      <h1>Login</h1>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

      {error && <p>{error}</p>}

      <p>
        Don't have an account?

        <Link to="/register">
          Register
        </Link>
      </p>

    </div>

  );

}

export default Login;
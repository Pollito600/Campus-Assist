import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../FirebaseConfig";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();

    if (email.endsWith('@mavs.uta.edu')) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          setSuccessMessage(`Successfully registered with email: ${email}`);
          setErrorMessage('');
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage('Invalid email or password');
          setSuccessMessage('');
        });
    } else {
      setErrorMessage('Invalid email. Sign up with @mavs.uta.edu email only.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="sign-in-container">
      <form onSubmit={handleSignUp}>
        <h1>Create Account</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ color: 'black' }}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ color: 'black' }}
        />
        <button type="submit">Sign Up</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default SignUp;

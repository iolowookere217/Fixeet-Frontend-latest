import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const auth = ({ onClose }) => {
  const [showLogin, setShowLogin] = useState(true);

  const switchToLogin = () => {
    setShowLogin(true);
  };

  const switchToRegister = () => {
    setShowLogin(false);
  };

  return (
    <div>
      {showLogin ? (
        <Login
          visible={true}
          onClose={onClose}
          switchToRegister={switchToRegister}
        />
      ) : (
        <Register
          visible={true}
          onClose={onClose}
          switchToLogin={switchToLogin}
        />
      )}
    </div>
  );
};

export default auth;

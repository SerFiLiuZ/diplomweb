import React, { useState, useEffect } from 'react';
import AuthorizationCollapse from './Components/AuthorizationCollapse';
import MenuWEB from './Views/MenuWEB';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = () => {
      const isAuthenticated = localStorage.getItem('authorization') !== null;
      setIsLoggedIn(isAuthenticated);
    };

    checkAuthStatus();
  }, []);

  return (
    <div className="app-container">
      {!isLoggedIn && <AuthorizationCollapse setIsLoggedIn={setIsLoggedIn} />}
      {isLoggedIn && <MenuWEB setIsLoggedIn={setIsLoggedIn} />}
    </div>
  );
}

export default App;

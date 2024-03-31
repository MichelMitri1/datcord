import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Settings from "./pages/Settings page/Settings.jsx";
import Register from "./pages/Register Page/Register";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Chats from "./components/Chats/Chats.jsx";
import Login from "./pages/Login page/Login.jsx";
import Main from "./pages/mainPage/Main.jsx";
import { auth } from "./firebase.js";
import "./App.css";

function App() {
  const [, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  const user = auth.currentUser;
  return (
    <div className="App">
      <Router>
        <Routes>
          {user ? (
            <>
              <Route exact path="/main" element={<Main user={user} />} />
              <Route
                exact
                path="/settings"
                element={<Settings user={user} />}
              />
              <Route exact path="/main/:id" element={<Chats user={user} />} />
            </>
          ) : (
            <>
              <Route exact element={<Main user={user} />} />
              <Route exact element={<Settings user={user} />} />
              <Route exact element={<Chats />} />
            </>
          )}
          <Route exact path="/" element={<Login user={user} />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

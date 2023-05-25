import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./routes/login";
import Home from './routes/home';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to='/login' />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;

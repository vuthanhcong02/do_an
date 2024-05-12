import "./App.scss";
import MainLayout from "./components/Layouts/MainLayout";
import Home from "./components/pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import News from "./components/pages/News/News";
import Contact from "./components/pages/Contact/Contact";
import Notification from "./components/pages/Notification/Notification";
import EnglishCourse from "./components/pages/EnglishCourse/EnglishCourse";
function App() {
  return (
    <div className="App-container">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/contacts" element={<Contact />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/english-courses" element={<EnglishCourse />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

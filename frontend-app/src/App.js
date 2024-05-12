import "./App.scss";
import MainLayout from "./components/Layouts/MainLayout";
import Home from "./components/pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import News from "./components/pages/News/News";
import Contact from "./components/pages/Contact/Contact";
function App() {
  return (
    <div className="App-container">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/contacts" element={<Contact />} />
          {/* <Route path="tasks" element={<DashboardTasks />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;

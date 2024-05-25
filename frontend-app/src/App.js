import "./App.scss";
import MainLayout from "./components/Layouts/MainLayout";
import Home from "./components/pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import News from "./components/pages/News/News";
import Contact from "./components/pages/Contact/Contact";
import Notification from "./components/pages/Notification/Notification";
import EnglishCourse from "./components/pages/EnglishCourse/EnglishCourse";
import ITCourse from "./components/pages/ITCourse/ITCourse";
import PrivateLayout from "./components/Layouts/PrivateLayout";
import HomeAdmin from "./components/pages/Admin/HomeAdmin";
import ManagerBanner from "./components/pages/Admin/Banner/ManagerBanner";
import CreateBanner from "./components/pages/Admin/Banner/CreateBanner";
import ManagerNews from "./components/pages/Admin/News/ManagerNews";
import CreateNews from "./components/pages/Admin/News/CreateNews";
import EditBanner from "./components/pages/Admin/Banner/EditBanner";
import ManagerCategory from "./components/pages/Admin/Category/ManagerCategory";
import CreateCategory from "./components/pages/Admin/Category/CreateCategory";
import EditCategory from "./components/pages/Admin/Category/EditCategory";
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
          <Route path="/information-courses" element={<ITCourse />} />
        </Route>
        <Route path="/admin" element={<PrivateLayout />}>
          <Route index element={<HomeAdmin />} />
          {/* Di chuyển route "/banners" vào trong route "/admin" */}
          <Route path="banners" element={<ManagerBanner />} />
          <Route path="banners/create" element={<CreateBanner />} />
          <Route path="banners/:id/edit" element={<EditBanner />} />

          <Route path="news" element={<ManagerNews />} />
          <Route path="news/create" element={<CreateNews />} />

          <Route path="categories" element={<ManagerCategory />} />
          <Route path="categories/create" element={<CreateCategory />} />
          <Route path="categories/:id/edit" element={<EditCategory />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

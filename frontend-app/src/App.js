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
import EditNews from "./components/pages/Admin/News/EditNews";
import ManagerCategory from "./components/pages/Admin/Category/ManagerCategory";
import CreateCategory from "./components/pages/Admin/Category/CreateCategory.js";
import EditCategory from "./components/pages/Admin/Category/EditCategory";
import ManagerCourse from "./components/pages/Admin/Course/ManagerCourse.js";
import EditCourse from "./components/pages/Admin/Course/EditCourse.js";
import CreateCourse from "./components/pages/Admin/Course/CreateCourse.js";
import CourseDetails from "./components/pages/CourseDetails/CourseDetails.js";
import NewsDetails from "./components/pages/NewsDetails/NewsDetails.js";
import ManagerEvents from "./components/pages/Admin/Event/ManagerEvents.js";
import CreateEvent from "./components/pages/Admin/Event/CreateEvent.js";
import EditEvent from "./components/pages/Admin/Event/EditEvent.js";
import Event from "./components/pages/Event/Event.js";
import EventDetails from "./components/pages/EventDetails/EventDetails.js";
function App() {
  return (
    <div className="App-container">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/events" element={<Event />} />
          <Route path="/contacts" element={<Contact />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/english-courses" element={<EnglishCourse />} />
          <Route path="/information-courses" element={<ITCourse />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/news/:id" element={<NewsDetails />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="*" element={<Home />} />
        </Route>
        <Route path="/admin" element={<PrivateLayout />}>
          <Route index element={<HomeAdmin />} />
          {/* Di chuyển route "/banners" vào trong route "/admin" */}
          <Route path="banners" element={<ManagerBanner />} />
          <Route path="banners/create" element={<CreateBanner />} />
          <Route path="banners/:id/edit" element={<EditBanner />} />

          <Route path="news" element={<ManagerNews />} />
          <Route path="news/create" element={<CreateNews />} />
          <Route path="news/:id/edit" element={<EditNews />} />

          <Route path="categories" element={<ManagerCategory />} />
          <Route path="categories/create" element={<CreateCategory />} />
          <Route path="categories/:id/edit" element={<EditCategory />} />

          <Route path="courses" element={<ManagerCourse />} />
          <Route path="courses/create" element={<CreateCourse />} />
          <Route path="courses/:id/edit" element={<EditCourse />} />

          <Route path="events" element={<ManagerEvents />} />
          <Route path="events/create" element={<CreateEvent />} />
          <Route path="events/:id/edit" element={<EditEvent />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

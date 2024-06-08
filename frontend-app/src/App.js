import "./App.scss";
import MainLayout from "./components/Layouts/MainLayout.js";
import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import News from "./pages/News/News.js";
import Contact from "./pages/Contact/Contact.js";
import Notification from "./pages/Notification/Notification.js";
import EnglishCourse from "./pages/EnglishCourse/EnglishCourse.js";
import ITCourse from "./pages/ITCourse/ITCourse.js";
import PrivateLayout from "./components/Layouts/PrivateLayout.js";
import HomeAdmin from "./pages/Admin/HomeAdmin.js";
import ManagerBanner from "./pages/Admin/Banner/ManagerBanner";
import CreateBanner from "./pages/Admin/Banner/CreateBanner";
import ManagerNews from "./pages/Admin/News/ManagerNews";
import CreateNews from "./pages/Admin/News/CreateNews";
import EditBanner from "./pages/Admin/Banner/EditBanner";
import EditNews from "./pages/Admin/News/EditNews";
import ManagerCategory from "./pages/Admin/Category/ManagerCategory";
import CreateCategory from "./pages/Admin/Category/CreateCategory.js";
import EditCategory from "./pages/Admin/Category/EditCategory";
import ManagerCourse from "./pages/Admin/Course/ManagerCourse.js";
import EditCourse from "./pages/Admin/Course/EditCourse.js";
import CreateCourse from "./pages/Admin/Course/CreateCourse.js";
import CourseDetails from "./pages/CourseDetails/CourseDetails.js";
import NewsDetails from "./pages/NewsDetails/NewsDetails.js";
import ManagerEvents from "./pages/Admin/Event/ManagerEvents.js";
import CreateEvent from "./pages/Admin/Event/CreateEvent.js";
import EditEvent from "./pages/Admin/Event/EditEvent.js";
import Event from "./pages/Event/Event.js";
import EventDetails from "./pages/EventDetails/EventDetails.js";
import ManagerTeacher from "./pages/Admin/Teacher/ManagerTeacher.js";
import CreateTeacher from "./pages/Admin/Teacher/CreateTeacher.js";
import EditTeacher from "./pages/Admin/Teacher/EditTeacher.js";
import ManagerClassRoom from "./pages/Admin/ClassRoom/ManagerClassRoom.js";
import CreateClassRoom from "./pages/Admin/ClassRoom/CreateClassRoom.js";
import EditClassRoom from "./pages/Admin/ClassRoom/EditClassRoom.js";
import ManagerClass from "./pages/Admin/Classes/ManagerClass.js";
import CreateClass from "./pages/Admin/Classes/CreateClass.js";
import EditClass from "./pages/Admin/Classes/EditClass.js";
import ManagerSchedule from "./pages/Admin/Schedule/ManagerSchedule.js";
import CreateSchedule from "./pages/Admin/Schedule/CreateSchedule.js";
import EditSchedule from "./pages/Admin/Schedule/EditSchedule.js";
import CourseRegister from "./pages/CourseRegister/CourseRegister.js";
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
          <Route
            path="/courses/:course_id/schedule/:schedule_id/register"
            element={<CourseRegister />}
          />
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

          <Route path="teachers" element={<ManagerTeacher />} />
          <Route path="teachers/create" element={<CreateTeacher />} />
          <Route path="teachers/:id/edit" element={<EditTeacher />} />

          <Route path="classrooms" element={<ManagerClassRoom />} />
          <Route path="classrooms/create" element={<CreateClassRoom />} />
          <Route path="classrooms/:id/edit" element={<EditClassRoom />} />

          <Route path="classes" element={<ManagerClass />} />
          <Route path="classes/create" element={<CreateClass />} />
          <Route path="classes/:id/edit" element={<EditClass />} />

          <Route path="schedules" element={<ManagerSchedule />} />
          <Route path="schedules/create" element={<CreateSchedule />} />
          <Route path="schedules/:id/edit" element={<EditSchedule />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

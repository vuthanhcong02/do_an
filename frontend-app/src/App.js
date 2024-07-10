import "./App.scss";
import MainLayout from "./components/Layouts/MainLayout.js";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import ManagerStudent from "./pages/Admin/Student/ManagerStudent.js";
import EditStudent from "./pages/Admin/Student/EditStudent.js";
import ManagerRegistration from "./pages/Admin/Registration/ManagerRegistration.js";
import EditRegistration from "./pages/Admin/Registration/EditRegistration.js";
import Login from "./pages/Login/Login.js";
import Register from "./pages/Register/Register.js";
import UserProfile from "./pages/Profile/UserProfile.js";
import UserLayout from "./components/Layouts/UserLayout.js";
import UserDashboard from "./pages/UserDashboard/UserDashboard.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PageNotFound } from "./pages/PageNotFound/PageNotFound.js";
import LoginAdmin from "./pages/Admin/Login/LoginAdmin.js";
import ManagerContact from "./pages/Admin/Contact/ManagerContact.js";
import EditContact from "./pages/Admin/Contact/EditContact.js";
import ChangePassword from "./pages/ChangePassword/ChangePassword.js";
import ManagerNotification from "./pages/Admin/Notification/ManagerNotification.js";
import CreateNotification from "./pages/Admin/Notification/CreateNotification.js";
import EditNotification from "./pages/Admin/Notification/EditNotification.js";
import ManagerNotificationType from "./pages/Admin/Notification/ManagerNotificationType.js";
import CreateNotificationType from "./pages/Admin/Notification/CreateNotificationType.js";
import EditNotificationType from "./pages/Admin/Notification/EditNotificationType.js";
import NotificationDetail from "./pages/NotificationDetail/NotificationDetail.js";
import ManagerExamRegister from "./pages/Admin/ExamResgister/ManagerExamRegister.js";
import ManagerExam from "./pages/Admin/Exam/ManagerExam.js";
import CreateExam from "./pages/Admin/Exam/CreateExam.js";
import EditExam from "./pages/Admin/Exam/EditExam.js";
import Exam from "./pages/Exam/Exam.js";
import MyExam from "./pages/MyExam/MyExam.js";
import SearchResult from "./pages/SearchResult/SearchResult.js";

function App() {
  return (
    <>
      <div className="App-container">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="user/*" element={<UserLayout />}>
              <Route path="my-exams" element={<MyExam />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="change-password" element={<ChangePassword />} />
              <Route path="my-courses" element={<UserDashboard />} />
            </Route>
            <Route index element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/events" element={<Event />} />
            <Route path="/contacts" element={<Contact />} />
            <Route path="/notifications" element={<Notification />} />
            <Route
              path="/notifications/:slug"
              element={<NotificationDetail />}
            />
            <Route path="/english-courses" element={<EnglishCourse />} />
            <Route path="/information-courses" element={<ITCourse />} />
            <Route path="/courses/:slug" element={<CourseDetails />} />
            <Route
              path="/courses/:slug/schedule/:schedule_id/register"
              element={<CourseRegister />}
            />
            <Route path="/news/:slug" element={<NewsDetails />} />
            <Route path="/events/:slug" element={<EventDetails />} />
            <Route path="exams" element={<Exam />} />
            <Route path="/search" element={<SearchResult />} />
          </Route>
        </Routes>
      </div>
      <Routes>
        <Route path="admin/login" element={<LoginAdmin />} />

        <Route path="/admin" element={<PrivateLayout />}>
          <Route index element={<HomeAdmin />} />
          {/* Di chuyển route "/banners" vào trong route "/admin" */}
          <Route path="banners" element={<ManagerBanner />} />
          <Route path="banners/create" element={<CreateBanner />} />
          <Route path="banners/:id/edit" element={<EditBanner />} />

          <Route path="news" element={<ManagerNews />} />
          <Route path="news/create" element={<CreateNews />} />
          <Route path="news/:slug/edit" element={<EditNews />} />

          <Route path="categories" element={<ManagerCategory />} />
          <Route path="categories/create" element={<CreateCategory />} />
          <Route path="categories/:id/edit" element={<EditCategory />} />

          <Route path="courses" element={<ManagerCourse />} />
          <Route path="courses/create" element={<CreateCourse />} />
          <Route path="courses/:slug/edit" element={<EditCourse />} />

          <Route path="events" element={<ManagerEvents />} />
          <Route path="events/create" element={<CreateEvent />} />
          <Route path="events/:slug/edit" element={<EditEvent />} />

          <Route path="teachers" element={<ManagerTeacher />} />
          <Route path="teachers/create" element={<CreateTeacher />} />
          <Route path="teachers/:id/edit" element={<EditTeacher />} />

          <Route path="classrooms" element={<ManagerClassRoom />} />
          <Route path="classrooms/create" element={<CreateClassRoom />} />
          <Route path="classrooms/:id/edit" element={<EditClassRoom />} />

          <Route path="classes" element={<ManagerClass />} />
          <Route path="classes/create" element={<CreateClass />} />
          <Route path="classes/:id/edit" element={<EditClass />} />

          <Route path="contacts" element={<ManagerContact />} />
          <Route path="contacts/:id/edit" element={<EditContact />} />

          <Route path="schedules" element={<ManagerSchedule />} />
          <Route path="schedules/create" element={<CreateSchedule />} />
          <Route path="schedules/:id/edit" element={<EditSchedule />} />

          <Route path="users" element={<ManagerStudent />} />
          <Route path="users/:id/edit" element={<EditStudent />} />

          <Route path="registrations" element={<ManagerRegistration />} />
          <Route path="registrations/:id/edit" element={<EditRegistration />} />

          <Route path="exams" element={<ManagerExam />} />
          <Route path="exams/create" element={<CreateExam />} />
          <Route path="exams/:id/edit" element={<EditExam />} />

          <Route path="exams/registrations" element={<ManagerExamRegister />} />
          <Route
            path="notifications/types"
            element={<ManagerNotificationType />}
          />
          <Route
            path="notifications/types/create"
            element={<CreateNotificationType />}
          />
          <Route
            path="notifications/types/:id/edit"
            element={<EditNotificationType />}
          />

          <Route path="notifications" element={<ManagerNotification />} />
          <Route path="notifications/create" element={<CreateNotification />} />
          <Route
            path="notifications/:slug/edit"
            element={<EditNotification />}
          />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;

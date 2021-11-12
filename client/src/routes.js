import Index from "./views/Index.js";
import Class from "./views/examples/Class.js";
import Login from "./views/examples/Login.js";
import ChatBox from "./views/examples/ChatBox.js";
import Evaluate from "./views/examples/Evaluate.js";
import Student from "./views/examples/Student.js";
import Teacher from "./views/examples/Teacher.js";
import HomeStudent from "./views/students/Home";
import FeadbackStudent from "./views/students/Feadback";

var routes = [
  {
    path: "/index",
    name: "Thống Kê",
    icon: "ni ni-chart-pie-35 text-info",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/evaluate",
    name: "Quản Lí Đánh Giá",
    icon: "ni ni-paper-diploma text-orange",
    component: Evaluate,
    layout: "/admin",
  },
  {
    path: "/class",
    name: "Quản Lí Lớp",
    icon: "ni ni-books text-green",
    component: Class,
    layout: "/admin",
  },
  {
    path: "/student",
    name: "Quản Lí Học Sinh",
    icon: "ni ni-hat-3 text-blue",
    component: Student,
    layout: "/admin",
  },
  {
    path: "/teacher",
    name: "Quản Lí Giáo Viên",
    icon: "ni ni-single-02 text-red",
    component: Teacher,
    layout: "/admin",
  },

  {
    path: "/chatbox",
    name: "Hộp Thư Liên Hệ",
    icon: "ni ni-email-83 text-yellow",
    component: ChatBox,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Đăng Nhập",
    icon: "ni ni-user-run text-blue",
    component: Login,
    layout: "/auth",
  },

  {
    path: "/index",
    name: "Quản lí lớp",
    icon: "ni ni-hat-3 text-blue",
    component: Student,
    layout: "/teacher",
  },
  {
    path: "/evaluate",
    name: "Phiếu Đánh Giá",
    icon: "ni ni-paper-diploma text-orange",
    component: Evaluate,
    layout: "/teacher",
  },
  //user
  {
    path: "/index",
    name: "Trang Chủ",
    icon: "ni ni-istanbul text-info",
    component: HomeStudent,
    layout: "/user",
  },
  {
    path: "/feedback",
    // name: "Phiếu đánh giá",
    // icon: "ni ni-paper-diploma text-orange",
    component: FeadbackStudent,

    layout: "/user",
  },
  {
    path: "/chatstudent",
    name: "Hộp thư liên hệ",
    icon: "ni ni-email-83 text-yellow",
    component: HomeStudent,
    layout: "/user",
  },
];
export default routes;

import NotFound from "pages/NotFound";

const routers = [

  {
    path: "/",
    redirect: "/auth",
  },
  {
    component: "AuthLayout",
    path: "/auth",
    auth: false,
    name: "Auth",
    exact: false,
    redirect: "/auth/login",
    childrens: [
      {
        component: "Login",
        path: "/login",
        componentPath: "pages/Auth/Login",
        name: "Login",
        auth: false,
        exact: true,
      },
      {
        component: "ForgotPassword",
        path: "/forgot-password",
        componentPath: "pages/Auth/ForgotPassword",
        name: "ForgotPassword",
        auth: false,
        exact: true,
      },
      {
        component: "Verification",
        path: "/verification",
        componentPath: "pages/Auth/Verification",
        name: "Verification",
        auth: false,
        exact: true,
      },
      {
        component: "ResetPassword",
        path: "/reset-password",
        componentPath: "pages/Auth/ResetPassword",
        name: "ResetPassword",
        auth: false,
        exact: true,
      },

    ],
    
    
  },


  {
    component: "MainLayout",
    path: "/admin",
    auth: false,
    name: "Dashboard",
    exact: false,
    redirect: "/admin/dashboard",
    childrens: [
      // DASHBOARD
      {
        component: "Dashboard",
        path: "/dashboard",
        componentPath: "pages/Dashboard/InitDashboard/Dashboard",
        name: "Dashboard",
        auth: false,
        exact: true,
      },
      {
        component: "UserOnBoardComp",
        path: "/user-onboard",
        componentPath: "pages/UserOnBoard/index",
        name: "UserOnBoardComp",
        auth: false,
        exact: true,
      },
      {
        component: "CreateUser",
        path: "/create-user",
        componentPath: "pages/UserOnBoard/CreateUser",
        name: "CreateUser",
        auth: false,
        exact: true,
      },
      {
        component: "SchoolOnBoardComp",
        path: "/school-onboard",
        componentPath: "pages/SchoolOnBoard/index",
        name: "SchoolOnBoardComp",
        auth: false,
        exact: true,
      },
      {
        component: "CreateSchoolUser",
        path: "/create-school-user",
        componentPath: "pages/SchoolOnBoard/CreateSchoolUser",
        name: "CreateSchoolUser",
        auth: false,
        exact: true,
      },
      {
        component: "ViewSchoolUser",
        path: "/view-school-user",
        componentPath: "pages/SchoolOnBoard/ViewSchoolUser",
        name: "ViewSchoolUser",
        auth: false,
        exact: true,
      },
      {
        component: "Profile",
        path: "/profile",
        componentPath: "pages/ProfilePage/index",
        name: "Profile",
        auth: false,
        exact: true,
      },
      {
        component: "EditProfile",
        path: "/edit-profile",
        componentPath: "pages/ProfilePage/EditProfile",
        name: "EditProfile",
        auth: false,
        exact: true,
      },
      {
        component: "ChangePassword",
        path: "/change-password",
        componentPath: "pages/ProfilePage/ChangePassword",
        name: "ChangePassword",
        auth: false,
        exact: true,
      },
      {
        component: "Notification",
        path: "/notification",
        componentPath: "pages/NotificationPage/index",
        name: "Notification",
        auth: false,
        exact: true,
      },
    ],

  },
]
export default routers

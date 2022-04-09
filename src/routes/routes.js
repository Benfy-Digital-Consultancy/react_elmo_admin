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
    ],
  },
  //profile creation
  {
    component: "AuthLayout",
    path: "/profile",
    auth: false,
    name: "Profile",
    exact: false,
    redirect: "/profile",
    childrens: [
      {
        component: "BasicDetails",
        path: "/basic-details",
        componentPath: "pages/Dashboard/ProfileCreation/BasicDetails",
        name: "BasicDetails",
        auth: false,
        exact: true,
      },
      {
        component: "Appointment",
        path: "/appointment",
        componentPath: "pages/Dashboard/ProfileCreation/Appointment",
        name: "Appointment",
        auth: false,
        exact: true,
      },
      {
        component: "PaymentDetails",
        path: "/payment-details",
        componentPath: "pages/Dashboard/ProfileCreation/PaymentDetails",
        name: "PaymentDetails",
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
        component: "Settings",
        path: "/settings",
        componentPath: "pages/Dashboard/Settings/Settings",
        name: "Settings",
        auth: false,
        exact: true,
      },
    ],
  },
];
export default routers;

// import DashboardPage from "./views/Dashboard";

const routes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        // component: DashboardPage,
        // icon : HomeIcon,
        layout: "/admin"
    }
]

const settingRoutes = [
    {
        path: "/addlocation",
        name: "เพิ่มสถานที่",
        // component: AddlocationPage,
        // icon : AddBoxIcon,
        layout: "/admin"
    }
]

export {
    routes,
    settingRoutes
};


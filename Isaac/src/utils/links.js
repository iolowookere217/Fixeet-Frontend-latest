import { RxDashboard } from "react-icons/rx";
import {
    FiBook,
    FiFolderPlus,
    FiDollarSign,
    FiUserPlus,
    FiBell,
    FiRss,
    FiSettings,
    FiBookOpen,
    FiSun,
    FiFolderMinus,
    FiClock,
} from "react-icons/fi";
import { LuGitPullRequest } from "react-icons/lu";

export const superAdminNavData = [
    {
        to: "super-admin/dashboard",
        icon: RxDashboard,
        tabName: "Dashboard",
    },
    {
        to: "super-admin/user-roles",
        icon: LuGitPullRequest,
        tabName: "User Roles",
    },
    {
        to: "super-admin/schools",
        icon: FiBookOpen,
        tabName: "Schools",
    },
    {
        to: "super-admin/reports",
        icon: FiRss,
        tabName: "Reports",
    },
    {
        to: "super-admin/subscriptions",
        icon: FiSun,
        tabName: "Subscriptions",
    },
    {
        to: "super-admin/settings",
        icon: FiSettings,
        tabName: "Settings",
    },
];

export const adminNavData = [
    {
        to: "admin/dashboard",
        icon: RxDashboard,
        tabName: "Dashboard",
    },
    {
        to: "admin/admissions",
        icon: FiUserPlus,
        tabName: "Admissions",
    },
    {
        to: "admin/academics",
        icon: FiBook,
        tabName: "Academics",
    },
    {
        to: "admin/records",
        icon: FiFolderPlus,
        tabName: "Records",
    },
    {
        to: "admin/finance",
        icon: FiDollarSign,
        tabName: "Finance",
    },
    {
        to: "admin/noticeboard",
        icon: FiBell,
        tabName: "Noticeboard",
    },
    {
        to: "admin/reports",
        icon: FiRss,
        tabName: "Reports",
    },
    {
        to: "admin/settings",
        icon: FiSettings,
        tabName: "Settings",
    },
];

export const teacherNavData = [
    {
        to: "teachers/dashboard",
        icon: RxDashboard,
        tabName: "Dashboard",
    },
    {
        to: "teachers/students",
        icon: FiUserPlus,
        tabName: "Students",
    },
    {
        to: "teachers/lesson-notes",
        icon: FiBook,
        tabName: "Lesson Notes",
    },
    {
        to: "teachers/assessments",
        icon: FiFolderPlus,
        tabName: "Assessment",
    },
    {
        to: "teachers/attendance",
        icon: FiFolderMinus,
        tabName: "Attendance",
    },
    {
        to: "teachers/noticeboard",
        icon: FiBell,
        tabName: "Noticeboard",
    },
    {
        to: "teachers/settings",
        icon: FiSettings,
        tabName: "Settings",
    },
];

export const studentNavData = [
    {
        to: "student/dashboard/:id",
        icon: RxDashboard,
        tabName: "Dashboard",
    },
    {
        to: "student/profile/:id",
        icon: FiUserPlus,
        tabName: "My Profile",
    },
    {
        to: "student/attendance/:id",
        icon: FiFolderMinus,
        tabName: "Attendance",
    },
    {
        to: "student/subjects/:id",
        icon: FiBook,
        tabName: "Subjects",
    },
    {
        to: "student/results/:id",
        icon: FiFolderPlus,
        tabName: "Results",
    },
    {
        to: "student/timetable/:id",
        icon: FiClock,
        tabName: "Time Table",
    },
    {
        to: "student/fees/:id",
        icon: FiDollarSign,
        tabName: "School Fees",
    },
    {
        to: "student/notice-board/:id",
        icon: FiBell,
        tabName: "Noticeboard",
    },
    {
        to: "student/settings/:id",
        icon: FiSettings,
        tabName: "Settings",
    },
];

export const webNavLinks = [
    {
        name: "Home",
        path: "/web/home",
    },
    {
        name: "Features",
        path: "/web/features",
    },
    {
        name: "Testimonals",
        path: "/web/testimonals",
    },
    {
        name: "About Us",
        path: "/web/about",
    },
];
export const webSchoolNavLinks = [
    {
        name: "Home",
        path: "/web/home",
    },
    {
        name: "About Us",
        path: "/web/about",
    },
    {
        name: "Admissions",
        path: "/web/admissions",
    },
    {
        name: "Academics",
        path: "/web/academics",
    },
    {
        name: "Gallery",
        path: "/web/gallery",
    },
];

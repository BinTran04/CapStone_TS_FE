export const revenueData = [
  { name: "Tháng 1", revenue: 4000, students: 240 },
  { name: "Tháng 2", revenue: 3000, students: 139 },
  { name: "Tháng 3", revenue: 2000, students: 980 },
  { name: "Tháng 4", revenue: 2780, students: 390 },
  { name: "Tháng 5", revenue: 1890, students: 480 },
  { name: "Tháng 6", revenue: 2390, students: 380 },
  { name: "Tháng 7", revenue: 3490, students: 430 },
];

export const categoryData = [
  { name: "Front End", value: 400 },
  { name: "Back End", value: 300 },
  { name: "Full Stack", value: 300 },
  { name: "Mobile", value: 200 },
];

export interface Transaction {
  id: string;
  user: string;
  courseName: string;
  amount: number;
  date: string;
  status: "Success" | "Pending" | "Failed" | "Refunded";
  paymentMethod: "Momo" | "ZaloPay" | "PayPal" | "Stripe" | "Bank Transfer";
}

export const transactionData: Transaction[] = [
  {
    id: "TRX-2026-001",
    user: "Trần Quốc Nhựt",
    courseName: "ReactJS Master Class",
    amount: 1200000,
    date: "15/01/2026 10:30",
    status: "Success",
    paymentMethod: "Momo",
  },
  {
    id: "TRX-2026-002",
    user: "Nguyễn Văn A",
    courseName: "NodeJS & Express",
    amount: 800000,
    date: "14/01/2026 14:20",
    status: "Pending",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "TRX-2026-003",
    user: "Lê Thị B",
    courseName: "Python for AI",
    amount: 1500000,
    date: "14/01/2026 09:15",
    status: "Failed",
    paymentMethod: "Stripe",
  },
  {
    id: "TRX-2026-004",
    user: "Hoàng C",
    courseName: "Docker & Kubernetes",
    amount: 2000000,
    date: "13/01/2026 16:45",
    status: "Refunded",
    paymentMethod: "PayPal",
  },
  {
    id: "TRX-2026-005",
    user: "Phạm D",
    courseName: "HTML5 & CSS3 Basic",
    amount: 500000,
    date: "13/01/2026 11:00",
    status: "Success",
    paymentMethod: "ZaloPay",
  },
];

export const courseRevenueData = [
  { name: "ReactJS Master", revenue: 50000000, students: 120 },
  { name: "NodeJS API", revenue: 35000000, students: 95 },
  { name: "Python AI", revenue: 42000000, students: 80 },
  { name: "Docker/DevOps", revenue: 28000000, students: 60 },
  { name: "Java Spring", revenue: 31000000, students: 75 },
];

export const completionRateData = [
  { name: "Frontend Basic", rate: 85, dropOut: 15 },
  { name: "Backend NodeJS", rate: 70, dropOut: 30 },
  { name: "Fullstack MERN", rate: 60, dropOut: 40 },
  { name: "Data Science", rate: 50, dropOut: 50 },
];

export const topStudentsData = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    courses: 5,
    score: 9.8,
    hours: 120,
    status: "Active",
  },
  {
    id: 2,
    name: "Trần Thị B",
    courses: 4,
    score: 9.5,
    hours: 98,
    status: "Active",
  },
  {
    id: 3,
    name: "Lê Hoàng C",
    courses: 4,
    score: 9.2,
    hours: 85,
    status: "Away",
  },
  {
    id: 4,
    name: "Phạm Minh D",
    courses: 3,
    score: 8.9,
    hours: 70,
    status: "Active",
  },
  {
    id: 5,
    name: "Võ Tấn E",
    courses: 3,
    score: 8.5,
    hours: 65,
    status: "Offline",
  },
];

export const promoEfficiencyData = [
  { month: "T1", organic: 4000, promo: 2400 },
  { month: "T2", organic: 3000, promo: 1398 },
  { month: "T3", organic: 2000, promo: 9800 },
  { month: "T4", organic: 2780, promo: 3908 },
  { month: "T5", organic: 1890, promo: 4800 },
  { month: "T6", organic: 2390, promo: 3800 },
];

export const initialEmails = [
  {
    key: "welcome",
    name: "Email Chào mừng",
    subject: "Chào mừng {userName} gia nhập CyberSoft!",
    active: true,
  },
  {
    key: "reminder",
    name: "Nhắc nhở học tập",
    subject: "Bạn ơi, đừng quên bài học hôm nay nhé!",
    active: true,
  },
  {
    key: "certificate",
    name: "Cấp chứng chỉ",
    subject: "Chúc mừng! Bạn đã hoàn thành khóa học {courseName}",
    active: false,
  },
];

export interface Instructor {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  specialty: string;
  rating: number;
  totalStudents: number;
  coursesCount: number;
  completionRate: number;
  joinDate: string;
  bio: string;
  performanceData: { month: string; students: number; rating: number }[];
  courses: { id: string; name: string; students: number; rating: number }[];
}

export const instructorData: Instructor[] = [
  {
    id: "GV001",
    name: "Trương Tấn Khải",
    avatar: "https://i.pravatar.cc/150?u=GV001",
    email: "khaidev@cybersoft.edu.vn",
    phone: "0909123456",
    specialty: "Fullstack Developer",
    rating: 4.8,
    totalStudents: 1250,
    coursesCount: 5,
    completionRate: 85,
    joinDate: "12/01/2020",
    bio: "Chuyên gia ReactJS & NodeJS với 10 năm kinh nghiệm. Mentor nhiệt tình, phong cách giảng dạy thực chiến.",
    performanceData: [
      { month: "T1", students: 120, rating: 4.5 },
      { month: "T2", students: 150, rating: 4.7 },
      { month: "T3", students: 180, rating: 4.8 },
      { month: "T4", students: 220, rating: 4.9 },
    ],
    courses: [
      { id: "KH01", name: "ReactJS Master", students: 400, rating: 4.9 },
      { id: "KH02", name: "NodeJS API", students: 350, rating: 4.7 },
    ],
  },
  {
    id: "GV002",
    name: "Đặng Thuyền Vương",
    avatar: "https://i.pravatar.cc/150?u=GV002",
    email: "vuongdt@cybersoft.edu.vn",
    phone: "0912345678",
    specialty: "Backend / DevOps",
    rating: 4.5,
    totalStudents: 980,
    coursesCount: 3,
    completionRate: 78,
    joinDate: "05/05/2021",
    bio: "Kỹ sư hệ thống tại tập đoàn lớn. Chuyên giảng dạy về Java Spring Boot và Docker/Kubernetes.",
    performanceData: [
      { month: "T1", students: 80, rating: 4.2 },
      { month: "T2", students: 90, rating: 4.3 },
      { month: "T3", students: 110, rating: 4.5 },
      { month: "T4", students: 130, rating: 4.6 },
    ],
    courses: [
      { id: "KH03", name: "Java Spring Boot", students: 500, rating: 4.5 },
      { id: "KH04", name: "Docker Basic", students: 480, rating: 4.4 },
    ],
  },
  {
    id: "GV003",
    name: "Nguyễn Thị Thảo",
    avatar: "https://i.pravatar.cc/150?u=GV003",
    email: "thaont@cybersoft.edu.vn",
    phone: "0987654321",
    specialty: "Data Science / AI",
    rating: 4.9,
    totalStudents: 2100,
    coursesCount: 8,
    completionRate: 92,
    joinDate: "15/08/2019",
    bio: "Tiến sĩ KHMT, đam mê nghiên cứu AI và Big Data. Giảng viên được yêu thích nhất năm 2025.",
    performanceData: [
      { month: "T1", students: 300, rating: 4.8 },
      { month: "T2", students: 350, rating: 4.9 },
      { month: "T3", students: 400, rating: 4.9 },
      { month: "T4", students: 450, rating: 5.0 },
    ],
    courses: [
      { id: "KH05", name: "Python for AI", students: 800, rating: 5.0 },
      { id: "KH06", name: "Machine Learning", students: 600, rating: 4.8 },
    ],
  },
];

export interface Permission {
  key: string;
  title: string;
  children?: Permission[];
}

export const permissionTree: Permission[] = [
  {
    key: "dashboard",
    title: "Dashboard",
    children: [
      { key: "dashboard.view", title: "Xem thống kê chung" },
      { key: "dashboard.revenue", title: "Xem doanh thu" },
    ],
  },
  {
    key: "user",
    title: "Quản lý Người dùng",
    children: [
      { key: "user.view", title: "Xem danh sách" },
      { key: "user.create", title: "Thêm người dùng" },
      { key: "user.update", title: "Chỉnh sửa" },
      { key: "user.delete", title: "Xóa người dùng" },
      { key: "user.import", title: "Import Excel" },
    ],
  },
  {
    key: "course",
    title: "Quản lý Khóa học",
    children: [
      { key: "course.view", title: "Xem danh sách" },
      { key: "course.create", title: "Tạo khóa học" },
      { key: "course.approve", title: "Duyệt khóa học" },
    ],
  },
  {
    key: "finance",
    title: "Tài chính & Kế toán",
    children: [
      { key: "finance.view", title: "Xem giao dịch" },
      { key: "finance.refund", title: "Xử lý hoàn tiền" },
      { key: "finance.export", title: "Xuất báo cáo" },
    ],
  },
  {
    key: "system",
    title: "Hệ thống",
    children: [
      { key: "system.settings", title: "Cấu hình hệ thống" },
      { key: "system.roles", title: "Quản lý phân quyền" },
    ],
  },
];

export interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  status: "active" | "inactive";
  permissions: string[];
}

export const initialRoles: Role[] = [
  {
    id: "SUPER_ADMIN",
    name: "Super Admin",
    description: "Quyền truy cập toàn bộ hệ thống, không giới hạn.",
    userCount: 2,
    status: "active",
    permissions: ["all"],
  },
  {
    id: "INSTRUCTOR",
    name: "Giảng viên",
    description: "Quản lý khóa học cá nhân, xem học viên.",
    userCount: 15,
    status: "active",
    permissions: ["dashboard.view", "course.view", "course.create"],
  },
  {
    id: "CSKH",
    name: "Chăm sóc khách hàng",
    description: "Hỗ trợ học viên, xem danh sách user, không được xóa.",
    userCount: 8,
    status: "active",
    permissions: ["dashboard.view", "user.view", "user.update"],
  },
  {
    id: "ACCOUNTANT",
    name: "Kế toán",
    description: "Quản lý doanh thu, hóa đơn, hoàn tiền.",
    userCount: 3,
    status: "active",
    permissions: [
      "dashboard.view",
      "dashboard.revenue",
      "finance.view",
      "finance.refund",
      "finance.export",
    ],
  },
];

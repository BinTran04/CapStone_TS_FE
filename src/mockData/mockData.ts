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
    id: "TRX-001",
    user: "Nguyễn Văn A",
    courseName: "ReactJS Advanced",
    amount: 499000,
    date: "2023-10-25",
    status: "Success",
    paymentMethod: "Momo",
  },
  {
    id: "TRX-002",
    user: "Trần Thị B",
    courseName: "NodeJS Backend",
    amount: 699000,
    date: "2023-10-24",
    status: "Pending",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "TRX-003",
    user: "Lê Văn C",
    courseName: "Python for AI",
    amount: 899000,
    date: "2023-10-23",
    status: "Failed",
    paymentMethod: "ZaloPay",
  },
  {
    id: "TRX-004",
    user: "Phạm Thị D",
    courseName: "Fullstack Web",
    amount: 1200000,
    date: "2023-10-22",
    status: "Success",
    paymentMethod: "PayPal",
  },
  {
    id: "TRX-005",
    user: "Hoàng Văn E",
    courseName: "Java Spring Boot",
    amount: 799000,
    date: "2023-10-21",
    status: "Refunded",
    paymentMethod: "Stripe",
  },
];

export interface Instructor {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  specialty: string;
  bio: string;
  rating: number;
  totalStudents: number;
  coursesCount: number;
  completionRate: number;
  status: "Active" | "Inactive";
  performanceData: { month: string; students: number }[];
  courses: { name: string; students: number; rating: number }[];
}

export const instructorData: Instructor[] = [
  {
    id: 1,
    name: "Trương Tấn Khải",
    email: "khai.truong@cybersoft.edu.vn",
    phone: "0901234567",
    avatar: "https://i.pravatar.cc/150?u=instructor1",
    specialty: "Fullstack Developer",
    bio: "Giảng viên có 10 năm kinh nghiệm trong lĩnh vực phát triển phần mềm, chuyên sâu về MERN Stack.",
    rating: 4.9,
    totalStudents: 1200,
    coursesCount: 5,
    completionRate: 95,
    status: "Active",
    performanceData: [
      { month: "T1", students: 120 },
      { month: "T2", students: 150 },
      { month: "T3", students: 180 },
      { month: "T4", students: 220 },
      { month: "T5", students: 250 },
    ],
    courses: [
      { name: "ReactJS Masterclass", students: 500, rating: 5.0 },
      { name: "NodeJS & Express", students: 400, rating: 4.8 },
      { name: "MongoDB Advanced", students: 300, rating: 4.9 },
    ],
  },
  {
    id: 2,
    name: "Nguyễn Thị Minh Hằng",
    email: "hang.nguyen@cybersoft.edu.vn",
    phone: "0987654321",
    avatar: "https://i.pravatar.cc/150?u=instructor2",
    specialty: "Frontend Specialist",
    bio: "Chuyên gia UI/UX và Frontend, từng làm việc tại các công ty công nghệ lớn tại Singapore.",
    rating: 4.8,
    totalStudents: 850,
    coursesCount: 3,
    completionRate: 88,
    status: "Active",
    performanceData: [
      { month: "T1", students: 90 },
      { month: "T2", students: 110 },
      { month: "T3", students: 130 },
      { month: "T4", students: 140 },
      { month: "T5", students: 160 },
    ],
    courses: [
      { name: "Figma to HTML/CSS", students: 300, rating: 4.7 },
      { name: "Advanced Tailwind CSS", students: 250, rating: 4.9 },
      { name: "JavaScript Core", students: 300, rating: 4.8 },
    ],
  },
  {
    id: 3,
    name: "Lê Quang Song",
    email: "song.le@cybersoft.edu.vn",
    phone: "0912345678",
    avatar: "https://i.pravatar.cc/150?u=instructor3",
    specialty: "Backend & DevOps",
    bio: "Kỹ sư hệ thống với chứng chỉ AWS Solutions Architect Professional.",
    rating: 4.7,
    totalStudents: 600,
    coursesCount: 4,
    completionRate: 80,
    status: "Inactive",
    performanceData: [
      { month: "T1", students: 50 },
      { month: "T2", students: 60 },
      { month: "T3", students: 40 },
      { month: "T4", students: 30 },
      { month: "T5", students: 20 },
    ],
    courses: [
      { name: "Docker & Kubernetes", students: 200, rating: 4.6 },
      { name: "CI/CD with Jenkins", students: 150, rating: 4.5 },
      { name: "Microservices", students: 250, rating: 4.8 },
    ],
  },
];

export const stats = [
  { value: "50K+", label: "Học viên" },
  { value: "200+", label: "Khóa học" },
  { value: "100+", label: "Giảng viên" },
  { value: "4.8", label: "Đánh giá" },
];

export const features = [
  {
    icon: "🎓",
    title: "Học mọi lúc mọi nơi",
    description:
      "Truy cập bài giảng 24/7 trên mọi thiết bị, học theo tốc độ của riêng bạn.",
  },
  {
    icon: "🔥",
    title: "Thực hành dự án thật",
    description: "Làm dự án thực tế để xây dựng Portfolio cá nhân ấn tượng.",
  },
  {
    icon: "🤝",
    title: "Cộng đồng & Mentor",
    description: "Đội ngũ Mentor hỗ trợ 24/7, giải đáp thắc mắc nhiệt tình.",
  },
  {
    icon: "🚀",
    title: "Cơ hội nghề nghiệp",
    description:
      "Kết nối với các doanh nghiệp hàng đầu ngay sau khi tốt nghiệp.",
  },
];

export const reviews = [
  {
    id: 1,
    name: "Nguyễn Nhật Minh",
    role: "Fullstack Dev",
    avatar: "https://i.pravatar.cc/150?u=1",
    content: "Khóa học rất thực tế, giúp mình tự tin đi phỏng vấn.",
    rating: 5,
  },
  {
    id: 2,
    name: "Trần Thu Hà",
    role: "Sinh viên",
    avatar: "https://i.pravatar.cc/150?u=2",
    content: "Mentor hỗ trợ nhiệt tình, lộ trình rõ ràng.",
    rating: 5,
  },
  {
    id: 3,
    name: "Lê Văn Hùng",
    role: "Fresher",
    avatar: "https://i.pravatar.cc/150?u=3",
    content: "Hệ thống bài tập phong phú, rèn tư duy tốt.",
    rating: 4,
  },
  {
    id: 4,
    name: "Hoàng Anh",
    role: "Học viên",
    avatar: "https://i.pravatar.cc/150?u=4",
    content: "Khóa học rất thực tế, giảng viên dạy dễ hiểu.",
    rating: 5,
  },
];

export const blogs = [
  {
    id: 1,
    title: "Lộ trình Frontend 2026",
    image:
      "https://media.techmaster.vn/api/static/bub3enc51co7s932dsk0/Z6v6s42L",
    date: "10 Jan 2026",
  },
  {
    id: 2,
    title: "Tại sao nên học ReactJS?",
    image:
      "https://nordiccoder.com/app/uploads/2020/01/reactjs-la-gi-1-scaled.jpg",
    date: "05 Jan 2026",
  },
  {
    id: 3,
    title: "Tips phỏng vấn IT hiệu quả",
    image:
      "https://topdev.vn/blog/wp-content/uploads/2019/06/cau-hoi-phong-van-it.png",
    date: "01 Jan 2026",
  },
];

export const faqs = [
  {
    key: "1",
    label: "Tôi chưa biết gì về IT có học được không?",
    children:
      "Được! Chúng tôi có lộ trình từ Zero dành cho người mới bắt đầu hoàn toàn.",
  },
  {
    key: "2",
    label: "Khóa học có cấp chứng chỉ không?",
    children:
      "Có. Sau khi hoàn thành 100% bài học và project, bạn sẽ nhận được chứng chỉ.",
  },
  {
    key: "3",
    label: "Hình thức học như thế nào?",
    children:
      "Học online qua video quay sẵn kết hợp với livestream mentor hàng tuần.",
  },
];

export const MOCK_CHAPTERS = [
  {
    id: "chap1",
    title: "Chương 1: Giới thiệu tổng quan",
    lessons: [
      {
        id: "1",
        title: "Giới thiệu khóa học & Lộ trình",
        duration: "05:20",
        videoId: "x0fSBAgBrO0",
      },
      {
        id: "2",
        title: "Cài đặt môi trường VS Code",
        duration: "10:15",
        videoId: "951830574",
      },
      {
        id: "3",
        title: "Tư duy lập trình hiện đại",
        duration: "08:45",
        videoId: "M62l1xA5k8o",
      },
    ],
  },
  {
    id: "chap2",
    title: "Chương 2: Kiến thức nền tảng",
    lessons: [
      {
        id: "4",
        title: "Biến và kiểu dữ liệu",
        duration: "12:30",
        videoId: "0SJE9dYdpps",
      },
      {
        id: "5",
        title: "Cấu trúc điều kiện If-Else",
        duration: "15:00",
        videoId: "f3zR0nJ9tWw",
      },
      {
        id: "6",
        title: "Vòng lặp trong thực tế",
        duration: "11:20",
        videoId: "3JluqToP5Hg",
      },
    ],
  },
  {
    id: "chap3",
    title: "Chương 3: Xây dựng dự án thực tế",
    lessons: [
      {
        id: "7",
        title: "Khởi tạo dự án React",
        duration: "09:10",
        videoId: "w7ejDZ8SWv8",
      },
      {
        id: "8",
        title: "Component và Props",
        duration: "20:05",
        videoId: "kVeOpcw4GWY",
      },
    ],
  },
];

export const courseRevenueData = [
  { name: "ReactJS", revenue: 120000000, profit: 80000000, cost: 40000000 },
  { name: "NodeJS", revenue: 90000000, profit: 60000000, cost: 30000000 },
  { name: "Python", revenue: 150000000, profit: 100000000, cost: 50000000 },
  { name: "Java", revenue: 80000000, profit: 50000000, cost: 30000000 },
  { name: "DevOps", revenue: 60000000, profit: 30000000, cost: 30000000 },
  { name: "Flutter", revenue: 75000000, profit: 45000000, cost: 30000000 },
];

export const completionRateData = [
  { name: "ReactJS Master", rate: 85 },
  { name: "NodeJS Advanced", rate: 70 },
  { name: "Python AI", rate: 60 },
  { name: "DevOps Zero to Hero", rate: 90 },
  { name: "AWS Cloud", rate: 75 },
];

export const topStudentsData = [
  { id: 1, name: "Nguyễn Văn A", courses: 5, score: 98, status: "Active" },
  { id: 2, name: "Trần Thị B", courses: 4, score: 95, status: "Active" },
  { id: 3, name: "Lê Văn C", courses: 4, score: 92, status: "Active" },
  { id: 4, name: "Phạm Thị D", courses: 3, score: 90, status: "Inactive" },
  { id: 5, name: "Hoàng Văn E", courses: 3, score: 88, status: "Active" },
];

export const promoEfficiencyData = [
  { name: "Tết Sale", usage: 400, sales: 240000000 },
  { name: "Black Friday", usage: 300, sales: 139800000 },
  { name: "Summer Sale", usage: 200, sales: 98000000 },
  { name: "Back to School", usage: 278, sales: 390800000 },
];

export interface EmailTemplate {
  id: string;
  type: string;
  subject: string;
  content: string;
  isActive: boolean;
}

export const initialEmails: EmailTemplate[] = [
  {
    id: "WELCOME",
    type: "Chào mừng thành viên mới",
    subject: "Chào mừng bạn đến với CyberSoft Learning!",
    content: "Xin chào {{name}},\n\nCảm ơn bạn đã đăng ký tài khoản...",
    isActive: true,
  },
  {
    id: "RESET_PASS",
    type: "Khôi phục mật khẩu",
    subject: "Yêu cầu đặt lại mật khẩu",
    content: "Xin chào,\n\nBạn vừa yêu cầu đặt lại mật khẩu...",
    isActive: true,
  },
  {
    id: "COURSE_ENROLL",
    type: "Xác nhận ghi danh",
    subject: "Ghi danh khóa học thành công",
    content: "Chúc mừng bạn đã ghi danh thành công khóa học {{course_name}}...",
    isActive: true,
  },
  {
    id: "PAYMENT_SUCCESS",
    type: "Thanh toán thành công",
    subject: "Hóa đơn thanh toán #{{order_id}}",
    content: "Cảm ơn bạn đã thanh toán. Chi tiết đơn hàng của bạn...",
    isActive: true,
  },
];

export interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: string[];
  isSystem: boolean;
}

export const initialRoles: Role[] = [
  {
    id: "ADMIN",
    name: "Super Admin",
    description: "Quản trị viên cấp cao, toàn quyền hệ thống",
    userCount: 3,
    permissions: ["all"],
    isSystem: true,
  },
  {
    id: "MANAGER",
    name: "Quản lý đào tạo",
    description: "Quản lý khóa học, giảng viên và học viên",
    userCount: 5,
    permissions: [
      "dashboard.view",
      "courses.view",
      "courses.manage",
      "users.view",
      "users.manage",
    ],
    isSystem: false,
  },
  {
    id: "INSTRUCTOR",
    name: "Giảng viên",
    description: "Chỉ được xem và quản lý nội dung khóa học được phân công",
    userCount: 15,
    permissions: ["dashboard.view", "courses.view", "content.manage"],
    isSystem: false,
  },
  {
    id: "STUDENT",
    name: "Học viên",
    description: "Quyền mặc định khi đăng ký tài khoản",
    userCount: 1200,
    permissions: ["profile.view", "learning.access"],
    isSystem: true,
  },
];

export const permissionTree = [
  {
    title: "Thống kê (Dashboard)",
    key: "dashboard",
    children: [
      { title: "Xem báo cáo tổng quan", key: "dashboard.view" },
      { title: "Xem báo cáo doanh thu", key: "dashboard.revenue" },
    ],
  },
  {
    title: "Quản lý người dùng",
    key: "users",
    children: [
      { title: "Xem danh sách", key: "users.view" },
      { title: "Thêm/Sửa/Xóa người dùng", key: "users.manage" },
      { title: "Phân quyền (Roles)", key: "users.roles" },
    ],
  },
  {
    title: "Quản lý khóa học",
    key: "courses",
    children: [
      { title: "Xem danh sách khóa học", key: "courses.view" },
      { title: "Tạo/Sửa khóa học", key: "courses.manage" },
      { title: "Duyệt khóa học", key: "courses.approve" },
      { title: "Quản lý nội dung bài học", key: "content.manage" },
    ],
  },
  {
    title: "Tài chính",
    key: "finance",
    children: [
      { title: "Xem lịch sử giao dịch", key: "finance.transactions" },
      { title: "Xử lý hoàn tiền", key: "finance.refund" },
    ],
  },
  {
    title: "Hệ thống",
    key: "system",
    children: [
      { title: "Cấu hình chung", key: "system.settings" },
      { title: "Xem Logs", key: "system.logs" },
    ],
  },
];

import {
  ReadOutlined,
  SolutionOutlined,
  GlobalOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
} from "@ant-design/icons";

export const features = [
  {
    icon: "🎓",
    title: "Học mọi lúc mọi nơi",
    desc: "Truy cập bài giảng 24/7 trên mọi thiết bị, đồng bộ tiến độ học tập.",
  },
  {
    icon: "🔥",
    title: "Thực hành dự án thật",
    desc: "Làm dự án thực tế để xây dựng Portfolio xin việc ngay sau khóa học.",
  },
  {
    icon: "🤝",
    title: "Cộng đồng & Mentor",
    desc: "Đội ngũ Mentor hỗ trợ 24/7 nhiệt tình, sửa lỗi code 1-1.",
  },
  {
    icon: "📜",
    title: "Chứng chỉ uy tín",
    desc: "Nhận chứng chỉ hoàn thành khóa học, có giá trị khi ứng tuyển.",
  },
];

// Dữ liệu Thống kê
export const stats = [
  { number: "50K+", label: "Học viên", icon: TeamOutlined },
  { number: "100+", label: "Khóa học", icon: ReadOutlined },
  { number: "90%", label: "Có việc làm", icon: SolutionOutlined },
  { number: "20+", label: "Đối tác tuyển dụng", icon: GlobalOutlined },
];

// Lộ trình học tập
export const learningPaths = [
  {
    level: "Beginner",
    title: "Nhập môn lập trình",
    desc: "Làm quen với tư duy lập trình, HTML, CSS, JS cơ bản.",
    color: "bg-green-100 text-green-700",
  },
  {
    level: "Intermediate",
    title: "Lập trình chuyên sâu",
    desc: "Học ReactJS, NodeJS, Database, xây dựng dự án nhỏ.",
    color: "bg-blue-100 text-blue-700",
  },
  {
    level: "Advanced",
    title: "Trở thành Leader",
    desc: "Kiến trúc hệ thống, Microservices, DevOps, Quản lý dự án.",
    color: "bg-purple-100 text-purple-700",
  },
];

// Giảng viên
export const instructors = [
  {
    name: "Nguyễn Văn A",
    role: "Senior Frontend Dev",
    img: "https://i.pravatar.cc/150?img=11",
  },
  {
    name: "Trần Thị B",
    role: "Lead Backend Engineer",
    img: "https://i.pravatar.cc/150?img=5",
  },
  {
    name: "Lê Văn C",
    role: "Fullstack Expert",
    img: "https://i.pravatar.cc/150?img=3",
  },
  {
    name: "Phạm Thị D",
    role: "UI/UX Designer",
    img: "https://i.pravatar.cc/150?img=9",
  },
];

// Cảm nhận học viên
export const reviews = [
  {
    user: "Hải Nam",
    comment: "Khóa học rất thực tế, giảng viên dạy dễ hiểu.",
    rating: 5,
  },
  {
    user: "Minh Tú",
    comment: "Mình đã xin được việc ngay sau khi tốt nghiệp khóa React.",
    rating: 5,
  },
  {
    user: "Thanh Hằng",
    comment: "Support cực nhanh, sửa lỗi code nhiệt tình.",
    rating: 4,
  },
];

// Bài viết
export const blogs = [
  {
    title: "Lộ trình Frontend 2026",
    img: "https://picsum.photos/400/250?random=1",
    date: "10 Jan 2026",
  },
  {
    title: "Tại sao nên học ReactJS?",
    img: "https://picsum.photos/400/250?random=2",
    date: "05 Jan 2026",
  },
  {
    title: "Tips phỏng vấn IT hiệu quả",
    img: "https://picsum.photos/400/250?random=3",
    date: "01 Jan 2026",
  },
];

// Câu hỏi thường gặp
export const faqs = [
  {
    key: "1",
    label: "Tôi chưa biết gì về IT có học được không?",
    children:
      "Được! Chúng tôi có lộ trình dành riêng cho người mới bắt đầu (Beginner) đi từ con số 0.",
  },
  {
    key: "2",
    label: "Hình thức thanh toán và hoàn tiền như thế nào?",
    children:
      "Bạn có thể chuyển khoản hoặc trả góp. CyberSoft cam kết hoàn tiền 100% trong 7 ngày đầu nếu bạn không hài lòng.",
  },
  {
    key: "3",
    label: "Chứng chỉ khóa học có giá trị không?",
    children:
      "Chứng chỉ được công nhận bởi nhiều đối tác công nghệ hàng đầu và có giá trị cao trong CV của bạn.",
  },
];

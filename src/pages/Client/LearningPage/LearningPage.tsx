import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Layout,
  Typography,
  Button,
  Collapse,
  Tabs,
  Tooltip,
  Progress,
  message,
} from "antd";
import {
  PlayCircleOutlined,
  CheckCircleFilled,
  ArrowLeftOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LeftOutlined,
  RightOutlined,
  ProfileOutlined,
  QuestionCircleOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

import { MOCK_CHAPTERS } from "../../../mockData/mockData";

const { Sider, Content, Header } = Layout;
const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const LearningPage: React.FC = () => {
  const navigate = useNavigate();
  const activeLessonRef = useRef<HTMLDivElement>(null);

  const [currentLesson, setCurrentLesson] = useState(
    MOCK_CHAPTERS[0]?.lessons[0] || {
      id: "",
      title: "",
      duration: "",
      videoId: "",
    },
  );

  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [collapsed, setCollapsed] = useState(false);
  const [autoNext, setAutoNext] = useState(true);

  // LOGIC TÍNH TOÁN BÀI TRƯỚC / BÀI SAU
  const allLessons = useMemo(() => {
    return MOCK_CHAPTERS.flatMap((chapter) => chapter.lessons);
  }, []);

  const currentIndex = allLessons.findIndex((l) => l.id === currentLesson.id);
  const prevLesson = allLessons[currentIndex - 1];
  const nextLesson = allLessons[currentIndex + 1];

  // Tự động cuộn tới bài học đang active trong sidebar
  useEffect(() => {
    if (activeLessonRef.current) {
      activeLessonRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentLesson]);

  // Handle chuyển bài
  const handleNextLesson = () => {
    if (nextLesson) {
      setCurrentLesson(nextLesson);
    }
  };

  const handlePrevLesson = () => {
    if (prevLesson) {
      setCurrentLesson(prevLesson);
    }
  };

  const toggleComplete = (lessonId: string) => {
    if (completedLessons.includes(lessonId)) {
      setCompletedLessons((prev) => prev.filter((id) => id !== lessonId));
    } else {
      setCompletedLessons((prev) => [...prev, lessonId]);
      if (autoNext && nextLesson) {
        message.success("Đã hoàn thành! Đang chuyển bài tiếp theo...");
        setTimeout(() => setCurrentLesson(nextLesson), 1500);
      }
    }
  };

  // Tính phần trăm
  const totalLessonsCount = allLessons.length;
  const progressPercent = Math.round(
    (completedLessons.length / totalLessonsCount) * 100,
  );

  return (
    <Layout className="h-screen overflow-hidden bg-white">
      {/* HEADER TỐI GIẢN */}
      <Header className="bg-[#1c1d1f] px-4 flex justify-between items-center h-16 border-b border-gray-800 z-20 shadow-md">
        <div className="flex items-center gap-4 flex-1">
          <Button
            type="text"
            icon={
              <ArrowLeftOutlined className="text-gray-400 text-lg hover:text-white transition-colors" />
            }
            onClick={() => navigate("/")}
          />
          <div className="hidden md:block">
            <h1 className="text-white font-semibold text-sm m-0 leading-tight">
              Lập trình Fullstack từ Zero đến Hero
            </h1>
            <div className="text-xs text-gray-400 mt-0.5">
              Bài {currentIndex + 1}/{totalLessonsCount}: {currentLesson.title}
            </div>
          </div>
        </div>

        {/* Progress Circle */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-gray-400">Tiến độ khóa học</div>
              <div className="text-sm font-bold text-white">
                {progressPercent}%
              </div>
            </div>
            <Progress
              type="circle"
              percent={progressPercent}
              width={36}
              strokeWidth={10}
              strokeColor="#a435f0"
              trailColor="#3e4143"
              format={() => (
                <CheckCircleFilled className="text-white text-xs" />
              )}
            />
          </div>

          <Tooltip title="Hướng dẫn học tập">
            <Button
              shape="circle"
              icon={<QuestionCircleOutlined />}
              className="bg-transparent border-gray-600 text-gray-400 hover:text-white hover:border-white"
            />
          </Tooltip>
        </div>
      </Header>

      <Layout>
        {/* MAIN CONTENT */}
        <Content className="bg-white flex flex-col relative overflow-y-auto scroll-smooth">
          {/* KHU VỰC VIDEO */}
          <div className="bg-black w-full relative shadow-2xl flex justify-center items-center group">
            <div className="w-full max-w-[100%] aspect-video relative">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${currentLesson.videoId}?autoplay=1&modestbranding=1&rel=0`}
                title="Video Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* THANH ĐIỀU HƯỚNG BÀI HỌC */}
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center shadow-sm">
            <div className="flex gap-2">
              <h2 className="text-lg font-bold text-gray-800 m-0 line-clamp-1">
                {currentLesson.title}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <Button
                icon={<LeftOutlined />}
                disabled={!prevLesson}
                onClick={handlePrevLesson}
                className="font-medium"
              >
                Bài trước
              </Button>
              <Button
                type="primary"
                icon={<RightOutlined />}
                iconPosition="end"
                disabled={!nextLesson}
                onClick={handleNextLesson}
                className="font-medium bg-indigo-600"
              >
                Bài tiếp
              </Button>
            </div>
          </div>

          {/* NỘI DUNG CHI TIẾT */}
          <div className="flex-1 p-6 md:px-12 max-w-5xl mx-auto w-full">
            <div className="mb-6 flex items-center justify-between">
              <Text type="secondary" className="text-sm">
                Cập nhật lần cuối: Tháng 11/2024
              </Text>
              <Button
                size="large"
                type={
                  completedLessons.includes(currentLesson.id)
                    ? "default"
                    : "dashed"
                }
                className={
                  completedLessons.includes(currentLesson.id)
                    ? "bg-green-50 text-green-600 border-green-200 font-semibold"
                    : "border-indigo-300 text-indigo-600 font-semibold"
                }
                icon={
                  completedLessons.includes(currentLesson.id) ? (
                    <CheckCircleFilled />
                  ) : null
                }
                onClick={() => toggleComplete(currentLesson.id)}
              >
                {completedLessons.includes(currentLesson.id)
                  ? "Đã hoàn thành"
                  : "Đánh dấu hoàn thành"}
              </Button>
            </div>

            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  key: "1",
                  label: (
                    <span className="text-base font-semibold px-2">
                      <FileTextOutlined /> Mô tả
                    </span>
                  ),
                  children: (
                    <div className="text-gray-700 leading-7 text-base animate-fade-in">
                      <Paragraph>
                        Chào mừng bạn đến với bài học{" "}
                        <strong>{currentLesson.title}</strong>. Trong video này,
                        chúng ta sẽ đi sâu vào các khái niệm cốt lõi và thực
                        hành trực tiếp trên IDE.
                      </Paragraph>
                      <Title level={4}>Nội dung chính:</Title>
                      <ul className="list-disc pl-5 space-y-2 mb-6">
                        <li>Hiểu về cấu trúc và cú pháp cơ bản.</li>
                        <li>Phân tích lỗi thường gặp và cách debug.</li>
                        <li>Tối ưu hóa code để đạt hiệu suất cao nhất.</li>
                      </ul>
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <Title level={5} className="m-0 mb-2">
                          Tài liệu đính kèm:
                        </Title>
                        <div className="flex gap-4">
                          <a
                            href="#"
                            className="text-indigo-600 hover:underline flex items-center gap-1"
                          >
                            Source Code (Github)
                          </a>
                          <span className="text-gray-300">|</span>
                          <a
                            href="#"
                            className="text-indigo-600 hover:underline flex items-center gap-1"
                          >
                            Slide bài giảng (PDF)
                          </a>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  key: "2",
                  label: (
                    <span className="text-base font-semibold px-2">
                      <QuestionCircleOutlined /> Hỏi đáp (Q&A)
                    </span>
                  ),
                  children: (
                    <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-lg">
                      Chức năng hỏi đáp đang được phát triển.
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </Content>

        {/* DANH SÁCH BÀI HỌC  */}
        <Sider
          width={380}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          reverseArrow
          theme="light"
          trigger={null}
          className="border-l border-gray-200 shadow-xl z-30"
          style={{
            overflow: "hidden",
            height: "100vh",
            position: "sticky",
            top: 0,
            right: 0,
          }}
        >
          {/* Header Sider */}
          <div className="flex justify-between items-center px-4 h-14 border-b border-gray-200 bg-white">
            {!collapsed && (
              <span className="font-bold text-gray-800 text-base">
                Nội dung khóa học
              </span>
            )}
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="ml-auto"
            />
          </div>

          {/* List Content */}
          {!collapsed && (
            <div className="h-[calc(100vh-56px)] overflow-y-auto custom-scrollbar bg-gray-50 pb-20">
              <Collapse
                defaultActiveKey={["chap1", "chap2", "chap3"]}
                ghost
                expandIconPosition="end"
                className="site-collapse-custom-collapse"
              >
                {MOCK_CHAPTERS.map((chapter) => (
                  <Panel
                    header={
                      <div className="font-bold text-gray-800 py-1.5 text-sm">
                        {chapter.title}
                      </div>
                    }
                    key={chapter.id}
                    className="bg-white border-b border-gray-200"
                  >
                    <div className="flex flex-col -mx-4 -mb-4">
                      {chapter.lessons.map((lesson, idx) => {
                        const isActive = currentLesson.id === lesson.id;
                        const isCompleted = completedLessons.includes(
                          lesson.id,
                        );

                        return (
                          <div
                            key={lesson.id}
                            // Ref vào bài active để auto scroll
                            ref={isActive ? activeLessonRef : null}
                            onClick={() => setCurrentLesson(lesson)}
                            className={`
                                                    group flex items-start gap-3 p-3.5 cursor-pointer transition-all border-l-[3px]
                                                    ${
                                                      isActive
                                                        ? "bg-indigo-50 border-indigo-600"
                                                        : "bg-white border-transparent hover:bg-gray-50"
                                                    }
                                                `}
                          >
                            <div className="mt-0.5">
                              {isCompleted ? (
                                <CheckCircleFilled className="text-green-500 text-lg" />
                              ) : isActive ? (
                                <PlayCircleOutlined className="text-indigo-600 text-lg" />
                              ) : (
                                <div className="w-4 h-4 rounded-full border-2 border-gray-300 group-hover:border-indigo-400"></div>
                              )}
                            </div>
                            <div className="flex-1">
                              <div
                                className={`text-sm mb-1 ${
                                  isActive
                                    ? "font-bold text-gray-900"
                                    : "text-gray-600"
                                }`}
                              >
                                {idx + 1}. {lesson.title}
                              </div>
                              <div className="text-xs text-gray-400 flex items-center gap-1">
                                <PlayCircleOutlined
                                  style={{ fontSize: "10px" }}
                                />{" "}
                                {lesson.duration}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Panel>
                ))}
              </Collapse>
            </div>
          )}
        </Sider>
      </Layout>
    </Layout>
  );
};

export default LearningPage;

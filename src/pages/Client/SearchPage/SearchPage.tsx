import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { courseService } from "../../../services/courseService";
import type { Course, CourseCategory } from "../../../types/courseTypes";
import CourseCard from "../../../components/Client/CourseCard/CourseCard";
import {
  Spin,
  Row,
  Col,
  Input,
  Typography,
  Empty,
  Pagination,
  Button,
} from "antd";
import {
  FilterOutlined,
  ClearOutlined,
  CheckOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const keyword = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category");

  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<CourseCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  // 1. Fetch Categories
  useEffect(() => {
    courseService
      .getCourseCategories()
      .then((res) => {
        if (Array.isArray(res.data)) {
          setCategories(res.data);
        }
      })
      .catch((err) => {
        console.error("Lỗi lấy danh mục:", err);
      });
  }, []);

  // 2. Fetch Courses
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let res;
        if (categoryParam) {
          res = await courseService.getCoursesByCategory(categoryParam);
        } else {
          res = await courseService.getCourseList(keyword);
        }
        setCourses(Array.isArray(res.data) ? res.data : []);
        setCurrentPage(1);
      } catch (error) {
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [keyword, categoryParam]);

  const handleCategoryClick = (id: string) => {
    categoryParam === id
      ? navigate(`/search`)
      : navigate(`/search?category=${id}`);
  };

  const onSearchLocal = (val: string) => navigate(`/search?q=${val}`);
  const clearFilters = () => navigate("/search");

  const currentCourses = courses.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Row gutter={32}>
          {/* --- LEFT SIDEBAR (Bộ Lọc) --- */}
          <Col xs={24} lg={6} className="mb-8 lg:mb-0">
            <div className="sticky top-24">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                <FilterOutlined className="text-lg text-indigo-600" />
                <span className="font-bold text-lg text-gray-800">Bộ Lọc</span>
                {(keyword || categoryParam) && (
                  <Button
                    type="text"
                    size="small"
                    icon={<ClearOutlined />}
                    onClick={clearFilters}
                    className="ml-auto text-gray-400 hover:text-red-500"
                  >
                    Xóa
                  </Button>
                )}
              </div>

              <div className="space-y-1">
                <Text
                  strong
                  className="block mb-3 text-gray-800 uppercase text-xs tracking-wider"
                >
                  Danh mục
                </Text>

                {categories.length > 0 ? (
                  categories.map((cat, index) => {
                    // --- LOGIC QUAN TRỌNG ĐỂ LẤY ĐÚNG TÊN BIẾN ---
                    // 1. Lấy ID: Ưu tiên maDanhMuc -> maDanhMucKhoahoc
                    const catId = cat.maDanhMuc || cat.maDanhMucKhoahoc || "";

                    // 2. Lấy Tên: Ưu tiên tenDanhMuc -> tenDanhMucKhoaHoc
                    const catName =
                      cat.tenDanhMuc || cat.tenDanhMucKhoaHoc || "Danh mục";

                    const uniqueKey = catId || `cat_${index}`;
                    const isActive = categoryParam === catId;

                    return (
                      <div
                        key={uniqueKey}
                        onClick={() => catId && handleCategoryClick(catId)}
                        className={`
                        cursor-pointer px-3 py-2.5 rounded-lg flex justify-between items-center text-sm transition-all duration-200 group
                        ${
                          isActive
                            ? "bg-indigo-50 text-indigo-700 font-semibold"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }
                      `}
                      >
                        <span className="flex items-center gap-2">
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                          )}
                          <span
                            style={{ color: isActive ? "#4338ca" : "#4b5563" }}
                          >
                            {catName}
                          </span>
                        </span>
                        {isActive && (
                          <CheckOutlined className="text-indigo-600 text-xs" />
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="text-gray-400 text-sm italic py-2 px-3 bg-gray-50 rounded">
                    Đang tải danh mục...
                  </div>
                )}
              </div>
            </div>
          </Col>

          {/* --- MAIN CONTENT --- */}
          <Col xs={24} lg={18}>
            <div className="mb-8 p-6 rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] bg-white">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <Title
                    level={2}
                    style={{ margin: 0, fontSize: "22px" }}
                    className="flex items-center gap-2"
                  >
                    <AppstoreOutlined className="text-indigo-600" />
                    {keyword
                      ? `Kết quả: "${keyword}"`
                      : categoryParam
                        ? categoryParam
                        : "Tất cả khóa học"}
                  </Title>
                  <Text type="secondary" className="text-gray-500 mt-1 block">
                    Hiển thị <b>{courses.length}</b> kết quả phù hợp nhất
                  </Text>
                </div>

                <div className="w-full md:w-96">
                  <Input.Search
                    placeholder="Tìm kiếm khóa học..."
                    onSearch={onSearchLocal}
                    defaultValue={keyword}
                    allowClear
                    enterButton={
                      <Button
                        type="primary"
                        className="bg-indigo-600 border-indigo-600 hover:!bg-indigo-500"
                      >
                        Tìm
                      </Button>
                    }
                    size="large"
                  />
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Spin size="large" tip="Đang tải..." />
              </div>
            ) : courses.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
                  {currentCourses.map((course, index) => (
                    <div key={course.maKhoaHoc || index} className="h-full">
                      <CourseCard course={course} />
                    </div>
                  ))}
                </div>

                <div className="mt-12 flex justify-center">
                  <Pagination
                    current={currentPage}
                    total={courses.length}
                    pageSize={pageSize}
                    onChange={(page) => setCurrentPage(page)}
                    showSizeChanger={false}
                    className="custom-pagination"
                  />
                </div>
              </>
            ) : (
              <div className="py-20 text-center border border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    <span className="text-gray-500">
                      Không tìm thấy khóa học nào
                    </span>
                  }
                />
                <Button type="link" onClick={clearFilters}>
                  Xem tất cả khóa học
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SearchPage;

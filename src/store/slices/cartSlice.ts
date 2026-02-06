import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Course } from "../../types/courseTypes";
import { message } from "antd";

interface CartState {
  cartItems: Course[];
}

// Lấy dữ liệu từ LocalStorage nếu có (để F5 không mất giỏ hàng)
const initialState: CartState = {
  cartItems: JSON.parse(localStorage.getItem("cart") || "[]"),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Course>) => {
      const course = action.payload;
      // Kiểm tra xem khóa học đã có trong giỏ chưa
      const index = state.cartItems.findIndex(
        (item) => item.maKhoaHoc === course.maKhoaHoc,
      );

      if (index === -1) {
        state.cartItems.push(course);
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
        message.success("Đã thêm vào giỏ hàng!");
      } else {
        message.warning("Khóa học này đã có trong giỏ hàng!");
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.maKhoaHoc !== action.payload,
      );
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
      message.success("Đã xóa khỏi giỏ hàng");
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

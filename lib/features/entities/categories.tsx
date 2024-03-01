import { Category } from "@/app/components/admin/AdminCategoryTable";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Category[] = [];
const categorySlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    categoriesFetched: (categories, action) => {
      categories.push(...action.payload);
      return categories;
    },
    categoryDeleted: (categories, action) => {
      const index = categories.indexOf(action.payload);
      categories.splice(index, 1);
    },
    categoryCreated: (categories, action) => {
      categories.push(action.payload);
    },
  },
});

export const { categoryDeleted, categoriesFetched, categoryCreated } =
  categorySlice.actions;
export default categorySlice.reducer;

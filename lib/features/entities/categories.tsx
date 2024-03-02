import { Category } from "@prisma/client";
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
    categoryUpdated: (categories, action) => {
      const search = (item: Category) => item.id == action.payload.id;
      const index = categories.findIndex(search);
      categories[index] = { ...action.payload.data };
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

export const {
  categoryDeleted,
  categoriesFetched,
  categoryCreated,
  categoryUpdated,
} = categorySlice.actions;
export default categorySlice.reducer;

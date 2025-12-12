import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/slices/themeSlice";

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.theme);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="px-4 py-2 rounded-lg border dark:bg-gray-800 dark:text-white"
    >
      {mode === "light" ? "Switch to Dark" : "Switch to Light"}
    </button>
  );
}

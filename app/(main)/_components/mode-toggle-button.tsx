import React, { useState } from "react";
import { useTheme } from "next-themes";

export const ModeToggleButton: React.FC = () => {
  const { setTheme, theme } = useTheme();
  const [isChecked, setIsChecked] = useState(theme === "light");

  const toggle = () => {
    setIsChecked((prev) => !prev);
    setTheme(isChecked ? "dark" : "light");
  };

  return (
    <div>
      <label className="toggle dark:border-0" htmlFor="switch">
        <input
          id="switch"
          className="input hidden"
          type="checkbox"
          checked={isChecked}
          onChange={toggle}
        />
        <div
          className={`w-8 icon icon--moon ${
            isChecked ? "animate-spin-slow" : " "
          }`}
        >
          {/* ... your moon SVG here */}
          <svg
            // className="animate-spin-slow"
            // xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 512 512"
            id="moon"
          >
            <g>
              <path
                fill="#6A6D68"
                d="M412.95,381.15c-8.05,10.119-16.94,19.33-26.55,27.54c-2.271,1.939-4.58,3.819-6.92,5.64   c-0.261,0.21-0.521,0.42-0.78,0.63c-0.09,0.07-0.19,0.13-0.28,0.2c-5.979,4.6-12.2,8.83-18.64,12.689   c-1.92,1.15-3.851,2.28-5.811,3.37c-18.14,10.061-37.819,17.221-58.42,21.16c-12.27,2.34-24.87,3.55-37.66,3.55   c-27.92,0-54.94-5.739-80.32-17.04c-7.74-3.46-15.3-7.43-22.47-11.81c-6.96-4.24-13.77-9-20.24-14.14   c-5.28-4.19-10.3-8.62-15.07-13.25c-1.3-1.261-2.57-2.54-3.82-3.83c-30.43-31.21-49.57-71.37-54.6-115.38   c-4.54-39.75,2.83-79.04,20.95-113.75c4.99-9.561,10.81-18.78,17.41-27.561c0.2-0.26,0.4-0.529,0.6-0.79   c0.9-1.18,1.81-2.359,2.74-3.529c37.77-47.521,94.29-74.78,155.07-74.78c45.101,0,87.641,14.87,123.021,42.99   c1.54,1.22,2.89,2.33,4.14,3.39c3.16,2.64,6.29,5.43,9.51,8.5c0.49,0.47,0.99,0.94,1.471,1.43c1.3,1.25,2.58,2.54,3.84,3.83   c32.41,33.351,51.979,77.011,55.31,123.75C458.97,293.51,443.88,342.23,412.95,381.15z"
                opacity=".9"
              ></path>
              <path
                fill="#A3AAA0"
                d="M408.95,377.15c-8.05,10.119-16.94,19.33-26.55,27.54c-2.271,1.939-4.58,3.819-6.92,5.64   c-0.261,0.21-0.521,0.42-0.78,0.63c-0.09,0.07-0.19,0.13-0.28,0.2c-5.979,4.6-12.2,8.83-18.64,12.689   c-1.92,1.15-3.851,2.28-5.811,3.37c-19.76,10.96-41.359,18.471-63.979,22.141c-10.51,1.699-21.23,2.569-32.101,2.569   c-27.92,0-54.94-5.739-80.32-17.04c-7.74-3.46-15.3-7.43-22.47-11.81c-6.96-4.24-13.77-9-20.24-14.14   c-5.21-4.141-10.17-8.511-14.89-13.08c-0.06-0.051-0.12-0.11-0.18-0.17c-32.64-31.721-53.18-73.381-58.42-119.21   c-4.54-39.75,2.83-79.04,20.95-113.75c4.99-9.561,10.81-18.78,17.41-27.561c1.09-1.449,2.2-2.89,3.34-4.319   c0.55-0.69,1.1-1.37,1.65-2.051c37.76-46.25,93.52-72.729,153.42-72.729c45.101,0,87.641,14.87,123.021,42.99   c1.54,1.22,2.89,2.33,4.14,3.39c3.16,2.64,6.29,5.43,9.51,8.5c1.811,1.72,3.58,3.48,5.311,5.26c0.05,0.061,0.11,0.11,0.16,0.17   c32.319,33.33,51.83,76.92,55.149,123.58C454.97,289.51,439.88,338.23,408.95,377.15z"
              ></path>
              <circle
                cx="285"
                cy="156"
                r="44.5"
                fill="#666865"
                stroke="#5E5E5D"
                stroke-miterlimit="10"
                stroke-width="4"
              ></circle>
              <circle
                cx="385"
                cy="300"
                r="21.5"
                fill="#666865"
                stroke="#5E5E5D"
                stroke-miterlimit="10"
                stroke-width="4"
              ></circle>
              <circle
                cx="166"
                cy="296.5"
                r="27.84"
                fill="#666865"
                stroke="#5E5E5D"
                stroke-miterlimit="10"
                stroke-width="4"
              ></circle>
              <circle
                cx="261.25"
                cy="272.75"
                r="14.75"
                fill="#666865"
                stroke="#5E5E5D"
                stroke-miterlimit="10"
                stroke-width="4"
              ></circle>
              <circle
                cx="151.5"
                cy="184"
                r="28"
                fill="#666865"
                stroke="#5E5E5D"
                stroke-miterlimit="10"
                stroke-width="4"
              ></circle>
              <circle
                cx="297.5"
                cy="382.501"
                r="27.5"
                fill="#666865"
                stroke="#5E5E5D"
                stroke-miterlimit="10"
                stroke-width="4"
              ></circle>
              <circle
                cx="395"
                cy="213"
                r="18.5"
                fill="#666865"
                stroke="#5E5E5D"
                stroke-miterlimit="10"
                stroke-width="4"
              ></circle>
              <circle
                cx="317"
                cy="216"
                r="8"
                fill="#666865"
                stroke="#5E5E5D"
                stroke-miterlimit="10"
                stroke-width="4"
              ></circle>
              <path
                fill="#666865"
                stroke="#5E5E5D"
                stroke-miterlimit="10"
                stroke-width="4"
                d="M299.55,450.38   c-12.27,2.34-24.87,3.55-37.66,3.55c-27.92,0-54.94-5.739-80.32-17.04c-7.74-3.46-15.3-7.43-22.47-11.81   c-6.96-4.24-13.77-9-20.24-14.14c-5.28-4.19-10.3-8.62-15.07-13.25c-1.3-1.261-2.57-2.54-3.82-3.83   c-0.06-0.051-0.12-0.11-0.18-0.17c-32.64-31.721-53.18-73.381-58.42-119.21c-4.54-39.75,2.83-79.04,20.95-113.75   c4.99-9.561,10.81-18.78,17.41-27.561c1.09-1.449,2.2-2.89,3.34-4.319c0.55-0.69,1.1-1.37,1.65-2.051   c-0.16,3.011-0.29,6.2-0.39,9.58c-2.39,79.15,12.97,253.43,185.661,310.98C293.12,448.41,296.31,449.42,299.55,450.38z"
                opacity=".2"
              ></path>
            </g>
          </svg>
        </div>
        <div
          className={`w-8 icon icon--sun ${
            isChecked ? "animate-spin-slow" : " "
          }`}
        >
          {/* ... your sun SVG here */}
          <svg
            width="30"
            height="30"
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            // xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            className="iconify iconify--emojione "
            preserveAspectRatio="xMidYMid meet"
            fill="#000000"
            transform="rotate(90)"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <g fill="#ffe62e">
                <path d="M20.5 59.7l7-7.2c-2.5-.5-4.8-1.5-6.9-2.9l-.1 10.1"></path>
                <path d="M43.5 4.3l-7 7.2c2.5.5 4.8 1.5 6.9 2.9l.1-10.1"></path>
                <path d="M4.3 43.5l10.1-.1C13 41.3 12 39 11.5 36.5l-7.2 7"></path>
                <path d="M59.7 20.5l-10.1.1c1.3 2.1 2.3 4.4 2.9 6.9l7.2-7"></path>
                <path d="M4.3 20.5l7.2 7c.5-2.5 1.5-4.8 2.9-6.9l-10.1-.1"></path>
                <path d="M59.7 43.5l-7.2-7c-.5 2.5-1.5 4.8-2.9 6.9l10.1.1"></path>
                <path d="M20.5 4.3l.1 10.1c2.1-1.3 4.4-2.3 6.9-2.9l-7-7.2"></path>
                <path d="M43.5 59.7l-.1-10.1C41.3 51 39 52 36.5 52.5l7 7.2"></path>
              </g>
              <g fill="#ffce31">
                <path d="M14.8 44l-4 9.3l9.3-4C18 47.8 16.2 46 14.8 44"></path>
                <path d="M49.2 20l4-9.3l-9.2 4c2 1.5 3.8 3.3 5.2 5.3"></path>
                <path d="M11.4 28.3L2 32l9.4 3.7c-.3-1.2-.4-2.4-.4-3.7s.1-2.5.4-3.7"></path>
                <path d="M52.6 35.7L62 32l-9.4-3.7c.2 1.2.4 2.5.4 3.7c0 1.3-.1 2.5-.4 3.7"></path>
                <path d="M20 14.8l-9.3-4l4 9.3c1.5-2.1 3.3-3.9 5.3-5.3"></path>
                <path d="M44 49.2l9.3 4l-4-9.3C47.8 46 46 47.8 44 49.2"></path>
                <path d="M35.7 11.4L32 2l-3.7 9.4c1.2-.2 2.5-.4 3.7-.4s2.5.1 3.7.4"></path>
                <path d="M28.3 52.6L32 62l3.7-9.4c-1.2.3-2.4.4-3.7.4s-2.5-.1-3.7-.4"></path>
                <circle cx="32" cy="32" r="19"></circle>
              </g>
            </g>
          </svg>
        </div>
      </label>
    </div>
  );
};

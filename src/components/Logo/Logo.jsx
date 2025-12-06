import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      {/* Logo Image */}
      <img
        src="/Digital Life Lessons-logo-transparent.png"
        alt="logo"
        className="h-9 w-auto sm:h-10"
      />

      {/* Text (hidden on very small screens) */}
      <div className="hidden sm:flex flex-col leading-tight">
        <h1 className="font-bold text-base sm:text-lg">
          Digital Life Lessons
        </h1>
        <p className="text-[10px] sm:text-xs text-gray-500">
          Store Your Wisdom. Grow Every Day.
        </p>
      </div>
    </div>
  );
};

export default Logo;
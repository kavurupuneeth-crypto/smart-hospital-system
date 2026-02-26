import React from 'react';

const SidebarIcon = ({ name, active }) => {
  return (
    <span
      className={`material-symbols-rounded text-[22px] transition-transform duration-200 ${
        active ? "text-white" : "text-gray-500"
      }`}
    >
      {name}
    </span>
  );
};

export default SidebarIcon;

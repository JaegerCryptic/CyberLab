import React, { useState } from 'react';

import '../../../theme/topbar.css';

export const TopBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // normal ass topbar that has a dropdown option
  return (
    <div className="topbar">
      <h2>Dashboard</h2>
      <div className="dropdown">
        <button onClick={toggleDropdown}>
        SCP Foundation
        </button>
        {dropdownOpen && (
          <div className="dropdown-menu">
            <p>SCP Foundation 1</p>
            <p>SCP Foundation 2</p>
            <p>SCP Foundation 3</p>
          </div>
        )}
      </div>
    </div>
  );
};

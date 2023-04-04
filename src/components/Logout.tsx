import React from 'react';

interface Props {
  onPressed: () => void;
}

const LogoutButton: React.FC<Props> = ({ onPressed }) => {
  return (
    <button
      className="flex items-center justify-center w-32 h-10 bg-gray-800 hover:bg-gray-700 text-white rounded-lg shadow-md focus:outline-none"
      onClick={onPressed}
    >
      <span className="text-sm font-medium">Logout</span>
    </button>
  );
};

export default LogoutButton;

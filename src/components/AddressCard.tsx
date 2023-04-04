import React from 'react';

interface Props {
  name: string;
  email: string;
  walletAddress: string;
}

const AddressCard: React.FC<Props> = ({ name, email, walletAddress }) => {
  const avatarUrl = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=monsterid&f=y';
  return (
    <div className="bg-opacity-50 backdrop-filter backdrop-blur-lg border border-gray-200 border-opacity-25 rounded-lg p-2 max-w-2xl w-full">
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-2">
          <img src={avatarUrl} alt="Avatar" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">{name}</h2>
          <p className="text-sm text-gray-300">{email}</p>
          <p className="text-xs text-gray-300">{walletAddress}</p>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;

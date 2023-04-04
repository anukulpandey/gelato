import React from 'react';

interface Props {
  walletAddress: string;
}

const AddressCard: React.FC<Props> = ({ walletAddress }) => {
  const avatarUrl = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=monsterid&f=y';
  return (
    <div className="card">
      <div className="avatar">
        <img src={avatarUrl} alt="Avatar" />
      </div>
      <div className="details">
        <div className="wallet-address">{walletAddress}</div>
      </div>
    </div>
  );
};

export default AddressCard;

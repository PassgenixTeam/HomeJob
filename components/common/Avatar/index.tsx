import clsx from 'clsx';
import React from 'react';

interface AvatarProps {
  avatar?: string;
  isOnline?: boolean;
  width?: number;
  height?: number;
}

const Avatar = ({
  avatar = 'https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA=',
  isOnline,
  height,
  width,
}: AvatarProps) => {
  return (
    <div className="w-fit">
      <div className="relative">
        <img
          className={clsx('rounded-full border', height ? `h-[${height}px]` : 'h-[80px]', width ? `w-[${width}px]` : 'w-[80px]')}
          src={avatar}
          alt=""
        />
        <div
          className={clsx(
            'rounded-full w-5 h-5 border-4 border-white absolute right-2 bottom-0',
            isOnline ? 'bg-green-500' : 'bg-gray-500'
          )}
        />
      </div>
    </div>
  );
};

export default Avatar;

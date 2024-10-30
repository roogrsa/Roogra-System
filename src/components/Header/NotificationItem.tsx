// NotificationItem.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface NotificationItemProps {
  title: string;
  description: string;
  date: string;
  to?: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
}) => (
  <li>
    <Link
      className="flex flex-col gap-2.5 border-t border-header-inputBorder px-4.5 py-3 hover:bg-secondaryBG-light dark:border-header-inputBorderdark dark:hover:bg-meta-4"
      to={'to'}
    >
      <div className="text-black dark:text-white">{notification.title}</div>{' '}
      <p className="text-sm">{notification.description}</p>
      <p className="text-xs flex justify-between text-TextBlue dark:text-TextGreen">
        {notification.date}
        <span className="text-xs"> name</span>
      </p>
    </Link>
  </li>
);

export default NotificationItem;

import orderIcon from '@/client/common/assets/order-icon.svg';
import profileIcon from '@/client/common/assets/profile-icon.svg';
import orderActiveIcon from '@/client/common/assets/order-active-icon.svg';
import profileActiveIcon from '@/client/common/assets/profile-active-icon.svg';
import { CalendarItemStatus } from '@/service/types';

export const PAGE_ROUTE_URL = {
  login: '/login',
  profile: '/profile',
  index: '/',
};

export const SIDE_MENUS = [
  {
    label: '点餐',
    url: PAGE_ROUTE_URL.index,
    icon: {
      default: orderIcon,
      active: orderActiveIcon,
    },
  },
  {
    label: '我的',
    url: PAGE_ROUTE_URL.profile,
    icon: {
      default: profileIcon,
      active: profileActiveIcon,
    },
  },
];

export const statusTextMap = {
  [CalendarItemStatus.available]: '可点单',
  [CalendarItemStatus.notYet]: '未开放',
  [CalendarItemStatus.order]: '已收单',
  [CalendarItemStatus.closed]: '已关闭',
};

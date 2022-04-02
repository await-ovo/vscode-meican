import orderIcon from '@/client/common/assets/order-icon.svg';
import profileIcon from '@/client/common/assets/profile-icon.svg';
import orderActiveIcon from '@/client/common/assets/order-active-icon.svg';
import profileActiveIcon from '@/client/common/assets/profile-active-icon.svg';

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
    active: true,
  },
  {
    label: '我的',
    url: PAGE_ROUTE_URL.profile,
    icon: {
      default: profileIcon,
      active: profileActiveIcon,
    },
    active: false,
  },
];

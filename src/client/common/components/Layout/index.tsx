import { Outlet, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import MenuItem from '../MenuItem';
import { SIDE_MENUS, removeTrailingSlash } from '../../utils';
import logo from '@/client/common/assets/logo.svg';

const findActiveMenu = (pathname: string) =>
  SIDE_MENUS.find(
    ({ url }) => removeTrailingSlash(url) === removeTrailingSlash(pathname),
  );

const Layout = () => {
  const { pathname } = useLocation();

  const activeMenu = findActiveMenu(pathname);

  return (
    <div className="xl:container flex">
      {activeMenu && (
        <div className="flex flex-col items-center w-20 h-screen py-6 bg-slate-800">
          <img src={logo} className="w-12 h-12" />

          <div className="w-20 flex flex-1 flex-col  mt-6">
            {SIDE_MENUS.map(({ url, label, icon, active }) => (
              <MenuItem
                label={label}
                url={url}
                icon={icon}
                active={activeMenu.url === url}
                key={url}
              />
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

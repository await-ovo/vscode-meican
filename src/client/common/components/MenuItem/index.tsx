import cls from 'classnames';
import { history } from '@/common/history';

type MenuItemProps = {
  active: boolean;
  icon: {
    active: string;
    default: string;
  };
  label: string;
  url: string;
};

const MenuItem = ({ icon, active, label, url }: MenuItemProps) => {
  return (
    <div
      className="flex flex-col justify-center cursor-pointer items-center mb-8"
      onClick={() => history.push(url)}>
      <img className="w-5 h-5" src={active ? icon.active : icon.default} />
      <span
        className={cls('text-xs mt-2', {
          'text-yellow-100': active,
        })}>
        {label}
      </span>
    </div>
  );
};

export default MenuItem;

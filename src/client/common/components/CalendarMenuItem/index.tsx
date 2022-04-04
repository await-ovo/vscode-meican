import cls from 'classnames';
import { CalendarItem, CalendarItemStatus } from '@/service/types';
import rightArrowIcon from '@/client/common/assets/right-arrow.svg';

type CalendarMenuItemProps = {
  info: CalendarItem;
  active: boolean;
  onSelect: (v: CalendarItem) => void;
};

const CalendarMenuItem = ({
  info,
  active,
  onSelect,
}: CalendarMenuItemProps) => {
  return (
    <div
      className={cls(
        'flex items-center p-6 justify-between cursor-pointer hover:bg-slate-500 text-zinc-500',
        {
          'bg-slate-500': active,
        },
      )}
      onClick={() => {
        onSelect(info);
      }}>
      <div className="flex flex-col">
        <span className="text-3xl font-bold mb-2.5">
          {info.openingTime.postboxOpenTime}
        </span>
        <span className="text-sm">{info.title}</span>
      </div>
      <div className="flex items-center">
        <span
          className={cls('text-xs mr-2.5', {
            'text-yellow-100':
              info.corpOrderUser ||
              info.status === CalendarItemStatus.available,
          })}>
          {info.corpOrderUser
            ? '已下单'
            : info.status === CalendarItemStatus.available
            ? '可点单'
            : '已关闭'}
        </span>
        <img src={rightArrowIcon} className="h-3 w-3" />
      </div>
    </div>
  );
};

export default CalendarMenuItem;

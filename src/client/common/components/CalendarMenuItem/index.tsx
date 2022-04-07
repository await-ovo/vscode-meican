import cls from 'classnames';
import { statusTextlMap } from '../../utils';
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
        'flex items-center p-6 justify-between cursor-pointer hover:bg-slate-500 text-stone-200',
        {
          'bg-slate-500': active,
        },
      )}
      onClick={() => {
        onSelect(info);
      }}>
      <div className="flex flex-col">
        <span
          className={cls('text-3xl font-bold mb-2.5', {
            'text-yellow-100': info.status === CalendarItemStatus.available,
          })}>
          {info.openingTime.postboxOpenTime}
        </span>
        <span className="text-sm">{info.title}</span>
      </div>
      <div className="flex items-center">
        <span
          className={cls('text-xs mr-2.5', {
            'text-yellow-100':
              info.status === CalendarItemStatus.order ||
              info.status === CalendarItemStatus.available,
          })}>
          {statusTextlMap[info.status]}
        </span>
        <img src={rightArrowIcon} className="h-3 w-3" />
      </div>
    </div>
  );
};

export default CalendarMenuItem;

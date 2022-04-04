import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import type { CalendarItem } from '@/service/types';
import { getCalendarItems } from '@/client/common/api';
import { CalendarItemStatus } from '@/service/types';
import CalendarMenuItem from '@/client/common/components/CalendarMenuItem';
import Dishes from '@/client/common/components/Dishes';
import OrderDetail from '@/client/common/components/OrderDetail';

const Home = () => {
  const [calendarItems, setCalendarItems] = useState<Array<CalendarItem>>([]);

  const [activeCalenderItem, setActiveCalendarItem] = useState<
    CalendarItem | undefined
  >(undefined);

  const currentDate = dayjs(new Date().getTime()).format('YYYY-MM-DD');

  useEffect(() => {
    const fetchCalenderItems = async () => {
      const { data, success, message } = await getCalendarItems({
        beginDate: currentDate,
        endDate: currentDate,
      });

      if (!success) {
        toast.error(message);
      }

      console.log(`data --->`, data);

      const items = data?.dateList?.[0].calendarItemList;

      if (items) {
        setCalendarItems(items);

        setActiveCalendarItem(
          items.find(item => (item.status = CalendarItemStatus.available)),
        );
      }
    };

    fetchCalenderItems();
  }, []);

  return (
    <div className="flex w-full">
      <div className="bg-slate-700 w-96">
        <p className="text-lg flex items-center justify-center py-0 px-0 h-16">
          美餐 - <span className="text-yellow-100">{currentDate}</span>
        </p>
        <div className="">
          {calendarItems.map(item => (
            <CalendarMenuItem
              key={item?.userTab.uniqueId}
              info={item}
              onSelect={selected => setActiveCalendarItem(selected)}
              active={
                activeCalenderItem?.userTab.uniqueId === item.userTab.uniqueId
              }
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col flex-1 bg-slate-600">
        <p className="text-base text-yellow-100 py-0 px-0 h-16 flex items-center justify-center bg-slate-800">
          快捷点餐
        </p>
        <div className="flex-1 bg-slate-600">
          <span>empty</span>
        </div>
      </div>
    </div>
  );
};

export default Home;

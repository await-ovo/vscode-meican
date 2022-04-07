import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import type { CalendarItem } from '@/service/types';
import { getCalendarItems } from '@/client/common/api';
import { CalendarItemStatus } from '@/service/types';
import CalendarMenuItem from '@/client/common/components/CalendarMenuItem';
import Dishes from '@/client/common/components/Dishes';
import OrderDetail from '@/client/common/components/OrderDetail';
import Empty from '@/client/common/components/Empty';

const Home = () => {
  const [calendarItems, setCalendarItems] = useState<Array<CalendarItem>>([]);
  const [loading, setLoading] = useState(false);

  const [activeCalendarItem, setActiveCalendarItem] = useState<
    CalendarItem | undefined
  >(undefined);

  const currentDate = dayjs(new Date().getTime()).format('YYYY-MM-DD');

  useEffect(() => {
    const fetchCalendarItems = async () => {
      setLoading(true);

      const { data, success } = await getCalendarItems({
        beginDate: currentDate,
        endDate: currentDate,
      });

      setLoading(false);

      console.log(`data --->`, data);

      if (success) {
        const items = data?.dateList?.[0].calendarItemList;

        if (items) {
          setCalendarItems(items);

          setActiveCalendarItem(items[0]);
        }
      }
    };

    fetchCalendarItems();
  }, [currentDate]);

  return (
    <div className="flex w-full">
      <div className="bg-slate-700 w-96">
        <p className="text-lg flex items-center justify-center py-0 px-0 h-16 border-b-1 border-zinc-800">
          美餐 - {currentDate}
        </p>
        <div>
          {calendarItems.map(item => (
            <CalendarMenuItem
              key={item?.userTab.uniqueId}
              info={item}
              onSelect={selected => setActiveCalendarItem(selected)}
              active={
                activeCalendarItem?.userTab.uniqueId === item.userTab.uniqueId
              }
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col flex-1 bg-slate-600 transform-gpu">
        <p className="text-base  py-0 px-0 h-16 flex items-center justify-center bg-slate-800 flex-shrink-0">
          快捷点餐
        </p>
        <div className="flex-1 bg-slate-600 flex justify-center overflow-y-scroll">
          {loading ? (
            <p>loading</p>
          ) : !activeCalendarItem ? (
            <Empty />
          ) : activeCalendarItem.corpOrderUser ? (
            <OrderDetail
              uniqueId={activeCalendarItem.corpOrderUser.uniqueId}
              restaurantItemList={
                activeCalendarItem.corpOrderUser.restaurantItemList
              }
            />
          ) : activeCalendarItem.status !== CalendarItemStatus.available ? (
            <Empty />
          ) : (
            <Dishes
              tabUniqueId={activeCalendarItem.userTab.uniqueId}
              targetTime={dayjs(activeCalendarItem.targetTime).format(
                `YYYY-MM-DD+HH:mm`,
              )}
              showPrice={activeCalendarItem.userTab.corp.showPrice}
              addressList={activeCalendarItem.userTab.corp.addressList}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

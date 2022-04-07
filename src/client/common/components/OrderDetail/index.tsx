import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { getOrderDetail } from '../../api';
import { parseDishName } from '../../utils';
import type { RestaurantItem, OrderInfo } from '@/service/types';

type OrderDetailProps = {
  restaurantItemList: RestaurantItem[];
  uniqueId: string;
};

const Divider = () => (
  <div className="w-full border-b-1 border-solid border-slate-700" />
);

const OrderDetail = ({ uniqueId, restaurantItemList }: OrderDetailProps) => {
  const [orderInfo, setOrderInfo] = useState<OrderInfo>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInfo = async () => {
      setLoading(true);

      try {
        console.log(`sending ---->`);
        const { data, success } = await getOrderDetail({
          uniqueId,
        });

        setLoading(false);

        console.log(`order detail data -->`, data, success);

        if (success) {
          setOrderInfo(data);
        }
      } catch (err) {
        console.log(`fuck error -->`, err);
      }
    };

    fetchInfo();
  }, [uniqueId]);

  return (
    <div className="w-96 h-full pt-10">
      <p className="text-lg font-extralight h-11 flex items-center">ORDER</p>
      <Divider />
      <div>
        {restaurantItemList.map(restaurant =>
          restaurant.dishItemList.map(item => {
            const { name, desc } = parseDishName(item.dish.name);
            return (
              <div
                key={item.dish.name}
                className="flex justify-between items-center">
                <div className="flex flex-col py-4">
                  <p className="text-sm">{name}</p>
                  <p className="text-xs text-stone-500">{desc}</p>
                </div>
                <p className="font-medium">{item.count} 份</p>
              </div>
            );
          }),
        )}
      </div>
      <Divider />
      <div className="w-full">
        {loading ? (
          <p>loading progress</p>
        ) : (
          <>
            <div className="p-5 flex items-center">
              <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-lg bg-slate-500 text-base font-medium mr-4">
                {orderInfo?.corpAddress?.corpAddressCode}
              </div>
              <div className="break-words leading-5">
                {orderInfo?.pickUpMessage}
              </div>
            </div>
            <Divider />
            <p className="text-stone-500 text-xs pt-10 pb-5 text-center">
              {new Date().toString().split(' ').slice(0, 3).join(' ')}
            </p>
            <div>
              {orderInfo?.progressList?.map(item => (
                <div
                  key={item.timestamp}
                  className="text-stone-500 text-xs h-5 flex items-center mb-3">
                  <span className="px-3 rounded text-center bg-slate-500 mr-4">
                    {dayjs(item.timestamp).format('HH:mm:ss')}
                  </span>
                  <span>{item.activity}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;

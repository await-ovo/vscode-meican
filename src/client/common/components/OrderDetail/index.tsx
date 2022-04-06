import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { getOrderDetail } from '../../api';
import type { RestaurantItem, OrderInfo } from '@/service/types';

type OrderDetailProps = {
  restaurantItemList: RestaurantItem[];
  uniqueId: string;
};

const Divider = () => (
  <div className="w-full border-b-1 border-solid border-slate-800" />
);

const parseDishName = (dishName: string) => {
  const matched = dishName.match(/(.+)\((.+)\)/) || [];

  return {
    name: matched[1],
    desc: matched[2],
  };
};

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
  }, []);

  return (
    <div>
      <p>Order</p>
      <Divider />
      <div>
        {restaurantItemList.map(restaurant =>
          restaurant.dishItemList.map(item => {
            const { name, desc } = parseDishName(item.dish.name);
            return (
              <div key={item.dish.name}>
                <div>
                  <p>{name}</p>
                  <p>{desc}</p>
                </div>
                <p>{item.count} 份</p>
              </div>
            );
          }),
        )}
        {orderInfo?.warning && (
          <p
            style={{
              backgroundColor: `#${orderInfo.warning.backgroundColorCode}`,
              color: `#${orderInfo.warning.textColorCode}`,
            }}>
            {orderInfo.warning.text}
          </p>
        )}
      </div>
      <Divider />
      <div>
        {loading ? (
          <p>loading progress</p>
        ) : (
          <>
            <div>
              <div>{orderInfo?.corpAddress?.corpAddressCode}</div>
              <div>{orderInfo?.pickUpMessage}</div>
            </div>
            <Divider />
            <p>{new Date().toString().split(' ').slice(0, 3).join(' ')}</p>
            <div>
              {orderInfo?.progressList?.map(item => (
                <div key={item.timestamp}>
                  <span>{dayjs(item.timestamp).format('HH:mm:ss')}</span>
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

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import DishItem from './DishItem';
import SelectAddress from '../SelectAddress';
import { vscode } from '../../utils';
import { useRequest } from '../../utils/useRequest';
import Loading from '../Loading';
import type {
  Address,
  Dish,
  DishesRequestMessage,
  DishesResponse,
} from '@/service/types';
import { MessageType } from '@/service/types';
import { addOrder } from '@/client/common/api';
import { getDishes } from '@/client/common/api/getDishes';
import bowlIcon from '@/client/common/assets/bowl-icon.svg';

type DishesProps = {
  tabUniqueId: string;
  targetTime: string;
  showPrice: boolean;
  addressList: Address[];
};

const Dishes = ({
  tabUniqueId,
  targetTime,
  showPrice,
  addressList,
}: DishesProps) => {
  const [restaurantDishes, setRestaurantDishes] = useState<
    Record<string, Dish[]>
  >({});
  const [activeDish, setActiveDish] = useState<Dish>();
  const [selectAddressVisible, setSelectAddressVisible] = useState(false);

  const handleOrder = async (address: Address) => {
    console.log(`提交订单--->`, address);
    // const { success } = await addOrder({
    //   addressUniqueId: address.uniqueId,
    //   targetTime: dayjs(targetTime).format('YYYY-MM-DD HH:mm'),
    //   dishId: activeDish!.id,
    //   tabUniqueId,
    // });
    await vscode.postMessage({
      type: MessageType.refresh,
    });

    setSelectAddressVisible(false);

    // if (success) {
    //   // TODO: 点单成功
    //
    // }
  };

  const { data: dishesRes, loading } = useRequest<
    DishesRequestMessage['params'],
    DishesResponse
  >(
    getDishes,
    {
      tabUniqueId,
      targetTime,
    },
    `${tabUniqueId}-${targetTime}`,
  );

  useEffect(() => {
    setRestaurantDishes(
      (dishesRes?.othersRegularDishList ?? []).reduce<Record<string, Dish[]>>(
        (
          memo: { [x: string]: any[] },
          current: { restaurant: { name: any } },
        ) => {
          const { name: restaurantName } = current.restaurant;
          if (memo[restaurantName]) {
            memo[restaurantName].push(current);
          } else {
            memo[restaurantName] = [current];
          }
          return memo;
        },
        {},
      ),
    );
  }, [dishesRes]);

  return (
    <div className="w-96  pt-10">
      {loading ? (
        <Loading />
      ) : (
        Object.keys(restaurantDishes).map(restaurantName => (
          <div className="w-full mb-8" key={restaurantName}>
            <p className="mb-8 font-sm w-full text-center">{restaurantName}</p>
            {restaurantDishes[restaurantName].map(dish => (
              <DishItem
                showPrice={showPrice}
                dish={dish}
                key={dish.id}
                active={activeDish?.id === dish.id}
                onSelect={v => setActiveDish(v)}
              />
            ))}
          </div>
        ))
      )}
      {activeDish && (
        <div className="w-full bg-slate-800 fixed right-0 bottom-0 h-20 flex items-center justify-between px-8">
          <div className="flex items-center">
            <img src={bowlIcon} className="w-7 h-7 mr-4" />
            <span>x 1</span>
          </div>
          <p
            className="text-yellow-100 text-medium text-lg cursor-pointer"
            onClick={() => setSelectAddressVisible(true)}>
            下单
          </p>
        </div>
      )}
      <SelectAddress
        addressList={addressList}
        visible={selectAddressVisible}
        onClose={() => setSelectAddressVisible(false)}
        onOrder={address => handleOrder(address)}
      />
    </div>
  );
};

export default Dishes;

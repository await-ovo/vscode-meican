import { useEffect, useState } from 'react';
import type { Dish } from '@/service/types';
import { getDishes } from '@/client/common/api/getDishes';

type DishesProps = {
  tabUniqueId: string;
  targetTime: string;
};

const Dishes = ({ tabUniqueId, targetTime }: DishesProps) => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  useEffect(() => {
    const fetchDishes = async () => {
      const { data, success } = await getDishes({
        tabUniqueId,
        targetTime,
      });

      if (success) {
        console.log(`dishes --->`, data?.othersRegularDishList ?? []);
        setDishes(data?.othersRegularDishList ?? []);
      }
    };

    fetchDishes();
  }, []);
  return (
    <div>
      <p>dishes</p>
    </div>
  );
};

export default Dishes;

import cls from 'classnames';
import { parseDishName } from '../../utils';
import type { Dish } from '@/service/types';

type DishItemProps = {
  dish: Dish;
  showPrice: boolean;
  active: boolean;
  onSelect: (v: Dish) => void;
};

const DishItem = ({ dish, showPrice, active, onSelect }: DishItemProps) => {
  const { name, desc } = parseDishName(dish.name);
  return (
    <div
      className={cls(
        'flex items-center justify-between py-12px cursor-pointer rounded-lg mb-1 px-4',
        {
          'text-zinc-50': active,
          'bg-yellow-100': active,
          'hover:bg-slate-500': !active,
        },
      )}
      onClick={() => onSelect(dish)}>
      <div className="flex flex-col">
        <span>{name}</span>
        <span
          className={cls('text-stone-500 text-xs', {
            'text-zinc-50': active,
          })}>
          {desc}
        </span>
      </div>
      {active ? (
        <div className="flex items-center">
          <span>**</span>
          <span className="bg-zinc-50 rounded-xl text-yellow-100 p-0.5 ml-6 w-6 flex items-center justify-center">
            1
          </span>
        </div>
      ) : (
        <>
          <div className="border-b-1 border-dotted w-20" />
          <span>{showPrice ? dish.priceString : '**'}</span>
        </>
      )}
    </div>
  );
};

export default DishItem;

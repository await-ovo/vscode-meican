import emptyIcon from '@/client/common/assets/empty.svg';

const Empty = () => (
  <div className="flex flex-col items-center">
    <img src={emptyIcon} />
    <p className="text-base text-stone-500 mt-8">暂无可用餐厅</p>
  </div>
);

export default Empty;

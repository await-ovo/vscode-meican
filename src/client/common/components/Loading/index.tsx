import { Triangle } from 'react-loader-spinner';

const Loading = () => (
  <div className="w-full flex justify-center pt-8">
    <Triangle
      ariaLabel="loading-indicator"
      color="#e5e7eb"
      height={46}
      width={46}
    />
  </div>
);

export default Loading;

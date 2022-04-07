import ReactModal from 'react-modal';
import { useState } from 'react';
import cls from 'classnames';
import type { Address } from '@/service/types';

type SelectAddressProps = {
  visible: boolean;
  onClose: () => void;
  onOrder: (address: Address) => void;
  addressList: Address[];
};

const SelectAddress = ({
  visible,
  onClose,
  addressList,
  onOrder,
}: SelectAddressProps) => {
  const [activeAddress, setActiveAddress] = useState<Address>(addressList[0]);
  return (
    <ReactModal
      isOpen={visible}
      ariaHideApp={false}
      style={{
        overlay: {
          opacity: 0.9,
          background: 'rgba(0,0,0,0.6)',
        },
        content: {
          background: '#393939',
          border: 'none',
          width: 600,
          height: 600,
          overflowY: 'scroll',
          top: '50%',
          left: '50%',
          transform: 'translate3d(-50%, -50%, 0)',
        },
      }}
      onRequestClose={onClose}>
      <div className="w-full flex justify-center">
        <div className="flex flex-col items-center pt-4 text-zinc-200 w-96">
          <p className="text-lg pb-8">请选择地址</p>
          {addressList.map(address => (
            <div
              key={address.uniqueId}
              className={cls(
                'flex items-center px-4 overflow-ellipsis mb-4 border-b-1 border-slate-700 h-14 rounded-lg cursor-pointer',
                {
                  'bg-yellow-100': activeAddress?.uniqueId === address.uniqueId,
                  'hover:bg-slate-800':
                    activeAddress?.uniqueId !== address.uniqueId,
                },
              )}
              onClick={() => setActiveAddress(address)}>
              {address.pickUpLocation || address.address}
            </div>
          ))}
          <div
            className="text-yellow-100 text-medium text-lg cursor-pointer mt-6"
            onClick={() => onOrder(activeAddress)}>
            下单
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default SelectAddress;

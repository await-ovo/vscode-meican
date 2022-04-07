import { AccountResponse } from '@/service/account';
import { getAccount } from '@/client/common/api';
import Loading from '@/client/common/components/Loading';
import { useRequest } from '@/client/common/utils/useRequest';

const Profile = () => {
  const { data: accountInfo, loading } = useRequest<never, AccountResponse>(
    getAccount,
  );

  return (
    <div className="w-full flex justify-center bg-slate-600">
      <div className="w-96 flex flex-col">
        <p className="h-24 flex items-center justify-center text-lg border-b-1 border-slate-700">
          账号信息
        </p>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="h-14 flex items-center justify-between px-4 border-b-1 border-slate-700">
              <span>邮箱</span>
              <span className="text-stone-500">{accountInfo?.email}</span>
            </div>
            <div className="h-14 flex items-center justify-between px-4 border-b-1 border-slate-700">
              <span>手机号</span>
              <span className="text-stone-500">
                {accountInfo?.mobileAccount?.mobileNumber ?? '未填写'}
              </span>
            </div>
            <div className="h-14 flex items-center justify-between px-4 border-b-1 border-slate-700">
              <span>用户编号</span>
              <span className="text-stone-500">
                {accountInfo?.userUniqueNumber}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;

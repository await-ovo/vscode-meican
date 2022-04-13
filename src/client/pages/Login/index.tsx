import { useState } from 'react';
import { toast } from 'react-toastify';
import logo from '@/client/common/assets/logo.svg';
import { login } from '@/client/common/api';
import { history } from '@/common/history';
import { PAGE_ROUTE_URL } from '@/client/common/utils';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!name.trim().length || !password.trim().length) {
      toast.warn('Email 或 Password 不能为空');
      return;
    }

    setLoading(true);

    const res = await login({
      username: name.trim(),
      password: password.trim(),
    });

    const { success } = res;

    setLoading(false);

    if (success) {
      history.push(PAGE_ROUTE_URL.index);
    }
  };

  return (
    <div className="flex-1 flex justify-center py-32 bg-white">
      <div className="max-w-md w-full">
        <div>
          <img className="mx-auto h-12 w-auto" src={logo} alt="Workflow" />
        </div>
        <div className="mt-8">
          <div className="rounded-md shadow-sm">
            <div>
              <input
                id="name"
                name="name"
                type="name"
                autoComplete="email"
                required
                value={name}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-zinc-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email / 手机号"
                onChange={e => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="mt-8">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-zinc-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="密码"
                onChange={e => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
          <button
            type="button"
            disabled={loading}
            className="group mt-8 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleLogin}>
            {loading && (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            )}
            登录
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

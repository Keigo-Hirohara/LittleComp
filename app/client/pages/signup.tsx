import Link from 'next/link';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { UserPlus } from 'react-feather';
import 'react-toastify/dist/ReactToastify.css';
import { NextRouter, useRouter } from 'next/router';
import { useUser } from '../hooks/useUser';

const Signup: NextPage = () => {
  const { getUser, signUp, cookies } = useUser();
  const router: NextRouter = useRouter();
  const [emailInput, setEmailInput] = useState<string>('');
  const [usernameInput, setUsernameInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  useEffect(() => {
    if (getUser.data?.getUser) {
      router.push('/');
    }
  }, [getUser, router]);

  return (
    <div className="lerative min-h-screen bg-green3">
      <UserPlus
        strokeWidth={1}
        className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128"
      />
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          if (!usernameInput) {
            console.log('ユーザーネームを入力してください');
            toast.error('ユーザーネームを入力してください');
            return;
          }
          if (!emailInput) {
            console.log('Eメールを入力してください');
            toast.error('Eメールを入力してください');
            return;
          }
          if (!passwordInput) {
            console.log('パスワードを設定してください');
            toast.error('パスワードを設定してください');
            return;
          }
          const response = await signUp({
            email: emailInput,
            username: usernameInput,
            password: passwordInput,
          });
          cookies.set('token', response.data.signUp.token);
          router.push('/');
        }}
        action=""
        className="flex flex-col items-center ml-auto min-h-screen w-1/2 h-256 bg-white"
      >
        <div className="basis-1/6 mt-80 w-3/5">
          <h1 className="text-4xl">新規登録</h1>
        </div>
        <div className="flex flex-col justify-center w-3/5 basis-20">
          <div>
            <h2>ユーザーネーム</h2>
          </div>
          <input
            type="text"
            className="h-40 border-solid border border-black3 rounded-md p-5"
            onChange={(event) => setUsernameInput(event.target.value)}
          />
        </div>
        <div className="flex flex-col justify-center w-3/5 basis-20">
          <div>
            <h2>Eメール</h2>
          </div>
          <input
            type="text"
            className="h-40 border-solid border border-black3 rounded-md p-5"
            onChange={(event) => setEmailInput(event.target.value)}
          />
        </div>
        <div className="flex flex-col justify-center w-3/5 basis-20">
          <div>
            <h2>パスワード</h2>
          </div>
          <input
            type="password"
            className="h-40 border-solid border border-black3 rounded-md p-5"
            onChange={(event) => setPasswordInput(event.target.value)}
          />
        </div>
        <button className="mt-38 text-2xl w-3/5 h-45 bg-green1 text-white rounded-xl">
          新規登録
        </button>
        <Link href="/signin">
          <a className="mt-32 hover:bg-blue3 p-13 rounded-md">またはログイン</a>
        </Link>
      </form>
    </div>
  );
};

export default Signup;

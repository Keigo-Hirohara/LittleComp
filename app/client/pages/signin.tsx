import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { UserCheck } from 'react-feather';
import { useUser } from '../hooks/useUser';

const Signin = () => {
  const { signIn, cookies, getUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (getUser.data && cookies.get('token')) {
      router.push('/');
    }
  }, [getUser]);
  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  return (
    <div className="lerative min-h-screen bg-blue3">
      <UserCheck
        strokeWidth={1}
        className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128"
      />
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          // Todo: add error handling when input is empty
          const response = await signIn({
            email: emailInput,
            password: passwordInput,
          });
          cookies.set('token', response.data.signIn.token);
          // getUser.refetch();
          router.push('/');
        }}
        action=""
        className="flex flex-col items-center ml-auto min-h-screen w-1/2 h-256 bg-white"
      >
        <div className="basis-1/6 mt-80 w-3/5">
          <h1 className="text-4xl">ログイン</h1>
        </div>
        <div className="flex flex-col justify-center w-3/5 mb-13">
          <div>
            <h2>Eメール</h2>
          </div>
          <input
            type="text"
            className="h-40 border-solid border border-black3 rounded-md p-5"
            onChange={(event) => {
              setEmailInput(event.target.value);
            }}
          />
        </div>
        <div className="flex flex-col justify-center w-3/5">
          <div className="">
            <h2 className="">パスワード</h2>
          </div>
          <input
            type="password"
            className="h-40 border-solid border border-black3 rounded-md p-5"
            onChange={(event) => {
              setPasswordInput(event.target.value);
            }}
          />
        </div>
        <button className="mt-38 text-2xl w-3/5 h-45 bg-blue1 text-white rounded-xl">
          ログイン
        </button>
        <Link href="/signup">
          <a className="mt-32 hover:bg-green3 p-13 rounded-md">
            初めてご利用の方へ
          </a>
        </Link>
      </form>
    </div>
  );
};

export default Signin;

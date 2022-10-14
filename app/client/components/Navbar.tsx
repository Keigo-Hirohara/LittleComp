import { useRouter } from 'next/router';
import { useUser } from '../hooks/useUser';
const Navbar = (): JSX.Element => {
  const router = useRouter();
  const { getUser, cookies } = useUser();

  return (
    <div className="flex items-center h-40 border-solid border-b border-black3">
      <h1 className="ml-8 text-2xl">LittleComp</h1>
      {getUser.data?.getUser && (
        <>
          <h1 className="ml-auto">
            お疲れ様です{getUser.data.getUser.username}
            さん！できることから少しずつ進んでいきましょう
          </h1>
          <button
            className="mr-13 ml-auto px-32 border border-black3 rounded-md"
            onClick={() => {
              cookies.remove('token');
              getUser.refetch();
              router.push('/signin');
            }}
          >
            ログアウト
          </button>
        </>
      )}
    </div>
  );
};

export default Navbar;

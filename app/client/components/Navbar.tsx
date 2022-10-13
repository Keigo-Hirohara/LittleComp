import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUser } from '../hooks/useUser';
const Navbar = (): JSX.Element => {
  const router = useRouter();
  const { getUser, cookies } = useUser();
  const [shouldShowUser, setShouldShowUser] = useState(false);
  const [username, setUsername] = useState<string | null>('');
  useEffect(() => {
    if (getUser.error) {
      setShouldShowUser(false);
      return;
    }
    if (!getUser.data?.getUser) {
      return;
    }
    setShouldShowUser(true);
    setUsername(getUser.data?.getUser.username);
  }, [getUser]);
  return (
    <div className="flex items-center h-40 border-solid border-b border-black3">
      <h1 className="ml-8 text-2xl">LittleComp</h1>
      {shouldShowUser && (
        <>
          <h1 className="ml-auto">
            お疲れ様です{username}
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

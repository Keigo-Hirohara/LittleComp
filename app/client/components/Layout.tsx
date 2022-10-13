import { Layout } from '../types/Layout';
import Navbar from './Navbar';

const Layout = ({ children }: Layout): JSX.Element => {
  return (
    <>
      <Navbar />
      <div className="">{children}</div>
    </>
  );
};

export default Layout;

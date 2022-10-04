import { LayoutArgsType } from '../types/LayoutArgsType';
import Navbar from './Navbar';

const Layout = ({ children }: LayoutArgsType): JSX.Element => {
  return (
    <>
      <Navbar />
      <div className="">{children}</div>
    </>
  );
};

export default Layout;

import { useDispatch } from "react-redux";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Preloader from "../components/shared/Preloader/Preloader";
import ErrorMsg from "../components/shared/ErrorMsg/ErrorMsg";

import { useAppSelector } from "../redux/hooks";
import { setError } from "../redux/slices/weatherSlice";

import styles from "./layout.module.scss";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = useDispatch();

  const { isLoading, error } = useAppSelector((state) => state.general);

  return (
    <>
      {isLoading && <Preloader />}
      <div className={styles.layout_wrapper}>
        <Header />
        <main className={styles.content}>{children}</main>
        <Footer />
      </div>
      {error && (
        <ErrorMsg
          error={error}
          showModal={!!error}
          closeModal={() => dispatch(setError(""))}
        />
      )}
    </>
  );
};

export default Layout;

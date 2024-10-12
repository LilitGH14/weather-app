import logo from '../../assets/images/logo/logo.png'
import HeaderSearchBar from '../../components/core/headerSearchBar/HeaderSearchBar'

import styles from './header.module.scss'

const Header = () => {
  return (
    <header className={styles.header_wrapper}>
      <div className={styles.container}>
        <div className={styles.logo_container}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </div>
        <div className={styles.search_container}>
          <HeaderSearchBar />
        </div>
      </div>
    </header>
  )
}

export default Header

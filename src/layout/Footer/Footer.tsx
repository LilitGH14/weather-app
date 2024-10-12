import styles from './footer.module.scss'

const Footer = () => {
  const year: number = new Date().getFullYear()

  return (
    <footer className={styles.footer_wrapper}>
      <div className={styles.content}>
        <p className={styles.text}>All rights reserved</p>
        <p className={styles.text}>©</p>
        <p className={styles.text}>{year}</p>
      </div>
    </footer>
  )
}

export default Footer

import searchImg from '../../../assets/images/svg/search.svg'

import styles from './searchBar.module.scss'

interface SearchBarProps {
  inputValue: string
  placeholder: string
  hasError: boolean
  onChange: (args: any) => void
  onSubmit: () => void
}
const SearchBar = ({
  inputValue,
  placeholder,
  hasError,
  onChange,
  onSubmit,
}: SearchBarProps) => {
  return (
    <div
      className={`${styles.searchBar_wrapper} ${hasError ? styles.error : ''}`}
    >
      <img src={searchImg} alt="Search" className={styles.search_icon} />
      <input
        className={styles.search_input}
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onInput={(e: any) => onChange(e.target.value)}
      />
      <button onClick={onSubmit} className={styles.search_btn}>
        Search
      </button>
    </div>
  )
}

export default SearchBar

import { useDispatch } from 'react-redux'
import { useState } from 'react'

import { setSearchFilterValue } from '../../../redux/slices/weatherSlice'
import SearchBar from '../../shared/SearchBar/SearchBar'

const HeaderSearchBar = () => {
  const dispatch = useDispatch()

  const [filterValue, setFiltervalue] = useState('')
  const [error, setError] = useState('')

  const searchByCity = () => {
    if (filterValue.length > 0) {
      dispatch(setSearchFilterValue(filterValue.toLowerCase()))
      setFiltervalue('')
      setError('')
    } else {
      setError('Please enter a city!')
    }
  }

  return (
    <SearchBar
      inputValue={filterValue}
      placeholder={error ? error : 'Search by city...'}
      hasError={!!error}
      onChange={setFiltervalue}
      onSubmit={searchByCity}
    />
  )
}

export default HeaderSearchBar

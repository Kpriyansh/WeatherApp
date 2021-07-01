import React from 'react';
import Styles from './SearchBar.module.css'
const SearchBar = (props) => {

    return (
        <div className={Styles.SearchBar}>
            <input className={Styles.input} onChange={props.setInput}
                onKeyPress={props.onSubmit}
                type='text' placeholder='Enter city name' />

        </div>
    )
}
export default SearchBar;
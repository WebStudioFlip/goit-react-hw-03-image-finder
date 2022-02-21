import PropTypes from "prop-types";
import style from "./filter.module.css";

const Filter = (props)=> {
    const {filterContacts, filter} =props   
    return (        
        <div className={style.formGroup}>
        <label htmlFor="" className={style.formGroupLabel}>Find contact by name</label>
        <input value={filter} required name="filter" onChange={filterContacts} type="text" className={style.formGroupInput} placeholder="Find contact by name" />
    </div>    
    )
}

export default Filter;

Filter.propTypes = {       
            filter:PropTypes.string,
            filterContacts:PropTypes.func,        
}
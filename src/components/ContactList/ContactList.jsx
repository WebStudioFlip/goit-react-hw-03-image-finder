import PropTypes from "prop-types";
import style from  "./contactList.module.css";

const ContactList = (props)=> {
    const {contacts, removeContact} = props
    const elements = contacts.map(item => <li className={style.contactListItem} key={item.id}>
        {item.name}. {item.number}. <button className={style.btn} onClick={()=>removeContact(item.id)}>Delete</button>
    </li>);
    return (        
        <ul className={style.contactsList}>
        {elements}
    </ul>        
    )
}

export default ContactList;

ContactList.defaultProps = {
    contacts: []
}

ContactList.propTypes = {       
            contacts: PropTypes.arrayOf(PropTypes.shape({
                name: PropTypes.string.isRequired,
                number: PropTypes.number.isRequired,
                id: PropTypes.string.isRequired
            }) ), 
            removeContact:PropTypes.func,        
}
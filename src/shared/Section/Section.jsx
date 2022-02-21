import PropTypes from "prop-types";
import style from "./section.module.css";


const Section = ({title, children})=> {    
    return (
        <section className={style.section}>
            <div className={style.container}>
                {title && <h2 className={style.sectionTitle}>{title}</h2>}
                {children}
            </div>
        </section>
    )
}

Section.propTypes = {
    title: PropTypes.string    
}

export default Section;
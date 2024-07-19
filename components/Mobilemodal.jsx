import React from 'react'
import Dropdown from './Dropdown';
import styles from "../styles/mobilemodal.module.css";
import CloseIcon from "@mui/icons-material/Close";

const Mobilemodal = (props) => {
  return (
    <>
        <div className={styles.MMContainer}>
          <div className={styles.mobileFilter}>
            <h3>Filters</h3>
            <button className={styles.mobilebtn} onClick={props.closeMobileModal}><CloseIcon/></button>
          </div>
          <div className={styles.line}></div>
        <div className={styles.filtercontainer}>
      <Dropdown
       setOptions={props.setOptions}
       fiterdata={props.fiterdata}
       Options={props.Options}
       optionName={props.optionName}
      />
       &nbsp;
      <Dropdown
       setOptions={props.setOptionsG}
       fiterdata={props.fiterdataG}
       Options={props.OptionsG}
       optionName={props.optionNameG}
      />
    </div>
    </div>
    </>
  )
}

export default Mobilemodal; 

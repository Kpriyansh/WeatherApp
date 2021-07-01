import React from 'react';
import Styles from './WeatherBox.module.css'
const WeatherBox = (props) => {
    return (
        <div className={Styles.temp}>

            <h1>{Math.round(props.tempValue)}°</h1>
            <h5>CELSIUS</h5>
            <div className={Styles.icon}>
                <img src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`} alt="" />
            </div>
            
        </div>
    )

}
export default WeatherBox;
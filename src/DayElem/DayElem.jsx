import './DayElemStyle.css'
import {useEffect, useState} from "react";

function DayElem({data}) {

    useEffect(() => {
        console.log(data)
    })

    function headerName (date) {
        const today = new Date();
        const forecastDay = new Date(date);
        if (today.getDate() == forecastDay.getDate()) return 'Today';
        if (today.getDate() + 1 == forecastDay.getDate()) return 'Tomorrow';

        return getDayName(forecastDay) + ' ' + forecastDay.getDate() + "'s " + getMonthName(forecastDay);
    }

    function getDayName (date) {
        const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return week[date.getDay()];
    }

    function getMonthName (date) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[date.getMonth()];
    }

    if (!data) return (<div>no data</div>)

    return (
        <div className='dayElem'>
            <h3>{headerName(data.day)}</h3>
            <span><b>Avg temp: {data.all_day.temperature}°C</b></span>
            <img src={require('../icons/' + data.icon + '.png')} alt="icon"/>

            <span>Max: {data.all_day.temperature_max}</span>
            <span>Min: {data.all_day.temperature_min}</span>

            <span><b>Precipitation</b></span>
            <span>{data.all_day.precipitation.type}, {data.all_day.precipitation.total}cm</span>

        </div>
    );

}

export default DayElem;
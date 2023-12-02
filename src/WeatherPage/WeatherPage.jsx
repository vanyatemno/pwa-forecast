import './WeatherPage.css'
import {useEffect, useState} from "react";
import axios from "axios";
import DayElem from "../DayElem/DayElem";



function WeatherPage () {

    const [info, setInfo] = useState([]);
    const [isLoading, setLoading] = useState(true)
    const [city, setCity] = useState('')
    const [coord, setCoord] = useState([])
    

    function getCoord () {
        navigator.geolocation.getCurrentPosition(pos => {
            console.log([pos.coords.latitude, pos.coords.longitude])
            setCoord( [pos.coords.latitude, pos.coords.longitude])
        });
    }

    useEffect(() => {

        getCoord();

        (async () => {
            if (city) {
                const res = await axios.get(`https://www.meteosource.com/api/v1/free/point?lat=${coord[0]}&lon=${coord[1]}&sections=daily&language=en&units=auto&key=z2673usueg3mopu90c8schfvd67qluj5ddjs35zq`)
                console.log(res.data.daily.data)

                return res.data.daily.data;
            } else {
                const res = await axios.get('https://www.meteosource.com/api/v1/free/point?lat=49.83&lon=24.02&sections=daily&language=en&units=auto&key=z2673usueg3mopu90c8schfvd67qluj5ddjs35zq')

                return res.data.daily.data;
            }

        })().then(res => setInfo(res));

        setLoading(false);

    }, [])

    useEffect(() => {
        if (city) {
            (async () => {
                const res = await axios.get(`https://www.meteosource.com/api/v1/free/point?lat=${coord[0]}&lon=${coord[1]}&sections=daily&language=en&units=auto&key=z2673usueg3mopu90c8schfvd67qluj5ddjs35zq`)
                return res.data.daily.data;
            })().then(res => setInfo(res));

        }
    }, [city])

    useEffect(() => {
        console.log(coord)
        if (coord.length > 0) {

            (async () => {
                const res = await axios.get(`https://www.meteosource.com/api/v1/free/nearest_place?lat=${coord[0]}&lon=${coord[1]}&language=en&key=z2673usueg3mopu90c8schfvd67qluj5ddjs35zq`);

                return res.data.adm_area1;
            })().then(res => {
                console.log(res)
                setCity(res)
            })
        }
    }, [coord])

    if (isLoading) return (<div><h1>Loading content...{console.log(info)}</h1></div>);

    return (
        <div className='weatherPage'>
            <h2>Weather in {city ? city : 'Lviv'}</h2>
            <div className='weatherElements'>
                {
                    info.map(day => (<DayElem data={day} key={day.day}></DayElem>))
                }

            </div>
        </div>
    );
}

export default WeatherPage;
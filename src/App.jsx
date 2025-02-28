import React, { useEffect, useState } from 'react'
import Prayar from './component/Prayar'

const App = () => {


  const [prayarTimes, setPrayartimes] = useState({});
  const [dataTime, setDataTime] = useState('');
  const [city, setCity] = useState('Cairo');



  const cities = [
    {name: "القاهرة" , value: "Cairo"},
    {name: "الاسكندرية" , value: "Alexandria"},
    {name: "الجيزة" , value: "Giza"},
    {name: "المنصورة" , value: "Mansoura"},
    {name: "أسوان" , value: "Aswan"},
    {name: "الأقصر" , value: "Luxor"},
    {name: "جنوب سيناء" , value: "South Sinai"}
  ]

  useEffect(() => {
    const fetchPrayarTimes = async() => {
      try{
        const res = await fetch(`https://api.aladhan.com/v1/timingsByCity/28-02-2025?city=Eg&country=${city}`)
        const data_Prayar = await res.json()
        setPrayartimes(data_Prayar.data.timings)
        setDataTime(data_Prayar.data.date.gregorian.date)
        console.log(data_Prayar.data.date.gregorian.date)

      } catch(error) {
        console.error(error)
      }
    }

    fetchPrayarTimes()


  },[city])

  

  const formatTime = (time) => {
    if (!time) {
      return "00:00";
    }

    let [hours, minutes] = time.split(":").map(Number)
    const perd = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes} ${perd}`
  }



  return (
    <section>
      <div className="container">
        <div className="top_sec">
          <div className="city">
            <h3>المدينة</h3>
            <select name="" id="" onChange={(e) => setCity(e.target.value)}>
              {cities.map((city) => (
                <option key={city.value} value={city.value}>{city.name}</option>
              ))}
            </select>
          </div>

          <div className="date">
            <h3>التاريخ</h3>
            <h4>{dataTime}</h4>
          </div>
        </div>
        <div className="bottom_sec">
          <Prayar name='الفجر' time={formatTime(prayarTimes.Fajr)} />
          <Prayar name='الظهر' time={formatTime(prayarTimes.Dhuhr)} />
          <Prayar name='العصر' time={formatTime(prayarTimes.Asr)} />
          <Prayar name='المغرب'time={formatTime(prayarTimes.Maghrib)} />
          <Prayar name='العشاء'time={formatTime(prayarTimes.Isha)} />
        </div>
      </div>
    </section>
  )
}

export default App
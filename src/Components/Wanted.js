import cities from '../data/cities/cities.js'
import { useState, useEffect } from 'react'
export default function Wanted () {

    const sortedCities = cities.sort((a, b) => a.city > b.city)
    
    const [query, setQuery] = useState("Amsterdam")
    const [city, setCity] = useState("Amsterdam")
    const [lat, setLat] = useState("52.3667")
    const [lng, setLng] = useState("4.8833")
    const [radius, setRadius] = useState("5.0")
    const [nr, setNr] = useState("10")
    const [offset, setOffset] = useState("10")

    const handleSubmit = (e) => {
        e.preventDefault();
        setQuery(e.target.query.value)
        console.log(e.target.query.value)
    }

    const handleRadius = (e) => {
        setRadius(e.target.value)
        console.log(radius)
    }

    const handleCity = (e) => {
        const params = e.target.value
        setCity(params.split(" ")[0])
        setLat(params.split(" ")[1])
        setLng(params.split(" ")[2])
    }

    useEffect(() => {
        console.log(city)
        console.log(lat)
        console.log(lng)
        const getWanted = () => {    
            fetch(`/.netlify/functions/politie-wanted?query=${query}&lat=${lat}&lon=${lng}&radius=${radius}&maxnumberofitems=${nr}&offset=${offset}`)
            .then((x) => x.json())
            .then(result => console.log(result.data))
        }
        getWanted()
    },[lat])

    return (
        <div className="container">
            <form className="d-flex justify-content-center" onSubmit={handleSubmit}>
                <input type="text" name="query"/>
                <select onChange={handleCity}>
                    {sortedCities.map(city => {
                        return(
                            <option value={`${city.city} ${city.lat} ${city.lng}`}>{city.city}</option>
                        )
                    })}
                </select>
                <select onChange={handleRadius} value={radius}>
                    <option value="0.5">500m</option>
                    <option value="2.0">2km</option>
                    <option value="5.0">5km</option>
                    <option value="10.0">10km</option>
                    <option value="10.0">25km</option>
                </select>
            </form>
        </div>
    )
}
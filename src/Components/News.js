import Loading from './Loading'
import placeholder from '../images/politie-placeholder.png'
import React, {useState, useEffect} from 'react'

export default function News() {

    //some code to calculate todays date and last weeks date
    const today = new Date();
    const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate()-7);
    const formatDate = (date) => {
        return date.toISOString().split("T")[0]
    }

        let [isLoading, setLoading] = useState(true)
        let [query, setQuery] = useState('Amsterdam')
        let [news, setNews] = useState([])
        let [fromDate, setFromDate] = useState(formatDate(lastWeek))
        let [toDate, setToDate] = useState(formatDate(today))

        const getNews = () => {    
            setLoading(true)
            fetch(`/.netlify/functions/politie-news?query=${query}&fromdate=${fromDate.replace(/-/g, "")}&todate=${toDate.replace(/-/g, "")}`)
            .then((x) => x.json())
            .then(result => setNews([...result.data.nieuwsberichten]))
            .then(setLoading(false))
        }

        const handleSearch = (event) => {
            event.preventDefault();
            setQuery(event.target.search.value)
        }

        const changeDate = (e, type) => {
            type === "from" ? setFromDate(e.target.value) : setToDate(e.target.value)
        }

        useEffect(() => {
            getNews()
        },[query, fromDate, toDate]);
        
        if (!isLoading) {
            return (
                <div className="container">
                    <form className="d-flex justify-content-center my-3" onSubmit={handleSearch}>
                        {isLoading ? <span>Loading</span> : ""}
                        <input type="text" className="rounded mx-1" placeholder="Voer een zoekterm in" name="search" id="search"/>
                        <input type="date" className="rounded mx-1" name="fromdate" max={toDate} value={fromDate} onChange={(e) => {changeDate(e, "from")}}/>
                        <input type="date" className="rounded mx-1" name="todatedate" min={fromDate} value={toDate} onChange={(e) => {changeDate(e, "to")}}/>
                        <input type="submit" value="Zoeken" className="mx-1"/>
                    </form>
                    <section id="news">
                        <div className="cardgroup d-flex justify-content-center flex-row py-4 flex-wrap">
                            {news.map(item => {
                                return(
                                    <div className="card col-12 col-md-2 col-lg-2 my-1 mx-md-2 shadow d-flex flex-column">
                                        <img className="card-img-top w-100 news-image" src={item.afbeelding.url !== "" ? item.afbeelding.url : placeholder } alt={item.uid}/>
                                        <div className="card-body mb-auto">
                                            <span className="w-100"><small><strong>{item.gebied}</strong></small></span><br/>
                                            <span className="card-title"><small>{item.publicatiedatum}</small></span><br/>
                                            <span className="w-100" >{item.titel}</span> 
                                        </div>
                                        <a href={item.url} className="btn btn-primary m-2" target="_blank" rel="noreferrer">Lees meer</a>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                </div>
            )
        }
        else {return (<Loading />)
        }
    
}
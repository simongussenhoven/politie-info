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

        const [isLoading, setLoading] = useState(true)
        const [query, setQuery] = useState('Amsterdam')
        const [news, setNews] = useState([])
        const [fromDate, setFromDate] = useState(formatDate(lastWeek))
        const [toDate, setToDate] = useState(formatDate(today))
        const [sorting, setSorting] = useState("up")

        //set state when handling search
        const handleSearch = (event) => {
            event.preventDefault();
            setQuery(event.target.search.value)
        }

        //set state when changing date
        const changeDate = (e, type) => {
            type === "from" ? setFromDate(e.target.value) : setToDate(e.target.value)
        }

        //use function to generate items, depending on the length of the array of newsitems. Otherwise, show an error
        const generateItems = () => {
            if (news.length !== 0) {
                return news.map(item => {
                    return(
                        <div className="card col-12 col-md-2 col-lg-2 my-1 mx-md-2 shadow d-flex flex-column" key={item.uid}>
                            <img className="card-img-top w-100 news-image" src={item.afbeelding.url !== "" ? item.afbeelding.url : placeholder } alt={item.uid}/>
                            <div className="card-body mb-auto">
                                <span className="w-100"><small><strong>{item.gebied}</strong></small></span><br/>
                                <span className="card-title"><small>{item.publicatiedatum}</small></span><br/>
                                <span className="w-100" >{item.titel}</span> 
                            </div>
                            <a href={item.url} className="btn btn-primary m-2" target="_blank" rel="noreferrer">Lees meer</a>
                        </div>
                    )
                })
            }
            else {
                console.log("No items found!")
                return <h2>No items found</h2>
            }
        }

        //rerender the page when any of the state values are changed
        useEffect(() => {
            const getNews = () => {    
                setLoading(true)
                fetch(`/.netlify/functions/politie-news?query=${query}&fromdate=${fromDate.replace(/-/g, "")}&todate=${toDate.replace(/-/g, "")}`)
                .then((x) => x.json())
                .then(result => result.data !== undefined ? setNews([...result.data.nieuwsberichten]) : setNews([]))
                .then(setLoading(false))
            }
            getNews()
        },[query, fromDate, toDate]);
        
        if (!isLoading) {
            return (
                <div className="container">
                    <form className="d-flex flex-column flex-md-row justify-content-center my-3" onSubmit={handleSearch}>
                        {isLoading ? <span>Loading</span> : ""}
                        <input type="text" className="rounded mx-1 my-1" placeholder="Voer een zoekterm in" name="search" id="search"/>
                        <input type="date" className="rounded mx-1 my-1" name="fromdate" max={toDate} value={fromDate} onChange={(e) => {changeDate(e, "from")}}/>
                        <input type="date" className="rounded mx-1 my-1" name="todatedate" min={fromDate} value={toDate} max={formatDate(today)} onChange={(e) => {changeDate(e, "to")}}/>
                        <input type="submit" value="Zoeken" className="mx-1 my-1"/>
                    </form>
                    <section id="news">
                        <div className="cardgroup d-flex justify-content-center flex-row py-4 flex-wrap">
                            {generateItems()}
                        </div>
                    </section>
                </div>
            )
        }
        else {return (<Loading />)
        }
    
}
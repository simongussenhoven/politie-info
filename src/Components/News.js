import Loading from './Loading'
import placeholder from '../images/politie-placeholder.png'
import React, { useState, useEffect, createRef } from 'react'
import { Modal } from 'react-bootstrap'
import uuid from 'react-uuid'

export default function News() {

    //some code to calculate todays date and last weeks date
    const today = new Date();
    const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);
    const formatDate = (date) => {
        return date.toISOString().split("T")[0]
    }

    //define state in hooks
    const [isLoading, setLoading] = useState(true)
    const [query, setQuery] = useState('Amsterdam')
    const [news, setNews] = useState([])
    const [fromDate, setFromDate] = useState(formatDate(lastWeek))
    const [toDate, setToDate] = useState(formatDate(today))
    const [maxNumberofItems, setMaxNumberofItems] = useState(25)
    const [page, setPage] = useState(0)
    const [last, setLast] = useState(false)
    const [show, setShow] = useState(false);
    const [modalData, setModalData] = useState({
        titel: "Placeholder",
        alineas: [
            { "opgemaaktetekst": "Placeholder" }
        ]
    })


    //showing and hiding the modal
    const handleClose = () => setShow(false);
    const handleShow = (item) => {

        console.log(item)
        setModalData(item)
        setShow(true)
    }

    //set state when handling search
    const handleSearch = (event) => {
        event.preventDefault();
        setQuery(event.target.search.value)
        setPage(0)
    }

    //set state when changing date
    const changeDate = (e, type) => {
        type === "from" ? setFromDate(e.target.value) : setToDate(e.target.value)
    }

    //handle maximum amount of items
    const handleMaxNum = (e) => {
        setMaxNumberofItems(e.target.value)
        setPage(0)
    }

    //change page
    const handlePage = (e) => {
        let newPage = page
        if (e === 1) {
            newPage += 1
        }
        else {
            newPage -= 1
        }
        setPage(newPage)
    }
    //dom parser since this api delivers formatted HTML
    const parser = new DOMParser()

    //use function to generate items, depending on the length of the array of newsitems. Otherwise, show an error
    const generateItems = () => {
        if (news.length !== 0) {
            return news.map(item => {
                return (
                    <div className="col-12 shadow d-flex border rounded mb-2" key={item.uid} onClick={() => { handleShow(item) }} >
                        <div className="col-4">
                        <img onClick={() => { handleShow(item) }} className="card-img-top w-100 news-image" src={item.afbeelding.url !== "" ? item.afbeelding.url : placeholder} alt={item.uid} />
                        </div>
                        <div className="card-body mb-auto">
                            <span className="w-100"><small><strong>{item.gebied}</strong></small></span><br />
                            <span className="card-title"><small>{item.publicatiedatum}</small></span><br />
                            <span className="w-100" >{item.titel}</span>
                        </div>
                    </div>
                )
            })
        }
        else {
            console.log("No items found!")
            return <h2>No items found</h2>
        }
    }
    //

    //rerender the page when any of the state values are changed
    useEffect(() => {
        const getNews = () => {
            setLoading(true)
            fetch(`/.netlify/functions/politie-news?query=${query}&fromdate=${fromDate.replace(/-/g, "")}&todate=${toDate.replace(/-/g, "")}&maxnumberofitems=${maxNumberofItems}&offset=${maxNumberofItems * page}`)
                .then((x) => x.json())
                .then(result => {
                    if (result.data !== undefined) {
                        setNews([...result.data.nieuwsberichten]);
                        setModalData(result.data.nieuwsberichten[0])
                        result.data.iterator.last ? setLast(true) : setLast(false);
                    }
                    else {
                        setNews([])
                    }
                })
                .then(setLoading(false))
        }
        getNews()
    }, [query, fromDate, toDate, maxNumberofItems, page]);

    if (!isLoading) {
        return (
            <>
                {/*Modal for news items}*/}
                <Modal
                    show={show}
                    size="lg"
                    onHide={() => setShow(false)}
                    dialogClassName="width-90"
                    aria-labelledby="example-custom-modal-styling-title"
                    animation="true"
                    scrollable="true"
                >

                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            {modalData.titel}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {modalData.alineas.map(item => {
                            return (
                                <>
                                <p>{item.gebied}</p>
                                <div dangerouslySetInnerHTML={{ __html: item.opgemaaktetekst }} key={uuid()} />
                                </>
                            )
                        })}
                    {modalData.urltipformulier != null ? <a href={modalData.urltipformulier.replace("api", "www")} target="_blank" rel="noreferrer" className="btn btn-primary w-100">Naar het tipformulier</a> : ""}
                    <button onClick={handleClose} className="btn outline-secondary w-100">Sluiten</button>
                    </Modal.Body>
                </Modal>
                <div className="container">
                    {/* Search bar with options */}
                    <div className="row d-flex flex-column-reverse flex-md-row">
                        <div className="col-12 col-md-8">
                            <section className="text-left">
                                <h2>Nieuwsberichten voor zoekterm "{query}"</h2>
                                <p>Van {fromDate.split("-").reverse().join("-")} tot {toDate.split("-").reverse().join("-")}</p>
                                <section id="news">
                                    <div className="cardgroup d-flex justify-content-center flex-column flex-wrap">
                                        {generateItems()}
                                    </div>
                                </section>
                            </section>
                        </div>
                        <div className="col-12 col-md-4">
                        <h2>Filter berichten</h2>
                        <p>Gebruik onderstaande velden om berichten te filteren.</p>
                            <form className="d-flex flex-column flex-md-column justify-content-center my-3" onSubmit={handleSearch}>
                                {isLoading ? <span>Loading</span> : ""}
                                <input type="text" className="rounded mx-1 my-1" placeholder="Voer een zoekterm in" name="search" id="search" />
                                <input type="date" className="rounded mx-1 my-1" name="fromdate" max={toDate} value={fromDate} onChange={(e) => { changeDate(e, "from") }} />
                                <input type="date" className="rounded mx-1 my-1" name="todatedate" min={fromDate} value={toDate} max={formatDate(today)} onChange={(e) => { changeDate(e, "to") }} />
                                <select value={maxNumberofItems} className="mx-1 my-1" onChange={handleMaxNum}>
                                    <option value="10">10 berichten</option>
                                    <option value="25">25 berichten</option>
                                </select>
                                <input type="submit" value="Zoeken" className="mx-1 my-1" />
                            </form>
                        </div>
                    </div>

                    {/* Page title */}


                    {/* Page navigation */}
                    <section className="text-center my-3">
                        <p>{!last ? "Laad meer" : ""}</p>
                    </section>

                    {/*Field for rendering items */}

                </div>
            </>
        )
    }
    else {
        return (<Loading />)
    }

}
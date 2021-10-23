import cities from '../data/cities/cities.js'
import { useState, useEffect } from 'react'
import placeholder from '../images/politie-placeholder.png'
import { Modal } from 'react-bootstrap'
import uuid from 'react-uuid'
import SimpleImageSlider from "react-simple-image-slider";

export default function Wanted() {

    const sortedCities = cities.sort((a, b) => a.city > b.city)

    const [wanted, setWanted] = useState([])
    const [query, setQuery] = useState("")
    const [city, setCity] = useState("Amsterdam")
    const [lat, setLat] = useState("52.3667")
    const [lng, setLng] = useState("4.8833")
    const [radius, setRadius] = useState("10.0")
    const [max, setMax] = useState(10)
    const [page, setPage] = useState(0)
    const [last, setLast] = useState(false)
    const [show, setShow] = useState(false);
    const [modalData, setModalData] = useState({
        titel: "Placeholder",
        alineas: [
            { "opgemaaktetekst": "Placeholder" }
        ],
        meerafbeeldingen: [placeholder, placeholder]
    })

    //showing and hiding the modal
    const handleClose = () => setShow(false);
    const handleShow = (item) => {
        
        console.log(item)
        setModalData(item)
        setShow(true)
    }

    //handler for the submitfield in the form
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.query.value)
        setQuery(e.target.query.value)
        setPage(0)
    }

    //handler for the radius in the form
    const handleRadius = (e) => {
        setRadius(e.target.value)
        setPage(0)
    }

    //handle pagination
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

    //handler for number of pages
    const handleMax = (e) => {
        setRadius(e.target.value)
        setPage(0)
    }

    //handler for the city selector
    const handleCity = (e) => {
        const params = e.target.value
        setCity(params.split(" ")[0])
        setLat(params.split(" ")[1])
        setLng(params.split(" ")[2])
        setPage(0)
    }

    //function to render data depending on the found items, to be used in the component function
    const generateData = () => {
        if (wanted.length !== 0) {
            return (
                wanted.map(item => {
                    return (
                        <div className="card col-12 col-md-3 my-1 mx-md-2 shadow d-flex flex-column" key={item.uid}>
                            <img src={item.afbeeldingen !== null && item.afbeeldingen.length > 0 ? item.afbeeldingen[0].url : placeholder} className="news-image"></img>
                            <div className="card-body mb-auto">
                                <span className="w-100"><small><strong>{item.titel}</strong></small></span><br />
                                <span className="card-title"><small>{item.publicatiedatum}</small></span><br />
                            </div>
                            <button onClick={() => handleShow(item)} className="btn btn-primary m-2" target="_blank" rel="noreferrer">Lees meer</button>
                        </div>
                    )
                })
            )
        }
        else {
            return (
                <h2>Geen items gevonden</h2>
            )
        }
    }

    //generate pagination
    const getPagination = () => {
        if (wanted.length > 0) {
            return (
                <section className="text-center" multiple={true}>
                    <p>{page > 0 ? <span className="pagenav" onClick={() => handlePage(0)}>Vorige pagina</span> : ""} <span> {page > 0 && last === false ? <span>|</span> : ""} </span>{last ? "" : <span className="pagenav" onClick={() => handlePage(1)}>Volgende pagina</span>}</p>
                </section>
            )
        }
    }

    //call api when state values change, defined in callback
    useEffect(() => {
        const getWanted = () => {
            fetch(`/.netlify/functions/politie-wanted?query=${query}&lat=${lat}&lon=${lng}&radius=${radius}&max=${max}&offset=${max * page}`)
                .then((x) => x.json())
                .then(result => {
                    if (result.data !== undefined) {
                        setWanted(result.data.opsporingsberichten)
                        result.data.iterator.last === false ? setLast(false) : setLast(true)
                    } else {
                        setWanted([])
                    }

                })
        }
        getWanted()
    }, [lat, radius, query, page, max])

    return (
        <>
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
                    <img src={modalData.afbeeldingen[0].url} className="img-fluid w-100"/>
                    <p className="my-3"><strong>{modalData.introductie}</strong></p>
                    <div dangerouslySetInnerHTML={{__html: modalData.omschrijving}} key={uuid()}/>
                </Modal.Body>
            </Modal>
            <div className="container">
                {/*Form*/}
                <section className="mb-5">
                    <form className="d-flex justify-content-center" onSubmit={handleSubmit}>
                        <input type="text" name="query" className="mx-1" />
                        <select onChange={handleCity} className="mx-1">
                            {sortedCities.map(city => {
                                return (
                                    <option value={`${city.city} ${city.lat} ${city.lng}`}>{city.city}</option>
                                )
                            })}
                        </select>
                        <select onChange={handleRadius} value={radius} className="mx-1">
                            <option value="0.5">500m</option>
                            <option value="2.0">2km</option>
                            <option value="5.0">5km</option>
                            <option value="10.0">10km</option>
                            <option value="25.0">25km</option>
                        </select>
                        <select value={max} onChange={handleMax}>
                            <option value="10">10 berichten</option>
                            <option value="25">25 berichten</option>
                        </select>
                        <input type="submit" value="Zoeken" className="mx-1"></input>
                    </form>
                </section>

                {/*Page selector*/}
                {getPagination()}

                {/*Render content*/}
                <section id="news">
                    <div className="cardgroup d-flex justify-content-center flex-row py-4 flex-wrap">
                        {generateData()}
                    </div>
                </section>

                {/*Page selector*/}
                {getPagination()}
            </div>
        </>
    )
}
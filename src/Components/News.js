import Loading from './Loading'
import placeholder from '../images/politie-placeholder.png'
export default function News(props) {
    
        if (!props.isLoading) {
            return (
                <div className="container">
                    <form className="d-flex justify-content-center my-3" onSubmit={props.handleSearch}>
                        <input type="text" className="rounded" placeholder="Voer een zoekterm in" name="search" id="search"/>
                        <input type="submit" value="Zoeken" className="mx-2"/>
                    </form>
                    <section id="news">
                        <div className="cardgroup d-flex justify-content-center flex-row py-4 flex-wrap">
                            {props.news.map(item => {
                                return(
                                    <div className="card col-3 col-md-2 col-lg-2 my-1 mx-1 shadow d-flex flex-column">
                                        <img style={{'height': '100px'}, {'object-fit':'cover'}} style={{'height': '100px'},{'objectFit': 'contain'}} className="card-img-top w-100" src={item.afbeelding.url !== "" ? item.afbeelding.url : placeholder } alt={item.uid}/>
                                        <div className="card-body mb-auto">
                                            <span className="w-100"><small>{item.gebied}</small></span><br/>
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
import Loading from './Loading'
import Placeholder from '../images/card-placeholder.png'
export default function News(props) {
    {
        if (!props.isLoading) {
            return (
                <section id="news" className="container vh-100">
                    <div className="cardgroup d-flex flex-column py-4">
                        {props.news.map(item => {
                            return(
                                <div class="card col-12 col-md-3 my-1 w-100">
                                    <img class="card-img-top" src="..." alt="Card image cap"/>
                                    <div class="card-body">
                                        <h5 class="card-title">{item.titel}</h5>
                                        {item.alineas.map(alinea => {
                                            return (
                                                <div dangerouslySetInnerHTML={{ __html: alinea.opgemaaktetekst }} />
                                            )
                                        })}
                                        <a href="#" class="btn btn-primary">Go somewhere</a>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>
            )
        }
        else {
            return (
                <Loading />
            )
        }
    }
}
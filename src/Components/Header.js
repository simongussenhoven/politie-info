import {Button} from "react-bootstrap"
export default function Header () {
    return (
        <section className="banner">
            <img className="banner-img w-100 z-0" src="../images/politie.jpg" alt="zwaailichten"/>
            <div className="row banner-text py-5 px-4 rounded">
                <h1 className="font-50 text-bold text-light">🚨 Politie Info </h1>
                <h2 className="font-10 text-light">Politie.nl open data via REST API</h2>
                <p className="text-light">Op deze pagina vind je allerlei vrij beschikbare informatie via api.politie.nl. Meer informatie over deze API vind je <a target="_blank" className="underline color-white" href="https://www.politie.nl/algemeen/open-data.html">hier</a>.</p>
                
           </div>
           
      </section>
    )
}
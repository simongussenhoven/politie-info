export default function About () {
    return (
        <>
        <section className="container text-center py-4">
            <h1>Over deze pagina</h1>
        </section>
        <section className="text-center">
            <div className="row d-flex justify-content-center">
                <p className="col-12 col-md-6">Deze pagina is gemaakt in React.js, en gebruikt Netlify Continuous Development in combinatie met Github. Bekijk de repo op github voor meer informatie. Heb je vragen of opmerkingen? Neem dan contact met me op via LinkedIn.</p>
            </div>
            <div className="row d-flex justify-content-center py-4">
                <p className="col-1"><button className="btn btn-primary">Github</button></p>
                <p className="col-1"><button className="btn btn-primary">LinkedIn</button></p>
            </div>
        </section>
        <section className="container text-center py-4">
            <h2>Meer informatie</h2>
            <p>React.js, React Router, Github,</p>
        </section>
        </>

    )
}
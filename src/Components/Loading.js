import {Spinner} from "react-bootstrap"

export default function Loading (){
    return(
        <div className="container d-flex justify-content-center mt-5 align-items-center">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )
}
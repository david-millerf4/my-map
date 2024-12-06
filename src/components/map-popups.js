import * as React from "react"
import { Row, Col } from "react-bootstrap"
import { GeoAlt, Telephone, Envelope, Globe, Clock } from 'react-bootstrap-icons';

const MapPopups = ({ content = null }) => {
    const { placename, adress, products, category, hours, telephone, email, description, url } = content;
    return (
        <Row className="map-popup">
            <Col className="map-popup-content">
                <h1 className="popup-header">{placename}</h1>
                <Row className="mx-0 px-0">
                    <Col className="map-popup-info">
                        {category ?
                            <div><span className="map-content-header">Category:</span> {category}</div>
                            : ``}
                        {description ?
                            <div>
                                <div><span className="map-content-header">Description:</span> {description}</div>
                            </div>
                            : ``}
                    </Col>
                    <Row className="pe-0">
                        <Col className="map-popup-details pe-0">
                            {adress ?
                                <Row>
                                    <Col><GeoAlt className="pop-bi-geo-alt" /></Col>
                                    <Col>{adress}</Col>
                                </Row>
                                : ``}
                            {telephone ?
                                <Row >
                                    <Col><Telephone className="pop-bi-telephone" /></Col>
                                    <Col>{telephone}</Col>
                                </Row>
                                : ``}
                            {email ?
                                <Row>
                                    <Col><Envelope className="pop-bi-envelope" /></Col>
                                    <Col>{email}</Col>
                                </Row>
                                : ``}
                            {url ?
                                <Row>
                                    <Col><Globe className="pop-bi-globe" /></Col>
                                    <Col>{url}</Col>
                                </Row>
                                : ``}
                            {hours ?
                                <Row >
                                    <Col><Clock className="pop-bi-clock" /></Col>
                                    <Col>{hours}</Col>
                                </Row>
                                : ``}
                        </Col>
                    </Row>
                    <Col>
                        {products ?
                            <ul className="popup-list">
                                <li><span className="map-content-header">Products:</span>
                                    <ul>
                                        {products.map(product => {
                                            return (
                                                <li key={product}>{product}</li>
                                            )
                                        })}
                                    </ul>
                                </li>
                            </ul>
                            : ``}
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default MapPopups

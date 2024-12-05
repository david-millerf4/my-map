import * as React from "react"
import { GeoAlt, Telephone, Envelope, Globe, Clock } from 'react-bootstrap-icons';

const MapPopups = ({ content = null }) => {
        const { placename, adress, products, category, hours, telephone, email, description, url } = content;
        return (
            <div className="map-popup">
                <div className="map-popup-content">
                    <h1 className="popup-header">{placename}</h1>
                    {adress ?
                        <p className="map-popup-info">
                             <div>
                                <GeoAlt className="pop-bi-geo-alt" />
                                {adress}
                            </div>
                        </p>
                    : ``}
                    <p className="map-popup-info">
                        <h3 className="map-content-header">Kontakt</h3>
                        {telephone ?
                            <div>
                                <Telephone className="pop-bi-telephone" />
                                {telephone}
                            </div>
                        : ``}
                        {email ?
                            <div>
                                <Envelope className="pop-bi-envelope" />
                                {email}
                            </div>
                        : ``}
                        {url ?
                            <div>
                                <Globe className="pop-bi-globe" />
                                {url}
                            </div>
                        : ``}
                    </p>
                    {hours ?
                        <p className="map-popup-info">
                            <h3 className="map-content-header">Öffnungszeiten</h3>
                            <div>
                                <Clock className="pop-bi-clock" />
                                {hours}
                            </div>
                        </p>
                    : ``}
                    {description ?
                        <p className="map-popup-info">
                            <h3 className="map-content-header">Description</h3>
                            <div>{description}</div>
                        </p>
                    : ``}
                    {category ?
                        <div> category: {category}</div>
                    : ``}
                    {products ?
                        <ul className="popup-list">
                            <li><h3 className="map-content-header">Products: </h3>
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
                </div>
            </div>
        )
}

export default MapPopups

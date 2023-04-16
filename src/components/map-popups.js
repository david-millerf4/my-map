import * as React from "react"

const MapPopups = ({ content = null }) => {
        const { placename, adress, products, category, hours, telephone, email, description, url } = content;
        return (
            <div className="map-popup">
                <div className="map-popup-content">
                    <h2 className="popup-header">{placename}</h2>
                    {adress ?
                        <p className="map-popup-info">
                            <h3 className="map-content-header">Adress</h3>
                            <div>{adress}</div>
                        </p>
                    : ``}
                    <p className="map-popup-info">
                        <h3 className="map-content-header">Kontakt</h3>
                        {telephone ?
                            <div><strong>Tel:</strong> {telephone}</div>
                        : ``}
                        {email ?
                            <div><strong>E-Mail: </strong>{email}</div>
                        : ``}
                        {url ?
                            <div><strong>Url:</strong> {url}</div>
                        : ``}
                    </p>
                    {hours ?
                        <p className="map-popup-info">
                            <h3 className="map-content-header">Öffnungszeiten</h3>
                            <div>{hours}</div>
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

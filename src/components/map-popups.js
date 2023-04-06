import * as React from "react"

const MapPopups = ({ content = null }) => {
        const { placename, adress, products, categories, hours, telephone, email, description, url } = content;
        return (
            <div className="popup-gatsby">
                <div className="popup-gatsby-content">
                    <h1 className="popup-header">{placename}</h1>
                    <ul className="popup-list">
                        <li><strong>Adr:</strong> {adress}</li>
                        <li><strong>Tel:</strong> {telephone}</li>
                        <li><strong>E-Mail: </strong>{email}</li>
                        <li><strong>Offen:</strong> {hours}</li>
                        <li><strong>Desc:</strong> {description}</li>
                        <li><strong>Url:</strong> {url}</li>
                        <li><strong>Categories: </strong>
                            {categories.map(category => {
                                return (
                                    <span key={category}>{category}, </span>
                                )
                            })}
                        </li>
                        <li><strong>Products: </strong>
                            <ul>
                                {products.map(product => {
                                    return (
                                        <li key={product}>{product}</li>
                                    )
                                })}
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        )
}

export default MapPopups

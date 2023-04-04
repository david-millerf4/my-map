import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import MapHeader from "../components/map-header"
import MapSidebar from "../components/map-sidebar"

import { MapContainer, TileLayer, Marker, Popup, useMap, GeoJSON } from 'react-leaflet'
import { locations } from "../data/locations-bayern"
import { bavariaGeoJson } from "../data/bavaria-geo"

//  centering on bayern
const MAP_LOCATION = {
    lat: 49.018308,
    lng: 12.1319584
  };
  const MAP_CENTER = [MAP_LOCATION.lat, MAP_LOCATION.lng];
  const MAP_ZOOM = 7.4;
  const MAP_HEIGHT = {height: "700px"};
  const MAP_SCROLL = false;

  const geoOpacity =  "0.3"
  const geoColor = "#38c401"
  const geoAttribution = "David Miller"

  
const GeoMapsPage = ({ data, location }) => {
    const siteTitle = data.site.siteMetadata.title

    // Map settings
    const mapSettings = {
        center: MAP_CENTER,
        defaultBaseMap: "OpenStreetMap",
        zoom: MAP_ZOOM,
        style: MAP_HEIGHT,
        scrollWheel: MAP_SCROLL,
    };

    // GEOJSON
    const geoJsonOptions = { 
        data: bavariaGeoJson,
        opacity: geoOpacity,
        color: geoColor,
        attribution: geoAttribution
    };

    function MyComponent() {
        const map = useMap()
        console.log('MyComponent map center:', map.getCenter())
        return null
      }

    return (
        <Layout location={location} title={siteTitle}>
            <MapHeader title="bio bayern geo json map" filters="filters" />
            <div className="row px-0 mx-0">
                <MapSidebar title="sidebar title" />
                <div className="col-lg-10 col-md-12">
                    <div className="col">
                        {/* Map */}
                        <MapContainer {...mapSettings}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <MyComponent />
                            <GeoJSON {...geoJsonOptions} />
                            {locations.map(location => {
                                const { placename, coords, adress, products, categories, hours, telephone, email, description, url } = location;
                                const position = [coords.lat, coords.lng];
                                return (
                                    <Marker key={placename} position={position} >
                                        <Popup maxHeight={400}>
                                            <div class="popup-gatsby">
                                                <div class="popup-gatsby-content">
                                                    <h1 className="popup-header">{placename}</h1>
                                                    <ul className="popup-list">
                                                        <li><strong>adr:</strong> {adress}</li>
                                                        <li><strong>tel:</strong> {telephone}</li>
                                                        <li><strong>email: </strong>{email}</li>
                                                        <li><strong>hours:</strong> {hours}</li>
                                                        <li><strong>desc:</strong> {description}</li>
                                                        <li><strong>url:</strong> {url}</li>
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
                                                                        <li key={placename}>{product}</li>
                                                                    )
                                                                })}
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </Popup>
                                    </Marker>
                                )
                            })}
                        </MapContainer>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export const Head = () => <Seo title="Geo Maps Page" />

export default GeoMapsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

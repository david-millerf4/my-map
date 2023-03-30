import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { locations } from "../data/locations"
// import { bavaria } from "../data/bavaria.geo.json"

const MapsPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  const LOCATION = {
    lat: 48.8992823,
    lng: 9.165479
  };
  const CENTER = [LOCATION.lat, LOCATION.lng];
  const DEFAULT_ZOOM = 6;

  console.log(locations)

  return (
      <Layout location={location} title={siteTitle}>
          <h1>Bio in Bayern</h1>
          <section>
              {/* Map */}
              <MapContainer style={{ height: `500px`, border: `1 px solid green` }} center={CENTER} zoom={DEFAULT_ZOOM} >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; David Miller | <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                  {locations.map(location => {
                      const { placename, coords, adress, products, categories, hours, telephone, description, url } = location;
                      const position = [coords.lat, coords.lng];
                      return (
                          <Marker key={placename} position={position} >
                              <Popup>
                                  <div class="popup-gatsby">
                                      <div class="popup-gatsby-content">
                                          <h1 className="popup-header">{placename}</h1>
                                          <ul className="popup-list">
                                              <li><strong>adr:</strong> {adress}</li>
                                              <li><strong>tel:</strong> {telephone}</li>
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
          </section>
      </Layout>
  )
}

export const Head = () => <Seo title="Maps Page" />

export default MapsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

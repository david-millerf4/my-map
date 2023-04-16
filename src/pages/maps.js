import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import MapHeader from "../components/map-header"

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { locations } from "../data/locations-bayern"

const MapsPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  const LOCATION = {
    lat: 48.8992823,
    lng: 9.165479
  };
  const CENTER = [LOCATION.lat, LOCATION.lng];
  const DEFAULT_ZOOM = 6;

  console.log("locations: ", locations)

  return (
      <Layout location={location} title={siteTitle}>
        <MapHeader title="bio bayern map of grape nehi" filters="some other filters" />
          <div className="row mx-0 px-0">
              <div className="col-lg-2 col-md-12 column">
                  <div className="row">top</div>
                  <div className="row">bottom</div>
              </div>
              <div className="col-lg-10 col-md-12">
                  <div className="col">
                      {/* Map */}
                      <MapContainer style={{ height: `775px`}} center={CENTER} zoom={DEFAULT_ZOOM} >
                          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; David Miller | <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                          {locations.map(location => {
                              const { placename, coords, adress, products, category, hours, telephone, email, description, url } = location;
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
                                                      <li><strong>email: </strong>{email}</li>
                                                      <li><strong>hours:</strong> {hours}</li>
                                                      <li><strong>desc:</strong> {description}</li>
                                                      <li><strong>url:</strong> {url}</li>
                                                      <li><strong>Category: </strong>{category} </li>
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

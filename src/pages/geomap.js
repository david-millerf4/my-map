import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import MapHeader from "../components/map-header"
import MapSidebar from "../components/map-sidebar"
import MapPopups from "../components/map-popups"

import { MapContainer, TileLayer, Marker, Popup, useMap, GeoJSON, Tooltip} from 'react-leaflet'
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

    // Popup settings
    const popUpSettings = {
        maxHeight: "400",
    }

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

      function getInfo () {
        return "news of the day";
      }

    return (
        <Layout location={location} title={siteTitle}>
            <MapHeader title="Bio in Bayern" filters="filters" />
            <div className="row px-0 mx-0">
                <MapSidebar title={getInfo()} />
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
                                const position = [location.coords.lat, location.coords.lng];
                                return (
                                    <Marker key={location.coords.lat} position={position}  alt={location.placename} riseOnHover={true}>
                                        <Tooltip>{location.placename}</Tooltip>
                                        <Popup {...popUpSettings}>
                                            <MapPopups content={location} />
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

import React, { useRef, useEffect }  from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import MapHeader from "../components/map-header"
import MapSidebar from "../components/map-sidebar"
import MapPopups from "../components/map-popups"
import L from "leaflet"
import { MapContainer, TileLayer, Marker, Popup, useMap, GeoJSON, Tooltip, LayersControl, FeatureGroup, useMapEvent} from 'react-leaflet'

import { locations } from "../data/locations-bayern"
import { bavariaGeoJson } from "../data/bavaria-geo"

//  center on bayern
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


const tileLayerSettings = {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
}

  
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

    // Demonstration of possible usage
    function MyComponent() {
        const map = useMap()
        console.log('MyComponent map center:', map.getCenter());
        // sortLocationCategory(locations);
        return null
      };

      // Custom Button
  const CustomButton = () => {

    const map = useMap();

    useEffect(() => {
      if (!map) return;

      const customControler = L.Control.extend({
        options: {
          position: "topright",
        },

        onAdd: function () {
          const btn = L.DomUtil.create("button");
          btn.title = "pooooooooooooop rotation";
          btn.textContent = "💩";
          btn.className = "customButton";

          btn.onmouseover = function () {
            this.style.transform = "scale(1.3)";
          };

          btn.onmouseout = function () {
            this.style.transform = "scale(1)";
          };

          return btn;
        },
      });

      map.addControl(new customControler());
    }, [map]);

    return null;
  };


    // Legend
    const Legend = () => {
      const map = useMap();
      useEffect(() => {
        if (!map) return;
    
        const legend = L.control({ position: "bottomleft" });
    
        legend.onAdd = () => {
          const div = L.DomUtil.create("div", "description");
          L.DomEvent.disableClickPropagation(div);
    
          const text = "<strong>©ESP</strong> David Miller <img src='../images/gatsby-icon.png' />";
    
          div.innerHTML = text;
    
          return div;
        };
    
        legend.addTo(map);
    
      }, [map]);
    
      return null;
    }
      
    // location sorting
    const gastros = [];
    const bauern = [];
    const sortLocationCategory = (location) => {
      for (let i = 0; i < location.length; i++) {
        if (location[i].category === `biogastronom`) {
            gastros.push(location[i])
        } else {
            bauern.push(location[i])
        }
      }
      return;
    }

    // grouping map features by category
    const ControllingGroup = () => {

        console.log('gastros: ', gastros  );
        console.log('loca: ', locations);
        console.log('bauern: ', bauern);


        const map = useMapEvent({
          overlayadd(e) {
            let bounds = new L.LatLngBounds();
      
            map.eachLayer(function (layer) {
              if (layer instanceof L.FeatureGroup) {
                bounds.extend(layer.getBounds());
              }
            });
      
            if (bounds.isValid()) {
              map.flyToBounds(bounds);
            }
          },
        });
      
        return null;
      };
      

      // potentially for sidebar
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
                        <MapContainer {...mapSettings}>
                            {/* <TileLayer {...tileLayerSettings} /> */}
                            <MyComponent />
                            <GeoJSON {...geoJsonOptions} />
                            {/* {locations.map(location => {
                                const position = [location.coords.lat, location.coords.lng];
                                return (
                                    <Marker key={location.coords.lat} position={position}  alt={location.placename} riseOnHover={true}>
                                        <Tooltip>{location.placename}</Tooltip>
                                        <Popup {...popUpSettings}>
                                            <MapPopups content={location} />
                                        </Popup>
                                    </Marker>
                                )
                            })} */}
                            <CustomButton />
                            <Legend />
                            <LayersControl position="topright" collapsed={false} blah={sortLocationCategory(locations)}>
                                <TileLayer {...tileLayerSettings} />
                                <LayersControl.Overlay name="Bio Lebensmittel">
                                    <FeatureGroup>
                                        {bauern.map(B => {
                                            const position = [B.coords.lat, B.coords.lng];
                                            return (
                                                <Marker key={B.coords.lat} position={position} alt={B.placename} riseOnHover={true}>
                                                    <Tooltip>{B.placename}</Tooltip>
                                                    <Popup {...popUpSettings}>
                                                        <MapPopups content={B} />
                                                    </Popup>
                                                </Marker>
                                            )
                                        })}
                                    </FeatureGroup>
                                </LayersControl.Overlay>
                                <LayersControl.Overlay name="Bio Gastronom">
                                    <FeatureGroup>
                                        {gastros.map(gastro => {
                                            const position = [gastro.coords.lat, gastro.coords.lng];
                                            return (
                                                <Marker key={gastro.coords.lat} position={position} alt={gastro.placename} riseOnHover={true}>
                                                    <Tooltip>{gastro.placename}</Tooltip>
                                                    <Popup {...popUpSettings}>
                                                        <MapPopups content={gastro} />
                                                    </Popup>
                                                </Marker>
                                            )
                                        })}
                                    </FeatureGroup>
                                </LayersControl.Overlay>
                            </LayersControl>
                            <ControllingGroup />
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

import * as React from "react"
import { Row, Col } from "react-bootstrap"

const MapSidebar = ({ title = `million dollar babies` }) => {

    return (
        <div className="col-lg-2 col-md-12 column">
            <div className="row">{title}</div>
            <div className="row" style={{ height: "30%" }}>top</div>
            <div className="row">bottom</div>
        </div>
  )
}

export default MapSidebar

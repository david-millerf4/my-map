import * as React from "react"
import { Row, Col } from "react-bootstrap"

function MapSidebar({ title = `million dollar babies` }) {

    return (
        <div className="col-lg-2 col-md-12 column">
            <Row mx-0>
                <Col><h3>{title}</h3></Col>
            </Row>
            <div className="row" style={{ height: "30%" }}>top</div>
            <div className="row">bottom</div>
        </div>
    )
}

export default MapSidebar

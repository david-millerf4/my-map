import * as React from "react"
import { Row, Col } from "react-bootstrap"

const MapHeader = ({ title = "heroes", filters = `million dollar babies` }) => {

  return (
      <Row className="px-1 mx-0 map-header">
          <Col className="col-lg-2 map-info"><div>sidebar</div></Col>
          <Col className="col-lg-9  col-md-12 map-info"><h1>{title}</h1></Col>
          <Col className="col map-info"><div>{filters}</div></Col>
      </Row>
  )
}

export default MapHeader

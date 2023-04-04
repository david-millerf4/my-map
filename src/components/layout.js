import * as React from "react"
import { Link } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
            <Row className="px-5">
                <Col>
                    <Link className="header-link-home" to="/">{title}</Link>
                </Col>
                <Col>
                    <Link to="/maps">Markers</Link>
                </Col>
                <Col>
                    <Link to="/geomap">Geo Polygon</Link>
                </Col>
            </Row>
    )
  } else {
    header = (
            <Row className="px-5">
                <Col>
                    <Link className="header-link-home" to="/">{title}</Link>
                </Col>
                <Col>
                    <Link to="/maps">Markers</Link>
                </Col>
                <Col>
                    <Link to="/geomap">Geo Polygon</Link>
                </Col>
            </Row>
    )
  }

  return (
      <Container fluid className="global-wrapper p-0" data-is-root-path={isRootPath}>
            <header className="global-header">{header}</header>
            <main>{children}</main>
            <footer className="global-footer text-center">
                &copy; {new Date().getFullYear()} | An Electric Sunburst Production
            </footer>
      </Container>
  )
}

export default Layout

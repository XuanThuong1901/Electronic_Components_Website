import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import classes from "./HeadthyAd.module.css";

//images
import vegetable from "../../assets/images/slider/slider_bg_3.jpg";
import icon1 from "../../assets/icons/healthy_1.png";
import icon2 from "../../assets/icons/healthy_2.png";
import greenChilli from "../../assets/images/parallax_decors/h_healthy_green_chilli.png";
import redChilli from "../../assets/images/parallax_decors/h_healthy_red_chilli.png";
import yellowChilli from "../../assets/images/parallax_decors/h_healthy_yellow_chilli.png";
import cutChilli from "../../assets/images/parallax_decors/h_healthy_cut_chilli.png";

import Button from "../../components/UI/Button";
import { Link } from "react-router-dom";

const HealthyAd = () => {
  return (
    <section className="healthy" style={{ margin: "100px 0" }}>
      <Container>
        <Row className="align-items-center">
          <Col lg={4}>
            <div className={classes.headers}>
              <h2>Luôn luôn chất lượng</h2>
              <h1>
                Là lựa chọn tốt nhất cho <br /> công nghệ.
              </h1>
            </div>
          </Col>
          <Col lg={8} style={{position: "relative"}}>
            <img
              src={vegetable}
              alt="ảnh linh kiện"
              style={{ width: "80%", height: "80%" }}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HealthyAd;

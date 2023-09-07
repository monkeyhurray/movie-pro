import { useState } from "react";
import { wiseSaying } from "../wiseSaying";
import { Carousel } from "react-bootstrap";
import "../scss/WiseSaying.scss";

function WiseSaying() {
  const [actorSayings] = useState(wiseSaying);
  return <CarouselFadeExample actorSayings={actorSayings} />;
}

interface CarouselFadeExampleProps {
  actorSayings: {
    content: string;
    actor: string;
    img: string;
  }[];
}

function CarouselFadeExample({ actorSayings }: CarouselFadeExampleProps) {
  return (
    <Carousel fade>
      <Carousel.Item className="poster">
        <img
          className="actorImg"
          width={900}
          height={400}
          src={actorSayings[0].img}
        />
        <>
          <div className="say">
            <h5>{actorSayings[0].content}</h5>
            <h6>-{actorSayings[0].actor}-</h6>
          </div>
        </>
      </Carousel.Item>
      <Carousel.Item className="poster">
        <img
          className="d-blockw-100"
          width={900}
          height={400}
          src={actorSayings[1].img}
        />
        <>
          <div className="say">
            <h5>{actorSayings[1].content}</h5>
            <h6>-{actorSayings[1].actor}-</h6>
          </div>
        </>
      </Carousel.Item>
      <Carousel.Item className="poster">
        <img
          className="d-blockw-100"
          width={900}
          height={400}
          src={actorSayings[2].img}
        />
        <>
          {" "}
          <div className="say">
            <h5>{actorSayings[2].content}</h5>
            <h6>-{actorSayings[2].actor}-</h6>
          </div>
        </>
      </Carousel.Item>
      <Carousel.Item className="poster">
        <img
          className="d-blockw-100"
          width={900}
          height={400}
          src={actorSayings[3].img}
        />
        <>
          <div className="say">
            <h5>{actorSayings[3].content}</h5>
            <h6>-{actorSayings[3].actor}-</h6>
          </div>
        </>
      </Carousel.Item>
      <Carousel.Item className="poster">
        <img
          className="d-blockw-100"
          width={900}
          height={400}
          src={actorSayings[4].img}
        />
        <>
          <div className="say">
            <h5>{actorSayings[4].content}</h5>
            <h6>-{actorSayings[4].actor}-</h6>
          </div>
        </>{" "}
      </Carousel.Item>
    </Carousel>
  );
}

export default WiseSaying;

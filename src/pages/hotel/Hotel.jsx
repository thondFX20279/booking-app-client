import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Reserve from "../../components/Reserve/Reserve";
import useFetch from "../../hooks/useFetch";

const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const { data: hotel } = useFetch(`/hotels/find/${id}`);
  const [openReserve, setOpenReserve] = useState(false);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  // const showReserve = () => {
  //   setOpenReserve(true);
  // };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? hotel?.photos?.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === hotel?.photos?.length - 1 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={() => setOpen(false)} />
            <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={() => handleMove("l")} />
            <div className="sliderWrapper">
              <img src={hotel?.photos[slideNumber]} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={() => handleMove("r")} />
          </div>
        )}
        <div className="hotelWrapper">
          <h1 className="hotelTitle">{hotel?.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{hotel?.address}</span>
          </div>
          <span className="hotelDistance">Excellent location – {hotel?.distance} from center</span>
          <span className="hotelPriceHighlight">
            Book a stay over ${hotel?.cheapestPrice} at this property and get a free airport taxi
          </span>
          <div className="hotelImages">
            {hotel?.photos?.map((photo, i, photos) => (
              <div className="hotelImgWrapper" key={i}>
                <img onClick={() => handleOpen(i)} src={photo} alt="" className="hotelImg" />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{hotel?.name}</h1>
              <p className="hotelDesc">{hotel?.desc}</p>
            </div>
            <div className="hotelDetailsPrice">
              <h3>${hotel?.cheapestPrice} (1 nights)</h3>
              <button onClick={() => setOpenReserve(true)}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        {openReserve && <Reserve hotelId={id} />}
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;

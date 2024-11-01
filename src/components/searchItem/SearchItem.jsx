import { useNavigate } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ item }) => {
  const maxSubString = (string, maxLength) => {
    if (string.length >= maxLength) return string.substring(0, maxLength) + "...";
    return string;
  };
  const navigate = useNavigate();
  const handleSearchDetail = (id) => {
    navigate(`/hotels/${id}`);
  };
  return (
    <div className="searchItem">
      <img src={item?.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item?.name}</h1>
        <span className="siDistance">{item?.distance}m from center</span>
        <span className="siTaxiOp">{maxSubString(item.rooms[0].desc, 40)}</span>
        <span className="siSubtitle">{maxSubString(item?.address, 60)}</span>
        <span className="siFeatures" style={{ textTransform: "capitalize" }}>
          {item?.type}
        </span>
        {/* If can cancel */}

        <div>
          <span className="siCancelOp" style={{ display: "block" }}>
            Free cancellation{" "}
          </span>
          <span className="siCancelOpSubtitle">You can cancel later, so lock in this great price today!</span>
        </div>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>Excellent</span>
          <button>{item.rating}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">${item?.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className="siCheckButton" onClick={() => handleSearchDetail(item._id)}>
            See availability
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;

import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { data, loading } = useFetch("/hotels/top-rate?limit=3");
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/hotels/${id}`);
  };

  return (
    <div className="fp">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {data &&
            data.results?.map((topRateItem, i) => (
              <div className="fpItem" key={i}>
                <img src={topRateItem?.photos[0]} alt="" className="fpImg" />
                <span className="fpName">
                  <div
                    onClick={() => handleClick(topRateItem._id)}
                    style={{
                      color: "#5e37a5",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    {topRateItem.name}
                  </div>
                </span>
                <span className="fpCity">{topRateItem.city}</span>
                <span className="fpPrice">Starting from: ${topRateItem.cheapestPrice}</span>
                <div className="fpRating">
                  <button>{topRateItem.rating}</button>
                  <span>Excellent</span>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;

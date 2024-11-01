import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { data, loading } = useFetch("/hotels/top-rate?limit=3");
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
                  <a href={`/hotels/${topRateItem._id}`}>{topRateItem.name}</a>
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

import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading } = useFetch("/hotels/countByCity");
  const images = {
    hanoi: "https://booking-app-server-ze5e.onrender.com/images/cityImages/Ha-Noi.jpg",
    hoChiMinh: "https://booking-app-server-ze5e.onrender.com/images/cityImages/HCM.jpg",
    daNang: "https://booking-app-server-ze5e.onrender.com/images/cityImages/Da-Nang.jpg",
  };
  return (
    <div className="featured">
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <div className="featuredItem">
            <img src={images.hanoi} alt="" className="featuredImg" />
            <div className="featuredTitles">
              <h1>Ha Noi</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img src={images.hoChiMinh} alt="" className="featuredImg" />
            <div className="featuredTitles">
              <h1>Ho Chi Minh</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img src={images.daNang} alt="" className="featuredImg" />
            <div className="featuredTitles">
              <h1>Da Nang</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;

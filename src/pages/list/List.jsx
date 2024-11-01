import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(999);
  const { data, reFetch } = useFetch(
    `/hotels?city=${destination}&min=${min}&max=${max}&maxPeople=${+options.adult + +options.children}&numberOfRooms=${
      options.room
    }&dateStart=${date[0].startDate}&dateEnd=${date[0].endDate}`
  );
  const handleOptionChange = (field, value) => {
    setOptions((pre) => {
      return { ...pre, [field]: value };
    });
  };
  const handleSearch = () => {
    reFetch();
  };
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input
                placeholder={destination}
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                date[0].endDate,
                "MM/dd/yyyy"
              )}`}</span>
              {openDate && (
                <DateRange onChange={(item) => setDate([item.selection])} minDate={new Date()} ranges={date} />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    className="lsOptionInput"
                    value={min}
                    min={0}
                    onChange={(e) => setMin(Math.max(0, e.target.value))}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    className="lsOptionInput"
                    value={max}
                    min={0}
                    onChange={(e) => setMax(Math.max(0, e.target.value))}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                    value={options.adult}
                    onChange={(e) => handleOptionChange("adult", Math.max(0, e.target.value))}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                    value={options.children}
                    onChange={(e) => handleOptionChange("children", Math.max(0, e.target.value))}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    value={options.room}
                    placeholder={options.room}
                    onChange={(e) => handleOptionChange("room", Math.max(0, e.target.value))}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="listResult">
            {data.length === 0 && <h1 style={{ textAlign: "center" }}>No Hotel Found</h1>}
            {data.length !== 0 && data.map((item, index) => <SearchItem key={index} item={item} />)}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default List;

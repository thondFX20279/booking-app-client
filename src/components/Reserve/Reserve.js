import { useAuth } from "../../context/AuthContext";
import React, { useState, useEffect } from "react";
import "./Reserve.css";
import useFetch from "../../hooks/useFetch";
import { DateRange } from "react-date-range";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
const Reserve = ({ hotelId }) => {
  const { user } = useAuth(); // Lấy user từ AuthContext nếu đã login
  const navigate = useNavigate();
  const [selectedRooms, setSelectedRooms] = useState([]); // Danh sách phòng được chọn
  const [payment, setPayment] = useState("");
  const [totalBill, setTotalBill] = useState(0); // Tổng tiền
  const [formData, setFormData] = useState({
    fullName: user ? user.fullName : "",
    email: user ? user.email : "",
    phoneNumber: user ? user.phoneNumber : "",
    cardNumber: "",
  });

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const formatDate = (date) => {
    return date.toISOString().split("T")[0]; // Get only the date part
  };
  const { data: AvailableRoom } = useFetch(
    `/rooms/availableRooms/${hotelId}?dateStart=${formatDate(date[0].startDate)}&dateEnd=${formatDate(date[0].endDate)}`
  );
  useEffect(() => {
    calculateTotalBill(selectedRooms);
  }, [date, selectedRooms]);
  // Tính tổng tiền dựa trên phòng và số ngày ở
  const calculateTotalBill = (rooms) => {
    const numDays = Math.ceil((date[0].endDate - date[0].startDate) / (1000 * 60 * 60 * 24)) + 1;

    const totalBill = rooms.reduce((t, selectedRoom) => {
      return t + selectedRoom.price * numDays;
    }, 0);
    setTotalBill(totalBill);
  };

  // Hàm xử lý khi chọn phòng
  const handleRoomSelect = (price, roomNumber, isChecked) => {
    const updatedRooms = isChecked
      ? [...selectedRooms, { room: roomNumber, price }]
      : selectedRooms.filter((roomSelected) => roomSelected.room !== roomNumber);
    setSelectedRooms(updatedRooms);
    calculateTotalBill(updatedRooms);
  };

  const handlePayment = (e) => {
    setPayment(e.target.value);
  };
  // Hàm submit đặt phòng
  const handleReserve = async () => {
    try {
      if (!user) {
        const confirm = window.confirm("You are not login! Login now?");
        if (confirm) {
          return navigate("/login");
        }
        return;
      }
      if (selectedRooms.length === 0) {
        return alert("Please choose your room!");
      }
      const room = selectedRooms.flatMap((selectedRoom) => selectedRoom.room);
      const response = await axiosClient.post("/transactions", {
        userId: user._id,
        hotelId: hotelId,
        room,
        dateStart: date[0].startDate,
        dateEnd: date[0].endDate,
        price: totalBill,
        payment,
      });
      if (response.status === 201) {
        alert("Reservation successful!");
        navigate("/transactions");
      }
      // Điều hướng đến Transaction Dashboard hoặc trang khác nếu cần
    } catch (error) {
      console.error("Error reserving room:", error);
      alert("Reservation failed.");
    }
  };

  // Hàm xử lý khi điền thông tin form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="reserve">
      <div className="flex">
        <div className="date1">
          <h2>Date</h2>
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
          />
        </div>
        <div className="reverseInfo">
          <h2>Reverse Info</h2>
          <div className="form-controls">
            <label htmlFor="fullName">Your full name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} />
          </div>
          <div className="form-controls">
            <label htmlFor="phoneNumber">Your Phone number</label>
            <input type="number" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
          </div>
          <div className="form-controls">
            <label htmlFor="email">Your Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
          </div>
          <div className="form-controls">
            <label htmlFor="cardNumber">Your identity card number</label>
            <input type="number" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} />
          </div>
        </div>
      </div>
      <div className="rooms">
        <h2>Select rooms</h2>
        <div className="selectrooms" style={{ display: "flex", gap: "30px" }}>
          {AvailableRoom &&
            AvailableRoom.map((roomType, index) => (
              <div style={{ flex: 1 }} key={index}>
                <div className="room">
                  <p className="roomTitle" style={{ fontWeight: "bold" }}>
                    {roomType?.title}
                  </p>
                  <p className="desc">{roomType?.desc}</p>
                  <p className="maxPeople">
                    Max People: <span style={{ fontWeight: "bold" }}>{roomType?.maxPeople}</span>
                  </p>
                  <p className="price" style={{ fontWeight: "bold" }}>
                    Price: {roomType?.price}
                  </p>
                </div>
                <div style={{ display: "flex" }}>
                  {roomType.roomNumbers.map((roomNumber, index) => (
                    <div style={{ display: "flex", marginRight: "10px", gap: "5px" }} key={index}>
                      <p>{roomNumber}</p>
                      <input
                        type="checkbox"
                        onChange={(e) => handleRoomSelect(+roomType.price, +roomNumber, e.target.checked)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
      <div>
        <h2>Total Bill: {totalBill}$</h2>
        <div style={{ display: "flex", gap: "50px" }}>
          <select name="payment" id="" onChange={handlePayment} value={payment}>
            <option value="">Select payment method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
          </select>
          <button
            onClick={handleReserve}
            className={`btn ${!formData.email ? "disable" : ""}`}
            disabled={!formData.email}
          >
            Reserve Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reserve;

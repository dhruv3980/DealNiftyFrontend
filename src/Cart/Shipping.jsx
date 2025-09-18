import React, { useState } from "react";
import "../CartStyles/Shipping.css";
import Pagetitle from "../components/Pagetitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CheckOutPart from "./CheckOutPart";
import { useDispatch, useSelector } from "react-redux";
import { Country, State, City } from "country-state-city";
import { toast } from "react-toastify";
import { saveShippingInfo } from "../features/Cart/cartSlice";
import { Navigate, useNavigate } from "react-router-dom";

const Shipping = () => {
  const { shippingInfo } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const [address, setAddress] = useState(shippingInfo.address||"");
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode||'');
  const [phoneNumber, setphoneNumber] = useState(shippingInfo.phoneNumber||"");
  const [country, setCountry] = useState(shippingInfo.country||"");
  const [state, setState] = useState(shippingInfo.state);
  const [city, setCity] = useState(shippingInfo.city||"");
  const navigate = useNavigate()

  function handleAddressSubmit(e) {
    e.preventDefault();
    if(phoneNumber.length!==10){
        toast.info('Invalid Phone Number ', {position:'top-center', autoClose:2000})

        return;
    }
    if(!address || !pinCode || !phoneNumber || !country || !state || !city){
      toast.info('fill out all the details', {autoClose:2000});

      return;

    }

    dispatch(saveShippingInfo({
        address,
        pinCode,
        phoneNumber,
        country,
        state,
        city
    }))

    navigate('/order/confirm')


  }

  return (
    <div>
      <Pagetitle title="Shipping Info"></Pagetitle>
      <Navbar />
      <CheckOutPart active={0} />

      <div className="shipping-form-container">
        <h1 className="shipping-form-header">Shipping Details</h1>

        <form className="shipping-form" onSubmit={handleAddressSubmit}>
          <div className="shipping-section">
            <div className="shipping-form-group">
              <label htmlFor="address">Address</label>

              <input
                type="text"
                name="address"
                id="address"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="shipping-form-group">
              <label htmlFor="pincode">Pincode</label>
              <input
                type="Number"
                id="pincode"
                name="pincode"
                placeholder="Enter Your Pincode"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div className="shipping-form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter Your Phone Number"
                value={phoneNumber}
                onChange={(e) => setphoneNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="shipping-section">
            <div className="shipping-form-group">
              <label htmlFor="country">Country</label>
              <select
                id="country"
                value={country}
                onChange={
                    (e) =>{
                        
                        setCountry(e.target.value)
                        setState('')
                        setCity('')
                    
                    }

                }
              >
                <option value="">Select a Country</option>
                {Country &&
                  Country.getAllCountries().map((item, idx) => (
                    <option value={item.isoCode} key={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div className="shipping-form-group">
                <label htmlFor="state">State</label>

                <select
                  name="state"
                  id="state"
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value)
                    setCity('')

                  }}
                >
                  <option value="">Select a state</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item, idx) => (
                      <option value={item.isoCode} key={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            { state && 
                <div className="shipping-form-group">
              <label htmlFor="state">City</label>

              <select
                name="city"
                id="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="">Select a city</option>
                {City &&
                  City.getCitiesOfState(country, state).map((item, idx) => (
                    <option value={item.isoCode} key={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>}
          </div>

          <button className="shipping-submit-btn">Continue</button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Shipping;

import React from "react";
import "../CartStyles/CheckoutPath.css";
import {
  AccountBalance,
  LibraryAddCheck,
  LocalShipping,
} from "@mui/icons-material";


const CheckOutPart = ({ active }) => {
  const path = [
    {
      label: "Shipping Details",
      icon: <LocalShipping />,
    },
    {
      label: "Confirm Order",
      icon: <LibraryAddCheck />,
    },
    {
      label: "Payment",
      icon: <AccountBalance />,
    },
  ];

  return (
    <div className="checkoutPath">
      {path.map((item, idx) => (
        <div
          className="checkoutPath-step"
          key={idx}
          active={active === idx ? "true" : "false"}
          completed={active >= idx ? "true" : "false"}
        >
          <p className="checkoutPath-icon">{item.icon}</p>
          <p className="checkoutPath-label">{item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default CheckOutPart;

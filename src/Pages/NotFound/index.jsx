import React from "react";

import NotFoundImage from "../../Assests/404.png";

function NotFound(props) {
  return (
    <div style={{ textAlign: "center", marginTop: 5 }}>
      <img src={NotFoundImage} style={{ width: "60%" }} alt="not found" />
    </div>
  );
}

export default NotFound;

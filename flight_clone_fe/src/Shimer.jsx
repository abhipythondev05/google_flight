import React from "react";
import Skeleton from "@mui/material/Skeleton";

function Shimer() {
  return (
    <div className="my-15 mb-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-48">
      <Skeleton
        variant="rectangular"
        height={100}
        className="rounded-md"
        sx={{ bgcolor: "gray.600" }}
      />
    </div>
  );
}

export default Shimer;

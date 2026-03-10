import React, { Suspense } from "react";
import { BarLoader } from "react-spinners";

const Layout = ({ children }) => {
  return (
    <div className="px-8 mt-20 min-w-0">
      <div className="mb-8">
        <h1 className="text-6xl md:text-7xl font-bold gradient-title">
          Industry Insights
        </h1>
      </div>

      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="gray" />}
      >
        <div className="min-w-0">
          {children}
        </div>
      </Suspense>
    </div>
  );
};

export default Layout;
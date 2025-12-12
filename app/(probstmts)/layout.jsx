import React from "react";
import "../globals.css";

export default function probstmtsLayout({ children }) {
  return (  
      <div className="bg-[#0f1214] min-h-screen">
        {children}
      </div>
  );
}
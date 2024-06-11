import { useEffect } from "react";
export default function InfoTab(){

  return (
    <>
      <div className="infotab">
        <div className="infotab-header">
          
        </div>
        <hr></hr>
        <div className="infotab-content"></div>
        {children}
      </div>
    </>
  );
}
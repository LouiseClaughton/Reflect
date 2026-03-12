import React from "react";
import GetActiveCollabData from "../activecollab";
import LiquidGlassBtn from "../Components/liquid-glass-btn";
import LiquidGlassContainer from "../Components/liquid-glass-container";

function DisplayTasks() {
  const { totalTasks } = GetActiveCollabData();

  return (
      <div className="w-[80%] h-[80%] flex flex-col justify-center items-center mx-auto my-8 gap-8">
          <LiquidGlassContainer className="m-12">
              <span>You completed</span>
              <h1>{totalTasks}</h1>
              <span>tasks this year</span>
          </LiquidGlassContainer>
          <LiquidGlassBtn href='/time' className="bg-linear-to-r from-cyan-500 to-blue-500">
              Next
          </LiquidGlassBtn>
      </div>
  );
}

export default DisplayTasks;
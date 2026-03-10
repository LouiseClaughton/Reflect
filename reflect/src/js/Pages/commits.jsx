import { useState, useEffect } from 'react'
import getGitHubData from '../github';
import LiquidGlassBtn from '../Components/liquid-glass-btn';
import LiquidGlassContainer from '../Components/liquid-glass-container';

function DisplayCommits() {
    const { commitsThisYear, commitsPerMonth } = getGitHubData();

    const counts = commitsPerMonth?.counts || {};
    const maxMonth = commitsPerMonth?.maxMonth || 'None';
    const maxCount = commitsPerMonth?.maxCount || 0;

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <LiquidGlassContainer className="m-12">
                <span>You committed</span>
                <h1>{commitsThisYear.length} times</h1>
                <span>Your most active month was {maxMonth} with {maxCount} commits</span>
            </LiquidGlassContainer>
            <div className="flex items-end gap-2 h-[15rem]">
                {Object.entries(counts).map(([key, value]) => {
                    let height = (value / 10) * 100; // percentage
                    if (height == 0) {
                        height = 5;
                    }
                    return (
                        <div className="flex flex-col items-center justify-end h-full">
                            <span>{value}</span>
                            <div key={key} className="bg-green-500 w-full flex justify-center rounded" style={{ height: `${height}%` }}></div>
                            {key.substring(0,3)}
                        </div>
                    );
                })}
            </div>
            <LiquidGlassBtn href='/repositories'>
                Next
            </LiquidGlassBtn>
        </div>
    );
}

export default DisplayCommits;
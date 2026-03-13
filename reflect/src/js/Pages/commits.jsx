import { useState, useEffect } from 'react'
import getGitHubData from '../github';
import LiquidGlassBtn from '../Components/liquid-glass-btn';
import LiquidGlassContainer from '../Components/liquid-glass-container';
import Authenticated from '../Components/authenticated-layout';

function DisplayCommits() {
    const { commitsThisYear, commitsPerMonth } = getGitHubData();

    const counts = commitsPerMonth?.counts || {};
    const maxMonth = commitsPerMonth?.maxMonth || 'None';
    const maxCount = commitsPerMonth?.maxCount || 0;
    const maxCommits = Math.max(...Object.values(counts));

    return (
        <Authenticated>
            <div className="w-[80%] h-[80%] flex flex-col justify-center items-center mx-auto my-8 gap-8">
                <LiquidGlassContainer>
                    <span>You committed</span>
                    <h1>{commitsThisYear.length} times</h1>
                    <span>Your most active month was {maxMonth} with {maxCount} commits</span>
                </LiquidGlassContainer>
                <div className="flex items-end gap-2 h-[12rem]">
                    {Object.entries(counts).map(([key, value]) => {
                        let height = (value / maxCommits) * 100;
                        if (height === 0) {
                            height = 5; // minimum visible bar
                        }
                        return (
                            <div key={key} className="flex flex-col items-center justify-end h-full">
                                <span>{value}</span>
                                <div
                                    className="bg-green-500 w-full rounded"
                                    style={{ height: `${height}%` }}
                                />
                                {key.substring(0,3)}
                            </div>
                        );
                    })}
                </div>
                <LiquidGlassBtn href='/repositories' className="bg-linear-to-r from-cyan-500 to-blue-500">
                    Next
                </LiquidGlassBtn>
            </div>
        </Authenticated>
    );
}

export default DisplayCommits;
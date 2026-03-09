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
            <LiquidGlassBtn href='/commits'>
                Next
            </LiquidGlassBtn>
        </div>
    );
}

export default DisplayCommits;
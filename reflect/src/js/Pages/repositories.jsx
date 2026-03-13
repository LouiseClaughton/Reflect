import { useState, useEffect } from 'react'
import getGitHubData from '../github';
import LiquidGlassBtn from '../Components/liquid-glass-btn';
import LiquidGlassContainer from '../Components/liquid-glass-container';
import Authenticated from '../Components/authenticated-layout';

function DisplayRepositories() {
    let { mostActiveRepo } = getGitHubData();

    if (mostActiveRepo != null) {
        return (
            <Authenticated>
                <div className="w-[80%] h-[80%] flex flex-col justify-center items-center mx-auto my-8 gap-8">
                    <LiquidGlassContainer className="m-12">
                        <span>Your most active repository was</span>
                        <h1>{mostActiveRepo.repo}</h1>
                        <span>with {mostActiveRepo.commits} commits and {mostActiveRepo.prs} pull requests</span>
                    </LiquidGlassContainer>
                    <LiquidGlassBtn href='/tasks' className="bg-linear-to-r from-cyan-500 to-blue-500">
                        Next
                    </LiquidGlassBtn>
                </div>
            </Authenticated>
        );
    }
}

export default DisplayRepositories;
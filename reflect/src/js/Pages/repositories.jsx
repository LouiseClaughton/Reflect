import { useState, useEffect } from 'react'
import getGitHubData from '../github';
import LiquidGlassBtn from '../Components/liquid-glass-btn';
import LiquidGlassContainer from '../Components/liquid-glass-container';

function DisplayRepositories() {
    let { mostCommitsRepo, mostPRsRepo } = getGitHubData();
    let mostActiveRepo = '';

    if (mostCommitsRepo != null && mostPRsRepo != null) {
        mostActiveRepo = {
            name: mostCommitsRepo.repo,
            count: mostCommitsRepo.count,
            pr_count: mostPRsRepo.count
        }
    }

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <LiquidGlassContainer className="m-12">
                <span>Your most active repository was</span>
                <h1>{mostActiveRepo.name}</h1>
                <span>with {mostActiveRepo.count} commits and {mostActiveRepo.pr_count} pull requests</span>
            </LiquidGlassContainer>
            <LiquidGlassBtn href='/commits'>
                Next
            </LiquidGlassBtn>
        </div>
    );
}

export default DisplayRepositories;
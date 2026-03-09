import { useState, useEffect } from 'react'
import getGitHubData from '../github';

function DisplayCommits() {
    const { repos, commitsThisYear, commitsPerMonth } = getGitHubData();

    return (
        <>

            <span>You committed</span>
            <h2>{commitsThisYear.length} times</h2>

            <span>March was your most active month, with 2 commits</span>

            <h2>Repositories</h2>
            {repos.map(repo => (
                <div key={repo.id} className="p-3 bg-slate-800 rounded mb-2">
                {repo.name}
                </div>
            ))}

            <h2>Commits this year: {commitsThisYear.length}</h2>
            {commitsThisYear.map(commit => (
                <div className="p-3 bg-slate-800 rounded mb-2">
                {commit.commit.message}
                </div>
            ))}

            <h2>Commits per month: </h2>
            {Object.entries(commitsPerMonth).map(([month, count]) => (
                <div key={month} className="p-3 bg-slate-800 rounded mb-2">
                {month}: {count} commits
                </div>
            ))}
        </>
    );
}

export default DisplayCommits;
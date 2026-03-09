import { useState, useEffect } from 'react'

function GetGitHubData() {
    const [repos, setRepos] = useState([]);
    const [commits, setCommits] = useState([]);

    useEffect(() => {
        async function fetchRepos() {
        const response = await fetch("https://api.github.com/user/repos", {
            headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
            }
        });

        const data = await response.json();
        setRepos(data);
        }

        fetchRepos();

        async function getCommits(owner, repo) {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits`, {
            headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
            }
        });

        const commits = await response.json();
        setCommits(commits);
        }

        getCommits('LouiseClaughton', 'Reflect');

        function commitsPerMonth(commits) {
        const counts = {};

        commits.forEach(commit => {
            const month = commit.commit.author.date.slice(0,7); // YYYY-MM
            counts[month] = (counts[month] || 0) + 1;
        });

        return counts;
        }

        console.log(commitsPerMonth(commits));
    }, []);

    return (
        <>
        <h2>Repositories</h2>
        {repos.map(repo => (
            <div key={repo.id} className="p-3 bg-slate-800 rounded mb-2">
            {repo.name}
            </div>
        ))}

        <h2>Commits</h2>
        {commits.length}
        {commits.map(commit => (
            <div className="p-3 bg-slate-800 rounded mb-2">
            {commit.commit.message}
            </div>
        ))}
        </>
    );
}

export default GetGitHubData;
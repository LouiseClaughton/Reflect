import { useState, useEffect } from 'react'

function GetGitHubData() {
    const [repos, setRepos] = useState([]);
    const [commitsThisYear, setCommitsThisYear] = useState([]);

    const yearStart = new Date(new Date().getFullYear(), 0, 1).toISOString();

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

        async function fetchOrgRepos() {
            const response = await fetch(
                "https://api.github.com/orgs/Flaunt-Digital/repos",
                {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
                    }
                }
            );

            const data = await response.json();

        }

        fetchRepos();
        fetchOrgRepos();

        async function getCommits(owner, repo) {
            const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?since=${yearStart}`, {
                headers: {
                Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
                }
            });

            const commits = await response.json();
            setCommitsThisYear(commits);
        }

        getCommits('LouiseClaughton', 'Reflect');
    }, []);

    function commitsPerMonth(commits) {
        const counts = {};

        commits.forEach(commit => {
            const date = new Date(commit.commit.author.date);
            const month = date.toLocaleString("default", { month: "short" });

            counts[month] = (counts[month] || 0) + 1;
        });

        return counts;
    }

    return (
        <>
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
        </>
    );
}

export default GetGitHubData;
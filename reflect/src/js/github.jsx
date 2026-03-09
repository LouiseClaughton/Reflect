import { useState, useEffect } from 'react'

export function GetGitHubData() {
    const [repos, setRepos] = useState([]);
    const [commitsPerMonth, setCommitsPerMonth] = useState([]);
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

    useEffect(() => {
        function getCommitsPerMonth(commits) {
            const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
            
            const counts = {};
            monthNames.forEach(month => counts[month] = 0);

            commits.forEach(commit => {
                const date = new Date(commit.commit.author.date);
                const month = date.toLocaleString("default", { month: "short" });

                counts[month] = (counts[month] || 0) + 1;
            });

            return counts;
        }

        setCommitsPerMonth(getCommitsPerMonth(commitsThisYear));
    }, [commitsThisYear]);

    return { repos, commitsThisYear, commitsPerMonth };
}

export default GetGitHubData;
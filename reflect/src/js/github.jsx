import { useState, useEffect } from 'react'

export function GetGitHubData() {
    const [repos, setRepos] = useState([]);
    const [mostCommitsRepo, setMostCommitsRepo] = useState(null);
    const [mostPRsRepo, setMostPRsRepo] = useState(null);
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

        fetchRepos();

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
            const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            
            const counts = {};
            monthNames.forEach(month => counts[month] = 0);

            commits.forEach(commit => {
                const date = new Date(commit.commit.author.date);
                const month = date.toLocaleString("default", { month: "long" });

                counts[month] = (counts[month] || 0) + 1;
            });

            // Find the month with the most commits
            let maxMonth = null;
            let maxCount = 0;
            for (const [month, count] of Object.entries(counts)) {
                if (count > maxCount) {
                    maxCount = count;
                    maxMonth = month;
                }
            }

            return { counts, maxMonth, maxCount };
        }

        setCommitsPerMonth(getCommitsPerMonth(commitsThisYear));
    }, [commitsThisYear]);

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
    }, []);

    useEffect(() => {
        if (!repos.length) return;

        async function getRepoStats() {

            const commitPromises = repos.map(repo =>
                fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?since=${yearStart}&per_page=100`, {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
                    }
                }).then(res => res.json())
            );

            const prPromises = repos.map(repo =>
                fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/pulls?state=all&per_page=100`, {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
                    }
                }).then(res => res.json())
            );

            const commitResults = await Promise.all(commitPromises);
            const prResults = await Promise.all(prPromises);

            let commitCounts = [];
            let prCounts = [];

            repos.forEach((repo, i) => {

                const commits = commitResults[i];
                const prs = prResults[i];

                const prsThisYear = prs.filter(pr =>
                    new Date(pr.created_at) >= new Date(yearStart)
                );

                commitCounts.push({
                    repo: repo.name,
                    count: commits.length
                });

                prCounts.push({
                    repo: repo.name,
                    count: prsThisYear.length
                });
            });

            const mostCommits = commitCounts.reduce((max, repo) =>
                repo.count > max.count ? repo : max
            );

            const mostPRs = prCounts.reduce((max, repo) =>
                repo.count > max.count ? repo : max
            );

            setMostCommitsRepo(mostCommits);
            setMostPRsRepo(mostPRs);
        }

        getRepoStats();

    }, [repos]);

    return { repos, commitsThisYear, commitsPerMonth, mostCommitsRepo, mostPRsRepo };
}

export default GetGitHubData;
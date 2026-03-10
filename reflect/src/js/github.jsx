import { useState, useEffect } from 'react'

export function GetGitHubData() {
    const [repos, setRepos] = useState([]);
    const [commitsPerMonth, setCommitsPerMonth] = useState([]);
    const [commitsThisYear, setCommitsThisYear] = useState([]);

    const yearStart = new Date(new Date().getFullYear(), 0, 1).toISOString();

    useEffect(() => {
        async function fetchRepos() {
            const response = await fetch("https://api.github.com/user/repos");

            const data = await response.json();
            setRepos(data);
        }

        fetchRepos();

        async function getCommits(owner, repo) {
            const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?since=${yearStart}`);

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

    return { repos, commitsThisYear, commitsPerMonth };
}

export default GetGitHubData;
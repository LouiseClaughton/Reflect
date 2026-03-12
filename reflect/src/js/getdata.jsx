import { useState, useEffect } from "react";

export function useDashboardData() {

    const [data, setData] = useState({
        github: null,
        bitbucket: null,
        activecollab: null
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function fetchData() {

            try {

                const [github, bitbucket, activecollab] = await Promise.all([

                    fetch("http://localhost:3000/github/stats").then(r => r.json()),

                    fetch("http://localhost:3000/bitbucket/stats").then(r => r.json()),

                    fetch("http://localhost:3000/activecollab/projects").then(r => r.json())

                ]);

                setData({
                    github,
                    bitbucket,
                    activecollab
                });

                setLoading(false);

            } catch (err) {

                console.error(err);

            }

        }

        fetchData();

    }, []);

    return { data, loading };

}
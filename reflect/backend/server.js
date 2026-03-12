import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();

let activeCollabToken = null;
let activeCollabAccountUrl = null;

// --------------------------
// CORS
// --------------------------

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());

// Handle OPTIONS preflight for /login
app.options("/login", (req, res) => {
  res.sendStatus(200);
});

app.options("/projects", (req, res) => {
  res.sendStatus(200);
});

/* --------------------------
   OAuth Callback (GitHub + Bitbucket)
-------------------------- */

app.get("/oauth/callback", async (req, res) => {

    const { code, state } = req.query;
    const provider = state;

    if (!code || !provider) {
        return res.status(400).json({ error: "Code or provider missing" });
    }

    try {

        let tokenUrl;
        let body;
        let headers = { Accept: "application/json" };

        /* ---------- GitHub ---------- */

        if (provider === "github") {

            tokenUrl = "https://github.com/login/oauth/access_token";

            body = JSON.stringify({
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code
            });

        }

        /* ---------- Bitbucket ---------- */

        if (provider === "bitbucket") {

            tokenUrl = "https://bitbucket.org/site/oauth2/access_token";

            const form = new URLSearchParams();
            form.append("grant_type", "authorization_code");
            form.append("code", code);

            body = form;

            headers = {
                Authorization:
                    "Basic " +
                    Buffer.from(
                        process.env.BITBUCKET_CLIENT_ID +
                        ":" +
                        process.env.BITBUCKET_CLIENT_SECRET
                    ).toString("base64"),
                "Content-Type": "application/x-www-form-urlencoded"
            };

        }

        const response = await fetch(tokenUrl, {
            method: "POST",
            headers,
            body
        });

        const data = await response.json();

        res.json({
            provider,
            ...data
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Token exchange failed"
        });
    }
});


/* --------------------------
   ActiveCollab API Routes
-------------------------- */

// Fetch users
app.get("/users", async (req, res) => {
    console.log("===== /users request received =====");

    try {
        const usersEndpoint = `https://app.activecollab.com/459589/api/v1/users`;

        const response = await axios.get(usersEndpoint, {
            headers: { 
                "Authorization": "Bearer cLZqe8egZDTfNYjh5SKSp7Lcn1KQFdF7PbDO0eWL",
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error("Fetch users error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

// Fetch projects from ActiveCollab
app.get("/projects", async (req, res) => {
    console.log("===== /projects request received =====");

    try {
        const projectsEndpoint = `https://app.activecollab.com/459589/api/v1/projects`;

        const projectsResponse = await axios.get(projectsEndpoint, {
            headers: { 
                "Authorization": "Bearer cLZqe8egZDTfNYjh5SKSp7Lcn1KQFdF7PbDO0eWL",
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });

        const projects = projectsResponse.data;

        for (const project of projects) {

            // Fetch tasks per project
            const tasksResponse = await axios.get(
                `https://app.activecollab.com/459589/api/v1/projects/${project.id}/tasks`,
                {
                    headers: {
                        "Authorization": "Bearer cLZqe8egZDTfNYjh5SKSp7Lcn1KQFdF7PbDO0eWL",
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                }
            );

            // Attach tasks to the project object
            project.tasks = tasksResponse.data;

            // Fetch time records per project
            const timeResponse = await axios.get(
                `https://app.activecollab.com/459589/api/v1/projects/${project.id}/time-records`,
                {
                    headers: {
                        "Authorization": "Bearer cLZqe8egZDTfNYjh5SKSp7Lcn1KQFdF7PbDO0eWL",
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                }
            );

            // Attach time to the project object
            project.time = timeResponse.data;
        }

        res.json(projects);

    } catch (error) {
        console.error("Fetch projects error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch projects" });
    }
});

/* --------------------------
   Server Start
-------------------------- */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
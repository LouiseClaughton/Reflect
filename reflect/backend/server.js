import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors()); // allow requests from frontend
app.use(express.json());

app.get("/oauth/callback", async (req, res) => {
    const code = req.query.code;
    if (!code) return res.status(400).json({ error: "Code not provided" });

    try {
        const response = await fetch("https://github.com/login/oauth/access_token", {
            method: "POST",
            headers: { Accept: "application/json" },
            body: JSON.stringify({
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            }),
        });

        const data = await response.json();
        res.json(data); // returns { access_token, token_type, scope }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to get access token" });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/oauth/callback", async (req, res) => {
    const { code, provider } = req.query;

    if (!code || !provider) {
        return res.status(400).json({ error: "Code or provider missing" });
    }

    try {
        let tokenUrl;
        let body;
        let headers = { Accept: "application/json" };

        if (provider === "github") {
            tokenUrl = "https://github.com/login/oauth/access_token";

            body = JSON.stringify({
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            });
        }

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
                "Content-Type": "application/x-www-form-urlencoded",
            };
        }

        if (provider === "activecollab") {
            tokenUrl = "https://app.activecollab.com/oauth2/token";

            body = JSON.stringify({
                grant_type: "authorization_code",
                client_id: process.env.ACTIVECOLLAB_CLIENT_ID,
                client_secret: process.env.ACTIVECOLLAB_CLIENT_SECRET,
                code,
            });
        }

        const response = await fetch(tokenUrl, {
            method: "POST",
            headers,
            body,
        });

        const data = await response.json();

        res.json({
            provider,
            ...data,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Token exchange failed" });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
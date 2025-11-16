export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        if (url.pathname === "/assets/images/logo.png") {
            const now = new Date();
            const month = now.getUTCMonth() + 1;  // 1–12
            const day = now.getUTCDate();

            const isChristmas =
                (month === 11) ||
                (month === 12);

            const file = isChristmas
                ? "assets/images/christmas.png"
                : "assets/images/normal.png";

            return env.ASSETS.fetch("https://fake/" + file);
        }

        // Everything else served normally
        return env.ASSETS.fetch(request);
    }
};

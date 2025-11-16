export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        
        if (url.pathname === "/assets/images/logo.png") {
            const now = new Date();
            const month = now.getUTCMonth() + 1;
            const day = now.getUTCDate();

            const isChristmas = month === 11 || month === 12;

            const file = isChristmas
                ? "/assets/images/christmas.png"
                : "/assets/images/normal.png";

            const assetUrl = new URL(request.url);
            assetUrl.pathname = file;

            const assetRequest = new Request(assetUrl.toString(), request);
            return env.ASSETS.fetch(assetRequest);
        }

        return env.ASSETS.fetch(request);
    }
};

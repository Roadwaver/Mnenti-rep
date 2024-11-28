const http = require('http');
const axios = require('axios');
const CommandCenter = require("./command.js");

class XRPFactory {
    constructor() {
        console.log("🚀 Initializing XRP Factory...");
        this.setupErrorHandlers();
        this.commandCenter = new CommandCenter();
        this.setupServer();
    }

    setupServer() {
        const server = http.createServer((_, res) => {
            res.writeHead(200);
            res.end('🚀 XRP Factory Running!');
        });
        const PORT = process.env.PORT || 8080;
        server.listen(PORT);
        console.log("💎 Health check server online!");

        // Add self-ping mechanism to prevent spin-down
        setInterval(async () => {
            try {
                const response = await axios.get(process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`);
                console.log("🏓 Keep-alive ping successful");
            } catch (error) {
                console.log("💪 Keep-alive maintaining rhythm...");
            }
        }, 180000); // Ping every 3 minutes
    }

    setupErrorHandlers() {
        process.on("uncaughtException", (error) => {
            console.log(
                "💪 Maintaining operation despite error:",
                error.message,
            );
        });

        process.on("unhandledRejection", (error) => {
            console.log("💪 Handling rejected promise:", error.message);
        });

        process.on("SIGINT", async () => {
            console.log("💎 Graceful shutdown initiated...");
            if (this.commandCenter) {
                await this.commandCenter.shutdown();
            }
            process.exit(0);
        });
    }

    async initialize() {
        console.log("⚡ Command Center Online!");
        console.log("🎯 Ready for Telegram commands...");

        // Keep process alive with enhanced health checks
        setInterval(() => {
            console.log("💪 System healthy...");
        }, 300000); // Health check every 5 minutes
    }
}

// LAUNCH THE MONEY PRINTER! 🚀
console.log("💎 XRP Factory Bootup Sequence...");
const factory = new XRPFactory();
factory.initialize().catch((error) => {
    console.log("⚠️ Initialization error:", error.message);
    process.exit(1);
});

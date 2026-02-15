import "dotenv/config";
import app from "./app.js";
import runMigrations from "./db/init.js";

const PORT = process.env.PORT || 8000;

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is missing");
  process.exit(1);
}

(async () => {
  await runMigrations();   
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();

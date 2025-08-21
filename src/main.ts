import { ENV } from "./config/env";
import { connectDB } from "./config/db";
import app from "./app";

(async () => {
  await connectDB();
  app.listen(ENV.PORT, () => {
    console.log(`🚀 Server running on port ${ENV.PORT}`);
  });
})();

import app from "./server/server";

import "./server/models/User";
import "./server/models/Video";

import "./server/db";
import "./server/routes/rootRouter";
import "./server/routes/userRouter";
import "./server/routes/videoRouter";
const PORT: number = 5000;

const handleListening = () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
};
app.listen(PORT, handleListening);

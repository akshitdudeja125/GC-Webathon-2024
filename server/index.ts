import app from "./src/app";
import { PORT } from "./src/config/config";
export const baseUrl = "http://localhost:3002";
const port = PORT;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";

//connections and listners
const PORT = process.env.PORT || 5000;
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on port 3000");
    });
  })
  
  .catch((error) => {
    console.error("Server open and coonect to database:", error);
    process.exit(1); // Exit the process with failure
  });

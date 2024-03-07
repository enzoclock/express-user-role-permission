import { log } from "node:console";
import { app } from "./app.js";


// Start server
const server = await app.listen(3000);
log(`Server listening on port http://localhost:${server.address().port}`);

import express from "express";
import db from "./database.js";

// Create app
export const app = express();

// Configure public routes
app.get("/", (req, res) => { res.send("Welcome to Pizzalooza"); });


// Authentication is needed for other routes
app.use(authenticate);


// Configure protected routes
app.post("/pizzas", allowPermission("pizza:create"), doStuff);
app.delete("/pizzas/:id", allowPermission("pizza:delete"), doStuff);
app.patch("/pizzas/:id", allowPermission("pizza:add-ingredient"), doStuff);

app.post("/orders", allowPermission("order:create"), doStuff);
app.patch("/orders/:id", allowPermission("order:update"), doStuff);
app.delete("/orders/:id", allowPermission("order:delete"), doStuff);

app.get("/delivery/:id", allowPermission("deliver"), doStuff);
app.post("/calls", allowPermission("call"), doStuff);
app.put("/clean", allowPermission("kitchen:clean"), doStuff);


function doStuff(_, res) {
  res.send("Doing stuff...");
}

function authenticate(req, res, next) {
  const apiKey = req.headers["x-api-key"]; // Any authentication method would work (cookies, Authorization headers...)

  const user = db.getUserByApiKey(apiKey);
  if (! user) { return res.status(401).send("401 - Unauthorized"); }

  req.user = user;
  next();
}

function allowPermission(requestedPermission) {
  return (req, res, next) => {
    const userId = req.user.id;
    const userPermissionNames = db.getUserPermissionNames(userId);

    if (! userPermissionNames.includes(requestedPermission)) {
      return res.status(403).send("403 - Forbidden");
    }

    next();
  }
}

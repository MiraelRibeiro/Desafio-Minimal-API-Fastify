import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify({ logger: true });

server.register(cors, {
  origin: "*", // Allow all origins for simplicity, adjust as needed
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  exposedHeaders: ["Content-Length", "X-Total-Count"], // Expose specific headers
  credentials: true, // Allow credentials if needed
  maxAge: 86400 // Cache preflight response for 24 hours
});

const teams = [{
    id: 1,
    name: "MCLaren",
    base: "Woking, Surrey, England",
},
{
    id: 2,
    name: "Red Bull Racing",
    base: "Milton Keynes, Buckinghamshire, England"
},
{
    id: 3,
    name: "Mercedes",
    base: "Brackley, Northamptonshire, England"
},
{
    id: 4,
    name: "Ferrari",
    base: "Maranello, Emilia-Romagna, Italy"
}];

const drivers = [{
    id: 1,
    name: "Lewis Hamilton",
    teamId: 3,
},
{
    id: 2,
    name: "Max Verstappen",
    teamId: 2,
}];

server.get("/teams", async (request, response) => {
  response.type("application/json").code(200);

  return { teams};
});

server.get("/drivers", async (request, response) => {
  response.type("application/json").code(200);

  return { drivers };
});

interface DriverParams{
    id: string;
}

server.get<{Params: DriverParams}>("/drivers/:id", async (request, response) => {
  const id = parseInt(request.params.id);
  const driver = drivers.find(driver => driver.id === id);

  if (!driver) {
    response.status(404).send({ error: "Driver not found" });
    return;
  }
  response.type("application/json").code(200);
  return { driver };  
});

server.listen({ port: 3333}, () => {
    console.log("Server is running on http://localhost:3333"); 
});
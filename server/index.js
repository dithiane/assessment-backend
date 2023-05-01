const express = require("express");
const cors = require("cors");

const app = express();

//middleware
app.use(cors());
app.use(express.json());

const { getCompliment, getAllStarship, getStarship, createStarship, deleteStarship, updateStarship } = require('./controller')

//routes
app.get("/api/compliment", getCompliment);

app.get("/api/starships", getAllStarship)
app.post("/api/starship", getStarship)
app.post("/api/newstarship", createStarship)
app.put("/api/starship/:id", updateStarship)
app.delete("/api/starship/:id", deleteStarship)

app.listen(4000, () => console.log("Server running on 4000"));

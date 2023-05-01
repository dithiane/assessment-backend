let starShips = require('./swapi.json')
let id = starShips.length;

const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

module.exports = {
    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
        // choose random compliment
        let randomCompliment = randomElement(compliments);
        res.status(200).send(randomCompliment);
    },

    getAllStarship: (req, res) => {
        res.status(200).send(starShips)
    },

    getStarship: (req, res) => {
        const { body } = req.body
        let randomStarShip = randomElement(body)
        res.status(200).send(randomStarShip)
    },

    createStarship: (req, res) => {
        id++
        const { starShipObject } = req.body
        const { starShips } = req.body
        let newStarShip = { ...starShipObject, id }
        starShips.push(newStarShip)
        res.status(200).send(starShips)
    },

    deleteStarship: (req, res) => {
        let newStarShips = req.body.filter(el => el.id !== +req.params.id)
        res.status(200).send(newStarShips)
    },

    updateStarship: (req, res) => {
        const { id } = req.params;
        const { speed } = req.body
        const { starShips } = req.body
        let index = starShips.findIndex(el => +el.id === +id)
        starShips[index].max_atmosphering_speed = speed
        res.status(200).send(starShips)
    },
}
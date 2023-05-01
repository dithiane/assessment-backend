
gsap.registerPlugin(ScrollTrigger);

const starShipObject =
{
    "id": 0,
    "name": "",
    "model": "",
    "manufacturer": "",
    "cost_in_credits": "",
    "length": "",
    "max_atmosphering_speed": "950",
    "crew": "",
    "passengers": "",
    "cargo_capacity": "",
    "consumables": "1 year",
    "hyperdrive_rating": "2.0",
    "MGLT": "60",
    "starship_class": "",
    "pilots": [],
    "films": [],
    "created": "2023-12-10T14:20:33.369000Z",
    "edited": "2023-12-20T21:23:49.867000Z",
    "url": ""
}

const baseUrl = "http://localhost:4000/api"
const complimentBtn = document.getElementById("complimentButton")
let starShips = []

const getCompliment = (e) => {
    e.preventDefault()
    axios.get(`${baseUrl}/compliment`)
        .then(res => {
            const data = res.data;
            alert(data);
        });
};

// SWAPI

const starShipsCallback = ({ data: starships }) => deployStarShips(starships)
const errCallback = err => console.log(err)

const getAllStarShips = () => axios.get(`${baseUrl}/starships`).then(starShipsCallback).catch(errCallback)
const createNewStarShip = data => axios.post(`${baseUrl}/newstarship`, data).then(starShipsCallback).catch(errCallback)
const deleteStarShip = id => axios.delete(`${baseUrl}/starship/${id}`, { data: starShips }).then(starShipsCallback).catch(errCallback)
const updateStarShip = (id, data) => axios.put(`${baseUrl}/starship/${id}`, data).then(starShipsCallback).catch(errCallback)

const wishBePilotBtn = document.getElementById('wishBePilotButton')
const toggleQuestion1 = document.getElementById('toggleQuestion1')
const toggleQuestion2 = document.getElementById('toggleQuestion2')
const createShipContainer = document.getElementById('createNewStarShip')
const shipsContainer = document.getElementById('smooth-content')
const selectYourStarShip = document.getElementById('starShipButton')

const getId = (el) => el.split("_")[0].split("-")[1]

document.addEventListener("click", (e) => {
    const targetDelete = e.target.closest(".deleteButton");
    const targetUpdate = e.target.closest(".updateButton");
    const targetCreate = e.target.closest("#createNewStarShipButton");
    const targetName = document.getElementById("newStarShip")
    const targetSpeed = document.getElementById("newStarShipSpeed")

    if (targetDelete) deleteStarShip(getId(targetDelete.id))
    if (targetUpdate) updateStarShip(getId(targetUpdate.id), { speed: targetUpdate.nextElementSibling.value, starShips })
    if (targetCreate && targetName.value && targetSpeed.value) {
        starShipObject.name = targetName.value
        starShipObject.max_atmosphering_speed = targetSpeed.value
        createNewStarShip({ starShipObject, starShips })
    }
});

const createStarShip = (ship, index) => {
    const newShip = document.createElement('div')
    const deleteStarShip = document.createElement('button')
    const updateStarShip = document.createElement('button')
    const inputSpeed = document.createElement('input')
    deleteStarShip.classList.add('deleteButton')
    updateStarShip.classList.add('updateButton')
    inputSpeed.classList.add('inputSpeed')
    deleteStarShip.id = `ship-${ship.id}_delete`
    updateStarShip.id = `ship-${ship.id}_update`

    deleteStarShip.textContent = "Remove"
    updateStarShip.textContent = "Update Speed"
    newShip.classList.add(`starShip`)
    newShip.classList.add(`ship-${ship.id}`)
    newShip.id = ship.name
    inputSpeed.value = ship.max_atmosphering_speed
    const speed = ship.max_atmosphering_speed === "n/a" ? 0 : ship.max_atmosphering_speed.replace(/\D/g, "") / 1000
    newShip.setAttribute("style", `left: ${index}0%`);
    newShip.setAttribute("data-speed", `${speed}`);
    newShip.textContent = ship.id
    newShip.appendChild(deleteStarShip)
    newShip.appendChild(updateStarShip)
    newShip.appendChild(inputSpeed)
    shipsContainer.appendChild(newShip)
}

const createTitle = (name, element) => {
    const shipName = document.createElement('p')
    shipName.classList.add("youStarShip")
    shipName.textContent = `You -> ${name}`
    element.textContent = ""
    element.appendChild(shipName)
}

const getStarship = (e) => {
    e.preventDefault()
    axios.post(`${baseUrl}/starship`, { body: starShips })
        .then(res => {
            const youStarShipIndex = starShips.findIndex(el => el.name === res.data.name)
            const yourStarShip = document.querySelector('.ship-5')
            createTitle(starShips[youStarShipIndex].name, yourStarShip)
        })
        .catch(errCallback)

}

const showWinner = (name) => alert(`Winner : ${name}`)

const prepareStarShips = () => {

    shipsContainer.innerHTML = ``
    for (let i = 0; i < starShips.length; i++) {
        createStarShip(starShips[i], i)
    }
    gsap.set(".starShip", { borderBottom: "100px solid rgb(random(0,190), random(0,190), random(0,1)" })
    gsap.utils.toArray("[data-speed]").forEach(el => {
        gsap.to(el, {
            y: () => {
                let pathY = (1 - parseFloat(el.getAttribute("data-speed"))) * (ScrollTrigger.maxScroll(window) - (this.scrollTrigger ? this.scrollTrigger.start : 0))

                //showWinner(el.getAttribute("id"))
                return pathY
            },
            ease: "none",
            scrollTrigger: {
                trigger: el,
                start: "top center",
                end: "max",
                invalidateOnRefresh: true,
                scrub: true,
            }
        });
    });

}

const deployStarShips = (arr) => {
    window.localStorage.removeItem("myStarShips")
    window.localStorage.setItem("myStarShips", JSON.stringify(arr));
    toggleQuestion2.style.display = "flex"
    toggleQuestion1.style.display = "none"
    createShipContainer.style.display = "flex"
    starShips = JSON.parse(window.localStorage.getItem("myStarShips"))
    prepareStarShips()
}


complimentBtn.addEventListener('click', getCompliment)
wishBePilotBtn.addEventListener('click', getAllStarShips)
selectYourStarShip.addEventListener('click', getStarship)


// Store all loot objects in one array while the page is open.
let lootItems = [];

// Get the HTML elements used by the application.
const lootNameInput = document.getElementById("lootName");
const lootValueInput = document.getElementById("lootValue");
const addLootButton = document.getElementById("addLoot");
const lootList = document.getElementById("lootList");
const totalValueDisplay = document.getElementById("totalValue");
const messageDisplay = document.getElementById("message");

const partySizeInput = document.getElementById("partySize");
const partyMessage = document.getElementById("partyMessage");
const splitLootButton = document.getElementById("splitLoot");
const splitTotalDisplay = document.getElementById("splitTotal");
const lootPerMemberDisplay = document.getElementById("lootPerMember");
const splitMessage = document.getElementById("splitMessage");


// Calculate the total from the array each time it is needed.
function calculateTotal() {
    let total = 0;

    // Visit every object in the array and add its value.
    for (let i = 0; i < lootItems.length; i++) {
        total += lootItems[i].value;
    }

    return total;
}


// Render the loot list and update the running total.
function renderLoot() {

    // Clear the old list so it can be rebuilt from the array.
    lootList.textContent = "";

    if (lootItems.length === 0) {
        const emptyItem = document.createElement("li");
        emptyItem.textContent = "No loot has been added yet.";
        lootList.appendChild(emptyItem);

    } else {

        // Create one list item for each loot object.
        for (let i = 0; i < lootItems.length; i++) {
            const listItem = document.createElement("li");

            listItem.textContent = lootItems[i].name +
                " - Value: $" + lootItems[i].value.toFixed(2);

            lootList.appendChild(listItem);
        }
    }

    totalValueDisplay.textContent =
        "Total Loot: $" + calculateTotal().toFixed(2);
}


// Validate the user's entries and add one new object to the array.
function addLoot() {

    const lootName = lootNameInput.value.trim();
    const lootValueText = lootValueInput.value;
    const lootValue = Number(lootValueText);

    if (lootName === "") {
        messageDisplay.textContent = "Please enter a loot name.";
        return;
    }

    if (lootValueText === "" || !Number.isFinite(lootValue)) {
        messageDisplay.textContent = "Please enter a valid loot value.";
        return;
    }

    if (lootValue < 0) {
        messageDisplay.textContent = "Loot value cannot be negative.";
        return;
    }

    // Keep each item's name and value together in one object.
    const newLoot = {
        name: lootName,
        value: lootValue
    };

    lootItems.push(newLoot);

    messageDisplay.textContent = "Loot added successfully!";

    renderLoot();

    // Clear the inputs after the item has been added.
    lootNameInput.value = "";
    lootValueInput.value = "";

    // A new item changes the total, so clear any old split result.
    splitTotalDisplay.textContent = "Total Loot: $0.00";

    lootPerMemberDisplay.textContent =
        "Loot Per Party Member: $0.00";

    splitMessage.textContent =
        "Select Split Loot to calculate the updated share.";
}


// Check party size and divide the array's total among the party.
function splitLoot() {

    const partySizeText = partySizeInput.value;
    const partySize = Number(partySizeText);

    if (partySizeText === "" ||
        !Number.isInteger(partySize) ||
        partySize < 1) {

        partyMessage.textContent =
            "Enter a whole number of party members (1 or greater).";

        splitMessage.textContent =
            "A valid party size is required before splitting.";

        return;
    }

    if (lootItems.length === 0) {
        partyMessage.textContent = "";

        splitMessage.textContent =
            "Add at least one loot item before splitting.";

        return;
    }

    partyMessage.textContent = "";

    // Calculate from the array rather than storing another total.
    const total = calculateTotal();
    const share = total / partySize;

    splitTotalDisplay.textContent =
        "Total Loot: $" + total.toFixed(2);

    lootPerMemberDisplay.textContent =
        "Loot Per Party Member: $" + share.toFixed(2);

    splitMessage.textContent =
        "Loot successfully divided among " +
        partySize + " party member(s).";
}


// Event listeners connect the buttons to the required functions.
addLootButton.addEventListener("click", addLoot);

splitLootButton.addEventListener("click", splitLoot);

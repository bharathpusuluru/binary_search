
let currentLow, currentHigh, currentMid, currentArray, currentNumberToSearch;
let searchFinished = false;

function displayMessage(message) {
    const messageDiv = document.getElementById("message");
    messageDiv.innerHTML += message + "<br>";
}

function renderArray() {
    const visualizationDiv = document.getElementById("visualization");
    visualizationDiv.innerHTML = currentArray.map((number, index) => `<span id="index${index}">${number}</span>`).join(' ');
}

function clearHighlights() {
    for (let i = 0; i < currentArray.length; i++) {
        const element = document.getElementById(`index${i}`);
        element.classList.remove("highlight");
        element.classList.remove("range");
    }
}

function visualizeCase(caseNumber) {
    switch(caseNumber) {
        case 1:
            currentArray = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
            currentNumberToSearch = 19;
            break;
        case 2:
            currentArray = [0, 1, 2, 4, 10, 11, 23, 32, 45];
            currentNumberToSearch = 2;
            break;
    }
    currentArray.sort((a, b) => a - b);
    currentLow = 0;
    currentHigh = currentArray.length - 1;
    searchFinished = false;

    document.getElementById("message").innerHTML = "";
    renderArray();
    displayMessage("Starting the search...");
    setTimeout(function() { autoVisualizeSearch(); }, 1000);
}

function autoVisualizeSearch() {
    clearHighlights();
    renderArray();

    if (searchFinished) {
        displayMessage("Search is finished. Reset to start again.");
        return;
    }

    if (currentLow <= currentHigh) {
        currentMid = Math.floor((currentLow + currentHigh) / 2);

        highlight(currentMid, "highlight");

        if (currentArray[currentMid] === currentNumberToSearch) {
            displayMessage(`Number found at index ${currentMid}`);
            searchFinished = true;
            return;
        } else if (currentArray[currentMid] < currentNumberToSearch) {
            highlightRange(currentMid + 1, currentHigh, "range");
            displayMessage("Searching in the right half");
            currentLow = currentMid + 1;
        } else {
            highlightRange(currentLow, currentMid - 1, "range");
            displayMessage("Searching in the left half");
            currentHigh = currentMid - 1;
        }
    } else {
        displayMessage("Number not found in the array");
        searchFinished = true;
        return;
    }

    setTimeout(function() { autoVisualizeSearch(); }, 1000);
}

function resetSearch() {
    searchFinished = false;
    const visualizationDiv = document.getElementById("visualization");
    visualizationDiv.innerHTML = currentArray.map((number, index) => `<span id="index${index}">${number}</span>`).join(' ');

    currentLow = 0;
    currentHigh = currentArray.length - 1;

    document.getElementById("message").innerHTML = "";
    renderArray();
    displayMessage("Search has been reset. Click 'Next Step' to start again.");
}

function highlight(index, className) {
    document.getElementById(`index${index}`).classList.add(className);
}

function highlightRange(start, end, className) {
    for (let i = start; i <= end; i++) {
        highlight(i, className);
    }
}

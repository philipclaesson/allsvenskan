let positionByTeam = {}
let familyOnly = true
let halfwayLeader = "none"
let firedCoach = "none"
let topScorer = "none"

class Player {
    constructor(name, type, table, topScorers, halfwayLeader, firedCoaches) {
        this.name = name;
        this.type = type;
        this.table = table;
        this.topScorers = topScorers;
        this.halfwayLeader = halfwayLeader;
        this.firedCoaches = firedCoaches;
        this._tablePoints = -1;
    }
    points(positionByTeam, factTopScorer, factHalfwayLeader) {
        // method implementation goes here
        return this.tablePoints() + this.topScorerPoints() + this.halfwayLeaderPoints();
    }
    tablePoints() {
        // method implementation goes here
        if (this._tablePoints != -1) {
            return this._tablePoints
        }
        let points = 0
        this.table.forEach((team, index) => {
            points += getRowPoint(team, index, positionByTeam)
        })
        this._tablePoints = points
        return points
    }
    topScorerPoints() {
        if (!familyOnly) return 0
        return this.topScorers.includes(topScorer) ? 5 : 0
    }
    halfwayLeaderPoints() {
        if (!familyOnly) return 0
        return this.halfwayLeader === halfwayLeader ? 3 : 0
    }
    firedCoachesPoints() {
        if (!familyOnly) return 0
        return this.firedCoaches.includes(firedCoach) ? 5 : 0
    }
    getHtml() {
        const div = document.createElement('div');
        const h2 = document.createElement('h2');
        h2.textContent = this.name;
        div.appendChild(h2);
        const table = document.createElement('table');
        const thead = document.createElement('thead'); // Add thead element
        const tr = document.createElement('tr'); // Add tr element for column headers

        const columnHeader1 = document.createElement('th'); // Add th element for first column header
        columnHeader1.textContent = "";
        tr.appendChild(columnHeader1);
        const columnHeader2 = document.createElement('th'); // Add th element for second column header
        columnHeader2.textContent = "";
        tr.appendChild(columnHeader2);
        const columnHeader3 = document.createElement('th'); // Add th element for third column header
        columnHeader3.textContent = "Poäng";
        tr.appendChild(columnHeader3);
        thead.appendChild(tr); // Append tr to thead
        table.appendChild(thead); // Append thead to table
        const tbody = document.createElement('tbody'); // Add tbody element
        
        for (let i = 0; i < this.table.length; i++) {
            const tr = document.createElement('tr');
            const positionTd = document.createElement('td');
            positionTd.textContent = (i + 1);
            tr.appendChild(positionTd);
            const teamTd = document.createElement('td');
            teamTd.textContent = this.table[i];
            tr.appendChild(teamTd);
            const rowPoint = getRowPoint(this.table[i], i, positionByTeam);
            const pointTd = document.createElement('td');
            pointTd.textContent = rowPoint;
            tr.appendChild(pointTd);
            // const emojiTd = document.createElement('td');
            // emojiTd.textContent = this.getEmoji(rowPoint);
            // tr.appendChild(emojiTd);

            tr.classList.add(`green-${rowPoint}`);
            tbody.appendChild(tr); // Append tr to tbody
        }
        if (familyOnly) {
            const halfwayLeaderTr = document.createElement('tr');
            const halfwayLeaderIdxTd = document.createElement('td');
            halfwayLeaderIdxTd.textContent = 'Ledare halvvägs';
            halfwayLeaderTr.appendChild(halfwayLeaderIdxTd);

            const halfwayLeaderTd = document.createElement('td');
            halfwayLeaderTd.textContent = this.halfwayLeader;
            halfwayLeaderTr.appendChild(halfwayLeaderTd);

            const halfwayLeaderPointsTd = document.createElement('td');
            halfwayLeaderPointsTd.textContent = this.halfwayLeaderPoints();
            halfwayLeaderTr.appendChild(halfwayLeaderPointsTd);
            halfwayLeaderTr.classList.add(`green-${this.halfwayLeaderPoints()}`);
            tbody.appendChild(halfwayLeaderTr); // Append halfwayLeaderTr to tbody

            const topScorerTr = document.createElement('tr');
            const topScorerIdxTd = document.createElement('td');
            topScorerIdxTd.textContent = 'Skytteliga';
            topScorerTr.appendChild(topScorerIdxTd);

            const topScorerTd = document.createElement('td');
            topScorerTd.textContent = this.topScorers.map(scorer => scorer.split(' ')[scorer.split(' ').length - 1]).join(', ');
            topScorerTr.appendChild(topScorerTd);

            const topScorerPointsTd = document.createElement('td');
            topScorerPointsTd.textContent = this.topScorerPoints();
            topScorerTr.appendChild(topScorerPointsTd);
            topScorerTr.classList.add(`green-${this.topScorerPoints()}`);
            tbody.appendChild(topScorerTr); // Append topScorerTr to tbody

            const firedCoachTr = document.createElement('tr');
            const firedCoachIdxTd = document.createElement('td');
            firedCoachIdxTd.textContent = 'Sparkad tränare';
            firedCoachTr.appendChild(firedCoachIdxTd);

            const firedCoachTd = document.createElement('td');
            firedCoachTd.textContent = this.firedCoaches.map(coach => coach.split(' ')[coach.split(' ').length - 1]).join(', ')
            firedCoachTr.appendChild(firedCoachTd);

            const firedCoachPointsTd = document.createElement('td');
            firedCoachPointsTd.textContent = this.firedCoachesPoints();
            firedCoachTr.appendChild(firedCoachPointsTd);
            firedCoachTr.classList.add(`green-${this.firedCoachesPoints()}`);
            tbody.appendChild(firedCoachTr); // Append firedCoachTr to tbody
        }
        
        table.appendChild(tbody); // Append tbody to table
        const totalTr = document.createElement('tr');
        const totalTd = document.createElement('td');
        totalTd.textContent = 'Total';
        totalTr.appendChild(totalTd);
        totalTr.appendChild(document.createElement('td'))
        const pointsTd = document.createElement('td');
        pointsTd.textContent = this.points();
        totalTr.appendChild(pointsTd);
        tbody.appendChild(totalTr); // Append totalTr to tbody
        div.appendChild(table);
        return div;
    }

    getEmoji(points) {
        let emoji = '';
        switch (points) {
            case 3:
                emoji = '✅';
                break;
            case 2:
                emoji = '✓';
                break;
            case 1:
                emoji = '🟡';
                break;
            case 0:
                emoji = '❌';
                break;
            default:
                emoji = '';
                break;
        }
        return emoji;
    }
}

function getStandingsDict(teamNames) {
    const teamDict = {};
    teamNames.forEach((teamName, index) => {
        teamDict[teamName] = index;
    });
    return teamDict;
}

function getRowPoint(team, tip, facit) {
    const facitTip = facit[team];
    if (facitTip === undefined) {
        throw new Error(`Could not find team |${team}| in facit`)
    }
    const diff = Math.abs(facitTip - tip)
    switch (diff) {
        case 0:
            return 3
            break;
        case 1:
            return 2
        case 2:
            return 1
        default:
            return 0
    }
}

async function fetchTable() {
    try {
        const response = await fetch("https://texttv.nu/api/get/343");
        const data = await response.json();
        const contentHTML = data[0].content[0];
        const parser = new DOMParser();
        const doc = parser.parseFromString(contentHTML, "text/html");
        const lines = Array.from(doc.querySelectorAll(".bgBl.G, .bgBl.W, .bgBl.Y, .bgBl.C")).slice(3);
        const teamNames = lines.map(line => {
            const text = line.textContent.trim();
            const teamName = text.match(/([^\s]*[A-Za-z]{2,}[^\s]*|[^\s]*[A-Za-z]{1}[^\s]*\s*[A-Za-z]{1}[^\s]*)/g);
            return teamName ? teamName[0] : '';
        });
        console.assert(teamNames.length === 16, "Expected 16 teams, got", teamNames.length)
        return teamNames;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

async function fetchTopScorer() {
    // TODO: fetch from https://texttv.nu/351 probably
    return "Isaac Kiese Thelin"
}

async function main() {
    const table = await fetchTable();
    positionByTeam = getStandingsDict(table);
    topScorer = await fetchTopScorer();
    render()
}

// Function to add class based on content
function addClassByContent(element) {
    const content = element.textContent;
    if (content.includes('(3)')) {
        element.classList.add('green-3');
    } else if (content.includes('(2)')) {
        element.classList.add('green-2');
    } else if (content.includes('(1)')) {
        element.classList.add('green-1');
    }
}

function render() {
    const container = document.getElementById('data-container');
    container.innerHTML = '';

    const button = document.getElementById('familyButton');
    button.textContent = familyOnly ? 'Visa alla' : 'Visa bara familjen';
    button.onclick = () => {
        familyOnly = !familyOnly
        render()
    }

    const rankDiv = document.createElement('div');
    renderRanking(rankDiv);
    container.appendChild(rankDiv);

    const playersDiv = document.createElement('div');
    container.appendChild(playersDiv);
    const playersArr = familyOnly ? players.filter(player => player.type === 'Fam') : players
    playersArr.forEach(player => {
        const playerDiv = player.getHtml();
        playersDiv.appendChild(playerDiv);
    })
}

function renderRanking(rankDiv) {
    playersArr = familyOnly ? players.filter(player => player.type === 'Fam') : players
    playersArr.sort((a, b) => b.points() - a.points());
    const table = document.createElement('table');
    const tbody = document.createElement('tbody'); // Add tbody element

    playersArr.forEach((player, index) => {
        const row = document.createElement('tr');

        // Rank column
        const rankCell = document.createElement('td');
        rankCell.textContent = index + 1;
        row.appendChild(rankCell);

        // Player name column
        const nameCell = document.createElement('td');
        nameCell.textContent = player.name;
        row.appendChild(nameCell);

        // Player points column
        const pointsCell = document.createElement('td');
        pointsCell.textContent = player.points();
        row.appendChild(pointsCell);

        tbody.appendChild(row); // Append row to tbody
    });

    table.appendChild(tbody); // Append tbody to table
    rankDiv.appendChild(table);
}

window.onload = main;


var _a;
var YEARS = [
    "2009",
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019"
];
var TEAMS = (_a = {},
    _a["Emory"] = { conference: "UAA", region: "Atlantic South" },
    _a["Chicago"] = { conference: "UAA", region: "Central" },
    _a["Carnegie Mellon"] = { conference: "UAA", region: "Atlantic South" },
    _a["Wash U St. Louis"] = { conference: "UAA", region: "Central" },
    _a["Rochester"] = { conference: "UAA", region: "Central" },
    _a["Denison"] = { conference: "NCAC", region: "Central" },
    _a["Kenyon"] = { conference: "NCAC", region: "Central" },
    _a["DePauw"] = { conference: "NCAC", region: "Central" },
    _a["Oberlin"] = { conference: "NCAC", region: "Central" },
    _a["Hope"] = { conference: "MIAA", region: "Central" },
    _a["Kalamazoo"] = { conference: "MIAA", region: "Central" },
    _a["Carleton"] = { conference: "MIAC", region: "Central" },
    _a["St. Thomas"] = { conference: "MIAC", region: "Central" },
    _a["Bethel UMN"] = { conference: "MIAC", region: "Central" },
    _a["Gustavus Adolphus"] = { conference: "MIAC", region: "Central" },
    _a["UW-Whitewater"] = { conference: "WIAC", region: "Central" },
    _a["Brandeis"] = { conference: "UAA", region: "Northeast" },
    _a["NYU"] = { conference: "UAA", region: "Northeast" },
    _a["Case Western"] = { conference: "UAA", region: "Central" },
    _a["Wheaton (IL)"] = { conference: "CCIW", region: "Central" },
    _a["Williams"] = { conference: "NESCAC", region: "Northeast" },
    _a["Amherst"] = { conference: "NESCAC", region: "Northeast" },
    _a["Trinity (CT)"] = { conference: "NESCAC", region: "Northeast" },
    _a["Bates"] = { conference: "NESCAC", region: "Northeast" },
    _a["Middlebury"] = { conference: "NESCAC", region: "Northeast" },
    _a["Bowdoin"] = { conference: "NESCAC", region: "Northeast" },
    _a["Tufts"] = { conference: "NESCAC", region: "Northeast" },
    _a["Colby"] = { conference: "NESCAC", region: "Northeast" },
    _a["UC Santa Cruz"] = { conference: "N/A", region: "West" },
    _a["Wesleyan"] = { conference: "NESCAC", region: "Northeast" },
    _a["MIT"] = { conference: "NEWMAC", region: "Northeast" },
    _a["Babson"] = { conference: "NEWMAC", region: "Northeast" },
    _a["Wheaton (MA)"] = { conference: "NEWMAC", region: "Northeast" },
    _a["Wellesley"] = { conference: "NEWMAC", region: "Northeast" },
    _a["Skidmore"] = { conference: "Liberty League", region: "Northeast" },
    _a["Vassar"] = { conference: "Liberty League", region: "Northeast" },
    _a["Claremont-Mudd-Scripps"] = { conference: "SCIAC", region: "West" },
    _a["Pomona-Pitzer"] = { conference: "SCIAC", region: "West" },
    _a["Caltech"] = { conference: "SCIAC", region: "West" },
    _a["Chapman"] = { conference: "SCIAC", region: "West" },
    _a["Redlands"] = { conference: "SCIAC", region: "West" },
    _a["La Verne"] = { conference: "SCIAC", region: "West" },
    _a["Cal Lutheran"] = { conference: "SCIAC", region: "West" },
    _a["Washington & Lee"] = { conference: "ODAC", region: "Atlantic South" },
    _a["Southwestern"] = { conference: "SCAC", region: "West" },
    _a["Trinity (TX)"] = { conference: "SCAC", region: "West" },
    _a["Linfield"] = { conference: "Northwest", region: "West" },
    _a["Whitman"] = { conference: "Northwest", region: "West" },
    _a["Lewis and Clark"] = { conference: "Northwest", region: "West" },
    _a["UT-Tyler"] = { conference: "ASC", region: "West" },
    _a["East Texas Baptist"] = { conference: "ASC", region: "West" },
    _a["UT-Dallas"] = { conference: "ASC", region: "West" },
    _a["Mary Washington"] = { conference: "CAC", region: "Atlantic South" },
    _a["Christopher Newport"] = { conference: "CAC", region: "Atlantic South" },
    _a["Salisbury"] = { conference: "CAC", region: "Atlantic South" },
    _a["Johns Hopkins"] = { conference: "Centennial", region: "Atlantic South" },
    _a["Washington MD"] = { conference: "Centennial", region: "Atlantic South" },
    _a["Sewanee"] = { conference: "SAA", region: "Atlantic South" },
    _a["Swarthmore"] = { conference: "Centennial", region: "Atlantic South" },
    _a["Haverford"] = { conference: "Centennial", region: "Atlantic South" },
    _a["TCNJ"] = { conference: "NJAC", region: "Atlantic South" },
    _a["Rhodes"] = { conference: "SAA", region: "Atlantic South" },
    _a["Luther"] = { conference: "ARC", region: "Central" },
    _a["Coe"] = { conference: "ARC", region: "Central" },
    _a["Birmingham Southern"] = { conference: "SAA", region: "Atlantic South" },
    _a);
var CONFERENCE_LIST = [
    "NESCAC",
    "UAA",
    "SCIAC",
    "Centennial",
    "MIAC",
    "NCAC",
    "NEWMAC",
    "ASC",
    "CAC",
    "Northwest",
    "SAA",
    "ARC",
    "Liberty League",
    "MIAA",
    "SCAC",
    "CCIW",
    "NJAC",
    "ODAC",
    "WIAC"
];
var REGION_LIST = ["Atlantic South", "Central", "Northeast", "West"];
var average = function (list) {
    return list.reduce(function (prev, curr) { return prev + curr; }) / list.length;
};
function getPastYearChange(lastYearRank, thisYearRank) {
    if (!thisYearRank)
        return "N/A";
    if (lastYearRank && thisYearRank) {
        return (lastYearRank - thisYearRank).toString();
    }
    return "> " + (40 - thisYearRank).toString();
}
var sketch = function (p) {
    var data;
    var colorsData;
    var rankingsDictByYear = {};
    var colors = {};
    var selectedTeam;
    var circlesList = [];
    var teamDict = {};
    var radius;
    var sidePadding;
    var chartWidth;
    var infoColumnWidth;
    var infoColumnLeft;
    var yearHorizontalSpacing;
    var interiorPadding;
    var infoColumnCenter;
    var roboto;
    var robotoBold;
    var teamImages = {};
    var whiteTeamImages = {};
    var conferenceSelect;
    var regionSelect;
    function getColor(team) {
        if (!!colors[team]) {
            return colors[team];
        }
        colors[team] = [[255, 255, 255], [255, 255, 255]];
        return colors[team];
    }
    function drawHeader() {
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(18);
        p.textFont(robotoBold);
        p.text("DIII Women's Tennis Rankings:", infoColumnCenter, 70);
        p.text("2009-2019", infoColumnCenter, 95);
    }
    function drawTeamInfo(team) {
        p.fill("#000000");
        p.textSize(15);
        var teamRankings = teamDict[team];
        var ranks = Object.values(teamRankings);
        p.textAlign(p.LEFT, p.CENTER);
        p.textFont(robotoBold);
        p.text(team, infoColumnLeft + 15, 220);
        p.textFont(roboto);
        var currentRankLabel = "Current Rank: ";
        p.text(currentRankLabel, infoColumnLeft + 15, 260);
        var averageRankLabel = "Average Rank: ";
        p.text(averageRankLabel, infoColumnLeft + 15, 290);
        var yearChangeLabel = "Change from '18 to '19: ";
        p.text(yearChangeLabel, infoColumnLeft + 15, 320);
        p.textFont(robotoBold);
        p.text(teamRankings["2019"] || "NR", infoColumnLeft + 15 + p.textWidth(currentRankLabel) + 10, 260);
        p.text(average(ranks).toFixed(1), infoColumnLeft + 15 + p.textWidth(averageRankLabel) + 10, 290);
        var pastYearChange = getPastYearChange(teamRankings["2018"], teamRankings["2019"]);
        var difference = !pastYearChange ||
            pastYearChange.startsWith("-") ||
            pastYearChange.startsWith(">")
            ? pastYearChange
            : "+" + pastYearChange;
        p.text(difference || "N/A", infoColumnLeft + 15 + p.textWidth(yearChangeLabel) + 10, 320);
    }
    p.preload = function () {
        data = p.loadTable("data/rankings5.csv", "header");
        colorsData = p.loadTable("data/colors4.csv");
        Object.keys(TEAMS).forEach(function (team) {
            teamImages[team] = p.loadImage("img/" + team + ".png");
            whiteTeamImages[team] = p.loadImage("img/" + team + "-white.png");
        });
        roboto = p.loadFont("font/Roboto/Roboto-Regular.ttf");
        robotoBold = p.loadFont("font/Roboto/Roboto-Medium.ttf");
    };
    window.addEventListener("resize", function () {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        initialSetup();
    });
    function initialSetup() {
        sidePadding = p.windowWidth * 0.06;
        interiorPadding = p.windowWidth * 0.04;
        chartWidth = p.windowWidth * 0.62;
        infoColumnWidth = p.windowWidth * 0.22;
        infoColumnLeft = sidePadding + chartWidth + interiorPadding;
        infoColumnCenter = infoColumnLeft + infoColumnWidth / 2;
        radius = (p.windowHeight - 50 - 39 * 6 - 8) / 40;
        yearHorizontalSpacing = (chartWidth - radius) / 10;
        conferenceSelect.position(infoColumnLeft + 15, 130);
        regionSelect.position(infoColumnLeft + 15, 160);
        circlesList = [];
        var _loop_1 = function () {
            var rankingsForYear = Object.entries(rankingsDictByYear[YEARS[i]]);
            var x = sidePadding + radius / 2 + i * yearHorizontalSpacing;
            var _loop_2 = function () {
                var y = 50 + j * (radius + 6);
                var teamsStr = rankingsForYear[j][1];
                var teams = teamsStr.split(":");
                teams.forEach(function (team, index) {
                    var offset = ((teams.length - 1) * 25) / 2;
                    circlesList.push(new Circle(x - offset + 25 * index, y, radius, team, j + 1));
                });
            };
            for (var j = 0; j < rankingsForYear.length; j++) {
                _loop_2();
            }
        };
        for (var i = 0; i < YEARS.length; i++) {
            _loop_1();
        }
    }
    p.setup = function () {
        p.textFont(roboto);
        p.createCanvas(p.windowWidth, p.windowHeight);
        conferenceSelect = p.createSelect();
        conferenceSelect.option("All Conferences");
        CONFERENCE_LIST.forEach(function (conference) {
            conferenceSelect.option(conference);
        });
        regionSelect = p.createSelect();
        regionSelect.option("All Regions");
        REGION_LIST.forEach(function (region) {
            regionSelect.option(region);
        });
        var ranks = data.getColumn("Rank");
        YEARS.forEach(function (year) {
            var column = data.getColumn(year);
            var yearDict = {};
            column.forEach(function (teamsStr, index) {
                if (!!teamsStr) {
                    var rank_1 = parseInt(ranks[index], 10);
                    yearDict[ranks[index]] = teamsStr;
                    var teams = teamsStr.split(":");
                    teams.forEach(function (team) {
                        var _a;
                        if (teamDict[team]) {
                            teamDict[team][year] = rank_1;
                        }
                        else {
                            teamDict[team] = (_a = {}, _a[year] = rank_1, _a);
                        }
                    });
                }
            });
            rankingsDictByYear[year] = yearDict;
        });
        for (var i = 0; i < colorsData.getRowCount(); i++) {
            var row = colorsData.getRow(i);
            var rowArr = row.arr;
            colors[rowArr[0]] = [
                [rowArr[1], rowArr[2], rowArr[3]],
                [rowArr[4], rowArr[5], rowArr[6]]
            ];
        }
        initialSetup();
    };
    p.windowResized = function () {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
    p.draw = function () {
        p.background(255);
        drawHeader();
        circlesList.forEach(function (circle) { return circle.draw(); });
        p.textFont(roboto);
        YEARS.forEach(function (year, index) {
            p.textAlign(p.CENTER, p.CENTER);
            p.fill("#000000");
            p.textSize(14);
            p.text("'" + year.substring(2, 4), sidePadding + radius / 2 + index * yearHorizontalSpacing, 20);
        });
        if (selectedTeam) {
            drawTeamInfo(selectedTeam);
        }
    };
    p.mouseMoved = function (event) {
        var pageX = event.pageX, pageY = event.pageY;
        var isCircleHovered = false;
        circlesList.forEach(function (circle) {
            if (circle.isOnCircle(pageX, pageY)) {
                selectedTeam = circle.team;
                isCircleHovered = true;
            }
        });
        if (!isCircleHovered) {
            selectedTeam = undefined;
        }
    };
    var Circle = (function () {
        function Circle(x, y, radius, team, rank) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.team = team;
            this.rank = rank;
        }
        Circle.prototype.isOnCircle = function (mouseX, mouseY) {
            var distanceToCenter = Math.hypot(mouseX - this.x, mouseY - this.y);
            return distanceToCenter <= this.radius;
        };
        Circle.prototype.draw = function () {
            var isSelected = selectedTeam === this.team;
            var selectedConference = conferenceSelect.value() != "All Conferences"
                ? conferenceSelect.value()
                : undefined;
            var isInSelectedConference = selectedConference && TEAMS[this.team].conference == selectedConference;
            var selectedRegion = regionSelect.value() != "All Regions"
                ? regionSelect.value()
                : undefined;
            var isInSelectedRegion = selectedRegion && TEAMS[this.team].region == selectedRegion;
            p.strokeWeight(isSelected ? 2 : 1);
            var color = getColor(this.team);
            var drawRadius;
            if (isSelected) {
                drawRadius = this.radius + 5;
            }
            else if ((isInSelectedConference && !selectedRegion) ||
                (isInSelectedRegion && !selectedConference) ||
                (isInSelectedConference && isInSelectedRegion)) {
                drawRadius = this.radius + 2.5;
            }
            else {
                drawRadius = this.radius;
            }
            var transparency = (!selectedTeam && !selectedConference && !selectedRegion) ||
                isSelected ||
                (isInSelectedConference && !selectedRegion) ||
                (isInSelectedRegion && !selectedConference) ||
                (isInSelectedRegion && isInSelectedConference)
                ? 255
                : 150;
            var image = transparency == 255
                ? teamImages[this.team]
                : whiteTeamImages[this.team];
            if (!image) {
                p.fill(color[0][0], color[0][1], color[0][2], transparency);
                p.arc(this.x, this.y, drawRadius, drawRadius, (3 * p.PI) / 4, -p.PI / 4, p.OPEN);
                p.fill(color[1][0], color[1][1], color[1][2], transparency);
                p.arc(this.x, this.y, drawRadius, drawRadius, -p.PI / 4, (3 * p.PI) / 4, p.OPEN);
            }
            else {
                p.smooth();
                p.imageMode(p.CENTER);
                var factor = drawRadius / image.height;
                if (image.width > image.height * 2) {
                    factor = (drawRadius * 2) / image.width;
                }
                p.image(image, this.x, this.y, image.width * factor, image.height * factor);
                p.textFont(roboto);
            }
            if (isSelected ||
                (isInSelectedConference && !selectedRegion) ||
                (isInSelectedRegion && !selectedConference) ||
                (isInSelectedConference && isInSelectedRegion)) {
                p.fill(150, 150, 150);
                p.textAlign(p.RIGHT, p.CENTER);
                p.textSize(12);
                p.text(this.rank, this.x - 25, this.y);
            }
        };
        return Circle;
    }());
};
var sketchP = new p5(sketch);
//# sourceMappingURL=build.js.map
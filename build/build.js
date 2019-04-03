var Morph = (function () {
    function Morph() {
    }
    Morph.prototype.setup = function (p) {
        this.shapes = [];
        this.currentShape = 0;
        this.shapes.push({ points: Shapes.circle(p, 100), color: p.color('#009CDF') });
        this.shapes.push({ points: Shapes.circle(p, 150), color: p.color(255, 204, 0) });
        this.shapes.push({ points: Shapes.square(p, 50), color: p.color(175, 100, 220) });
        this.morph = new Array();
        var highestCount = 0;
        for (var i = 0; i < this.shapes.length; i++) {
            highestCount = Math.max(highestCount, this.shapes[i].points.length);
        }
        for (var i = 0; i < highestCount; i++) {
            this.morph.push(new p5.Vector());
        }
    };
    Morph.prototype.recalc = function (p) {
        var totalDistance = 0;
        var points = this.shapes[this.currentShape].points;
        for (var i = 0; i < points.length; i++) {
            var v1 = points[i];
            var v2 = this.morph[i];
            v2.lerp(v1, 0.1);
            totalDistance += p5.Vector.dist(v1, v2);
        }
        if (totalDistance < 0.1) {
            this.currentShape++;
            if (this.currentShape >= this.shapes.length) {
                this.currentShape = 0;
            }
        }
    };
    Morph.prototype.draw = function (p) {
        this.recalc(p);
        var color = this.shapes[this.currentShape].color;
        var points = this.shapes[this.currentShape].points;
        p.translate(p.width / 2, p.height / 2);
        p.strokeWeight(4);
        p.beginShape();
        p.noFill();
        p.stroke(color);
        for (var i = 0; i < points.length; i++) {
            var v = this.morph[i];
            p.vertex(v.x, v.y);
        }
        p.endShape(p.CLOSE);
    };
    return Morph;
}());
var Shapes = (function () {
    function Shapes() {
    }
    Shapes.circle = function (p, size) {
        var points = new Array();
        for (var angle = 0; angle < 360; angle += 9) {
            var v = p5.Vector.fromAngle(p.radians(angle - 135));
            v.mult(size);
            points.push(v);
        }
        return points;
    };
    Shapes.square = function (p, size) {
        var points = new Array();
        for (var x = -size; x < size; x += 10) {
            points.push(p.createVector(x, -size));
        }
        for (var y = -size; y < size; y += 10) {
            points.push(p.createVector(size, y));
        }
        for (var x = size; x > -size; x -= 10) {
            points.push(p.createVector(x, size));
        }
        for (var y = size; y > -size; y -= 10) {
            points.push(p.createVector(-size, y));
        }
        return points;
    };
    Shapes.star = function (p, x, y, radius1, radius2, npoints) {
        var angle = p.TWO_PI / npoints;
        var halfAngle = angle / 2.0;
        var points = new Array();
        for (var a = 0; a < p.TWO_PI; a += angle) {
            var sx = x + p.cos(a) * radius2;
            var sy = y + p.sin(a) * radius2;
            points.push(p.createVector(sx, sy));
            sx = x + p.cos(a + halfAngle) * radius1;
            sy = y + p.sin(a + halfAngle) * radius1;
            points.push(p.createVector(sx, sy));
        }
        return points;
    };
    return Shapes;
}());
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
var average = function (list) {
    return list.reduce(function (prev, curr) { return prev + curr; }) / list.length;
};
function standardDeviation(values) {
    var avg = average(values);
    var squareDiffs = values.map(function (value) {
        var diff = value - avg;
        var sqrDiff = diff * diff;
        return sqrDiff;
    });
    var avgSquareDiff = average(squareDiffs);
    var stdDev = Math.sqrt(avgSquareDiff);
    return stdDev;
}
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
    var rankingsTestData = {};
    var radius;
    function getColor(team) {
        if (!!colors[team]) {
            return colors[team];
        }
        colors[team] = [[255, 255, 255], [255, 255, 255]];
        return colors[team];
    }
    function drawTeamInfo(team) {
        p.fill("#000000");
        p.textSize(14);
        p.text(team, p.windowWidth - 200, 100);
        var teamRankings = teamDict[team];
        console.log("Team Rankings", teamRankings);
        var ranks = Object.values(teamRankings);
        console.log("RANKS", ranks);
        p.text("Average Rank: " + average(ranks).toFixed(1), p.windowWidth - 200, 200);
        p.text("Standard Dev: " + standardDeviation(ranks).toFixed(1), p.windowWidth - 200, 240);
        var pastYearChange = getPastYearChange(teamRankings["2018"], teamRankings["2019"]);
        p.text("Change from '18 to '19: " + pastYearChange || "N/A", p.windowWidth - 200, 280);
    }
    p.preload = function () {
        data = p.loadTable("data/rankings5.csv", "header");
        colorsData = p.loadTable("data/colors4.csv");
        rankingsTestData = p.loadTable("data/rankingstest.csv");
    };
    p.setup = function () {
        radius = (p.windowHeight - 50 - 39 * 6) / 40;
        p.createCanvas(p.windowWidth, p.windowHeight);
        var testranks = rankingsTestData.getColumn(0);
        ["2009"].forEach(function (year) {
            var column = rankingsTestData.getColumn(year);
        });
        var ranks = data.getColumn("Rank");
        YEARS.forEach(function (year) {
            var column = data.getColumn(year);
            var yearDict = {};
            column.forEach(function (team, index) {
                var _a;
                if (!!team) {
                    var rank = parseInt(ranks[index], 10);
                    yearDict[ranks[index]] = team;
                    if (teamDict[team]) {
                        teamDict[team][year] = rank;
                    }
                    else {
                        teamDict[team] = (_a = {}, _a[year] = rank, _a);
                    }
                    console.log("teamDict", teamDict);
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
        var _loop_1 = function () {
            var rankingsForYear = Object.entries(rankingsDictByYear[YEARS[i]]);
            var x = 200 + i * 85;
            var _loop_2 = function () {
                var y = 50 + j * (radius + 6);
                var teamsStr = rankingsForYear[j][1];
                var teams = teamsStr.split(":");
                teams.forEach(function (team, index) {
                    var offset = ((teams.length - 1) * 20) / 2;
                    circlesList.push(new Circle(x - offset + 20 * index, y, radius, team, j + 1));
                });
            };
            for (var j = 0; j < rankingsForYear.length; j++) {
                _loop_2();
            }
        };
        for (var i = 0; i < YEARS.length; i++) {
            _loop_1();
        }
    };
    p.windowResized = function () {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
    p.draw = function () {
        p.background(255);
        circlesList.forEach(function (circle) { return circle.draw(); });
        YEARS.forEach(function (year, index) {
            p.textAlign(p.CENTER, p.CENTER);
            p.fill("#000000");
            p.textSize(14);
            p.text("'" + year.substring(2, 4), 200 + index * 85, 20);
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
            p.strokeWeight(isSelected ? 2 : 1);
            var color = getColor(this.team);
            var drawRadius = isSelected ? this.radius + 5 : this.radius;
            var transparency = !selectedTeam || isSelected ? 255 : 150;
            p.fill(color[0][0], color[0][1], color[0][2], transparency);
            p.arc(this.x, this.y, drawRadius, drawRadius, (3 * p.PI) / 4, -p.PI / 4, p.OPEN);
            p.fill(color[1][0], color[1][1], color[1][2], transparency);
            p.arc(this.x, this.y, drawRadius, drawRadius, -p.PI / 4, (3 * p.PI) / 4, p.OPEN);
            if (isSelected) {
                p.fill(150, 150, 150);
                p.textAlign(p.RIGHT, p.CENTER);
                p.textSize(12);
                p.text(this.rank, this.x - 20, this.y);
            }
        };
        return Circle;
    }());
};
var sketchP = new p5(sketch);
//# sourceMappingURL=build.js.map
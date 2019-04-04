const YEARS = [
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

const average = (list: number[]) =>
  list.reduce((prev, curr) => prev + curr) / list.length;

function standardDeviation(values: number[]) {
  var avg = average(values);

  var squareDiffs = values.map(function(value) {
    var diff = value - avg;
    var sqrDiff = diff * diff;
    return sqrDiff;
  });

  var avgSquareDiff = average(squareDiffs);

  var stdDev = Math.sqrt(avgSquareDiff);
  return stdDev;
}

function getPastYearChange(
  lastYearRank: number | undefined,
  thisYearRank: number | undefined
): string {
  if (!thisYearRank) return "N/A";
  if (lastYearRank && thisYearRank) {
    return (lastYearRank - thisYearRank).toString();
  }
  return "> " + (40 - thisYearRank).toString();
}

var sketch = (p: p5) => {
  let data: p5.Table;
  let colorsData: p5.Table;
  let rankingsDictByYear: any = {};
  let colors: any = {};
  //   let colorsDict: any = {};
  let selectedTeam: string;
  let circlesList: Circle[] = [];
  let teamDict: any = {};
  let rankingsTestData: any = {};
  let radius: number;
  let sidePadding: number;
  let chartWidth: number;
  let infoColumnWidth: number;
  let infoColumnLeft: number;
  let yearHorizontalSpacing: number;
  let interiorPadding: number;
  let infoColumnCenter: number;
  let roboto: any;
  let robotoBold: any;
  let robotoThin: any;

  function getColor(team: string) {
    if (!!colors[team]) {
      return colors[team];
    }
    // const hex1 = "#" + Math.floor(Math.random() * 16777215).toString(16);
    // const hex2 = "#" + Math.floor(Math.random() * 16777215).toString(16);
    colors[team] = [[255, 255, 255], [255, 255, 255]];
    return colors[team];
    // return hex;
  }

  function drawHeader() {
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(18);
    p.textFont(robotoBold);
    p.textStyle(p.BOLD);
    p.text("DIII Women's Tennis Rankings:", infoColumnCenter, 70);
    p.text("2009-2019", infoColumnCenter, 95);
  }

  function drawTeamInfo(team: string) {
    p.fill("#000000");
    p.textSize(15);

    const teamRankings = teamDict[team] as any;
    console.log("Team Rankings", teamRankings);
    const ranks = Object.values(teamRankings) as number[];
    console.log("RANKS", ranks);
    p.textAlign(p.LEFT, p.CENTER);
    // p.textStyle(p.BOLD);
    p.textFont(robotoBold);
    p.text(team, infoColumnLeft + 15, 160);
    p.textFont(roboto);
    const currentRankLabel = "Current Rank: ";
    p.text(currentRankLabel, infoColumnLeft + 15, 200);
    const averageRankLabel = "Average Rank: ";
    p.text(averageRankLabel, infoColumnLeft + 15, 230);
    const yearChangeLabel = "Change from '18 to '19: ";
    p.text(yearChangeLabel, infoColumnLeft + 15, 260);
    p.textFont(robotoBold);
    p.text(
      teamRankings["2019"] || "NR",
      infoColumnLeft + 15 + p.textWidth(currentRankLabel) + 10,
      200
    );
    p.text(
      average(ranks).toFixed(1),
      infoColumnLeft + 15 + p.textWidth(averageRankLabel) + 10,
      230
    );
    const pastYearChange = getPastYearChange(
      teamRankings["2018"],
      teamRankings["2019"]
    );
    const difference =
      !pastYearChange || pastYearChange.startsWith("-")
        ? pastYearChange
        : "+" + pastYearChange;
    p.text(
      difference || "N/A",
      infoColumnLeft + 15 + p.textWidth(yearChangeLabel) + 10,
      260
    );
  }

  p.preload = () => {
    data = p.loadTable("data/rankings5.csv", "header") as any;
    colorsData = p.loadTable("data/colors4.csv") as any;
    rankingsTestData = p.loadTable("data/rankingstest.csv") as any;

    roboto = p.loadFont("font/Roboto/Roboto-Regular.ttf");
    robotoThin = p.loadFont("font/Roboto/Roboto-Thin.ttf");
    robotoBold = p.loadFont("font/Roboto/Roboto-Medium.ttf");
  };

  p.setup = () => {
    p.textFont(roboto);
    sidePadding = p.windowWidth * 0.06;
    interiorPadding = p.windowWidth * 0.04;
    chartWidth = p.windowWidth * 0.62;
    infoColumnWidth = p.windowWidth * 0.22;
    infoColumnLeft = sidePadding + chartWidth + interiorPadding;
    infoColumnCenter = infoColumnLeft + infoColumnWidth / 2;
    radius = (p.windowHeight - 50 - 39 * 6 - 8) / 40;
    console.log("RADIUS", radius);
    console.log("chart width", chartWidth);
    yearHorizontalSpacing = (chartWidth - radius) / 10;
    console.log("year horizontal spacing", yearHorizontalSpacing);
    // console.log("RADIUS", radius);
    p.createCanvas(p.windowWidth, p.windowHeight);

    const testranks = rankingsTestData.getColumn(0);
    // console.log("TEST RANKS", testranks);
    ["2009"].forEach(year => {
      const column = rankingsTestData.getColumn(year);
      // console.log("COL", column);
    });

    const ranks = data.getColumn("Rank");
    YEARS.forEach(year => {
      // console.log("YEAR", year);
      const column = data.getColumn(year);

      let yearDict: any = {};

      column.forEach((team, index) => {
        if (!!team) {
          const rank = parseInt(ranks[index], 10);
          yearDict[ranks[index]] = team;
          if (teamDict[team]) {
            teamDict[team][year] = rank;
          } else {
            teamDict[team] = { [year]: rank };
          }
          // console.log("teamDict", teamDict);
          // console.log(teamDict);
          // teamDict[year] = ranks[index];
        }
      });
      rankingsDictByYear[year] = yearDict;
    });
    // console.log("FINAL DICT", rankingsDictByYear);
    // console.log(colorsData.getRow(4));

    for (var i = 0; i < colorsData.getRowCount(); i++) {
      const row = colorsData.getRow(i) as any;
      const rowArr = row.arr;
      //   console.log("row", row);
      colors[rowArr[0]] = [
        [rowArr[1], rowArr[2], rowArr[3]],
        [rowArr[4], rowArr[5], rowArr[6]]
      ];
      // console.log("Colors", colors);
    }

    // p.background(100);
    for (var i = 0; i < YEARS.length; i++) {
      const rankingsForYear = Object.entries(rankingsDictByYear[YEARS[i]]);
      //   console.log("rankings for year", rankingsForYear);
      const x = sidePadding + radius / 2 + i * yearHorizontalSpacing;

      for (var j = 0; j < rankingsForYear.length; j++) {
        // const y = 50 + j * radius + 6;
        const y = 50 + j * (radius + 6);

        const teamsStr = rankingsForYear[j][1] as string;
        const teams = teamsStr.split(":");
        // console.log("TEAMS", teams);

        teams.forEach((team, index) => {
          // console.log("team", team);
          const offset = ((teams.length - 1) * 20) / 2;

          circlesList.push(
            new Circle(x - offset + 20 * index, y, radius, team, j + 1)
          );
        });
        // const color = getColor(team);
        // // console.log("Team", team, "Color", color);
        // p.fill(color[0]);
        // p.arc(x, y, 18, 18, (3 * p.PI) / 4, -p.PI / 4, p.OPEN);
        // // p.ellipse(x, y, 20);
        // p.fill(color[1]);
        // p.arc(x, y, 18, 18, -p.PI / 4, (3 * p.PI) / 4, p.OPEN);
      }
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = () => {
    p.background(255);
    drawHeader();
    // console.log("DRAW");
    circlesList.forEach(circle => circle.draw());

    p.textFont(roboto);
    YEARS.forEach((year, index) => {
      p.textAlign(p.CENTER, p.CENTER);
      p.fill("#000000");
      p.textSize(14);
      p.text(
        `'` + year.substring(2, 4),
        sidePadding + radius / 2 + index * yearHorizontalSpacing,
        20
      );
    });

    if (selectedTeam) {
      drawTeamInfo(selectedTeam);
    }
  };

  p.mouseMoved = (event: any) => {
    // console.log("mouse moved event", event);
    const { pageX, pageY } = event;
    let isCircleHovered = false;
    circlesList.forEach(circle => {
      if (circle.isOnCircle(pageX, pageY)) {
        selectedTeam = circle.team;
        isCircleHovered = true;
      }
    });
    if (!isCircleHovered) {
      selectedTeam = undefined;
    }
  };

  class Circle {
    x: number;
    y: number;
    radius: number;
    team: string;
    rank: number;

    constructor(
      x: number,
      y: number,
      radius: number,
      team: string,
      rank: number
    ) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.team = team;
      this.rank = rank;
    }

    isOnCircle(mouseX: number, mouseY: number) {
      const distanceToCenter = Math.hypot(mouseX - this.x, mouseY - this.y);
      return distanceToCenter <= this.radius;
    }

    draw() {
      const isSelected = selectedTeam === this.team;
      p.strokeWeight(isSelected ? 2 : 1);
      const color = getColor(this.team);
      // console.log("COLOR", color);
      const drawRadius = isSelected ? this.radius + 5 : this.radius;
      const transparency = !selectedTeam || isSelected ? 255 : 150;
      p.fill(color[0][0], color[0][1], color[0][2], transparency);
      p.arc(
        this.x,
        this.y,
        drawRadius,
        drawRadius,
        (3 * p.PI) / 4,
        -p.PI / 4,
        p.OPEN
      );
      p.fill(color[1][0], color[1][1], color[1][2], transparency);
      p.arc(
        this.x,
        this.y,
        drawRadius,
        drawRadius,
        -p.PI / 4,
        (3 * p.PI) / 4,
        p.OPEN
      );
      p.textFont(roboto);
      if (isSelected) {
        p.fill(150, 150, 150);
        p.textAlign(p.RIGHT, p.CENTER);
        p.textSize(12);
        p.text(this.rank, this.x - 20, this.y);
      }
    }
  }
};

var sketchP = new p5(sketch);

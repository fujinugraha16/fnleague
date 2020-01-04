var standings_url =
  "http://api.football-data.org/v2/competitions/2021/standings";
var scorers_url = "http://api.football-data.org/v2/competitions/2021/scorers";

var standings_url = standings_url.replace(/^http:\/\//i, "https://");
var scorers_url = scorers_url.replace(/^http:\/\//i, "https://");

function status(response) {
  if (response.status !== 200) {
    console.log("Error: " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function getStanding() {
  if ("caches" in window) {
    caches.match(standings_url).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          const datas = data.standings[0].table;
          const standings = document.querySelector("#standings");
          var table = "";
          datas.forEach(data => {
            table += `
              <tr>
                <td width="15" class="center-align"><strong>${
                  data.position
                }.</strong></td>
                <td width="40"><div class="center-align"><img src="${data.team.crestUrl.replace(
                  /^http:\/\//i,
                  "https://"
                )}" alt="logo" height="30"/></div></td>
                <td class="hide-on-small-only"><strong>${
                  data.team.name
                }</strong></td>
                <td>${data.playedGames}</td>
                <td>${data.won}</td>
                <td>${data.draw}</td>
                <td>${data.lost}</td>
                <td>${data.goalsFor}</td>
                <td>${data.goalsAgainst}</td>
                <td>${data.goalDifference}</td>
                <td><strong>${data.points}</strong></td>
              </tr>
            `;
          });
          standings.innerHTML = table;
        });
      }
    });
  }

  fetch(standings_url, {
    headers: {
      "X-Auth-token": "ca4d16fbe9794ac1b4aeb2d9b96811b2"
    }
  })
    .then(status)
    .then(json)
    .then(function(data) {
      // console.log(data);
      const datas = data.standings[0].table;
      const standings = document.querySelector("#standings");
      var table = "";
      datas.forEach(data => {
        table += `
              <tr>
                <td width="15" class="center-align"><strong>${
                  data.position
                }.</strong></td>
                <td width="40"><div class="center-align"><img src="${data.team.crestUrl.replace(
                  /^http:\/\//i,
                  "https://"
                )}" height="30"/></div></td>
                <td class="hide-on-small-only"><strong>${
                  data.team.name
                }</strong></td>
                <td>${data.playedGames}</td>
                <td>${data.won}</td>
                <td>${data.draw}</td>
                <td>${data.lost}</td>
                <td>${data.goalsFor}</td>
                <td>${data.goalsAgainst}</td>
                <td>${data.goalDifference}</td>
                <td><strong>${data.points}</strong></td>
              </tr>
          `;
      });
      standings.innerHTML = table;
    })
    .catch(function(err) {
      console.log(err);
    });
}

function getScorer() {
  if ("caches" in window) {
    caches.match(scorers_url).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          const datas = data.scorers;
          const scorers = document.querySelector("#scorers");
          var table = "";
          var i = 1;
          datas.forEach(data => {
            table += `
                <tr>          
                  <td width="40" class="center-align"><strong>${i++}.</strong></td>
                  <td>
                    <ul>
                      <li><strong>${data.player.name}</strong><li>
                      <li style="font-size: 12px;">${data.team.name}</li>
                    <ul>
                  </td>
                  <div class="right-align">
                    <td class="center-align"><strong>${
                      data.numberOfGoals
                    }</strong></td>          
                  </div>
                  
                </tr>
                `;
          });
          scorers.innerHTML = table;
        });
      }
    });
  }

  fetch(scorers_url, {
    headers: {
      "X-Auth-token": "ca4d16fbe9794ac1b4aeb2d9b96811b2"
    }
  })
    .then(status)
    .then(json)
    .then(function(data) {
      // console.table(data.scorers);
      const datas = data.scorers;
      const scorers = document.querySelector("#scorers");
      var table = "";
      var i = 1;
      datas.forEach(data => {
        table += `
          <tr>          
            <td width="40" class="center-align"><strong>${i++}.</strong></td>
            <td>
              <ul>
                <li><strong>${data.player.name}</strong><li>
                <li style="font-size: 12px;">${data.team.name}</li>
              <ul>
            </td>
            <div class="right-align">
              <td class="center-align"><strong>${
                data.numberOfGoals
              }</strong></td>          
            </div>
            
          </tr>
          `;
      });
      scorers.innerHTML = table;
    })
    .catch(function(err) {
      console.log(err);
    });
}

function getTeam() {
  if ("caches" in window) {
    caches.match(standings_url).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          const datas = data.standings[0].table;
          const teamSelect = document.querySelector("#teamSelect");
          var option = `
              <li>
                <option disabled selected>Choose your favorite team</option>
              </li>
          `;
          datas.forEach(data => {
            option += `
              <li>
                <option value="${data.team.name}">${data.position}. ${data.team.name}</option>
              </li>
            `;
          });
          teamSelect.innerHTML = option;
        });
      }
    });
  }

  fetch(standings_url, {
    headers: {
      "X-Auth-token": "ca4d16fbe9794ac1b4aeb2d9b96811b2"
    }
  })
    .then(status)
    .then(json)
    .then(function(data) {
      // console.log(data);
      const datas = data.standings[0].table;
      const teamSelect = document.querySelector("#teamSelect");
      var option = `
          <li>
            <option value="" disabled selected>Choose your favorite team</option>
          </li>
      `;
      datas.forEach(data => {
        option += `
            <li>
              <option value="${data.team.name}">${data.position}. ${data.team.name}</option>
            </li>
          `;
      });
      teamSelect.innerHTML = option;
    })
    .catch(function(err) {
      console.log(err);
    });
}

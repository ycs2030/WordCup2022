const tokenKey = "c1c005b661dc4a7ab03775efc1383ce3";
const token = "1f03d446703e470ba3bc872d47f6787c";
const baseURl = "https://api.football-data.org/v4/competitions/2000";

function getstandingss() {
  const url = `${baseURl}/standings`;
  //axios.get(url,{headers:{"X-Auth-Token":tokenKey}}).then((response) => {console.log(response.data);});
  axios
    .get(url, {
      headers: {
        "X-Auth-Token": tokenKey,
      },
    })
    .then((response) => {
      const standings = response.data.standings;

      document.getElementById("standing").innerHTML = "";
      for (standing of standings) {
        let tableContent = "";
        for (row of standing.table) {
          tableContent += ` <!--team-->
<li class="list-group-item">
   <div class="row">
       <div class="col-sm-4 d-flex justify-content-center align-items-center" style="text-align:center;">
           <span class="flag">
          <img class="rounded-circle bored border-2" 
          style="width:40px;height:40px; object-fit: cover;" 
          src="${row.team.crest}" alt="" srcset="">
           </span>
           <h5 style="margin: auto 4px;">
               <b>${row.team.tla}</b>
           </h5>
       </div>
       <div class="col-sm-2" style="text-align:center;">${row.won}</div>
       <div class="col-sm-2" style="text-align:center;">${row.lost}</div>
       <div class="col-sm-2" style="text-align:center;">${row.draw}</div>
       <div class="col-sm-2" style="text-align:center;"><b>${row.points}</b></div>
    </div>
</li>
<!--team end-->`;
        }
        const content = `
  <!--other table side-->
        <div class="col-sm-6 mb-4">
            <div class="card shadow border-none"> 
                <div class="card-header bg-primary" style="text-align:center;">
                   <b> ${standing.group} </b>
                </div>
                <div class="row m-0 bg-secondary">
                <div class="col-sm-4" style="text-align:center;">Team</div>
                <div class="col-sm-2" style="text-align:center;">W</div>
                <div class="col-sm-2" style="text-align:center;">L</div>
                <div class="col-sm-2" style="text-align:center;">D</div>
                <div class="col-sm-2" style="text-align:center;">Pts</div>
                </div>
                  <!--teams row-->
                  <ul class="list-group list-group-flush">
                     <!--team-->
                      ${tableContent}
                     <!--team end-->
                    </ul>
                    <!--teams row-->
              </div>
        </div>
        <!--other side end-->
  `;

        document.getElementById("standing").innerHTML += content;
      }
    });
}
getstandingss();

function getmatching() {
  const url = `${baseURl}/matches`;
  //axios.get(url,{headers:{"X-Auth-Token":tokenKey}}).then((response) => {console.log(response.data);});
  axios
    .get(url, {
      headers: {
        "X-Auth-Token": tokenKey,
      },
    })
    .then((response) => {
      console.log(response.data);
      const matches = response.data.matches;

      document.getElementById("matches").innerHTML = "";

      for (match of matches) {
        const homeTeam = match.homeTeam;
        const awayTeam = match.awayTeam;

        const UtcData = match.utcDate;
        const matchTime = new Date(UtcData);

        const dataString =
          matchTime.getUTCFullYear() +
          "/" +
          (matchTime.getUTCMonth() + 1) +
          "/" +
          matchTime.getUTCDate() +
          " " +
          matchTime.getHours() +
          ":" +
          matchTime.getMinutes();

        if (homeTeam.name == null) {
          continue;
        }

        const content = `
        <!--mathes-->
        <div class="col-sm-12">
        <div class="card shadow rounded-pill mt-5" style="overflow: hidden">
        <div class="card-body p-0">
        <div class="row" style="height: 120px">
                  <div
                  class="col-sm-3 bg-primary d-flex flex-direction-column justify-content-center align-items-center"
                  style="border-right: solid 5px #811538"
                  >
                  <!--img and name-->
                  <div
                  class="d-flex justify-content-center align-items-center"
                  >
                  <div>
                  <div class="flag">
                  <img
                  class="rounded-circle"
                  style="width: 40px; height: 40px object-fit: cover"
                  src="${homeTeam.crest}"
                  alt=""
                  srcset=""
                          />
                          </div>
                          <h5 style="margin: auto 4px">
                          <b>${homeTeam.tla}</b>
                          </h5>
                          </div>
                          </div>
                          <!--img and name end-->
                          </div>
                          <!--matches info-->
                          <div class="col-sm-6" style="text-align: center">
                            <!--this space of info between -->
                            
                          <div class="row">
                           <div class="col-sm-4" style="margin:auto 0px;">
                           <h3>${match.score.fullTime.home ?? "-"}</h3>
                           </div>
                            
                           <div class="col-sm-4" style="margin:auto 0px;">
                           <h6>${match.group}</h6>
                          <h1>x</h1>
                          <h6>${dataString}</h6>
                           </div>

                           <div class="col-sm-4" style="margin:auto 0px;">
                           <h3>${match.score.fullTime.away ?? "-"}</h3>
                           </div>

                          </div>
                          <!--this space of info between end-->

                          </div>
                          <!--matches info end-->
                          <!--second Team-->
                          <div
                          class="col-sm-3 bg-primary d-flex flex-direction-column justify-content-center align-items-center"
                          style="border-left: solid 5px #811538"
                          >
                          <!--img and name-->
                          <div
                      class="d-flex justify-content-center align-items-center"
                    >
                    <div>
                    <div class="flag">
                    <img
                    class="rounded-circle"
                    style="width: 40px; height: 40px object-fit: cover"
                    src="${awayTeam.crest}"
                    alt=""
                    srcset=""
                    />
                    </div>
                    <h5 style="margin: auto 4px">
                    <b>${awayTeam.tla}</b>
                    </h5>
                      </div>
                      </div>
                      <!--img and name end-->
                      </div>
                      <!--second Team End-->
                      </div>
                      </div>
                      </div>
                      </div>
                      <!--mathes end-->
                      `;
        document.getElementById("matches").innerHTML += content;
      }
    });
}

getmatching();

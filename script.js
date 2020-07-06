window.addEventListener('DOMContentLoaded', () => {
     queryApi()
})

const queryApi = async () => {

     const url = 'https://applefacilities.review.blueriver.com/index.cfm/_api/json/v1/scv/building/?andOpenGrouping&locationCode%5B0%5D=sqo&or&locationCode%5B2%5D=nwr&or&locationCode%5B4%5D=scv&or&locationCode%5B6%5D=sfo&closeGrouping&fields=buildingname,buildingabbr,lat,lng,black,buildingZone&active=1&cachedwithin=600';

     const response = await fetch(url);
     const data = await response.json();
     const buildingZonesSet = new Set();

     const buildingZonesOrdered = [];
     let buildingNamesObj;
     let fullData = [];

     const $containerGeneral = document.getElementById('main');

     data.data.items.forEach(building => {
          buildingZonesSet.add(building.buildingzone)
     });

     // iterating over buildingZonesSet()
     for (let item of buildingZonesSet.values()) {
          buildingZonesOrdered.push(item);
     }

     buildingZonesOrdered.sort().forEach(buildingZone => {
          buildingNamesObj = {
               [buildingZone] : data.data.items.filter(building => building.buildingzone === buildingZone)
          }
          fullData.push(buildingNamesObj)
     })

     let OtherBayFullData = fullData.splice(4,1)
     // console.log(fullData)
     let htmlDivZones = '';
     fullData.forEach(buildingZone => {
          Object.entries(buildingZone).forEach((zone) => {
               if (zone[0].length !== 0) {
                    htmlDivZones += `<div class="building-zone"> 
                                   <h2>${zone[0]}</h2>
                                   <ul>`;
                                   zone[1].forEach(names => { 
                                        if (names.black) {
                                             htmlDivZones += `<li>${names.buildingname}</li>`;
                                        } else {
                                             htmlDivZones += `<li><a href="https://applefacilities.review.blueriver.com.">${names.buildingname}</a></li>`;
                                        }    
                                   })
                    htmlDivZones += `</ul> </div>`;
               }
          })
     })

     OtherBayFullData.forEach(buildingZone => {
          Object.entries(buildingZone).forEach((zone) => {
               if (zone[0].length !== 0) {
                    htmlDivZones += `<div class="building-zone"> 
                                   <h2>${zone[0]}</h2>
                                   <ul>`;
                                   zone[1].forEach(names => { 
                                        if (names.black) {
                                             htmlDivZones += `<li>${names.buildingname}</li>`;
                                        } else {
                                             htmlDivZones += `<li><a href="https://applefacilities.review.blueriver.com.">${names.buildingname}</a></li>`;
                                        }   
                                   })
                    htmlDivZones += `</ul> </div>`;
               }
          })
     })

     $containerGeneral.innerHTML = htmlDivZones
}
const mongoose = require('mongoose');
const Country = require('../models/country');

mongoose.connect("mongodb://localhost:27017/country-list");

let countries = [
  {
  "name": "United States",
  "countryCode": "USA",
  "bannedFrom": [
    "CUB"
  ],
  "visaOnArrival": [
    "AUS",
    "AZE",
    "BHR",
    "BGD",
    "BOL",
    "BFA",
    "KHM",
    "CPV",
    "COM",
    "CIV",
    "DJI",
    "DOM",
    "EGY",
    "ETH",
    "FJI",
    "GMB",
    "GNB",
    "IND",
    "JOR",
    "KEN",
    "KWT",
    "LAO",
    "LBN",
    "MDG",
    "MWI",
    "MDV",
    "MRT",
    "MOZ",
    "NPL",
    "OMN",
    "PNG",
    "PRY",
    "QAT",
    "RWA",
    "WSM",
    "SYC",
    "SLB",
    "LKA",
    "SUR",
    "TJK",
    "TZA",
    "TGO",
    "TON",
    "TLS",
    "TUR",
    "TUV",
    "UGA",
    "ARE",
    "VNM",
    "ZMB",
    "ZWE"
  ],
  "visaFree": [
    "ALB",
    "AND",
    "ATG",
    "ARG",
    "ARM",
    "AUT",
    "BHS",
    "BRB",
    "BLR",
    "BEL",
    "BLZ",
    "BIH",
    "BWA",
    "BRN",
    "BGR",
    "CAN",
    "CAF",
    "CHL",
    "COL",
    "CRI",
    "HRV",
    "CYP",
    "CZE",
    "DNK",
    "DMA",
    "ECU",
    "SLV",
    "GNQ",
    "EST",
    "FIN",
    "FRA",
    "GEO",
    "DEU",
    "GRC",
    "GRL",
    "GRD",
    "GUM",
    "GTM",
    "GUY",
    "HTI",
    "HND",
    "HUN",
    "ISL",
    "IDN",
    "IRL",
    "ISR",
    "ITA",
    "JAM",
    "JPN",
    "KAZ",
    "KIR",
    "XKX",
    "KGZ",
    "LVA",
    "LSO",
    "LIE",
    "LTU",
    "LUX",
    "MKD",
    "MYS",
    "MLT",
    "MHL",
    "MUS",
    "MEX",
    "FSM",
    "MDA",
    "MCO",
    "MNG",
    "MNE",
    "MAR",
    "NAM",
    "NLD",
    "NZL",
    "NIC",
    "NOR",
    "PLW",
    "PSE",
    "PAN",
    "PER",
    "PHL",
    "POL",
    "PRT",
    "PRI",
    "ROU",
    "KNA",
    "LCA",
    "VCT",
    "SMR",
    "STP",
    "SEN",
    "SRB",
    "SGP",
    "SVK",
    "SVN",
    "ZAF",
    "ESP",
    "SWZ",
    "SWE",
    "CHE",
    "TWN",
    "THA",
    "TTO",
    "TUN",
    "UKR",
    "GBR",
    "URY",
    "USA",
    "VUT"
  ]
},
{

  "name": "Taiwan",
  "countryCode": "TWN",
  "bannedFrom": [
    "GEO"
  ],
  "visaOnArrival": [
    "ATG",
    "AUS",
    "ARM",
    "BHR",
    "BGD",
    "BOL",
    "BRN",
    "BFA",
    "KHM",
    "CPV",
    "COM",
    "CIV",
    "DJI",
    "EGY",
    "ETH",
    "GAB",
    "GNB",
    "IND",
    "IRN",
    "JOR",
    "KEN",
    "LAO",
    "MDG",
    "MWI",
    "MDV",
    "MHL",
    "MRT",
    "MOZ",
    "MMR",
    "NRU",
    "NPL",
    "OMN",
    "PLW",
    "PNG",
    "PRY",
    "PHL",
    "RWA",
    "WSM",
    "STP",
    "SYC",
    "SLB",
    "LKA",
    "TJK",
    "TZA",
    "THA",
    "TLS",
    "TGO",
    "TUR",
    "TUV",
    "UGA",
    "ZMB",
    "ZWE"
  ],
  "visaFree": [
    "ALB",
    "AND",
    "AUT",
    "BEL",
    "BLZ",
    "BIH",
    "BGR",
    "CAN",
    "CHL",
    "CHN",
    "COL",
    "CRI",
    "HRV",
    "CYP",
    "CZE",
    "DNK",
    "DMA",
    "ECU",
    "SLV",
    "EST",
    "FLK",
    "FRO",
    "FJI",
    "FIN",
    "FRA",
    "GUF",
    "GMB",
    "DEU",
    "GRC",
    "GUM",
    "GTM",
    "HTI",
    "VAT",
    "HND",
    "HKG",
    "HUN",
    "ISL",
    "IDN",
    "IRL",
    "IMN",
    "ISR",
    "ITA",
    "JPN",
    "KIR",
    "KOR",
    "LVA",
    "LIE",
    "LTU",
    "LUX",
    "MAC",
    "MKD",
    "MYS",
    "MLT",
    "FSM",
    "MCO",
    "MNE",
    "NLD",
    "NCL",
    "NZL",
    "NIC",
    "NOR",
    "PAN",
    "PER",
    "POL",
    "PRT",
    "PRI",
    "REU",
    "ROU",
    "KNA",
    "LCA",
    "VCT",
    "SMR",
    "SGP",
    "SVK",
    "SVN",
    "ESP",
    "SJM",
    "SWZ",
    "SWE",
    "CHE",
    "GBR",
    "USA",
    "VUT"
  ]
}

]






Country.create(countries, (err, docs)=> {
 if(err) { throw err}
 docs.forEach((country) => {
   console.log(country.name);
});

mongoose.connection.close();

});

// User.create(users, (err, docs)=> {
//  if(err) { throw err}
//  docs.forEach((user) => {
//    console.log(user.name);
// });

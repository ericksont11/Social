var events = [
    ["90's Karaoke","Proof Five Points","MUSIC","12/27/18"],
    ["Local Band Local Beer","Cary Pub","MUSIC","12/27/18"],
    ["Kate Rhudy w/ Libby Rodenbough","WakeMed Soccer Park","MUSIC","12/28/18"],
    ["Lowbrow w/ Steamroom Etiquette","Raleigh Convention Center","MUSIC","12/29/18"],
    ["Day Party: John Howie, Jr & the Rosewood Bluff","Cameron Indoor Stadium","MUSIC","12/30/18"],
    ["Trivia","Cary Pub","GAMES","01/16/19"]
  ]


console.log(events.length)
var locations = [{
        name: "Cary Pub",
        latitude: 35.7456,
        longitude: -78.7623,
        mapSource: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.2108903231033!2d-78.76446468478223!3d35.74562098017936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89acf31677a9fab1%3A0xb08abdc1719d2bf!2sThe+Cary+Pub!5e0!3m2!1sen!2sus!4v1547676574897"
    },
    {
        name : "PNC Arena",
        latitude:35.8033,
        longitude:-78.7218,
        mapSource: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3235.8612528296944!2d-78.72398328478059!3d35.80333938016606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89acf43c4ba07d07%3A0x1bd2c17205f104d1!2sPNC+Arena!5e0!3m2!1sen!2sus!4v1546029504309"
    },
    {
        name: "Raleigh Convention Center",
        latitude:35.7735, 
        longitude:-78.6414,
        mapSource: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3237.074503637232!2d-78.64361078478146!3d35.77354618017301!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89ac5f715c1cea6b%3A0x6880d973431472da!2sRaleigh+Convention+Center!5e0!3m2!1sen!2sus!4v1546031396890"
    },
    {
        name: "Cameron Indoor Stadium",
        latitude:35.9972,
        longitude:-78.9424,
        mapSource : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3227.9464926718456!2d-78.9446068847325!3d35.997173980121836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89ace40c1d58d545%3A0xe6c6d2046fcbc1d3!2sCameron+Indoor+Stadium!5e0!3m2!1sen!2sus!4v1547676526035"
    },
    {
        name: "WakeMed Soccer Park",
        latitude:35.7868,
        longitude:-78.7559,
        mapSource : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3236.5361514777937!2d-78.75811158478113!3d35.78676888016977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89acf385a8e0ba69%3A0xf2a6de7dade331b4!2sWakeMed+Soccer+Park!5e0!3m2!1sen!2sus!4v1547676606521"
    },
    {
        name: "Cary Arts Center",
        latitude:35.7828,
        longitude:-78.7813,
        mapSource : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3236.697108854936!2d-78.78347168478126!3d35.782815980170675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89acf3b79b0045f1%3A0x40eb993345d97b22!2sCary+Arts+Center!5e0!3m2!1sen!2sus!4v1547676647135"
    },
    {
        name: "Proof Five Points",
        latitude:35.8032,
        longitude:-78.6457,
        mapSource: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3235.8675996566894!2d-78.64788358478067!3d35.80318358016595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89ac5f51d65a6829%3A0xddb344d5a0354814!2sProof+Five+Points!5e0!3m2!1sen!2sus!4v1546031329362"
    },
    {
        name: "The Pour House",
        latitude:35.7772,
        longitude:-78.6368,
        mapSource: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3236.926980529048!2d-78.63899468478134!3d35.77716998017208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89ac5f7286c5dd09%3A0x78354546a2fb2b18!2sThe+Pour+House+Music+Hall!5e0!3m2!1sen!2sus!4v1546030934162"
    },
    {
        name: "East Coast Gaming",
        latitude:35.7683,
        longitude:-78.7428,
        mapSource: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3237.286406521515!2d-78.74495088478156!3d35.76834038017409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89ac8d2b7a77622f%3A0xb67f45ba91e14952!2sEast+Coast+Gaming!5e0!3m2!1sen!2sus!4v1546031441203"
    },
]


for (i = 0; i < events.length; i++) {
    for (x = 0; x < locations.length; x++){
        if (locations[x].name === events[i][1]) {
            events[i].unshift(locations[x].longitude)
            events[i].unshift(locations[x].latitude)
            events[i].push(locations[x].mapSource)
        }
  }
}

console.log(events)

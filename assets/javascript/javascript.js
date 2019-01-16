//arrays that hold the event information, image information, the google map location sources, and the available categories respectively

var events = [[35.8033,-78.7218, "Justin Timberlake Concert", "PNC Arena", "GAMES", "01/04/2019"],[35.7735, -78.6414, "Triangle Chess Tournament", "the Raleigh Convention Center", "ART", "01/04/2019"],[35.9972, -78.9424, "Duke Basketball game vs Florida", "Cameron Indoor Stadium", "SPORTS","01/04/2019"],[35.7868, -78.7559, "Mutts and Marshmellows 5k Race", "WakeMed Soccer Park", "SPORTS","01/04/2019"],[35.7828, -78.7813, "A Mo-town Christmas", "Cary Arts Center", "MUSIC", "01/04/2019"],[35.7824, -78.6414, "New Year's Science Celebration", "Daley Planet Cafe", "ART", "01/04/2019"],[35.8104, -78.7021, "The Beyond: Georgia O'Keefe Exhibit", "NC Museum of Art", "SPORTS", "01/04/2019"],[35.8032,-78.6457,"90's Karaoke","Proof Five Points","ART","01/04/2019"],[35.7772,-78.6368,"Local Band Local Beer","The Pour House","SCIENCE","01/04/2019"],[35.7772,-78.6368,"Kate Rhudy w/ Libby Rodenbough","The Pour House","MUSIC","01/04/2019"],[35.7772,-78.6368,"Lowbrow w/ Steamroom Etiquette","The Pour House","MUSIC","01/04/2019"],[35.7772,-78.6368,"Day Party: John Howie, Jr & the Rosewood Bluff","The Pour House","MUSIC","01/04/2019"]];
var imagearray = ["assets/images/chess.jpg", "assets/images/music.jpg", "assets/images/sports.jpg", "assets/images/art.jpg", "assets/images/science.jpg"]
var maparray = ["https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3235.8612528296944!2d-78.72398328478059!3d35.80333938016606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89acf43c4ba07d07%3A0x1bd2c17205f104d1!2sPNC+Arena!5e0!3m2!1sen!2sus!4v1546029504309","https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3236.926980529048!2d-78.63899468478134!3d35.77716998017208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89ac5f7286c5dd09%3A0x78354546a2fb2b18!2sThe+Pour+House+Music+Hall!5e0!3m2!1sen!2sus!4v1546030934162","https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3235.8675996566894!2d-78.64788358478067!3d35.80318358016595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89ac5f51d65a6829%3A0xddb344d5a0354814!2sProof+Five+Points!5e0!3m2!1sen!2sus!4v1546031329362","https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3237.074503637232!2d-78.64361078478146!3d35.77354618017301!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89ac5f715c1cea6b%3A0x6880d973431472da!2sRaleigh+Convention+Center!5e0!3m2!1sen!2sus!4v1546031396890","https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3237.286406521515!2d-78.74495088478156!3d35.76834038017409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89ac8d2b7a77622f%3A0xb67f45ba91e14952!2sEast+Coast+Gaming!5e0!3m2!1sen!2sus!4v1546031441203"]
var distance = 15;
var slidearray = [];
var categoryarray = [];

// variables to track the event types to load for each date
var games = false;
var music = false;
var science = false;
var art = false;
var sports = false;
var counter = 0;
var trackerArray = [];
var tracker;
var trackerTypeArray = [];

//variables to track whether the event types available on the day should be shown
var gamesClicked = false;
var musicClicked = false;
var sportsClicked = false;
var artClicked = false;
var scienceClicked = false;

//variable to watch the screen size
var x = window.matchMedia("(width: 700px)");

//variables for getting the date

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();

//sets the day equal to today's date

if(dd<10) {
    dd = '0'+dd
} 
if(mm<10) {
    mm = '0'+mm
} 
today = mm + "/" + dd + "/" + yyyy;
document.getElementById("date").value = today;

//get the users location

if (navigator.geolocation) {

    var locationMarker = null;
    var myLat = null;
    var myLng = null;

    navigator.geolocation.getCurrentPosition(
        function (position) {

            if (locationMarker){
                return;
            }
            myLat = position.coords.latitude;
            myLng = position.coords.longitude;
        }     
    );
}

//function to calulate distance between user and the events

function getDistanceFromLatLonInMiles(lat1, long1, lat2, long2) {
    var R = 3959; 
    var dLat = deg2rad(lat2-lat1);  
    var dLon = deg2rad(long2-long1); 
    var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    d = R * c; 
    return d;   
}
function deg2rad(deg) {
    return deg * (Math.PI/180)
}

//function that finds events based on users specs

function findEvents() {

    //clears any events that were previously looked at

    clearDivs();

    //shows an image for if no events occur on specified day within the range

    document.getElementById("search-box").style.display= "block";

    //changes the distances and dates to the user specifications

    var distance = document.getElementById('range').value;
    var searchdate = document.getElementById('date').value;
    var dateconv = searchdate.toString();
    
    for (i = 0; i < events.length; i++) {

        //calculates the distance bewteen the user and the events within their specified range

        getDistanceFromLatLonInMiles(myLat,myLng,events[i][0],events[i][1]);
        d = Math.ceil(d* 100) / 100;

        //checks the distance and date specs provided by the user to the events in the eventarray

        if ( d < distance && events[i][5] === dateconv) {

            //creates divs to hold the event information if the distance between
            //the user and event is within the range the user specified
            var tracker = i;
            trackerArray.push(tracker);
            var div = document.createElement("div");
            document.getElementById("content").appendChild(div);

            //styles the divs that were created

            div.setAttribute("id","content-box" + i)
            div.style.position="absolute";
            div.style.left= "32.5%";
            div.style.width= "35%";
            div.style.minHeight= "45vh";
            div.style.maxHeight= "45vh";
            div.style.textAlign= "center";
            div.style.marginTop= "12vh";
            div.style.display= "none";
            
            //create elements to hold maps, photos, and event descriptions
            var frame = document.createElement("iframe");
            var para = document.createElement("p");
            document.getElementById("content-box" + i).appendChild(para);
            para.id = "para" + i;
            var img = document.createElement("img");
            document.getElementById("content-box" + i).appendChild(img);
            img.id = "img" + i;
            document.getElementById("content-box" + i).appendChild(frame);
            frame.id = "frame" + i;

            //add to the slidearray to know the number of all the div-ids that are relevant
            var a = i;
            slidearray.unshift(a);
            
            //style the elements on the page to account for the new divs

            document.getElementById("range").style.marginTop= "70vh";
            document.getElementById("date").style.marginTop= "70vh";
            document.getElementById("clicker").style.marginTop = "70vh";
            document.getElementById("initial-box").style.display= "none";
            document.getElementById("search-box").style.display= "none";
            document.getElementById("content-box" +i).style.display = "block";
            document.getElementById("para" +i).style.display = "block";

            //check the type of event in the eventarray to display the appropriate image

            if (events[i][4] === "GAMES") {

                document.getElementById("img" +i).src = imagearray[0];
                var categoryType = "GAMES";
                trackerTypeArray.push(categoryType);
                document.getElementById("content-box" +i).style.backgroundColor = "plum"

                if (games === false) {
                    var type = document.createElement("p");
                    document.getElementById("categories").appendChild(type);
                    type.id ="type-games";

                    // links to the function at the bottom of page
                    var onClickCommand = categoryGames;
                    type.onclick = onClickCommand;

                    document.getElementById("categories").style.display = "block";

                    document.getElementById("type-games").style.float = "right";
                    document.getElementById("type-games").style.backgroundColor = "plum";
                    document.getElementById("type-games").style.height = "10vh";
                    document.getElementById("type-games").style.width = "10vw";
                    document.getElementById("type-games").innerHTML = "GAMES";
                    document.getElementById("type-games").style.position = "relative";
                    document.getElementById("type-games").style.opacity = ".4";
                    document.getElementById("type-games").style.fontSize = "1em";

                    if (counter === 0) {
                        document.getElementById("type-games").style.marginRight = "45vw";
                        document.getElementById("type-games").style.display = "inline-block";
                    }
                    else if (counter === 1) {
                        document.getElementById(categoryarray[0]).style.marginRight = "40vw";
                        document.getElementById("type-games").style.display = "inline-block";
                    }
                    else if (counter === 2) {
                        document.getElementById(categoryarray[0]).style.marginRight = "35vw";
                        document.getElementById("type-games").style.display = "inline-block";
                    }
                    else if (counter === 3) {
                        document.getElementById(categoryarray[0]).style.marginRight = "30vw";
                        document.getElementById("type-games").style.display = "inline-block";
                    }
                    else if (counter === 4) {
                        document.getElementById(categoryarray[0]).style.marginRight = "25vw";
                        document.getElementById("type-games").style.display = "inline-block";
                    }
                    
                    
                    counter = counter + 1;
                    games = true;
                    var category = "type-games";
                    categoryarray.push(category);
                    tracker = 1;
                }
                
            }
            else if (events[i][4] === "MUSIC") {

                document.getElementById("img" +i).src = imagearray[1];
                document.getElementById("content-box" +i).style.backgroundColor = "mediumaquamarine"
                var categoryType = "MUSIC";
                trackerTypeArray.push(categoryType);

                if (music === false) {
                    var type = document.createElement("p");
                    document.getElementById("categories").appendChild(type);
                    type.id ="type-music";

                    // links to the function at the bottom of page
                    var onClickCommand = categoryMusic;
                    type.onclick = onClickCommand;

                    document.getElementById("type-music").style.float ="right";
                    document.getElementById("type-music").style.backgroundColor = "mediumaquamarine";
                    document.getElementById("type-music").style.height = "10vh";
                    document.getElementById("type-music").style.width = "10vw";
                    document.getElementById("type-music").style.postion= "relative";
                    document.getElementById("type-music").innerHTML = "MUSIC";
                    document.getElementById("type-music").style.opacity = ".4";
                    document.getElementById("type-music").style.fontSize = "1em";

                    if (counter === 0) {
                        document.getElementById("type-music").style.marginRight = "45vw";
                        document.getElementById("type-music").style.display = "inline-block";
                    }
                    else if (counter === 1) {
                        document.getElementById(categoryarray[0]).style.marginRight = "40vw";
                        document.getElementById("type-music").style.display = "inline-block";
                    }
                    else if (counter === 2) {
                        document.getElementById(categoryarray[0]).style.marginRight = "35vw";
                        document.getElementById("type-music").style.display = "inline-block";
                    }
                    else if (counter === 3) {
                        document.getElementById(categoryarray[0]).style.marginRight = "30vw";
                        document.getElementById("type-music").style.display = "inline-block";
                    }
                    else if (counter === 4) {
                        document.getElementById(categoryarray[0]).style.marginRight = "25vw";
                        document.getElementById("type-music").style.display = "inline-block";
                    }
                    
                    counter = counter + 1;
                    music = true;
                    var category = "type-music";
                    categoryarray.push(category);
                }
            }
            else if (events[i][4] === "SPORTS") {

                document.getElementById("img" +i).src = imagearray[2];
                var categoryType = "SPORTS";
                trackerTypeArray.push(categoryType);
                document.getElementById("content-box" +i).style.backgroundColor = "lightcoral";

                if (sports === false) {
                    var type = document.createElement("p");
                    document.getElementById("categories").appendChild(type);
                    type.id ="type-sports";

                    // links to the function at the bottom of page
                    var onClickCommand = categorySports;
                    type.onclick = onClickCommand;

                    document.getElementById("type-sports").style.float ="right";
                    document.getElementById("type-sports").style.backgroundColor = "lightcoral";
                    document.getElementById("type-sports").style.height = "10vh";
                    document.getElementById("type-sports").style.marginTop = "10vh";
                    document.getElementById("type-sports").style.width = "10vw";
                    document.getElementById("type-sports").style.postion= "fixed";
                    document.getElementById("type-sports").innerHTML = "SPORTS";
                    document.getElementById("type-sports").style.opacity = ".4";
                    document.getElementById("type-sports").style.fontSize = "1em";

                    if (counter === 0) {
                        document.getElementById("type-sports").style.marginRight = "45vw";
                        document.getElementById("type-sports").style.display = "inline-block";
                    }
                    else if (counter === 1) {
                        document.getElementById(categoryarray[0]).style.marginRight = "40vw";
                        document.getElementById("type-sports").style.display = "inline-block";
                    }
                    else if (counter === 2) {
                        document.getElementById(categoryarray[0]).style.marginRight = "35vw";
                        document.getElementById("type-sports").style.display = "inline-block";
                    }
                    else if (counter === 3) {
                        document.getElementById(categoryarray[0]).style.marginRight = "30vw";
                        document.getElementById("type-sports").style.display = "inline-block";
                    }
                    else if (counter === 4) {
                        document.getElementById(categoryarray[0]).style.marginRight = "25vw";
                        document.getElementById("type-sports").style.display = "inline-block";
                    }
                    
                    counter = counter + 1;
                    sports = true;
                    var category = "type-sports";
                    categoryarray.push(category);
                }
            }
            else if (events[i][4] === "ART") {

                document.getElementById("img" +i).src = imagearray[3];
                var categoryType = "ART";
                trackerTypeArray.push(categoryType);
                document.getElementById("content-box" +i).style.backgroundColor = "khaki"

                if (art === false) {
                    var type = document.createElement("p");
                    document.getElementById("categories").appendChild(type);
                    type.id ="type-art";

                    // links to the function at the bottom of page
                    var onClickCommand = categoryArt;
                    type.onclick = onClickCommand;

                    document.getElementById("type-art").style.float ="right";
                    document.getElementById("type-art").style.backgroundColor = "khaki";
                    document.getElementById("type-art").style.height = "10vh";
                    document.getElementById("type-art").style.width = "10vw";
                    document.getElementById("type-art").style.postion= "relative";
                    document.getElementById("type-art").innerHTML = "ART";
                    document.getElementById("type-art").style.opacity = ".4";
                    document.getElementById("type-art").style.fontSize = "1em";

                    if (counter === 0) {
                        document.getElementById("type-art").style.marginRight = "45vw";
                        document.getElementById("type-art").style.display = "inline-block";
                    }
                    else if (counter === 1) {
                        document.getElementById(categoryarray[0]).style.marginRight = "40vw";
                        document.getElementById("type-art").style.display = "inline-block";
                    }
                    else if (counter === 2) {
                        document.getElementById(categoryarray[0]).style.marginRight = "35vw";
                        document.getElementById("type-art").style.display = "inline-block";
                    }
                    else if (counter === 3) {
                        document.getElementById(categoryarray[0]).style.marginRight = "30vw";
                        document.getElementById("type-art").style.display = "inline-block";
                    }
                    else if (counter === 4) {
                        document.getElementById(categoryarray[0]).style.marginRight = "25vw";
                        document.getElementById("type-art").style.display = "inline-block";
                    }
                    
                    counter = counter + 1;
                    art = true;
                    var category = "type-art";
                    categoryarray.push(category);
                }
            }
            else if (events[i][4] === "SCIENCE") {

                document.getElementById("img" +i).src = imagearray[4];
                var categoryType = "SCIENCE";
                trackerTypeArray.push(categoryType);
                document.getElementById("content-box" +i).style.backgroundColor = "lightsalmon";

                if (science === false) {
                    var type = document.createElement("p");
                    document.getElementById("categories").appendChild(type);
                    type.id ="type-science";

                    // links to the function at the bottom of page
                    var onClickCommand = categoryScience;
                    type.onclick = onClickCommand;

                    document.getElementById("type-science").style.float ="right";
                    document.getElementById("type-science").style.backgroundColor = "lightsalmon";
                    document.getElementById("type-science").style.height = "10vh";
                    document.getElementById("type-science").style.width = "10vw";
                    document.getElementById("type-science").style.postion= "relative";
                    document.getElementById("type-science").innerHTML = "SCIENCE";
                    document.getElementById("type-science").style.opacity = ".4";
                    document.getElementById("type-science").style.fontSize = "1em";

                    if (counter === 0) {
                        document.getElementById("type-science").style.marginRight = "45vw";
                        document.getElementById("type-science").style.display = "inline-block";
                    }
                    else if (counter === 1) {
                        document.getElementById(categoryarray[0]).style.marginRight = "40vw";
                        document.getElementById("type-science").style.display = "inline-block";
                    }
                    else if (counter === 2) {
                        document.getElementById(categoryarray[0]).style.marginRight = "35vw";
                        document.getElementById("type-science").style.display = "inline-block";
                    }
                    else if (counter === 3) {
                        document.getElementById(categoryarray[0]).style.marginRight = "30vw";
                        document.getElementById("type-science").style.display = "inline-block";
                    }
                    else if (counter === 4) {
                        document.getElementById(categoryarray[0]).style.marginRight = "25vw";
                        document.getElementById("type-science").style.display = "inline-block";
                    }
                    
                    counter = counter + 1;
                    science = true;
                    var category = "type-science";
                    categoryarray.push(category);
                }
            }
            else {
                document.getElementById("img" +i).src = "#";
            }

            //check the location of the event in the eventarray to have location source on google maps be correct

            if (events[i][3] === "PNC Arena") {
                document.getElementById("frame" +i).src = maparray[0];
                document.getElementById("frame" +i).style.display = "block";
                document.getElementById("frame" +i).style.width = "98.5%";
            }
            else if (events[i][3] === "The Pour House") {
                document.getElementById("frame" +i).src = maparray[1];
                document.getElementById("frame" +i).style.display = "block";
                document.getElementById("frame" +i).style.width = "98.5%";

            }
            else if (events[i][3] === "Proof Five Points") {
                document.getElementById("frame" +i).src = maparray[2];
                document.getElementById("frame" +i).style.display = "block";
                document.getElementById("frame" +i).style.width = "98.5%";
            }
            else if (events[i][3] === "the Raleigh Convention Center") {
                document.getElementById("frame" +i).src = maparray[3];
                document.getElementById("frame" +i).style.display = "block";
                document.getElementById("frame" +i).style.width = "98.5%";

            }
            else if (events[i][3] === "East Coast Gaming") {
                document.getElementById("frame" +i).src = maparray[4];
                document.getElementById("frame" +i).style.display = "block";
                document.getElementById("frame" +i).style.width = "98.5%";
            }

            //display the event description
            
            document.getElementById("para"+ i).innerHTML = "There is a " + events[i][2] + " " + d + " miles from you at " + events[i][3] + ".";
            

        }
    }
    resize();
}


//function clears all of the divs that were created

function clearDivs () {

    var clearcontent = document.getElementById("content");
    var clearcategories = document.getElementById("categories");

    while (clearcontent.firstChild) {
    clearcontent.removeChild(clearcontent.firstChild);
    }
    while (clearcategories.firstChild) {
    clearcategories.removeChild(clearcategories.firstChild);
    }

    slidearray =[];
    games = false;
    music = false;
    science = false;
    art = false;
    sports = false;
    counter = 0;
    categoryarray = [];
    trackerArray = [];
    trackerTypeArray = [];


}

//function cycles through the events

function next () {
    if(slidearray[0] > slidearray[1]){
    slidearray.push(slidearray[0]);
    slidearray.shift();
    document.getElementById("content-box"+slidearray[slidearray.length-1]).style.display = "none";
    }
}

//function cycles back through the events

function prev () {
    if(slidearray[slidearray.length-1] > slidearray[0]){
    slidearray.unshift(slidearray[slidearray.length-1]);
    slidearray.pop();
    document.getElementById("content-box"+slidearray[0]).style.display = "block";
    } 
}

//functions for category filters

function categoryArt () {
    
    displayClicked();

    if (artClicked === false) {
        
        document.getElementById("type-art").style.opacity = "1";
        for (i=0; i < trackerArray.length; i++) {
            if(trackerTypeArray[i] === "ART") {

                document.getElementById("content-box" + trackerArray[i]).style.display = "block";
                    slidearray.unshift(trackerArray[i]);




   
            }
        }
        artClicked = true;
        slidearray.sort(function(a, b){return b-a});
    }

    else {
        document.getElementById("type-art").style.opacity = ".4";

        for (i=0; i < trackerArray.length; i++) {

            if(trackerTypeArray[i] === "ART") {

                document.getElementById("content-box" + trackerArray[i]).style.display = "none";
                var check = trackerArray[i];

                for ( var x=0; x < slidearray.length; x++){
                    if (slidearray[x] === check) {
                        slidearray.splice(x, 1);
                    }
                }
            }
        }

        artClicked = false;
    }

    noneClicked();


}

function categoryScience () {
    
    displayClicked();

    if (scienceClicked === false) {
        
        document.getElementById("type-science").style.opacity = "1";
        for (i=0; i < trackerArray.length; i++) {
            if(trackerTypeArray[i] === "SCIENCE") {
                document.getElementById("content-box" + trackerArray[i]).style.display = "block";
                slidearray.unshift(trackerArray[i]);

            }
        }
        scienceClicked = true;
        slidearray.sort(function(a, b){return b-a});
    }

    else {
        document.getElementById("type-science").style.opacity = ".4";

        for (i=0; i < trackerArray.length; i++) {
          
            if(trackerTypeArray[i] === "SCIENCE") {
                document.getElementById("content-box" + trackerArray[i]).style.display = "none";
                var check = trackerArray[i];
                for ( var x=0; x < slidearray.length; x++){
                    if (slidearray[x] === check) {
                        slidearray.splice(x, 1);
                    }
                }
            }
        }


        scienceClicked = false;
    }

    noneClicked();



}

function categorySports () {
    
    displayClicked();

    if (sportsClicked === false) {
        
        document.getElementById("type-sports").style.opacity = "1";
        for (i=0; i < trackerArray.length; i++) {
            if(trackerTypeArray[i] === "SPORTS") {
                document.getElementById("content-box" + trackerArray[i]).style.display = "block";
                slidearray.unshift(trackerArray[i]);

            }
        }
        sportsClicked = true;
        slidearray.sort(function(a, b){return b-a});
    }

    else {
        document.getElementById("type-sports").style.opacity = ".4";

        for (i=0; i < trackerArray.length; i++) {
          
            if(trackerTypeArray[i] === "SPORTS") {
                document.getElementById("content-box" + trackerArray[i]).style.display = "none";
                var check = trackerArray[i];
                for ( var x=0; x < slidearray.length; x++){
                    if (slidearray[x] === check) {
                        slidearray.splice(x, 1);
                    }
                }
            }
        }


        sportsClicked = false;
    }

    noneClicked();


}

function categoryGames () {
    
    displayClicked();

    if (gamesClicked === false) {
        
        document.getElementById("type-games").style.opacity = "1";
        for (i=0; i < trackerArray.length; i++) {
            if(trackerTypeArray[i] === "GAMES") {
                document.getElementById("content-box" + trackerArray[i]).style.display = "block";
                slidearray.unshift(trackerArray[i]);

            }
        }
        gamesClicked = true;
        slidearray.sort(function(a, b){return b-a});
    }

    else {
        document.getElementById("type-games").style.opacity = ".4";

        for (i=0; i < trackerArray.length; i++) {
          
            if(trackerTypeArray[i] === "GAMES") {
                document.getElementById("content-box" + trackerArray[i]).style.display = "none";
                var check = trackerArray[i];
                for ( var x=0; x < slidearray.length; x++){
                    if (slidearray[x] === check) {
                        slidearray.splice(x, 1);
                    }
                }
            }
        }


        gamesClicked = false;
    }

    noneClicked();


}

function categoryMusic () {
    
    displayClicked();

    if (musicClicked === false) {
        
        document.getElementById("type-music").style.opacity = "1";
        for (i=0; i < trackerArray.length; i++) {
            if(trackerTypeArray[i] === "MUSIC") {
                document.getElementById("content-box" + trackerArray[i]).style.display = "block";
                slidearray.unshift(trackerArray[i]);

            }
        }
        musicClicked = true;
        slidearray.sort(function(a, b){return b-a});
    }

    else {
        document.getElementById("type-music").style.opacity = ".4";

        for (i=0; i < trackerArray.length; i++) {
          
            if(trackerTypeArray[i] === "MUSIC") {
                document.getElementById("content-box" + trackerArray[i]).style.display = "none";
                var check = trackerArray[i];
                for ( var x=0; x < slidearray.length; x++){
                    if (slidearray[x] === check) {
                        slidearray.splice(x, 1);
                    }
                }
            }
        }


        musicClicked = false;
    }

    noneClicked();


}

//function to check which boxes are clicked

function displayClicked () {

    slidearray = [];

    for (i=0; i<trackerArray.length; i++) {
        document.getElementById("content-box" + trackerArray[i]).style.display = "none";
    }

    if (artClicked === true) {
        
        document.getElementById("type-art").style.opacity = "1";

        for (i=0; i < trackerArray.length; i++) {
            if(trackerTypeArray[i] === "ART") {
                document.getElementById("content-box" + trackerArray[i]).style.display = "block";
                slidearray.unshift(trackerArray[i]);
            }
        }
    }

    if (scienceClicked === true) {
        
        document.getElementById("type-science").style.opacity = "1";

        for (i=0; i < trackerArray.length; i++) {
            if(trackerTypeArray[i] === "SCIENCE") {
                document.getElementById("content-box" + trackerArray[i]).style.display = "block";
                slidearray.unshift(trackerArray[i]);

            }
        }
    }

    if (sportsClicked === true) {
        
        document.getElementById("type-sports").style.opacity = "1";

        for (i=0; i < trackerArray.length; i++) {
            if(trackerTypeArray[i] === "SPORTS") {
                document.getElementById("content-box" + trackerArray[i]).style.display = "block";
                slidearray.unshift(trackerArray[i]);

            }
        }
    }

    if (gamesClicked === true) {
        
        document.getElementById("type-games").style.opacity = "1";

        for (i=0; i < trackerArray.length; i++) {
            if(trackerTypeArray[i] === "GAMES") {
                document.getElementById("content-box" + trackerArray[i]).style.display = "block";
                slidearray.unshift(trackerArray[i]);

            }
        }
    }

    if (musicClicked === true) {
        
        document.getElementById("type-music").style.opacity = "1";

        for (i=0; i < trackerArray.length; i++) {
            if(trackerTypeArray[i] === "MUSIC") {
                document.getElementById("content-box" + trackerArray[i]).style.display = "block";
                slidearray.unshift(trackerArray[i]);

            }
        }
    }
    
}

//function to show what is displayed when nothing is clicked
function noneClicked () {
    if (scienceClicked === false && artClicked === false && sportsClicked === false && gamesClicked === false && musicClicked === false) {
        slidearray = [];
        
        for (i=0; i < trackerArray.length; i++) {
                document.getElementById("content-box" + trackerArray[i]).style.display = "block";
        }
        for (i=0; i < trackerArray.length; i++) {
            slidearray.unshift(trackerArray[i]);
        }

    }
}

function resize(){

    var y = 0;
    if(window.innerWidth < 768){
        
        var m = true;
        var sp = true;
        var sc = true;
        var a = true;
        var g = true;
        var y = 0;
        var x = 0;
        var left;
        for (i = 0; i < trackerArray.length; i++) {

            document.getElementById("content-box" + trackerArray[i]).style.marginTop = "18vh"
            document.getElementById("content-box" + trackerArray[i]).style.left = "25%"
            document.getElementById("content-box" + trackerArray[i]).style.width = "50vw"
            
            if(trackerTypeArray[i] === "SPORTS") {
                document.getElementById("type-sports").style.width = "20vw";
                document.getElementById("type-sports").style.marginLeft = "0";
                document.getElementById("type-sports").style.marginRight= "0";
                document.getElementById("type-sports").style.float = "none";
                if (sp === true) {
                    sp = false;
                    y = y+ 1;
                    if (x === 0) {
                        var left = "type-sports";
                        x = 1;
                    }
                }
            }
            if(trackerTypeArray[i] === "SCIENCE") {
                document.getElementById("type-science").style.width = "20vw";
                document.getElementById("type-science").style.marginLeft = "0";
                document.getElementById("type-science").style.marginRight= "0";
                document.getElementById("type-science").style.float = "none";
                if (sc === true) {
                    sc = false;
                    y = y+ 1;
                    if (x === 0) {
                        var left = "type-science";
                        x = 1;
                    }
                }
            }
            if(trackerTypeArray[i] === "GAMES") {
                document.getElementById("type-games").style.width = "20vw";
                document.getElementById("type-games").style.marginLeft = "0";
                document.getElementById("type-games").style.marginRight= "0";
                document.getElementById("type-games").style.float = "none";
                if (g === true) {
                    g = false;
                    y = y+ 1;
                    if (x === 0) {
                        var left = "type-games";
                        x = 1;
                    }
                }
            }
            if(trackerTypeArray[i] === "MUSIC") {
                document.getElementById("type-music").style.width = "20vw";
                document.getElementById("type-music").style.marginLeft = "0";
                document.getElementById("type-music").style.marginRight= "0";
                document.getElementById("type-music").style.float = "none";
                if (m === true) {
                    m = false;
                    y = y+ 1;
                    if (x === 0) {
                        var left = "type-music";
                        x = 1;
                    }
                }
            }
            if(trackerTypeArray[i] === "ART") {
                document.getElementById("type-art").style.width = "20vw";
                document.getElementById("type-art").style.marginLeft = "0";
                document.getElementById("type-art").style.marginRight= "0";
                document.getElementById("type-art").style.float = "none";
                if (a === true) {
                    a = false;
                    y = y+ 1;
                    if (x === 0) {
                        var left = "type-art";
                        x = 1;
                    }
                }
            }
        }
        console.log(left);
        console.log(y);
    
    }
    if (y === 4) {
        document.getElementById(left).style.marginLeft = "10vw";
    }
    if (y === 3) {
        document.getElementById(left).style.marginLeft = "20vw";
    }
    if (y === 2) {
        document.getElementById(left).style.marginLeft = "30vw";
    }
    if (y === 1) {
        document.getElementById(left).style.marginLeft = "40vw";
    }
}
window.onload=window.onresize=resize;



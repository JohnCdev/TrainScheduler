// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAsnXr9Dt0-vKVqLrqdWR8nYMXZTOD6hek",
    authDomain: "learn-d1639.firebaseapp.com",
    databaseURL: "https://learn-d1639.firebaseio.com",
    projectId: "learn-d1639",
    storageBucket: "",
    messagingSenderId: "146908920295",
    appId: "1:146908920295:web:c16e34818ee4bf5c"
};
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

$("#add-train").on("click", function (event) {
    event.preventDefault();

    var name = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var first = moment($("#first-input").val().trim(), "HH:mm").format("X");
    var frequency = $("#frequency-input").val().trim();

    $("#name-input").val("");
    $("#destination-input").val("");
    $("#first-input").val("");
    $("#frequency-input").val("");
    database.ref().push({
        name: name,
        destination: destination,
        first: first,
        frequency: frequency,
    })
});

database.ref().orderByChild("dateAdded").limitToLast(2).on("child_added", function (snapshot) {
    //database.ref().on("child_added", function (snapshot) {
    var sv = snapshot.val( );
    var trainStart = moment.unix(sv.first).format("HH:mm");
    var convertedStart = moment(trainStart, "HH:mm").subtract(1, "years");
    var tname = $("<td>").text(sv.name);
    var tdest = $("<td>").text(sv.destination);
    var tfrequency = $("<td>").text(sv.frequency);
    var diff = moment().diff(moment(convertedStart), 'minutes');
    var remainder = diff % sv.frequency;
    var nextTrainMin = sv.frequency - remainder;
    var nextTrainArrival = moment().add(nextTrainMin, "minutes");
    var tnextArrival = $("<td>").text(moment(nextTrainArrival).format("HH:mm"));
    var tminutesAway = $("<td>").text(nextTrainMin);
    var trow = $("<tr>");
    trow.append(tname, tdest, tfrequency, tnextArrival, tminutesAway);
    $("tbody").append(trow);

});
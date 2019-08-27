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

$("#add-employee").on("click", function (event) {
    event.preventDefault();

    var name = $("#name-input").val().trim();
    var role = $("#role-input").val().trim();
    var startDate = moment($("#startDate-input").val().trim(), "MM/DD/YYYY").format("X");
    var monthlyRate = $("#monthlyRate-input").val().trim();

    $("#name-input").val("");
    $("#role-input").val("");
    $("#startDate-input").val("");
    $("#monthlyRate-input").val("");

    database.ref().push({
        name: name,
        role: role,
        startDate: startDate,
        monthlyRate: monthlyRate,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    })
});

database.ref().orderByChild("dateAdded").limitToLast(2).on("child_added", function (snapshot) {
    //database.ref().on("child_added", function (snapshot) {
    var sv = snapshot.val();
    var empStart = moment.unix(sv.startDate).format("MM/DD/YYYY");
    console.log(empStart);
    var tname = $("<td>").text(sv.name);
    var trole = $("<td>").text(sv.role);
    var tStartDate = $("<td>").text(empStart);
    var tMonthsWorked = $("<td>").text(moment().diff(moment(empStart, "X"), "months") * -1);
    var tMonthlyRate = $("<td>").text(sv.monthlyRate);
    var tTotalBilled = $("<td>").text(moment().diff(moment(empStart, "X"), "months") * -1 * sv.monthlyRate);
    var trow = $("<tr>");
    trow.append(tname, trole, tStartDate, tMonthsWorked, tMonthlyRate, tTotalBilled);
    $("tbody").append(trow);

});



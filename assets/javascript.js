var config = {
    apiKey: "",
    authDomain: "watercap-654bc.firebaseapp.com",
    databaseURL: "https://watercap-654bc.firebaseio.com",
    projectId: "watercap-654bc",
    storageBucket: "",
    messagingSenderId: "462797256810",
    appId: "1:462797256810:web:cb043d72400f5713"
};

firebase.initializeApp(config);
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

database.ref().orderByChild("dateAdded").limitToLast(2).on("child_added", function(snapshot) {
//database.ref().on("child_added", function (snapshot) {
    var sv = snapshot.val();
    var empStart = moment.unix(sv.startDate).format("MM/DD/YYYY");
    console.log(empStart);
    var tname = $("<td>").text(sv.name);
    var trole = $("<td>").text(sv.role);
    var tStartDate = $("<td>").text(empStart);
    var tMonthsWorked = $("<td>").text(moment().diff(moment(empStart, "X"), "months")*-1);
    var tMonthlyRate = $("<td>").text(sv.monthlyRate);
    var tTotalBilled = $("<td>").text(moment().diff(moment(empStart, "X"), "months") * -1 * sv.monthlyRate);
    var trow = $("<tr>");
    trow.append(tname, trole, tStartDate, tMonthsWorked, tMonthlyRate, tTotalBilled);
    $("tbody").append(trow);

});



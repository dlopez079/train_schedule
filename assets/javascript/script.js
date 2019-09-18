// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. INITIALIZE FIREBASE *********************************
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAV5d_rOdKlmVR3JjJiU0VL7qMdzFkE2J4",
    authDomain: "train-tra.firebaseapp.com",
    databaseURL: "https://train-tra.firebaseio.com",
    projectId: "train-tra",
    storageBucket: "",
    messagingSenderId: "130326285991",
    appId: "1:130326285991:web:bad1c056d0ecf0395d9582"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  var database = firebase.database();
  //DATABASE INITIALIZED***********************************
  



  // 2. BUTTON FOR ADDING TRAIN*****************************
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var train = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = $("#firstTrain-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: train,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    };
  
    // Uploads Train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#firstTrain-input").val("");
    $("#frequency-input").val("");
  }); //END OF BUTTON FOR ADDING TRAIN*****************************
  
  // 3. CREATE FIREBASE EVENT FOR ADDING TRAIN TO THE DATABASE AND A ROW IN HTML WHEN A USER ADDS AN ENTRY
  database.ref().on("child_added", function(snap) {
    console.log(snap.val());
  
    // Store everything into a variable.
    var train = snap.val().train;
    var destination = snap.val().destination;
    var firstTrain = snap.val().firstTrain;
    var frequency = snap.val().frequency;
  
    // Train Info
    console.log(train);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);
  
    // Prettify the employee start
    var firstTrainPretty = moment.unix(firstTrain).format("MM/DD/YYYY");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var empMonths = moment().diff(moment(firstTrain, "X"), "months");
    console.log(empMonths);
  
    // Calculate the total billed rate
    var empBilled = empMonths * frequency;
    console.log(empBilled);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(train),
      $("<td>").text(destination),
      $("<td>").text(firstTrainPretty),
      $("<td>").text(empMonths),
      $("<td>").text(frequency),
      $("<td>").text(empBilled)
    );
  
    // Append the new row to the table
    $("#employee-table > tbody").append(newRow);
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
  
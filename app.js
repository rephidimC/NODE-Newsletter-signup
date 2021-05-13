//jshint esversion:6
const express= require("express");
const app = express();
const https=require("https");
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));




app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.use(express.static("public"));

//
app.post("/", function(req, res) {
var firstName = req.body.firstName;
var lastName = req.body.lastName;
var emailAddress = req.body.emailAddress;

console.log(firstName, lastName, emailAddress);

// We need to store our data as a javaScript object as that's what stringify says our answer should be in,
// Now, understand that API owner decides how we store our stuff.

var data = {
  members: [
    {
      email_address: emailAddress,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }
  ]
};

var jsonData = JSON.stringify(data);
// console.log(jsonData);

var url = "https://us1.api.mailchimp.com/3,0/lists/21268c0375";
var options = {
  method: "POST",
  auth: "victor:bab968c3c5a9e08d6ff35572fed9fac4-us1"
};

var request = https.request(url, options, function(response) {
  response.on("data", function(data) {
    console.log(JSON.parse(data));
  });
});

request.write(jsonData);
request.end();
});

app.listen(3000, function(res, req) {
  console.log("Server is on port 3000");
});

// API KEY
// bab968c3c5a9e08d6ff35572fed9fac4-us1


// unique ID for list
// 21268c0375

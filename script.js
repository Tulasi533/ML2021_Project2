messages = document.getElementById('messages');
input = document.getElementById('input');
botblock = document.getElementById('botblock');
userblock = document.getElementById('userblock');

msgno = 0; //ID

var flag=false;
var loadFile = function(event) {
	var image = document.getElementById('myphoto');
	image.src = URL.createObjectURL(event.target.files[0]);
};

// data from data.json file
var plants;
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    plants = JSON.parse(xhttp.responseText);
  }
};
xhttp.open("GET", "data.json", true);
xhttp.send();


function taketheinput(event) {
	// here is the js code for input processing
	//if they hit the enter key 
	if(event.key === "Enter"){
                // create a USER message block
		messages.innerHTML += userblock.outerHTML;
		// and change its ID
		msgno += 1;
		messages.lastChild.id = msgno;
		//now changing its TEXT
		messages.lastChild.childNodes[3].textContent = input.value;
		// finally process the input 
		processinput(input.value.toLowerCase());
		input.value = "";

	}
}

function processinput(inputval){

	if(inputval!=""){
		// create a BOT message block
		messages.innerHTML += botblock.outerHTML
		// and change its ID
		msgno += 1
		messages.lastChild.id = msgno
		//now changing its text
		messages.lastChild.childNodes[3].textContent = reply(inputval)
	}

}

// reply by the bot according user input
function reply(inputval) {

	result = inputval.match(/(how)|(\w+)/g)
	var poss = "how water days to grow soil mango greengram hibiscus tomato cotton  thank you thanks";
	if(poss.includes(inputval)==false && flag==false){
		flag=true;
		return "Hi "+inputval.toUpperCase()+"! Enter the plant name you want to grow"
	}
	if(result.includes("soil")){
		var img = document.createElement('img');
		img.src=recentproduct.soilimg; 
		document.getElementById(msgno).appendChild(img);
		return recentproduct.soil
	}
	if(result.includes("water")){
		var img = document.createElement('img'); 
		img.src=recentproduct.waterimg; 
		document.getElementById(msgno).appendChild(img);
		return recentproduct.water
	}
	if(result.includes("days")){
		var img = document.createElement('img'); 
		img.src=recentproduct.daysimg; 
		document.getElementById(msgno).appendChild(img);
		return recentproduct.days
	}
	if(result.includes("how")){
		var iframe = document.createElement('iframe'); 
		iframe.src=recentproduct.vid
		document.getElementById(msgno).appendChild(iframe);
		return "Watch this video for more info!!!!";
	}
	if(result.includes("thank")){
			return "Happy Gardening :-)"
	}
	a="";
	result.forEach(function(product){
		if(plants.hasOwnProperty(product)){
		a = "Please Enter the details you want to know. For Ex: 1) soil, 2) water, 3) how, 4) days to growetc.,"
		recentproduct = plants[product];
		}
	})
	if(a){
		return a;
	}
	return "Sorry " + inputval + " is not available!";
}

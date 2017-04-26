var count = 0;
var timerInterval;
var started = false;
timerListener = function(){
	if(started == true)
		started = false;
	else
		started = true;
	if(started){
		timerInterval = setInterval(function(){
			count = count+0.01;
			count = Math.round(count * 100) / 100
			document.getElementById("count").innerHTML = count;
		},10);
	}
	else{
		if(timerInterval)
			clearInterval(timerInterval);
	}
	//count = 0;
	
	//document.getElementById("hidden").innerText = "";
	//start();
}

resetHandler = function(){
	if(timerInterval)
			clearInterval(timerInterval);
	count = 0;
	document.getElementById("count").innerHTML = count;
	started = false;
	var div = document.getElementById("pasttimespanel");
	div.innerHTML = "";
}

recordHandler = function(){
	var div = document.getElementById("pasttimespanel");
	div.innerHTML = div.innerHTML + "<br>" + count;
}

handleKeyPress = function(){
	if(event.key == "s")
		timerListener();
	else if(event.key == "t")
		recordHandler();
	else if(event.key == "r")
		resetHandler();
		
}

document.getElementById("start").addEventListener("click",timerListener);

document.getElementById("reset").addEventListener("click",resetHandler);

document.getElementById("record").addEventListener("click",recordHandler);

document.addEventListener("keypress",handleKeyPress);



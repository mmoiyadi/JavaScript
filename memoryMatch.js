var count = 0;
var timerInterval;



timerListener = function(){
	if(timerInterval)
		clearInterval(timerInterval);
	count = 0;
	timerInterval = setInterval(function(){
	count++;
	document.getElementById("timer").innerHTML = "Time Elapsed:" + count;
	},1000);
	document.getElementById("hidden").innerText = "";
	start();
}

winEventListener = function(){
	//alert("You won the game in " + count + " seconds");
	var str = "You won the game in " + count + " seconds";
	document.getElementById("hidden").innerText = str;
}

document.getElementById("restart").addEventListener("click",timerListener);
document.getElementById("hidden").addEventListener("win",winEventListener)

compare = function(cell1, cell2){
	var id1 = cell1.getAttribute("id");
	var id2 = cell2.getAttribute("id");
	if(id1 == id2)
		return false;
	if(numbers[id1] == numbers[id2])
		return true;
	else return false;
}

reveal = function(cell){
	//cell.style.background = "green";
	var id = cell.getAttribute("id");
	//cell.innerText = numbers[id];
	if(numbers[id] == "1")
		cell.style.background = "url(apple.jpg) no-repeat center center";
	else if(numbers[id] == "2")
		cell.style.background = "url(orange.jpg) no-repeat center center";
	else if(numbers[id] == "3")
		cell.style.background = "url(mango.jpg) no-repeat center center";
	else if(numbers[id] == "4")
		cell.style.background = "url(pineapple.jpg) no-repeat center center";
	else
		cell.style.background = "green";
}

hide = function(cell){
	cell.style.background = "purple";
	cell.innerText = "";
}

clickHandler = function(){
		 console.log(this);
		 reveal(this);
		 if(pairing){
			 if(compare(this, pairing)){
				reveal(pairing);
				reveal(this);
				pairing = null;
				paired++;
				if(paired == 4){
					//alert("You won the game in " + count + " seconds");
					paired=0;
					if(timerInterval)
						clearInterval(timerInterval);
					//alert("You won the game in " + count + " seconds");
					var event = new Event('win');
					document.getElementById("hidden").dispatchEvent(event);
				}
				return;
			 }
			 else{
				 pairing = null;
			 }
		 }
		 else{
			 pairing = this;
		 }
		 setTimeout(function(){
			 hide(this);
		 }.bind(this),500);
}

var pairing=null;
var numbers = [];
var paired = 0;


function randomAnswers(){
        var answers = [1,1,2,2,3,3,4,4,5];

        answers.sort(function(item){
            return .5 - Math.random();
        })

        return answers;

    }

start = function(populate){
	var table = document.getElementById("gridTable");
	var ra = randomAnswers();
	var countRA = 0;
	for (var i = 0, row; row = table.rows[i]; i++) {
	   for (var j = 0, col; col = row.cells[j]; j++) {
		 var id = col.getAttribute("id");
		 col.innerText = ra[countRA].toString();
		 countRA = countRA + 1;
		 //if(populate){
			numbers[id] = col.innerText;
			col.addEventListener("click",clickHandler);
		 //}
		 hide(col);
	   }  
	}
}

start(true);
timerListener();
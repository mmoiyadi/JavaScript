


    document.getElementById("button").addEventListener('click',function(){
        run(gen).catch(function(err){
            alert(err.message);
        });
    })


    function *gen(){
        //check if input is valid
		var ship1  = document.getElementById("ship1");
		var ship2  = document.getElementById("ship2");
        console.log(ship1);
		console.log(ship2);

        //fetch the film
        var starshipResponse1 = yield fetch("http://swapi.co/api/starships/" + ship1.value);
		var starshipResponse2 = yield fetch("http://swapi.co/api/starships/" + ship2.value);
		
        var starship1 = yield starshipResponse1.json();
		var starship2 = yield starshipResponse2.json();
		
		console.log(starship1);
		console.log(starship2);
		
		
		
        var table  = document.getElementById("shipTable");
		table.rows[1].cells[1].innerHTML = starship1.name; //ship1 name
		table.rows[1].cells[2].innerHTML = starship2.name; //ship2 name
		table.rows[1].cells[1].style.backgroundColor = "";
		table.rows[1].cells[2].style.backgroundColor = "";
		
		table.rows[2].cells[1].innerHTML = starship1.cost_in_credits; //ship1 cost
		table.rows[2].cells[2].innerHTML = starship2.cost_in_credits; //ship2 cost
		table.rows[2].cells[1].style.backgroundColor = "";
		table.rows[2].cells[2].style.backgroundColor = "";
		
		table.rows[3].cells[1].innerHTML = starship1.max_atmosphering_speed; //ship1 speed
		table.rows[3].cells[2].innerHTML = starship2.max_atmosphering_speed; //ship2 speed
		table.rows[3].cells[1].style.backgroundColor = "";
		table.rows[3].cells[2].style.backgroundColor = "";
		
		table.rows[4].cells[1].innerHTML = starship1.cargo_capacity; //ship1 cargo size
		table.rows[4].cells[2].innerHTML = starship2.cargo_capacity; //ship2 cargo size
		table.rows[4].cells[1].style.backgroundColor = "";
		table.rows[4].cells[2].style.backgroundColor = "";
		
		table.rows[5].cells[1].innerHTML = starship1.passengers; //ship1 passengers
		table.rows[5].cells[2].innerHTML = starship2.passengers; //ship2 passengers
		table.rows[5].cells[1].style.backgroundColor = "";
		table.rows[5].cells[2].style.backgroundColor = "";
		
		for(let i=2; i <=5; i++){
			if(parseInt(table.rows[i].cells[1].innerHTML) > parseInt(table.rows[i].cells[2].innerHTML))
				table.rows[i].cells[1].style.backgroundColor = "red";
			else if(parseInt(table.rows[i].cells[2].innerHTML) > parseInt(table.rows[i].cells[1].innerHTML))
				table.rows[i].cells[2].style.backgroundColor = "red";
			
		}
        

    }

    function run(genFunc){
        const genObject= genFunc(); //creating a generator object

        function iterate(iteration){ //recursive function to iterate through promises
            if(iteration.done) //stop iterating when done and return the final value wrapped in a promise
                return Promise.resolve(iteration.value);
            return Promise.resolve(iteration.value) //returns a promise with its then() and catch() methods filled
            .then(x => iterate(genObject.next(x))) //calls recursive function on the next value to be iterated
            .catch(x => iterate(genObject.throw(x))); //throws an error if a rejection is encountered
        }

        try {
            return iterate(genObject.next()); //starts the recursive loop
        } catch (ex) {
            return Promise.reject(ex); //returns a rejected promise if an exception is caught
        }
    }
            


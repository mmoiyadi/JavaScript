document.getElementById("analyseButton").addEventListener("click", analyze);

function analyze(){
	var reqBody = {
		"url":document.getElementById("input").value
	}
	var myHeader =  new Headers({
		'Content-Type': 'application/json',
		'Ocp-Apim-Subscription-Key':'023f1661f6244d3e9f81501646ef9a0f'
	});
	
	
	
	var initObject = {
		method: 'POST',
		body: JSON.stringify(reqBody),
		headers: myHeader
	}
	
	var request = new Request('https://westus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=true&returnFaceAttributes=age,gender',initObject);
	
	fetch(request).then(function(response){
		if(response.ok){
			return response.json();
		}
		else{
			return Promise.reject(new Error(response.statusText));
		}
	}).then(function(response){
		if(response.length>0){
			document.getElementById("output").innerHTML = "Age: " + response[0].faceAttributes.age + "</br>" + "Gender: " + response[0].faceAttributes.gender;
			document.getElementById("img1").src=document.getElementById("input").value;
		}
		else{
			alert("No face detected");
		}
	}).catch(function(err){
		alert(err);  
		document.getElementById("output").innerHTML = "";
	});

}
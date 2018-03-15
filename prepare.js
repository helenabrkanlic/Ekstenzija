function getCurrentTabUrl(callback) {
 var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {
   var tab = tabs[0];
   var url = tab.url;
   callback(url);
  });
}
document.addEventListener('DOMContentLoaded', () => {
  getCurrentTabUrl((url) => {
	  var request = new XMLHttpRequest();
	  request.onreadystatechange = function(){
		  if(this.status==200 && this.readyState==4){
			  doJob(request);
		  }
	  };
	 
	  var hostname = "";
	  if(!(url==="chrome://newtab/")){
		  var u = new URL(url);
		  hostname = u.hostname;
	  }
	  request.open("GET", "http://freegeoip.net/json/"+hostname,true);
	  request.send();
  })
  });
function doJob(request){
	var response = request.responseText;
	var json = JSON.parse(response);
	document.getElementById("ip").innerHTML = json.ip;
	document.getElementById("state").innerHTML = json.country_name;
	document.getElementById("city").innerHTML = json.city;
	document.getElementById("timeZone").innerHTML = json.time_zone;
	var map = new google.maps.Map(document.getElementById('location'), {
	  center: {lat: json.latitude, lng: json.longitude},
	  zoom: 8
	});
	var marker = new google.maps.Marker({
		position: {lat: json.latitude, lng: json.longitude},
		map: map,
	   
	});
}

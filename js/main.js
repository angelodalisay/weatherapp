var date = new Date();
			 var hour = date.getHours();
             var min = date.getMinutes();

             console.log("hour: "+hour+" minute: "+min);

             if(hour<5){
                   $(function() {
    			   var BV = new $.BigVideo();
    			   BV.init();
    			   BV.show(['night.mp4'],{ambient:true});
                   });
               }else if(hour<16){
               		$(function() {
    			   var BV = new $.BigVideo();
    			   BV.init();
    			   BV.show(['daylight.mp4'],{ambient:true});
                   });
               }else if(hour<19){
               		$(function() {
    			   var BV = new $.BigVideo();
    			   BV.init();
    			   BV.show(['evening.mp4'],{ambient:true});
                   });
               }else{
                   	$(function() {
    			   var BV = new $.BigVideo();
    			   BV.init();
    			   BV.show(['night.mp4'],{ambient:true});
                   });
 }

$('.submit').click(function(){

	var city = $('.city_names').val();
	console.log(city);
	$.ajax({
        url: "http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=13ee6543faae4f2022c03420fd21df38",
	    jsonp: "callback",
	    dataType: "jsonp",
	    data: {
	        q: city,
	        units:"metric",
	        mode: "json"
	    },
	    success: function( response ) {
             var temp = response.list[0].main.temp;
             if(temp<25 ){
            	 $('.message').html("it's feels cold, get a jacket");
             }else if(temp<35){
            	 $('.message').html("it's feels normal");
             }else if(temp<50){
            	 $('.message').html("it's feels hot, switch on your AC");
             }

	    	 	$('.city').html(response.city.name);
	    	 	$('.country').html('( </span><span>'+response.city.country+'</span><span> )');
	    	 	$('.temp').html('<span>'+response.list[0].main.temp+'</span><span class="t">* C</span>');


	    }
	});
});

$(document).ready(function(){
	$( ".city_names" ).autocomplete({
		source: function( request, response ) {
			$.ajax({
                url: "http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=13ee6543faae4f2022c03420fd21df38",
				dataType: "jsonp",
				data: {
					q: request.term,
					mode: "json"
				},
				success: function( data ) {
					// Fix for IE 8 as forEach function not supported yet below IE 9
					if (typeof Array.prototype.forEach != 'function') {
					    Array.prototype.forEach = function(callback){
					      for (var i = 0; i < this.length; i++){
					        callback.apply(this, [this[i], i, this]);
					      }
					    };
					}

					var parsed = data.list;
					var newArray = new Array(parsed.length);
					var i = 0;
					  parsed.forEach(function (entry) {
	                    var newObject = {
	                        label: entry.name+" "+entry.sys.country
	                    };
	                    newArray[i] = newObject;
	                    i++;
	                });

					  response(newArray);
				},
				error: function (message) {
	                response([]);
	            }
			});
		},
		minLength: 2,
		open: function() {
			$( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
		},
		close: function() {
			$( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
		}
	});

});




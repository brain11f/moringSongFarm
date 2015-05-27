var images = undefined;
jQuery(document).ready(function($){
	var url = "https://api.instagram.com/v1/users/214414567/media/recent";
	$.ajax({
		url: url,
		data: {access_token: "214414567.dfff61a.e17c0e72ab3947debf6e34271e1fecb7"},
		dataType: 'jsonp',
		type: 'GET',
		success: function(data) {
			images = data;
			// Get 10 random images
			var arr = []
			while(arr.length < 11){
			  var randomnumber=Math.floor((Math.random()*19));
			  var found=false;
			  for(var i=0;i<arr.length;i++){
			    if(arr[i]==randomnumber){found=true;break}
			  }
			  if(!found)arr[arr.length]=randomnumber;
			}
			window.current_images = arr;
			arr.forEach(function(i, count){
				element = data.data[i];
				var _e = $('<img />', {src: element.images.standard_resolution.url, id: 'image-'+(count+1), alt: element.caption.text}).appendTo('.image-' + (count + 1));
				if( count == 2 || count == 7 ) {
					// _e.attr({height: '300'});
				} else {
					_e./*attr({height: '150'}).*/after('<br />')
				}
				_e.wrap( $('<a />', {href: element.link, title: element.caption.text, target: '_blank'}) );
			});

			setInterval('replace_image()', 3500);
		}
	});
});

function replace_image() {
	var count = Math.floor((Math.random()*9)+1),
		index = -1
	while(index == -1){
		var randomnumber=Math.floor((Math.random()*19)),
			found=false;
		window.current_images.forEach(function(i){
			if(i == randomnumber){found=true;}	
		})
		if(!found)index=randomnumber;
	}

	// Remove old image and add new image
	window.current_images.splice(count - 1, 1)
	window.current_images.splice(count - 1, 0, index)
	
	element = images.data[index];
	var image = $('.instagram-image #image-' + (count + 1)),
		new_image = image.clone().attr({src: element.images.standard_resolution.url, style: 'display: none', id: 'image-'+(count+1)+'-replacement', alt: element.caption.text});

	image.stop().fadeOut('slow', function(){
		if( count == 0 || count == 3 || count == 5 || count == 8 ) {
			new_image.prependTo( image.parent() )
			image.parent().parent().find('br').remove();
			new_image.after('<br />');
		} else if( count == 1 || count == 4 || count == 6 || count == 9 ) {
			new_image.appendTo( image.parent() )	
			image.parent().parent().find('br').remove();
			new_image.before('<br />');
		} else {
			new_image.appendTo( image.parent() )
		}
		image.unwrap('a').remove();
		new_image.fadeIn('medium');
		new_image.attr('id', 'image-'+(count+1)).fadeIn('medium');
		new_image.wrap( $('<a />', {href: element.link, title: element.caption.text, target: '_blank'}) )
    });
}
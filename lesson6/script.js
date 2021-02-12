			
				var image = document.getElementsByTagName("img");
				for(var i=0;i<image.length;i++){
					image[i].onclick=showBigPicture
				}
			
			
			function showBigPicture(event){ 			
				var bigPictureBlock = document.getElementById("bigPicture");
				bigPictureBlock.innerHTML="";
				var smallPicture = event.target;
				var imageNameParts = smallPicture.id.split("_");
				var path = 'big/'+imageNameParts[1]+'.png';
				var bigPicture = document.createElement('img');
				bigPicture.src = path;
				bigPictureBlock.appendChild(bigPicture);
				bigPicture.onerror = function(){
					alert("Большого КОТА нет");
				}		
			}						
		
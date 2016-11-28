window.onload = function() {
	waterfall('main', 'container', data);
}

function waterfall(parent, child, data) {
	var data = data || [];

	var oParent = document.getElementById(parent);
	var aChild = document.getElementsByClassName(child);

	init();

	window.onscroll = function() {
		if (checkScroll()) {
			for (var i = 0; i < data.length; i++) {
				loadPic(data[i].src);
			}
			init();
		}
	}

	// initialize, set proper style for all images
	function init() {
		// calculate how many colums can be put in browser (browser width/container width)
		var childWidth = aChild[0].offsetWidth
		var cols = Math.floor(document.documentElement.clientWidth / childWidth);

		// set main width and style
		oParent.style.cssText = 'width:' + childWidth * cols + 'px;margin: 0 auto;';

		// store every col height
		var heightPerCol = [];

		// put image right under the shortest and re-assign the height value
		for (var i = 0; i < aChild.length; i++) {
			if (i < cols) {
				heightPerCol.push(aChild[i].offsetHeight)
			} else {
				var minHeight = Math.min.apply(null, heightPerCol);
				var index = minHeightIndex(heightPerCol, minHeight);
				aChild[i].style.position = 'absolute';
				aChild[i].style.top = minHeight + 'px';
				aChild[i].style.left = aChild[index].offsetLeft + 'px';
				heightPerCol[index] += aChild[i].offsetHeight;
			}
		}
	}

	// check scroll statu see if new image shold pop up
	function checkScroll() {
		var lastH = aChild[aChild.length - 1].offsetTop + Math.floor((aChild[aChild.length - 1].offsetHeight) / 2);
		var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
		var bodyH = document.body.clientHeight || document.documentElement.clientHeight;
		return lastH < bodyH + scrollTop;
	}

	// create new image
	function loadPic(src) {
		var container = document.createElement('li');
		var pic = document.createElement('div');
		var img = document.createElement('img');
		container.className = 'container';
		pic.className = 'pic';
		img.src = src;
		img.style.cssText = "opacity:0;transform:scale(0);transition:1s;"
		pic.appendChild(img);
		container.appendChild(pic);
		oParent.appendChild(container);
		//set delay load
		(function(img) {
			setTimeout(function() {
				img.style.cssText = "opacity:1;transform:scale(1);transition:1s;";
			}, 100);
		})(img);

	}

	// check min height index in array
	function minHeightIndex(arr, val) {
		for (var i in arr) {
			if (arr[i] === val) {
				return i;
			}
		}
	}
}
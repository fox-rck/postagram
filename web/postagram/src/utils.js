export default {
	getParameterByName(name, url = window.location.href) {
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return "";
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	},
	getRandom: function (len = 20) {
		var ret = "";
		var opts = "abcdefghijklmnopqrstuvwxyz1234567890";
		for (var x = 0; x < len; x++) {
			ret += opts[Math.floor(Math.random() * opts.length)];
		}
		return ret;
	},
	matches: (obj, source) => {
		return Object.keys(source).every(
			(key) => obj.hasOwnProperty(key) && obj[key] === source[key]
		);
	},
};

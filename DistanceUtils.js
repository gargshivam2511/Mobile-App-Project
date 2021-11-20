export function distance(lat1, long1, lat2, long2) {
	var R = 6371; // approx. Radius of the earth in km
	var dLat = (lat2 - lat1) * (Math.PI / 180);
	var dLon = (long2 - long1) * (Math.PI / 180);
	lat1 = lat1 * (Math.PI / 180);
	lat2 = lat2 * (Math.PI / 180);
	long1 = long1 * (Math.PI / 180);
	long2 = long2 * (Math.PI / 180);
	var a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c; // Distance in km

	return d * 1000; // Distance in m
}

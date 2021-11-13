export class Track {
	constructor(name, segments) {
		this.name = name;
		this.segments = segments;
	}
}

export class Segment {
	constructor(points) {
		this.points = points;
	}
}

export class Point {
	constructor(lat, lon) {
		this.lat = lat;
		this.lon = lon;
	}
}

export function parseGpx(xml, callback) {
	let parseString = require("react-native-xml2js").parseString;
	parseString(xml, function (err, result) {
		callback(
			result.gpx.trk.map(function (trk) {
				return new Track(
					trk.name[0],
					trk.trkseg.map(function (trkseg) {
						return new Segment(
							trkseg.trkpt.map(function (coord) {
								return new Point(
									parseFloat(coord.$.lat),
									parseFloat(coord.$.lon)
								);
							})
						);
					})
				);
			})
		);
	});
}

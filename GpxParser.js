import GpxTrack from "./GpxTrack";
import GpxSegment from "./GpxSegment";
import GpxPoint from "./GpxPoint";

export function parseGpx(xml, callback) {
	let parseString = require("react-native-xml2js").parseString;
	parseString(xml, function (err, result) {
		callback(
			result.gpx.trk.map(function (trk) {
				return new GpxTrack(
					trk.name[0],
					trk.trkseg.map(function (trkseg) {
						return new GpxSegment(
							trkseg.trkpt.map(function (coord) {
								return new GpxPoint(
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

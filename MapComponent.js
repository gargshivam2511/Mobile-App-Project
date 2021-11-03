import React, { Component } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView from "react-native-maps";
import { parseGpx } from "./GpxParser";
import TrackComponent from "./TrackComponent";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default class MapComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		parseGpx(gpxContent, (parsedContent) => (this.state.gpx = parsedContent));
	}

	render() {
		console.log(this.state.gpx);
		return (
			<View style={styles.container}>
				<MapView
					style={styles.map}
					initialRegion={{
						latitude: 49.25,
						longitude: -123.1,
						latitudeDelta: 0.2,
						longitudeDelta: 0.2
					}}
				>
					<TrackComponent track={this.state.gpx.tracks[0]} />
				</MapView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center"
	},
	map: {
		...StyleSheet.absoluteFillObject,
		height: windowHeight
	}
});

let gpxContent = `<?xml version="1.0" encoding="UTF-8"?>
<gpx creator="Garmin Connect" version="1.1"
  xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/11.xsd"
  xmlns:ns3="http://www.garmin.com/xmlschemas/TrackPointExtension/v1"
  xmlns="http://www.topografix.com/GPX/1/1"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ns2="http://www.garmin.com/xmlschemas/GpxExtensions/v3">
  <metadata>
    <name>Kennedy Falls</name>
    <link href="connect.garmin.com">
      <text>Garmin Connect</text>
    </link>
    <time>2021-07-01T06:56:53.000Z</time>
  </metadata>
  <trk>
    <name>Kennedy Falls</name>
    <trkseg>
      <trkpt lat="49.365828428417444" lon="-123.04027006030083">
        <ele>405.71578222185366</ele>
        <time>2021-07-01T06:56:53.000Z</time>
      </trkpt>
      <trkpt lat="49.36614274978638" lon="-123.04028749465942">
        <ele>404.7280115950638</ele>
        <time>2021-07-01T06:56:53.010Z</time>
      </trkpt>
      <trkpt lat="49.36633586883545" lon="-123.04033041000366">
        <ele>403.5968752053499</ele>
        <time>2021-07-01T06:56:53.027Z</time>
      </trkpt>
      <trkpt lat="49.366507614031434" lon="-123.04069519042969">
        <ele>403.30839135723716</ele>
        <time>2021-07-01T06:56:53.054Z</time>
      </trkpt>
      <trkpt lat="49.36655052937567" lon="-123.0407166481018">
        <ele>402.7625961945912</ele>
        <time>2021-07-01T06:56:53.082Z</time>
      </trkpt>
      <trkpt lat="49.36663627624512" lon="-123.04073810577393">
        <ele>402.15048442094206</ele>
        <time>2021-07-01T06:56:53.113Z</time>
      </trkpt>
      <trkpt lat="49.366958141326904" lon="-123.04041624069214">
        <ele>400.5414894137888</ele>
        <time>2021-07-01T06:56:53.157Z</time>
      </trkpt>
      <trkpt lat="49.36712980270386" lon="-123.03990125656128">
        <ele>398.6218845530436</ele>
        <time>2021-07-01T06:56:53.214Z</time>
      </trkpt>
      <trkpt lat="49.367451667785645" lon="-123.04000854492188">
        <ele>397.6836194619216</ele>
        <time>2021-07-01T06:56:53.282Z</time>
      </trkpt>
      <trkpt lat="49.36775207519531" lon="-123.04035186767578">
        <ele>396.9815572638583</ele>
        <time>2021-07-01T06:56:53.362Z</time>
      </trkpt>
      <trkpt lat="49.36833143234253" lon="-123.04045915603638">
        <ele>396.21597602272266</ele>
        <time>2021-07-01T06:56:53.462Z</time>
      </trkpt>
      <trkpt lat="49.369447231292725" lon="-123.04116725921631">
        <ele>396.45779927792194</ele>
        <time>2021-07-01T06:56:53.602Z</time>
      </trkpt>
      <trkpt lat="49.36957606114447" lon="-123.04118871688843">
        <ele>396.52709076820724</ele>
        <time>2021-07-01T06:56:53.746Z</time>
      </trkpt>
      <trkpt lat="49.36957597732544" lon="-123.04118871688843">
        <ele>396.75521475706773</ele>
        <time>2021-07-01T06:56:53.890Z</time>
      </trkpt>
      <trkpt lat="49.369683265686035" lon="-123.04123163223267">
        <ele>397.1049211476334</ele>
        <time>2021-07-01T06:56:54.038Z</time>
      </trkpt>
      <trkpt lat="49.369726264849305" lon="-123.04114580154419">
        <ele>397.4431155217753</ele>
        <time>2021-07-01T06:56:54.188Z</time>
      </trkpt>
      <trkpt lat="49.36972618103027" lon="-123.04114580154419">
        <ele>397.90846473926797</ele>
        <time>2021-07-01T06:56:54.338Z</time>
      </trkpt>
      <trkpt lat="49.36976909637451" lon="-123.04108142852783">
        <ele>398.35981358883225</ele>
        <time>2021-07-01T06:56:54.490Z</time>
      </trkpt>
      <trkpt lat="49.3709921836853" lon="-123.04163932800293">
        <ele>400.0669943368188</ele>
        <time>2021-07-01T06:56:54.685Z</time>
      </trkpt>
      <trkpt lat="49.371421337127686" lon="-123.04168224334717">
        <ele>400.83287047200656</ele>
        <time>2021-07-01T06:56:54.894Z</time>
      </trkpt>
      <trkpt lat="49.371678829193115" lon="-123.04108142852783">
        <ele>399.7463080572353</ele>
        <time>2021-07-01T06:56:55.119Z</time>
      </trkpt>
      <trkpt lat="49.371936321258545" lon="-123.04108142852783">
        <ele>399.20687853721665</ele>
        <time>2021-07-01T06:56:55.352Z</time>
      </trkpt>
      <trkpt lat="49.37208660878241" lon="-123.04133892059326">
        <ele>399.70494542729136</ele>
        <time>2021-07-01T06:56:55.593Z</time>
      </trkpt>
      <trkpt lat="49.373695850372314" lon="-123.04108142852783">
        <ele>399.79029673310527</ele>
        <time>2021-07-01T06:56:55.888Z</time>
      </trkpt>
      <trkpt lat="49.37500476837158" lon="-123.04125308990479">
        <ele>400.6384055068798</ele>
        <time>2021-07-01T06:56:56.227Z</time>
      </trkpt>
      <trkpt lat="49.375412464141846" lon="-123.04142475128174">
        <ele>401.58399227029963</ele>
        <time>2021-07-01T06:56:56.580Z</time>
      </trkpt>
      <trkpt lat="49.37549829483032" lon="-123.04166078567505">
        <ele>402.6692642469133</ele>
        <time>2021-07-01T06:56:56.939Z</time>
      </trkpt>
      <trkpt lat="49.3755841255188" lon="-123.04168224334717">
        <ele>403.30674999263863</ele>
        <time>2021-07-01T06:56:57.301Z</time>
      </trkpt>
      <trkpt lat="49.37564858235419" lon="-123.04153203964233">
        <ele>403.5377392553142</ele>
        <time>2021-07-01T06:56:57.667Z</time>
      </trkpt>
      <trkpt lat="49.375691413879395" lon="-123.04140329360962">
        <ele>403.42109965918405</ele>
        <time>2021-07-01T06:56:58.036Z</time>
      </trkpt>
      <trkpt lat="49.37624931335449" lon="-123.04163932800293">
        <ele>403.6404043994709</ele>
        <time>2021-07-01T06:56:58.424Z</time>
      </trkpt>
      <trkpt lat="49.37687158584595" lon="-123.04221868515015">
        <ele>404.6212942075598</ele>
        <time>2021-07-01T06:56:58.836Z</time>
      </trkpt>
      <trkpt lat="49.37732219696045" lon="-123.0422830581665">
        <ele>404.07817878030403</ele>
        <time>2021-07-01T06:56:59.263Z</time>
      </trkpt>
      <trkpt lat="49.37747240066528" lon="-123.04243326187134">
        <ele>403.25330498758075</ele>
        <time>2021-07-01T06:56:59.696Z</time>
      </trkpt>
      <trkpt lat="49.37772989273071" lon="-123.04234743118286">
        <ele>401.3745049945103</ele>
        <time>2021-07-01T06:57:00.138Z</time>
      </trkpt>
      <trkpt lat="49.37777280807495" lon="-123.04219722747803">
        <ele>399.11503431950825</ele>
        <time>2021-07-01T06:57:00.584Z</time>
      </trkpt>
      <trkpt lat="49.37788018025458" lon="-123.0422830581665">
        <ele>396.7138782282978</ele>
        <time>2021-07-01T06:57:01.034Z</time>
      </trkpt>
      <trkpt lat="49.37807321548462" lon="-123.04247617721558">
        <ele>394.18136566930536</ele>
        <time>2021-07-01T06:57:01.492Z</time>
      </trkpt>
      <trkpt lat="49.378502368927" lon="-123.0419397354126">
        <ele>389.7405502832757</ele>
        <time>2021-07-01T06:57:01.968Z</time>
      </trkpt>
      <trkpt lat="49.37946796417236" lon="-123.04112434387207">
        <ele>385.30876922482923</ele>
        <time>2021-07-01T06:57:02.481Z</time>
      </trkpt>
      <trkpt lat="49.37955379486084" lon="-123.040931224823">
        <ele>381.42692836622473</ele>
        <time>2021-07-01T06:57:02.999Z</time>
      </trkpt>
      <trkpt lat="49.379940032958984" lon="-123.0407166481018">
        <ele>377.54144135594095</ele>
        <time>2021-07-01T06:57:03.531Z</time>
      </trkpt>
      <trkpt lat="49.38015469349921" lon="-123.04045915603638">
        <ele>373.4913665214924</ele>
        <time>2021-07-01T06:57:04.072Z</time>
      </trkpt>
      <trkpt lat="49.380154609680176" lon="-123.04045915603638">
        <ele>370.050359000264</ele>
        <time>2021-07-01T06:57:04.613Z</time>
      </trkpt>
      <trkpt lat="49.38058376312256" lon="-123.0399227142334">
        <ele>366.0773669235937</ele>
        <time>2021-07-01T06:57:05.172Z</time>
      </trkpt>
      <trkpt lat="49.381184577941895" lon="-123.0398154258728">
        <ele>363.55631866252065</ele>
        <time>2021-07-01T06:57:05.751Z</time>
      </trkpt>
      <trkpt lat="49.38124895095825" lon="-123.03962230682373">
        <ele>360.6390801883941</ele>
        <time>2021-07-01T06:57:06.335Z</time>
      </trkpt>
      <trkpt lat="49.38178547658026" lon="-123.03964376449585">
        <ele>358.21753915149657</ele>
        <time>2021-07-01T06:57:06.937Z</time>
      </trkpt>
      <trkpt lat="49.382472122088075" lon="-123.03968667984009">
        <ele>356.6959205506222</ele>
        <time>2021-07-01T06:57:07.562Z</time>
      </trkpt>
      <trkpt lat="49.38296556472778" lon="-123.0394721031189">
        <ele>355.20191118157925</ele>
        <time>2021-07-01T06:57:08.204Z</time>
      </trkpt>
      <trkpt lat="49.38300848007202" lon="-123.03921461105347">
        <ele>353.96695036011965</ele>
        <time>2021-07-01T06:57:08.852Z</time>
      </trkpt>
      <trkpt lat="49.38324451446533" lon="-123.0389142036438">
        <ele>353.27367538503336</ele>
        <time>2021-07-01T06:57:09.510Z</time>
      </trkpt>
      <trkpt lat="49.38373804092407" lon="-123.0388069152832">
        <ele>353.7487441728809</ele>
        <time>2021-07-01T06:57:10.185Z</time>
      </trkpt>
      <trkpt lat="49.38405990600586" lon="-123.03889274597168">
        <ele>355.3196060939342</ele>
        <time>2021-07-01T06:57:10.871Z</time>
      </trkpt>
      <trkpt lat="49.3841028213501" lon="-123.0398154258728">
        <ele>358.9892970130196</ele>
        <time>2021-07-01T06:57:11.577Z</time>
      </trkpt>
      <trkpt lat="49.38427448272705" lon="-123.04000854492188">
        <ele>361.20810911548637</ele>
        <time>2021-07-01T06:57:12.290Z</time>
      </trkpt>
      <trkpt lat="49.38431739807129" lon="-123.04033041000366">
        <ele>364.0972734857516</ele>
        <time>2021-07-01T06:57:13.010Z</time>
      </trkpt>
      <trkpt lat="49.38457489013672" lon="-123.04069519042969">
        <ele>366.95180857002845</ele>
        <time>2021-07-01T06:57:13.742Z</time>
      </trkpt>
      <trkpt lat="49.384918212890625" lon="-123.04069519042969">
        <ele>369.1118760542154</ele>
        <time>2021-07-01T06:57:14.485Z</time>
      </trkpt>
      <trkpt lat="49.3851113319397" lon="-123.04063081741333">
        <ele>371.2941042697596</ele>
        <time>2021-07-01T06:57:15.235Z</time>
      </trkpt>
      <trkpt lat="49.38530445098877" lon="-123.04078102111816">
        <ele>373.89437006493154</ele>
        <time>2021-07-01T06:57:15.992Z</time>
      </trkpt>
      <trkpt lat="49.38579797744751" lon="-123.04095268249512">
        <ele>376.6252491119362</ele>
        <time>2021-07-01T06:57:16.766Z</time>
      </trkpt>
      <trkpt lat="49.38603401184082" lon="-123.0408239364624">
        <ele>378.86453093023977</ele>
        <time>2021-07-01T06:57:17.548Z</time>
      </trkpt>
      <trkpt lat="49.38659191131592" lon="-123.04095268249512">
        <ele>381.51566855154476</ele>
        <time>2021-07-01T06:57:18.349Z</time>
      </trkpt>
      <trkpt lat="49.38682794570923" lon="-123.0408239364624">
        <ele>384.31376635174917</ele>
        <time>2021-07-01T06:57:19.158Z</time>
      </trkpt>
      <trkpt lat="49.38723564147949" lon="-123.04095268249512">
        <ele>387.7605564592502</ele>
        <time>2021-07-01T06:57:19.981Z</time>
      </trkpt>
      <trkpt lat="49.387385845184326" lon="-123.04086685180664">
        <ele>390.67924461279404</ele>
        <time>2021-07-01T06:57:20.810Z</time>
      </trkpt>
      <trkpt lat="49.387879371643066" lon="-123.040931224823">
        <ele>394.100288886812</ele>
        <time>2021-07-01T06:57:21.655Z</time>
      </trkpt>
      <trkpt lat="49.3880295753479" lon="-123.04086685180664">
        <ele>397.2379737353001</ele>
        <time>2021-07-01T06:57:22.505Z</time>
      </trkpt>
      <trkpt lat="49.38820123672485" lon="-123.04099559783936">
        <ele>400.9767513091274</ele>
        <time>2021-07-01T06:57:23.362Z</time>
      </trkpt>
      <trkpt lat="49.38832998275757" lon="-123.0412745475769">
        <ele>405.05930074229593</ele>
        <time>2021-07-01T06:57:24.226Z</time>
      </trkpt>
      <trkpt lat="49.38832998275757" lon="-123.04202556610107">
        <ele>410.2053936560775</ele>
        <time>2021-07-01T06:57:25.107Z</time>
      </trkpt>
      <trkpt lat="49.388437271118164" lon="-123.04232597351074">
        <ele>414.423349016392</ele>
        <time>2021-07-01T06:57:25.995Z</time>
      </trkpt>
      <trkpt lat="49.388651847839355" lon="-123.04256200790405">
        <ele>418.24954408823385</ele>
        <time>2021-07-01T06:57:26.892Z</time>
      </trkpt>
      <trkpt lat="49.38912391662598" lon="-123.04256200790405">
        <ele>421.3800874215673</ele>
        <time>2021-07-01T06:57:27.805Z</time>
      </trkpt>
      <trkpt lat="49.389488697052" lon="-123.04269075393677">
        <ele>425.3912902199181</ele>
        <time>2021-07-01T06:57:28.730Z</time>
      </trkpt>
      <trkpt lat="49.38987493515015" lon="-123.04316282272339">
        <ele>429.70228375610714</ele>
        <time>2021-07-01T06:57:29.672Z</time>
      </trkpt>
      <trkpt lat="49.390175342559814" lon="-123.04331302642822">
        <ele>433.7369462110587</ele>
        <time>2021-07-01T06:57:30.624Z</time>
      </trkpt>
      <trkpt lat="49.39073324203491" lon="-123.04348468780518">
        <ele>438.1949141505524</ele>
        <time>2021-07-01T06:57:31.595Z</time>
      </trkpt>
      <trkpt lat="49.39180612564087" lon="-123.04352760314941">
        <ele>441.9546567326976</ele>
        <time>2021-07-01T06:57:32.602Z</time>
      </trkpt>
      <trkpt lat="49.39223527908325" lon="-123.0437421798706">
        <ele>446.84164022891446</ele>
        <time>2021-07-01T06:57:33.624Z</time>
      </trkpt>
      <trkpt lat="49.3926215171814" lon="-123.04408550262451">
        <ele>452.38530047350383</ele>
        <time>2021-07-01T06:57:34.661Z</time>
      </trkpt>
      <trkpt lat="49.39300775527954" lon="-123.04414987564087">
        <ele>456.77464300519625</ele>
        <time>2021-07-01T06:57:35.711Z</time>
      </trkpt>
      <trkpt lat="49.393908977508545" lon="-123.04550170898438">
        <ele>462.9587773365305</ele>
        <time>2021-07-01T06:57:36.803Z</time>
      </trkpt>
      <trkpt lat="49.39403772354126" lon="-123.0458664894104">
        <ele>467.3567323959709</ele>
        <time>2021-07-01T06:57:37.904Z</time>
      </trkpt>
      <trkpt lat="49.39410209655762" lon="-123.04651021957397">
        <ele>471.23508463062444</ele>
        <time>2021-07-01T06:57:39.019Z</time>
      </trkpt>
      <trkpt lat="49.39427375793457" lon="-123.0472183227539">
        <ele>474.5076942164512</ele>
        <time>2021-07-01T06:57:40.151Z</time>
      </trkpt>
      <trkpt lat="49.39455044455826" lon="-123.04723667912185">
        <ele>475.93319649260445</ele>
        <time>2021-07-01T06:57:41.292Z</time>
      </trkpt>
    </trkseg>
  </trk>
</gpx>
`;

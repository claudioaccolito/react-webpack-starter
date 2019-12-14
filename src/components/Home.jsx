import React, { Component } from "react";

import imgM5 from "../img/m5.png";
import Train from "./Train";
import Line from "./Line";
import "../styles/all.less";

class Home extends Component {
	render() {
		return (
			<div>
				<img id="metroo" className="metro-icon" src={imgM5} alt="" />
				<Line />
				<Train />
			</div>
		);
	}
}

export default Home;

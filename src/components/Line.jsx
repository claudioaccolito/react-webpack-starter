import React, { Component } from 'react'
import * as d3 from "d3";

import M5 from "../data/M5.json";

function getCorrectColor(i,j) {
	if (i < j) return M5.color;
	else if (i === j) return "#444";
	return "white";
}

export default class Line extends Component {
	constructor(props) {
		super(props)

		this.state = {
			selectedPoint: M5.points[0]
		}

		this.fillBefore = this.fillBefore.bind(this);
		this.goTrain = this.goTrain.bind(this);
		this.ciufciuf = this.ciufciuf.bind(this);
	}

	fillBefore(j) {
		for (let i = 1; i < M5.points.length; i++) {
			d3.select("#c" + i).transition()
				.duration(1000)
				.style("fill", getCorrectColor(i,j));
		}
	}

	goTrain(id){
		const c = "#c" + id;
		var train = d3.select("#mytrain");
		var x = d3.select(c).node().getBBox().x - 90;
		var y = d3.select(c).node().getBBox().y - 213;
		train.transition()
			.duration(1000)
			.attr("fill", "green")
			.attr("transform", "translate(" + x + "," + y + ")")
			.transition()
			.duration(1800)
			.attr("fill", "red");
	}

	ciufciuf(id) {
		const selectedPoint = M5.points.find(p => p.id === id)
		this.setState({ selectedPoint });
		this.fillBefore(id);
		this.goTrain(id);
	}

	render() {
		const {selectedPoint} = this.state;
		return (<div>
			<svg width="100%" height="480">
				<title>metro milano M5</title>
				<rect
					id="backgroundrect"
					width="100%"
					height="100%"
					x="0"
					y="0"
					fill="#FFFFFF"
					stroke="none"
				/>
				{M5.points.map((p, i) =>
					<g key={"pp" + i} className="currentLayer">

						{i < M5.points.length &&
							<rect
								id={"r" + i}
								fill={M5.color}
								x={59 + (50 * i)}
								y="218"
								width="30"
								height="10"
							/>}
						<circle
							id={"c" + p.id}
							cx={99 + (50 * i)}
							cy="223"
							r="10"
							stroke={M5.color}
							strokeWidth="4"
							fill="white"
							onClick={() => this.ciufciuf(p.id)}
						/>
						<text
							key={p.id}
							x="100"
							y={-97 + (50 * i)}
							transform="translate(0) rotate(-90 250 50)"
							fill="steelblue"
						>
							{p.name}
						</text>
					</g>
				)}
			</svg>

			<div>
				<b> {selectedPoint.name}</b>
				<br /> Status: {selectedPoint.status}
				<br /> Type: {selectedPoint.type}
			</div>
		</div>
		)
	}
}

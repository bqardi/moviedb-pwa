import { createContext, useContext } from "react";
import "./Loading.scss";

var LoadingContext = createContext();

function Loading({children, size = 32, style, className, ...other}){
	return (
		<div
			className={`Loading${className ? " " + className : ""}`}
			style={{
				...style,
				width: `${size}px`,
				height: `${size}px`
			}}
			{...other}
		>
			<LoadingContext.Provider value={{size}}>
				{children || <DotFade size={size} />}
			</LoadingContext.Provider>
		</div>
	);
}

function DotFade({
	amount = 12,
	dotSizeFactor = 1,
	animationDuration = 1200
}){
	var {size} = useContext(LoadingContext);

	function dots(){
		var arr = [];
		for (let i = 0; i < amount; i++) {
			var offsetDistance = 100 / amount * i;
			arr.push(<div
				key={i}
				className="Loading__fade Loading__fadeDot"
				style={{
					width: `${size * dotSizeFactor / (amount / 1.75)}px`,
					height: `${size * dotSizeFactor / (amount / 1.75)}px`,
					offsetPath: `path("M${size / 2},0 A${size / 2},${size / 2} 0 1,1 ${size / 2},${size} A${size / 2},${size / 2} 0 1,1 ${size / 2},0")`,
					offsetDistance: `${offsetDistance}%`,
					animationDuration: `${animationDuration / 1000}s`,
					animationDelay: `${animationDuration * offsetDistance / 100 / 1000}s`
				}}
			></div>);
		}
		return arr;
	}
	return dots();
}
Loading.DotFade = DotFade;

function LineFade({
	amount = 12,
	widthSizeFactor = 0.6,
	heightSizeFactor = 0.6,
	animationDuration = 1200
}){
	var {size} = useContext(LoadingContext);

	function lines(){
		var arr = [];
		for (let i = 0; i < amount; i++) {
			var offsetDistance = 100 / amount * i;
			arr.push(<div
				key={i}
				className="Loading__fade Loading__fadeLine"
				style={{
					width: `${size * widthSizeFactor / amount}px`,
					height: `${(size / 2) * heightSizeFactor}px`,
					offsetPath: `path("M${size / 2},0 A${size / 2},${size / 2} 0 1,1 ${size / 2},${size} A${size / 2},${size / 2} 0 1,1 ${size / 2},0")`,
					offsetDistance: `${offsetDistance}%`,
					animationDuration: `${animationDuration / 1000}s`,
					animationDelay: `${animationDuration * offsetDistance / 100 / 1000}s`
				}}
			></div>);
		}
		return arr;
	}
	return lines();
}
Loading.LineFade = LineFade;

function Jump({
	amount = 3,
	dotSizeFactor = 1,
	animationDuration = 2500
}){
	var {size} = useContext(LoadingContext);

	return (
		<div className="Loading__jump">
			{[...Array(amount)].map((_, index) =>
				<div
				key={index}
					className="Loading__jumpDot"
					style={{
						width: size * dotSizeFactor / (amount + 1) + "px",
						height: size * dotSizeFactor / (amount + 1) + "px",
						animationDuration: `${animationDuration / 1000}s`,
						animationDelay: `${(animationDuration / 4) / amount * index / 1000}s`
					}}
				></div>
			)}
		</div>
	);
}
Loading.Jump = Jump;

function Rotate({
	children,
	reverse,
	animationDuration = 2500
}){
	var {size} = useContext(LoadingContext);
	var offset = size * 0.1;
	return (
		<div className="Loading__rotate" style={{
			width: size + 2 * offset + "px",
			height: size + 2 * offset + "px",
			margin: `-${offset}px`,
			animationDuration: animationDuration / 1000 + "s",
			animationDirection: reverse ? "reverse" : "normal"
		}}>
			{children || <svg className="Loading__rotateIcon" viewBox="0 0 24 24">
				<path className="Loading__rotateIconBack" d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"></path>
				<path className="Loading__rotateIconFront" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"></path>
			</svg>}
		</div>
	);
}
Loading.Rotate = Rotate;

export default Loading;
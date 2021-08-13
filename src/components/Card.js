import "./Card.scss";

function Card({children}){
	return (
		<article className="Card">
			{children}
		</article>
	);
}

function Image({src, alt}){
	return <img className="Card__image" src={src} alt={alt} />;
}
Card.Image = Image;

function Content({children}){
	return (
		<div className="Card__content">
			{children}
		</div>
	);
}
Card.Content = Content;

export default Card;
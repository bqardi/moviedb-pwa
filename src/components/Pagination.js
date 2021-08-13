import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";

var PaginationContext = createContext();

export function usePagination(totalItems=0, itemsPerPage=10){
	var [currentPage, setCurrentPage] = useState(1);

	var settings = {
		totalItems,
		itemsPerPage,
		currentPage,
		setCurrentPage,
		totalPages: Math.ceil(totalItems / itemsPerPage)
	}
	return settings;
}

function Pagination({children, pagination, onPage, ariaLabel="Pagination", ...other}){
	useEffect(() => {
		onPage && onPage(pagination);
		// eslint-disable-next-line
	}, [pagination.currentPage]);

	return (
		<PaginationContext.Provider value={pagination}>
			<nav aria-label={ariaLabel} {...other}>
				{children}
			</nav>
		</PaginationContext.Provider>
	);
}

function Previous({children, onClick, ariaLabel="Goto previous page", ...other}){
	var {
		currentPage,
		setCurrentPage
	} = useContext(PaginationContext);

	function onClickHandler(e){
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
		onClick && onClick(e);
	}

	return (
		<button onClick={onClickHandler} {...other} aria-label={ariaLabel}>
			{children || <svg viewBox="0 0 24 24" style={{width: "24px"}}><path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path></svg>}
		</button>
	);
}
Pagination.Previous = Previous;

function Next({children, onClick, ariaLabel="Goto next page", ...other}){
	var {
		currentPage,
		setCurrentPage,
		totalPages
	} = useContext(PaginationContext);

	function onClickHandler(e){
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
		onClick && onClick(e);
	}

	return (
		<button onClick={onClickHandler} {...other} aria-label={ariaLabel}>
			{children || <svg viewBox="0 0 24 24" style={{width: "24px"}}><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg>}
		</button>
	);
}
Pagination.Next = Next;

function PageNumber({limit, className, classActive = "js-current", ariaLabel="Goto page [#]", ariaLabelCurrent="Current page, page [#]", ...other}){
	var {
		currentPage,
		setCurrentPage,
		totalPages
	} = useContext(PaginationContext);
	var [repetition, setRepetition] = useState([]);

	useLayoutEffect(() => {
		var arr = [];
		var length = limit > totalPages ? totalPages : limit;
		for (let i = 0; i < length; i++) {
			var pages = currentAsMiddle(currentPage, length, totalPages);
			arr.push({
				id: `btn-${i}`,
				page: pages[i]
			});
		}
		setRepetition(arr);
	}, [currentPage, totalPages, limit]);

	function currentAsMiddle(current, length, last){
		var start = Math.floor(length / 2 - 0.1);
		if (current - start <= 0) {
			start = 1;
		} else if (current + start >= last) {
			start = last - length + 1;
		} else {
			start = current - start;
		}
		var arr = [];
		for (let i = 0; i < length; i++) {
			arr.push(start + i);
		}
		return arr;
	}

	function parseAriaLabel(pageNumber){
		if (pageNumber === currentPage) {
			return ariaLabelCurrent.replace("[#]", pageNumber);
		}
		return ariaLabel.replace("[#]", pageNumber);
	}

	return repetition.map(obj =>
		<button
			key={obj.id}
			className={`${className || ""}${obj.page === currentPage ? className ? " " + classActive : classActive : ""}`}
			onClick={() => setCurrentPage(obj.page)}
			aria-label={parseAriaLabel(obj.page)}
			aria-current={obj.page === currentPage ? "true" : null}
			{...other}
		>
			{obj.page}
		</button>
	);
}
Pagination.PageNumber = PageNumber;

function First({children, page, onClick, ariaLabel="Goto first page", ...other}){
	var {setCurrentPage} = useContext(PaginationContext);

	function onClickHandler(e){
		setCurrentPage(1);
		onClick && onClick(e);
	}

	return (
		<button onClick={onClickHandler} {...other} aria-label={ariaLabel}>
			{children}
			{!children && page ? 1 : null}
			{!children && !page && <svg viewBox="0 0 24 24" style={{width: "24px"}}><path d="M18.41,7.41L17,6L11,12L17,18L18.41,16.59L13.83,12L18.41,7.41M12.41,7.41L11,6L5,12L11,18L12.41,16.59L7.83,12L12.41,7.41Z"></path></svg>}
		</button>
	);
}
Pagination.First = First;

function Last({children, page, onClick, ariaLabel="Goto last page", ...other}){
	var {setCurrentPage, totalPages} = useContext(PaginationContext);

	function onClickHandler(e){
		setCurrentPage(totalPages);
		onClick && onClick(e);
	}

	return (
		<button onClick={onClickHandler} {...other} aria-label={ariaLabel}>
			{children}
			{!children && page ? totalPages : null}
			{!children && !page && <svg viewBox="0 0 24 24" style={{width: "24px"}}><path d="M5.59,7.41L7,6L13,12L7,18L5.59,16.59L10.17,12L5.59,7.41M11.59,7.41L13,6L19,12L13,18L11.59,16.59L16.17,12L11.59,7.41Z"></path></svg>}
		</button>
	);
}
Pagination.Last = Last;

export default Pagination;
import React from "react";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onNext: () => void;
	onPrevious: () => void;
}

const Pagination = ({ currentPage, totalPages, onNext, onPrevious }: PaginationProps) => {
	return (
		<div className="flex items-center justify-center gap-4 my-4">
			<button className={`btn ${currentPage === 1 ? "btn-disabled" : "btn-primary"} btn-sm`} onClick={onPrevious} disabled={currentPage === 1}>
				Previous
			</button>
			<span className="text-sm font-semibold">
				Page {currentPage} of {totalPages}
			</span>
			<button className={`btn ${currentPage === totalPages ? "btn-disabled" : "btn-primary"} btn-sm`} onClick={onNext} disabled={currentPage === totalPages}>
				Next
			</button>
		</div>
	);
};

export default Pagination;

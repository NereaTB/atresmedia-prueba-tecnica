import "./PaginationButtons.scss";

interface PaginationButtonsProps {
  handlePrevPage: () => void;
  handleNextPage: () => void;
  isPageLimitBegin: boolean;
  isPageLimitEnd: boolean;
  currentPage: number;
  isPageCounterActive: boolean;
}

export const PaginationButtons = ({
  handlePrevPage,
  handleNextPage,
  isPageLimitBegin,
  isPageLimitEnd,
  currentPage,
  isPageCounterActive,
}: PaginationButtonsProps) => {
  return (
    <div className="paginationButtons">
      <button className="paginationButtons__button" onClick={handlePrevPage} disabled={isPageLimitBegin}>
        prev
      </button>
      <p>{isPageCounterActive ? currentPage : null}</p>
      <button className="paginationButtons__button" onClick={handleNextPage} disabled={isPageLimitEnd}>
        next
      </button>
    </div>
  );
};

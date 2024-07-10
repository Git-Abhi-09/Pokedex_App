const Pagination = (props) => {
  const nextIndex = () => {
    props.setPageData({
      currPage: props.pageData.currPage + 18,
      nextPage: (props.pageData.nextPage = 18),
    });
  };

  const prevIndex = () => {
    props.setPageData({
      currPage: props.pageData.currPage - 18,
      nextPage: (props.pageData.nextPage = 18),
    });
  };
  return (
    <>
      <div className="button-div">
        <button className="btn" onClick={prevIndex}>
          Prev
        </button>
        <button className="btn" onClick={nextIndex}>
          Next
        </button>
      </div>
    </>
  );
};

export default Pagination;

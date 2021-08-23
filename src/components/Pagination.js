import React from 'react'

const Pagination = ({ postPerPage, totalPost,paginate,active}) => {

    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
        pageNumber.push(i);
    }
    return (
        <nav aria-label="Page navigation example">
  <ul className="pagination justify-content-center">
     {
         pageNumber.map((pageNumber)=>{
             return(
                <li onClick={()=>paginate(pageNumber)} key={pageNumber} className="page-item"><a className={`page-link ${active?"active":""}`} href="!#">{pageNumber}</a></li>
             )
         })
     }
    
  </ul>
</nav>
    )
}
export default Pagination;
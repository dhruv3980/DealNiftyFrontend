import React from 'react'
import "../componentStyles/Pagination.css"
import { useSelector } from 'react-redux'

const Pagenation = (
    {
        currentPage,
        onchange,
        firstPageText="First",
        nextPageText='Next',
        prevPageText="Prev",
        lastPageText="Last"}
)=> {

        const {totalPages, products} = useSelector(state=>state.product);

        if(totalPages<=1 || products.length==0) return null;

        const getPageNumbers = ()=>{
            const pageNumbers=[];
            const pageWindow =2;

            for(let i=Math.max(1, currentPage-pageWindow); i<=Math.min(totalPages, currentPage+pageWindow); i++)
                {
                    pageNumbers.push(i);


            }

            return pageNumbers;
        }
  return (
    <>
        <div className="pagination">
            {/**{revious and first button} */}
            {
                currentPage>1 && (
                    <>  
                        <button className="pagination-btn" onClick={()=>onchange(1)}>{firstPageText}</button>

                        <button className="pagination-btn" onClick={()=> onchange(currentPage-1)}>{prevPageText}</button>
                    
                    </>
                )
            }

            {
                getPageNumbers().map((number)=>(
                    <button className={`pagination-btn ${currentPage==number?"active":""}`} key={number} onClick={()=>onchange(number)}>{number}</button>
                ))
            }

            {/**Last and Next Button */}

            {
                currentPage<totalPages && (
                    <>  

                        <button className="pagination-btn" onClick={()=>onchange(currentPage+1)}>{nextPageText}</button>

                        <button className="pagination-btn" onClick={()=>onchange(totalPages)}>{lastPageText}</button>
                    
                    
                    </>
                )
            }


        </div>
    
    </>
  )
}

export default Pagenation

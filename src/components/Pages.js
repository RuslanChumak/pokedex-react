import React, {Component} from 'react';
import Pagination from 'react-bootstrap/Pagination'

class Pages extends Component {

    
    render(){
        const { changePage, butNext, butPrev,page, totalPages } = this.props
        let pages = []
            if(totalPages<10)
            {
                for(let i = 1; i<=totalPages; i++){
                    pages.push(<Pagination.Item active = {i === page} onClick = {changePage} key={i}>{i}</Pagination.Item>)
                }
            }
            else if(page < 5){
                for(let i = 1; i<9; i++){
                    if(i === totalPages) break;
                    pages.push(<Pagination.Item active = {i === page} onClick = {changePage} key={i}>{i}</Pagination.Item>)
                }
                    
            }
            else if(page > (totalPages-5)){
                for(let i = totalPages-7; i<totalPages+1; i++){
                    pages.push(<Pagination.Item active = {i === page} onClick = {changePage} key={i}>{i}</Pagination.Item>)
                }
            }
            else if(page > 4 && page < totalPages - 4){
                for(let i = (page - 3); i < (page + 5); i++){
                    if(i===totalPages) break;
                    pages.push(<Pagination.Item active = {i === page} onClick = {changePage} key={i}>{i}</Pagination.Item>)
                }
            }
            return (
                <Pagination style={{justifyContent: 'center', marginTop:'20px'}}>
                
                    {pages.length !==0 && <Pagination.Prev disabled = {page === 1} onClick={butPrev} />}
                    {pages}
                    {pages.length !==0 && <Pagination.Next disabled = {page === totalPages} onClick={butNext} />}
                
                </Pagination> 
            )
        
        
    };
  
}

export default Pages;

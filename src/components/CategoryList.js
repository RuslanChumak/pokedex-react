import React, {PureComponent} from 'react';
import Pagination from 'react-bootstrap/Pagination'
import Row from 'react-bootstrap/Row'
import Tab from 'react-bootstrap/Tab'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Spinner from 'react-bootstrap/Spinner'
import Category from './Category'
import Pages from './Pages'

class CategoryList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            page: 1,
            limit: 10
        }; 
    }
    componentDidMount(){
        this.getCategories()
    }
   
    getCategories = () =>{
        const {page, limit} = this.state
        let url = "https://pokeapi.co/api/v2/item-category?offset="+(page -1 ) * limit+"&limit="+limit;
        fetch(url)
          .then(res => res.json())
          .then(
            (result) => {
                this.setState({
                isLoaded: true,
                items: result.results,
                totalPages: Math.ceil(result.count/limit)
              });
            },
        )
    }
    butNext = () =>{
        this.setState({page: this.state.page + 1},this.getCategories);
    }
    butPrev = () =>{
        this.setState({page: this.state.page - 1},this.getCategories);
    }
    changePage = (e) =>{
        let p = parseInt(e.target.innerText)
        this.setState({page: p},this.getCategories);
    }
    render(){
        const { items, isLoaded, page, totalPages } = this.state;
        if(!isLoaded){
            return(
                <Row style={{justifyContent:'center'}}><Spinner animation="border" variant="primary" /></Row>
            )
        }
        else{
            let pages = []
            for(let i = 1; i<=totalPages;i++)
                pages.push(<Pagination.Item active = {i === page} onClick = {this.changePage} key={i}>{i}</Pagination.Item>)
            
            return (
                <Container>
                    
                    <Tab.Container style={{margin:'20px'}} defaultActiveKey={0}>
                    <Row style={{marginTop:'10px'}}>
                        <Col  sm={3}>
                            <Nav variant="pills" style={{border:'2px solid #007bff',borderBottom:'none'}} className="flex-column">
                                <div className='nav-item'><div style={{borderRadius:'0px',textAlign:'center'}} className='nav-link active'><h3>Categories</h3></div></div>
                                {items.map((el,id)=>
                                    <Nav.Item key={el.name}>
                                        <Nav.Link style={{borderRadius:'0px'}} eventKey={id}><span id={el.name}>{el.name.split('-').map(el=>el[0].toUpperCase() + el.slice(1)).join(' ')}</span></Nav.Link>
                                    </Nav.Item>
                                )}
                            </Nav>
                            <Pages  page={page} totalPages={totalPages} changePage={this.changePage} butPrev={this.butPrev} butNext={this.butNext}/> 
                         </Col>
                    <Col sm={9}>
                        <Tab.Content>
                                {items.map((el,id)=>
                                    <Tab.Pane  key={el.name}  eventKey={id}>
                                        <Category  item={el}/>
                                    </Tab.Pane> 
                                )}
                        </Tab.Content>
                    </Col>
                </Row>
                </Tab.Container>
                
               </Container>
            )
        }
        
    };
  
}

export default CategoryList;
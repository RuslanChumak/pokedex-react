import React, {Component} from 'react'
import Item from './Item'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'

class Category extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            info: [],
            url:props.item.url,
        }; 
        
    }
    componentDidMount(){
        this.getInfo()  
    }
    getInfo = () => {
        fetch(this.state.url)
          .then(res => res.json())
          .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    info: result
                });
                
                
            },
        )
    }
    render(){
        
        const { info, isLoaded } = this.state;
        if(!isLoaded){
            return(
                <Spinner animation="border" variant="primary" />
            )
        }
        else{
            
            return (
                <div>
        <h3>{info.names[0].name}</h3>
                <Row>
                {info.items.map((el,id)=>
                    <Item key={id} item={el}/>
                )}
                </Row>
                </div>
            )
        }
        
    };
}
export default Category;
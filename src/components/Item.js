import React, {Component} from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import placeholder from '../images/placeholder.png'

class Item extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            info: [],
            url:props.item.url,
            showEffect :false
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
    handleShowEffect = () =>{
        this.setState({
            showEffect : !this.state.showEffect
        })
    }
    render(){
        
        const { info, isLoaded, showEffect } = this.state;
        if(!isLoaded){
            return(
                <Spinner animation="border" variant="primary" />
            )
        }
        else{
            let name = (info.names.filter(el => el.language.name === 'en'))[0].name
            let det = <div></div>
            if(showEffect)
                det = <div className="padd" style={{height:'11.9rem',overflowY:'scroll'}}><Card.Text>{info.effect_entries[0].effect}</Card.Text> <Card.Subtitle >Cost: {info.cost}</Card.Subtitle></div> 
            else
                det = <Card.Img variant="bottom" style={{imageRendering:'pixelated'}} src={info.sprites.default?info.sprites.default:placeholder} />
            return (
                
                <Card  style={{ width: '12rem',border:'2px solid #007bff' }}>
                    <Card.Body style={{padding:'5px'}}>
                        <Card.Title style={{margin:'0'}}>{name}</Card.Title>
                    </Card.Body>
                    {det}
                    <Button style={{borderRadius:'0px'}} onClick={this.handleShowEffect}>Effect</Button>
                </Card>
            )
        }
        
    };
}
export default Item;
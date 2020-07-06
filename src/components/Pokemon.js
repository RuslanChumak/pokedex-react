import React, {PureComponent} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import AbilitysList from './AbilitysList'
import Stats from './Stats'
import placeholder from '../images/placeholder.png'
class Pokemon extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            details: false,
            isLoaded: false,
            info: [],
            url:props.item.url,
            showAbility: false,
            controller: new AbortController()
        };
        
    }
    
    handleShowAbility = () =>{
        if(this.state.showAbility)
            this.setState({
                showAbility: !this.state.showAbility
            })
        else
            this.setState({
                showAbility: !this.state.showAbility,
                details: false
            })
    }
    componentDidMount() {
        this.getInfo();
    }
    componentWillUnmount(){
        this.state.controller.abort()
    }
    getInfo = () => {
        
            fetch(this.state.url,{ signal: this.state.controller.signal})
          .then(res => res.json())
          .then(
            (result) => {
                
                this.setState({
                    isLoaded: true,
                    info: result
                });
            },
        ).catch( e =>{
            console.log(e)
        })
        
        
    }
    handleDetails = (e) =>{
        if(this.state.details)
            this.setState({
                details: !this.state.details,
            })
        else
            this.setState({
                details: !this.state.details,
                showAbility: false
            })

    }
    render(){
        const { info, isLoaded,details, showAbility } = this.state;
        if(!isLoaded){
            return(
                <div></div>
            )
        }
        else{
            let det = <div></div>;
            if(details){          
                det = <div style={{height: '15rem' }} className="inf"><Stats  info={info}/></div>
            }
            else if(showAbility){
                det = <div style={{height: '15rem' }} className="inf"><AbilitysList  info={info.abilities}/></div>
            }
            else{
                det = <div style={{height: '15rem' }}><Card.Img style={{imageRendering: 'pixelated'}} variant="bottom" src={info.sprites.front_default?info.sprites.front_default:placeholder} />   </div> 
            }
            let name = info.name.split('-').map(el => el[0].toUpperCase()+el.slice(1)).join(' ')
            return (
                <div>
                    
                    <Card style={{ width: '15rem',border:'2px solid #007bff'}}>
                        <Card.Body style={{padding:'5px'}}>
                            <Card.Title style={{textAligh : "center" ,margin:0}}>{name}</Card.Title>
                        </Card.Body>
                        
                            {det}
                        
                        <Button style={{borderRadius:'0px'}} onClick={this.handleDetails}>Details</Button>
                        <Button style={{borderRadius:'0px'}} onClick={this.handleShowAbility}>Abilities</Button>
                    </Card>
                </div>
            )
        }
        
    };
  
}

export default Pokemon;

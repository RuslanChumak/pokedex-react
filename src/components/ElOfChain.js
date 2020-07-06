import React, {Component} from 'react';
import Spinner from 'react-bootstrap/Spinner'
import placeholder from '../images/placeholder.png'
class Stats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: [],
            name: props.name,
            isLoaded:false
        };
    }
    componentDidMount(){
        this.getInfo()
    }
    getInfo = () => {
        fetch("https://pokeapi.co/api/v2/pokemon/"+this.state.name)
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
        const { info,isLoaded } = this.state;
        if(!isLoaded)
            return  (<Spinner animation="border" variant="primary" />)
        else{

        return(
            <img title={info.name[0].toUpperCase()+info.name.slice(1)} alt={info.name} src={info.sprites.front_default?info.sprites.front_default:placeholder} style={{width:"4rem", display:'inline'}}/>
        )}
        
    }
}
export default Stats;
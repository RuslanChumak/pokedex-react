import React, {Component} from 'react';
import Species from './Species'
class Stats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: props.info 
        };
        
    }
    render(){
        const { info } = this.state;
        let types = info.types.map((element,index)=>
                    <span className={element.type.name + ' type'} key={index}>{element.type.name}</span>
                )
        return(
            <div>
            <table className='details'>
                <tbody>
                    <tr>
                        <td className='caption' style={{textAlign:'center'}} colSpan='2'>Details</td>
                    </tr>
                    <tr>
                        <td>Base Experience:</td>
                        <td>{info.base_experience}</td>
                    </tr>
                    <tr>
                        <td>Weight:</td>
                        <td>{info.weight}</td>
                    </tr>
                    <tr>
                        <td>Height:</td>
                        <td>{info.height}</td>
                    </tr>
                    </tbody>
                    </table >
                    <table className='details'>
                    <tbody>
                    <tr>
                        <td className='caption' style={{textAlign:'center'}} colSpan='2'>Stats</td>
                    </tr>
                    <tr style={{backgroundColor:'#ffbf00'}}>
                        <td>Speed:</td>
                        <td>{info.stats[0].base_stat}</td>
                    </tr>
                    <tr style={{backgroundColor:'#00ced1'}}>
                        <td>Special Defense:</td>
                        <td>{info.stats[1].base_stat}</td>
                    </tr>
                    <tr style={{backgroundColor:'#c71585'}}>
                        <td>Special Attack:</td>
                        <td>{info.stats[2].base_stat}</td>
                    </tr>
                    <tr style={{backgroundColor:'#1e90ff'}}>
                        <td>Defense:</td>
                        <td>{info.stats[3].base_stat}</td>
                    </tr>
                    <tr style={{backgroundColor:'#f9526b'}}>
                        <td>Attack:</td>
                        <td>{info.stats[4].base_stat}</td>
                    </tr>
                    <tr style={{backgroundColor: '#32cd32'}}>
                        <td >HP:</td>
                        <td>{info.stats[5].base_stat}</td>
                    </tr>
                    </tbody>
                    </table>
                    <table className='details' >
                    <tbody>
                    <tr>
                        <td className='caption' style={{textAlign:'center'}} colSpan='2'>Types</td>
                    </tr>
                    <tr>
                        <td colSpan='2' style={{textAlign:'center'}}>{types}</td>
                    </tr>
                </tbody>
            </table>
            <Species url={info.species.url}/>
            </div>
        )
        
    }
}
export default Stats;
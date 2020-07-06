import React, {PureComponent} from 'react';
import Pokemon from './Pokemon'
import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'
import Pages from './Pages'
import Spinner from 'react-bootstrap/Spinner'
import Filter from './Filter'

class PokemonsList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            full:[],
            items: [],
            changedItems: [],
            page: 1,
            limit: 10,
            sort: 'default',
            types : [],
            filter :[],
            test: [],
            itemsForSearch:[],
    
        }; 
    }

      getTypes = () => {
        let url = "https://pokeapi.co/api/v2/type";
        fetch(url)
          .then(res => res.json())
          .then(
            (result) => {
                this.setState({
                types : result.results
              });
            },
        )
      }
      getPokemons = () => {
          let url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000";
        fetch(url)
          .then(res => res.json())
          .then(
            (result) => {
                this.setState({
                isLoaded: true,
                full: result,
                changedItems: result.results,
                itemsForSearch: result.results,
                items: result.results.slice(0,this.state.limit),
                searchQuery : '',
                totalPages : Math.ceil(result.count/this.state.limit)
              });
            },
        )
    }
    getItems = () =>{
        const {page, limit, changedItems} = this.state
        this.setState({
            items: changedItems.slice((page - 1) * limit, page * limit),
        })
        
    }
    componentDidMount(){
        this.getTypes();
        this.getPokemons();
        
        document.getElementById('search_input').onchange = this.searchOnChange
        document.getElementById('search_button').onclick = this.handleSearch
        
            
    }
    butNext = () =>{
        this.setState({page: this.state.page + 1},this.getItems);
    }
    butPrev = () =>{
        this.setState({page: this.state.page - 1},this.getItems);
    }
    changePage = (e) =>{
        let p = parseInt(e.target.innerText)
        this.setState({page: p},this.getItems);
        this.forceUpdate()
    }
    changeLimit = (e) =>{
        let p = parseInt(e.target.innerText)
        this.setState({
            limit: p,
            totalPages: Math.ceil(this.state.changedItems.length / p),
            page: 1
        },this.getItems);
    }
    searchOnChange = (e) =>{
        this.setState({
            searchQuery: e.target.value.toLowerCase()
        })
    }
    handleSearch = () =>{
        let q = this.state.searchQuery
        let arr = this.state.itemsForSearch.filter(item =>
            item.name.indexOf(q) === -1 ? false : true
        )
        this.setState({
            changedItems: arr,
            totalPages: Math.ceil(arr.length/this.state.limit),
            page: 1,
            searchQuery:''
        },this.getItems)
        document.getElementById('search_input').value = ''
        
    }
    handleReset = () =>{
        this.setState({
            filter: [],
            changedItems: this.state.full.results,
            totalPages: Math.ceil(this.state.full.count/this.state.limit),
            page:1,
            limit: 10,
            sort: 'default',
            itemsForSearch: this.state.full.results
        },this.filter)
        document.getElementById('sort').value='default'
    }
    sort = () => {
        let arr = this.state.changedItems
        switch(this.state.sort){
            case 'asc': {
                arr.sort((a,b) =>{
                    if(a.name > b.name)
                        return 1
                    else 
                        return -1
                })
                break;
            }
            case 'desc': {
                arr.sort((a,b) =>{
                    if(a.name < b.name)
                        return 1
                    else 
                        return -1
                })
                break;
            }
            default: {
                arr.sort((a,b) =>{
                    let ida = parseInt(a.url.slice(34))
                    let idb = parseInt(b.url.slice(34))
                    if(ida > idb)
                        return 1
                    else 
                        return -1
                })
                break;
            }
        }
        this.setState({changedItems: arr},this.getItems)
    }
    handleSort = (e) =>{
        this.setState({sort : e.target.value},this.sort)
    }
    typeOnChange = (e) => {
        let arr =  this.state.filter
        if(arr.indexOf(e.target.value) === -1 && e.target.value !== null){
            arr.push(e.target.value)
            this.setState({filter : arr},this.filter)
        }
    }
    deleteFilter = (e) =>{
        let arr =  this.state.filter
        arr.splice(parseInt(e.target.id), 1)
        this.setState({filter : arr},this.filter)
        
    }
    filter = () =>{
        if(this.state.filter.length === 0)
        {
            this.setState({
                changedItems : this.state.full.results,
                itemsForSearch: this.state.full.results,
                isLoaded:true,
                totalPages: Math.ceil(this.state.full.count/this.state.limit),
                page:1
            },this.sort)
        }
        else{
            this.setState({
                changedItems:[],
                page:1
            },this.getPokemonsByType) 
        }
    }
    getPokemonsByType = () =>{
        let filter = this.state.filter
        let url = "https://pokeapi.co/api/v2/type/";
        for(let i = 0; i < filter.length; i++){
            fetch(url+filter[i])
          .then(res => res.json())
          .then(
            (result) => {
                let arr = []
                for(let i = 0; i<result.pokemon.length;i++){
                    arr[i] = {
                        name : result.pokemon[i].pokemon.name,
                        url : result.pokemon[i].pokemon.url,
                    }
                }
                
                
                if(i + 1 === filter.length)
                {
                    
                    let ids = []
                    let tmp = this.state.test.concat(arr)
                    let res = []
                    for(let i = 0; i<tmp.length;i++)
                        if(ids.indexOf(tmp[i].name) === -1){
                            ids.push(tmp[i].name)
                            res.push(tmp[i])}
                    this.setState({
                        changedItems : res,
                        itemsForSearch: res,
                        isLoaded:true,
                        test: [],
                        totalPages: Math.ceil((res.length)/this.state.limit)
                    },this.sort)
                }
                else{
                    this.setState({
                        test : this.state.test.concat(arr)
                    })}
            }
        )
        }
    }
     render(){
        const { items, isLoaded, page, types, limit,totalPages,filter } = this.state;
        if(!isLoaded ){
            return(
                <Row style={{justifyContent:'center'}}><Spinner animation="border" variant="primary" /></Row>
            )
        }
        else{
            let res = items.map((element) =>
            <Pokemon key = {element.url}  item = {element}/>
            )
            if(res.length === 0){
                res = <Alert style={{marginTop:'10px'}} variant='primary'>No result for your query</Alert>
            }
            let pages = <Pages page={page} totalPages={totalPages} changePage={this.changePage} butPrev={this.butPrev} butNext={this.butNext}/>
            return (
                <Container>
                <Filter handleReset={this.handleReset} types={types} filter={filter} limit={limit} page={page} changeLimit={this.changeLimit} deleteFilter={this.deleteFilter} typeOnChange={this.typeOnChange} handleSort={this.handleSort}/>
                {pages}
            <Row>{res}</Row>
                {pages}
                
               </Container>
            )
        }
        
    };
  
}

export default PokemonsList;

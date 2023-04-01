import * as React from 'react';
import Grid from '@mui/material/Grid';
import Navbar from "../../Components/Navbar/Navbar";
import Button from '@mui/material/Button';
import "../ProductPlantsPage/ProductPlantsPage.css";
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

class ProductToolsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          product : [] , 
          tooltags : '',
          id : this.props.match.params.id,
          numberOfBuy:0,
          totalPrice:0,
          album:[],
          currentImage:0,
          imageName:[],
        };
    }
    
    componentDidMount() {
        fetch('http://127.0.0.1:8000/api/toolDetail/' + this.state.id + '/')
          .then(response => response.json())
          .then(data => this.setState({ product: data }));

        fetch('http://127.0.0.1:8000/api/toolTags/' + this.state.id + '/')
          .then(response => response.json())
          .then(data => { 
              this.setState({ tooltags: data })

            });
        fetch('http://127.0.0.1:8000/api/toolAlbumImages/' + this.state.id + '/')
          .then(response => response.json())
          .then(data => {
              this.setState({ album: data })
              this.setState({imageName : data[0]})
        });
    }
    
    

    render() {
          var increaseBought=()=>{
        var nob=this.state.numberOfBuy
            this.setState({
                numberOfBuy:nob+1,
                totalPrice:(nob+1)*this.state.product.price
        })
    }
    var decreaseBought=()=>{
        var nob=this.state.numberOfBuy
        if (nob > 0){
            this.setState({
                numberOfBuy:nob-1,
                totalPrice:(nob-1)*this.state.product.price
        })
        }
    }
    var backWardImageClick=()=>{
        if(this.state.currentImage == 0){
            this.setState({currentImage : this.state.album.length - 1});  
        }
        else{
            this.setState({currentImage : this.state.currentImage - 1});;
        }
        this.setState({imageName : this.state.album[this.state.currentImage]})
    }
    var forWardImageClick=()=>{
        if(this.state.currentImage == this.state.album.length - 1){
            this.setState({currentImage : 0});  
        }
        else{
            this.setState({currentImage : this.state.currentImage + 1});;
        }
        this.setState({imageName : this.state.album[this.state.currentImage]})
    } 
    var addToBasket=()=>{
        const requestOptions = {
            method: 'POST',
            headers: { 
              'Authorization': 'JWT ' + localStorage.getItem('access_token'),
              'Content-Type': 'application/json' },
              body: JSON.stringify({id: this.state.product.id , count: `${this.state.numberOfBuy}`})
          }
          fetch('http://127.0.0.1:8000/api/cart/add-tool-to-cart/', requestOptions)
          .then((response) => {
          if(response.status === 201)
          {
            alert('successfully add!')
          } 
          else if(response.status === 401)
          {
            alert('You are not login!')
          }
          else if(response.status === 400)
          {
            alert('This Plant is already in the Basket!')
          }
        })
            
    }
        
      return (
        <div>
        <Navbar/>  
    
          <Grid container justifyContent = "center" alignItems = "center" sx={{pl : {xs:2 , sm:10} , pr : {xs:2 , sm:10}}} >
                <Grid container item justifyContent = "center"  className="ProductPageProductContainer">
                    <Grid item xs={12} md={6} lg={6} container justifyContent = "center" alignItems = "center" className="ProductPageImageContainer">
                        <Grid item container justifyContent = "center" alignItems = "center">
                            <Grid container item justifyContent = "center" alignItems = "center" direction = "row">
                                <IconButton 
                                    sx={{ display: { xs: 'none', md: 'inline-block' } }}
                                    size='large'
                                    aria-label='show 4 new mails'
                                    color='primary'
                                    onClick={backWardImageClick}>
                                    <ArrowBackIosIcon />
                                </IconButton>
                                <img className="ProductPageImage" src={this.state.imageName.image} alt = {this.state.imageName.name} sx={{width:{xs:'300px', sm:'400px'},heiyyght:{xs:'300px', sm:'400px'}}}></img>
                                <IconButton 
                                    sx={{ display: { xs: 'inline-block', md: 'none' } }}
                                    size='large'
                                    aria-label='show 4 new mails'
                                    color='primary'
                                    onClick={backWardImageClick}>
                                    <ArrowBackIosIcon />
                                </IconButton>
                                <IconButton 
                                    size='large'
                                    aria-label='show 4 new mails'
                                    color='primary'
                                    onClick={forWardImageClick}>
                                    <ArrowForwardIosIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} sx={{p : 2}}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12} lg={12} className="ProductPageTitle">
                            <div className="productPageTitle">{this.state.product.name}</div>
                            <hr/>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12} spacing = {1} className="ProductPageText">
                            <div className="ProductPageText"> <b>Description:</b> {this.state.product.description} </div>
                            <Box sx = {{mt : 0.5 , mb : 1.5}}>
                                {this.state.tooltags.length !== 0 && (
                                    <Box>
                                        <b>Tags: </b>
                                        {this.state.tooltags.map((item) => (
                                            <Chip sx = {{mr : 0.5}} label = {item.name} variant="outlined"/>
                                        ))}
                                    </Box>
                                )}  
                            </Box>
                            <hr/>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12} className="ProductPageBuyContainer">
                                <Grid container spacing={0} alignItems = "center">
                                <Grid item xs={6} md={6} lg={2} className="ProductPageTitle">
                                <div className="productPagePrice"> <b>Price:</b> {this.state.product.price} $</div>
                                </Grid>
                                <Grid container item xs={6} md={6} lg={4} sx={{ justifyContent: {xs:'flex-end',sm:'center'} }} className="ProductPageCounter">
                                    <Grid item container alignItems = "center" diraction = "row">
                                        <IconButton 
                                            size='large'
                                            aria-label='show 4 new mails'
                                            color='inherit'
                                            sx={{ color: 'error.main' }}
                                            onClick={decreaseBought}>
                                            <RemoveIcon />
                                        </IconButton>
                                        <div className="ProductPageCounterNum">
                                            {this.state.numberOfBuy}
                                        </div>
                                        <IconButton 
                                            size='large'
                                            aria-label='show 4 new mails'
                                            color='inherit'
                                            sx={{ color: 'success.main' }}
                                            onClick={increaseBought}>
                                            <AddIcon />
                                        </IconButton>
                                    </Grid>
                            </Grid>
                            <Grid item sm = {6} className="ProductPageTitle">
                                Total Price : {this.state.totalPrice}$
                            </Grid>
                            
                        </Grid>
                        <Grid container item justifyContent="flex-end" sx={{p:3 , Color: '#12824C'}} className="ProductPageTitle">
                                <Button variant="contained" className="productsPageAdd" onClick={addToBasket}>
                                    Add To Bascket
                                </Button>
                            </Grid>
                    </Grid>
                        </Grid>
                    </Grid>
                    
                </Grid>
          </Grid>  
          </div>            
      );
    }
  }

  export default ProductToolsPage;

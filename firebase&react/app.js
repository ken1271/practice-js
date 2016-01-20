var path="https://blistering-inferno-8099.firebaseio.com/";
var firebaseRef = new Firebase(path);

var SaleBox=React.createClass({
  getInitialState:function(){
    return{items:[],info:{name:'',openHour:'',key:''}};
  },
  handleSaleSubmit:function(sale){
    console.log(sale.key);
    if(sale.key!=''){
      console.log("key!!!");
      firebaseRef.child(sale.key).update({name:sale.name,openHour:sale.openHour});
    }
    else {
      var newfood={address:'',brief:'',code:'',id:'',lat:'',lng:'',
        name:sale.name,openHour:sale.openHour,tel:'',type:''
      };
      firebaseRef.push(newfood);
      firebaseRef.on("value", function(snapshot) {
        var foods=[];
        snapshot.forEach(function(child){
          var food =child.val();
          food['key']=child.key();
          //console.log(child.key());
          foods.push(food);
        });
        this.setState({
          items: foods
        });
      }.bind(this));
    }
  },
  handleSaleEditPass:function(sale){
    this.setState({info:sale});
  },
  componentDidMount: function() {
    firebaseRef.on("value", function(snapshot) {
      var foods=[];
      snapshot.forEach(function(child){
        var food =child.val();
        food['key']=child.key();
        foods.push(food);
      });
      //console.log(foods);
      this.setState({
        items: foods
      });
    }.bind(this));
  },
  render:function(){
    return (
      <div className="saleBox">
        <SaleList items={this.state.items} onSaleEditPass={this.handleSaleEditPass}/>
        <SaleForm info={this.state.info} onSaleSubmit={this.handleSaleSubmit} />
      </div>
    );
  }
});
var SaleList=React.createClass({
  handleSaleEdit:function(sale){
    this.props.onSaleEditPass({name:sale.name,openHour:sale.openHour,key:sale.key});
  },
  render:function(){
    var saleNodes=this.props.items.map(function(sale,index){
      var item={name:sale.name,key:sale.key,index:index}
      return(
        <Sale sale={item} onSaleEdit={this.handleSaleEdit}>
          {sale.openHour}
        </Sale>
      );
    }.bind(this));
    return (
      <div className="saleList">
        {saleNodes}
      </div>
    );
  }
});
var SaleForm=React.createClass({
  getInitialState:function(){
    return {name:'',openHour:'',key:''};
  },
  handleNameChange:function(e){
    this.props.info.name='';
    this.setState({name:e.target.value});
  },
  handleOpenHourChange:function(e){
    this.props.info.openHour='';
    this.setState({openHour:e.target.value});
  },
  handleSubmit:function(e){
    console.log("name:"+this.state.name.trim());
    console.log("openhour:"+this.state.openHour.trim());
    e.preventDefault();
    //console.log(e.target);
    var name=this.state.name.trim()||this.props.info.name;
    var openHour=this.state.openHour.trim()||this.props.info.openHour;
    if(!name||!openHour){return;}
    this.props.onSaleSubmit({name: name, openHour: openHour,key:this.props.info.key});
    this.props.info.name='';this.props.info.openHour='';this.props.info.key='';
    this.setState({name:'',openHour:'',key:''});
  },
  handleCancel:function(e){
    e.preventDefault();
    this.props.info.name='';this.props.info.openHour='';this.props.info.key='';
    this.setState({name:'',openHour:'',key:''});
  },
  render:function(){
    return(
      <form className="saleForm" onEditPass={this.handleEditPass}>
        <input
          type="text"
          placeholder="Name"
          value={this.state.name||this.props.info.name}
          onChange={this.handleNameChange}
        />
        <input
          type="text"
          placeholder="Open Hour"
          value={this.state.openHour||this.props.info.openHour}
          onChange={this.handleOpenHourChange}
        />
        <input type="submit" value="Submit" onClick={this.handleSubmit}/>
        <input type='submit' value='Cancel' onClick={this.handleCancel}/>
      </form>
    );
  }
});
var Sale=React.createClass({
  removeItem:function(){
    firebaseRef.child(this.props.sale.key).remove();
  },
  handleEdit:function(){
    this.props.onSaleEdit({name:this.props.sale.name,openHour:this.props.children,key:this.props.sale.key});
  },
  rawMarkup: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },
  render:function(){
    return (
      <div className="sale">
        <h2 className="saleName">
          No.{this.props.sale.index+1}: {this.props.sale.name}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
        <span onClick={this.removeItem} style={{ color: 'red', marginLeft: '10px', cursor: 'pointer' }}>
            X
        </span>
        <span className="fa-edit" onClick={this.handleEdit}
          style={{ color: 'black', marginLeft: '10px', cursor: 'pointer', 'font-family':'FontAwesome' }}>
        </span>
      </div>
    );
  }
});
ReactDOM.render(
  <SaleBox />,
  document.getElementById('content')
);

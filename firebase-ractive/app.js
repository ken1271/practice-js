var path="https://blistering-inferno-8099.firebaseio.com/";
var firebaseRef = new Firebase(path);
var data=[];
var ractive=new Ractive({
  el:'#output',
  template:'#template',
  data:{
    //firebase的資料
    food:data,
    //控制輸入欄位
    input:{
      name:'',
      openHour:'',
      key:''
    },
    font:'FontAwesome',
    color:'red'
  }
});
//連結
firebaseRef.on('value',function(snapshot){
  //將物件轉成陣列儲存
  var foods=[];
  snapshot.forEach(function(child){
    //每個子節點各別存起來
    var food=child.val();
    food['key']=child.key();
    foods.push(food);
  })
  data=foods;
  ractive.set('food',data);
});
ractive.on({
  //新增和修改
  sumbit:function(){
    console.log('sumbit');
    //當key是空的時候 可以新增資料
    if(!ractive.get('input.key')){
      //input欄位不得為空
      if(ractive.get('input.name')&&ractive.get('input.openHour')){
        console.log(ractive.get('input.name'));
        var newfood={
          address:'',brief:'',code:'',id:'',lat:'',lng:'',
          name:ractive.get('input.name'),openHour:ractive.get('input.openHour'),
          tel:'',type:''
        }
        console.log(newfood);
        firebaseRef.push(newfood);
        //清空input
        ractive.set('input',{'name':'',openHour:''});
      }
    }
    //當key不為空時 修改該筆資料
    else{
      firebaseRef.child(ractive.get('input.key')).update({name:ractive.get('input.name'),openHour:ractive.get('input.openHour')});
      ractive.set('input',{name:'',openHour:'',key:''});
    }
  },
  delete:function(e){
    firebaseRef.child(e.context.key).remove();
  },
  edit:function(e){
    //將取得的值傳到input
    ractive.set('input',{name:e.context.name,openHour:e.context.openHour,key:e.context.key});
  },
  cancel:function(){
    ractive.set('input',{name:'',openHour:'',key:''});
  }
});

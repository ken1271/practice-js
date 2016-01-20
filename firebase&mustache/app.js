$(document).ready(function(){
  var myref=new Firebase('https://blistering-inferno-8099.firebaseio.com/');
  var data;
  myref.on('value',function(snapshot){
    data=snapshot.val();
console.log(data);
    var rendered;
    var obj;
    var objarr=[];
    var template = $('#template').html();
    var view = {"food":[]}
    for (key in data) {
      console.log(data[key].name);

      obj={ name:[data[key].name],
            address:data[key].address,
            brief:data[key].brief,
            code:data[key].code,
            id:data[key].id,
            lat:data[key].lat,
            lng:data[key].lng,
            name:data[key].name,
            openHour:data[key].openHour,
            tel:data[key].tel,
            type:data[key].type
          };
        view.food.push(obj);
      //objarr.push(obj);
      // Mustache.parse(template);   // optional, speeds up future uses
      // rendered += Mustache.render(template, obj);
    }
    Mustache.parse(template);   // optional, speeds up future uses
    rendered = Mustache.render(template, view);
    $('#target').html(rendered);
  });
});
// $(document).ready(function(){
//   var myref=new Firebase('https://blistering-inferno-8099.firebaseio.com/');
//
//   myref.on('value',function(snapshot){
//
//     // for(var key in data){
//     //   //console.log(data[key].name);
//     //   display(data[key].address,data[key].brief,data[key].code,data[key].id,
//     //     data[key].lat,data[key].lng,data[key].name,data[key].openHour,
//     //     data[key].tel,data[key].type);
//     // }
//
//   });
//   // function display(address,brief,code,id,lat,lng,name,openHour,tel,type){
//   //   $('.item').append("<h2>"+name+"</h2>"+"<address>"+address+"</address>"+
//   //     "<p>"+brief+"</p>"+"<span>Open Hour: "+openHour+" tel: "+tel+"</span>"+
//   //     "<p>Latitude and Longitude: "+lat+" , "+lng+"</p><p> code: "+
//   //     code+" id: "+id+" type: "+type+"</p>");
//   //
//   // }
// });

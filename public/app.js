var JSONData = {
  customers: null,
  discs: null,
  
  uniqueDiscs: null
}

var JSONService = {
  
  getCustomers: function() {
    return $.getJSON('/json/customers.json', function(data){        
      console.log('customers.json data received');
      console.log(data);                    
      JSONData.customers = _(data).sortBy(function(customer){
        return customer.lastname;
      });
      
    });
  },  //getCustomers
  
  getDiscs: function() {
    return $.getJSON('/json/discs.json', function(data) {
      console.log('discs data received');
      console.log(data);      
      JSONData.discs = data;
      
      var discsByTitle = _(jQuery.extend(true, {}, JSONData.discs)).groupBy(function(disc){
        return disc.title;
      });      
      
      JSONData.uniqueDiscs = _(discsByTitle).chain()
        .map(function(disc){
          var discObj = disc[0];
          
          discObj["available"] = _(disc).reduce(function ( memo, val, key ) {
            var count = (val.expectedReturn ? 0 : 1)
            return memo + count
          }, 0);
          
          discObj["unavailable"] = _(disc).reduce(function ( memo, val, key ) {
            var count = (val.expectedReturn ? 1 : 0)
            return memo + count
          }, 0);
          
          delete discObj.id;              //this is a benign attr
          delete discObj.expectedReturn;  //this is a benign attr
            
          return discObj;
        })
        .sortBy(function(disc){
          return disc.title;
        })
        .value();
    });
  }  //getDiscs
  
}  //JSONService






var findDisc = function(discID) {
  var disc = _(JSONData.discs).find(function(disc){
    return disc.id === discID;
  });
  return disc;
};



var findCustomer = function(customerID) {
  
  var customers = jQuery.extend(true, {}, JSONData.customers);
  
  var customer = _(customers).find(function(customer){
    return customer.id === customerID;
  });      
  
  var invoices = _(customer.invoices)  
    .map(function(invoice){      
      var discObj = _(invoice.discs).map(function(disc){
        disc.discID = findDisc(disc.discID);
        return disc;
      });
      invoice["discs"] = discObj;      
      return invoice;
    });  
  
  var lifetimeRentals = _(customer.invoices)  
    .reduce(function( memo, val, key ){    
      discs = val.discs;
      return memo + discs.length;
    }, 0);
  
  customer.invoices = invoices;  
  customer["lifetimeRentals"] = lifetimeRentals;
  return customer;
}



//var tt = moment().format();
//console.log(tt);
//console.log(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
//console.log(moment("2009-09-12T23:00:00 -07:00").fromNow());



      

////begin ready//////////////////

$(function() {   
  
  $.when(  JSONService.getCustomers(),
           JSONService.getDiscs()
        
  ).done(function(htmlresponse, b, c) {    
    
    console.log("");
       
    //load customers        
    $("#customers").handlebars($("#customersTemplate"), {customers: JSONData.customers});
    
    //load discs
    $("#discs").handlebars($("#discsTemplate"), {discs: JSONData.uniqueDiscs});
    
    
    //console.log(findCustomer(1));    
    //console.log(findDisc(4));
  
    
        
    
  });  //when, done
  

  
  /*
  $("#ascending").on("click", function(event){    
    var test = _(JSONData.customers)
      .sortBy(function(customer){
        return customer.lastname;
      });    
    JSONData.customers = test;     //not great because it blows out active states
    hb1("#customersTemplate", "customers", JSONData.customers, "#customers");    
  });

                     
  $("#ascending").on("click", function(){
  
  });
  */
  
  
  // listeners
  
  $("#customers").on("click", "li", function(event){    
    $this = $(this);
    $this.siblings().removeClass("label label-warning");
    $this.addClass("label label-warning");    
    
    var customerID = parseInt($this.attr("id").replace(/\D/g,''));    //this was a string!!  !@#$           
    
    $("#customerDetails").handlebars($("#customerDetailTemplate"), findCustomer(customerID));
  });
  
  
  //// sorting: discs
  
  $("#discSortByName").on("click", function(event){    
    var sorted = _(JSONData.uniqueDiscs).sortBy(function(disc){
      return disc.title;
    });    
    $("#discs").handlebars($("#discsTemplate"), {discs: sorted});
  });
  $("#discSortByAvailability").on("click", function(event){
    var sorted = _(JSONData.uniqueDiscs).sortBy(function(disc){
      return disc.available;
    });    
    $("#discs").handlebars($("#discsTemplate"), {discs: sorted});
  });
  $("#discSortByUnavailability").on("click", function(event){
    var sorted = _(JSONData.uniqueDiscs).sortBy(function(disc){
      return disc.unavailable;
    });    
    $("#discs").handlebars($("#discsTemplate"), {discs: sorted});
  });
  $("#discSortByQuantity").on("click", function(event){
    var sorted = _(JSONData.uniqueDiscs).sortBy(function(disc){
      return (disc.available + disc.unavailable);
    });
    $("#discs").handlebars($("#discsTemplate"), {discs: sorted});
  });
  
  
  
});  //on ready
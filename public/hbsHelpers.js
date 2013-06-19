// hbs helpers
Handlebars.registerHelper('dateFormat', function(context, block) {  
  if (window.moment) {
    var f = block.hash.format || "MMM DD, YYYY hh:mm:ss A";
    return moment(context).format(f); //had to remove Date(context)
  }else{
    return context;   //  moment plugin not available. return data as is.
  };
});
Handlebars.registerHelper('dateSince', function(context, block) {  
  if (window.moment) {    
    return moment(context).fromNow();
  }else{
    return context;   //  moment plugin not available. return data as is.
  };
});
Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {  
    if (arguments.length < 4) {
        // Operator omitted, assuming "+"
        options = rvalue;
        rvalue = operator;
        operator = "+";
    }        ;
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);        
    return {
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": lvalue * rvalue,
        "/": lvalue / rvalue,
        "%": lvalue % rvalue
    }[operator];
});
Handlebars.registerHelper("availabilityRatio", function(val1, val2) {    
  if (arguments.length === 3) {    
    var total = val1 + val2;       
    return Math.round((val1 / total) * 100)
  }  
});
Handlebars.registerHelper("checkoutStatus", function() {
  if (this.actualDateReturned) {
    var text = "<i class='icon-repeat'></i>";
  } else {
    var text = "<i class='icon-plane'></i>";
  }          
  return text;
})

Handlebars.registerHelper("discRentalStatus", function(invoiceDate) {
  //console.log(this);
  //console.log(invoiceDate);  
  invoiceDate = moment(invoiceDate);
  var actualDateReturned = moment(this.actualDateReturned);  
  var daysLapsed = actualDateReturned.diff(invoiceDate, 'days');  
  if (daysLapsed === 2) {
    var text = "<span class='label label-info'>due today</span>"
  } else if (daysLapsed > 2) {
    var text = "<span class='label label-important'>overdue " + daysLapsed + "d</span>";
  } else if (daysLapsed > 0 && daysLapsed <= 2) {
    var text = "";
  } else {
    var text = "<span class='label label-important'>Fatal Error</span>";
  }  
  return text;
});


//partials
Handlebars.registerPartial('invoice', $("#invoiceTemplate").html())
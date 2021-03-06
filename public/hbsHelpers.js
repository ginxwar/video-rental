// hbs helpers
Handlebars.registerHelper('dateFormat', function(context, block) {  
  if (window.moment) {
    var f = block.hash.format || "MMM DD, YYYY hh:mm:ss A";
    return moment(context).format(f); //had to remove Date(context)
  } else {
    return context;   //  moment plugin not available. return data as is.
  };
});
Handlebars.registerHelper('dateSince', function(context, block) {  
  if (window.moment) {    
    return moment(context).fromNow();
  } else {
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
Handlebars.registerHelper("checkoutStatusIcon", function(options) {
  if (this.actualDateReturned) {
    var text = "icon-repeat";
  } else {
    var text = "icon-plane";
  }          
  return text;
})

Handlebars.registerHelper("lateFeeFlagStatus", function(invoiceDate) {
  invoiceDate = moment(invoiceDate);
  var actualDateReturned = moment(this.actualDateReturned);  
  var daysLapsed = actualDateReturned.diff(invoiceDate, 'days');  
  
  if (daysLapsed > this.days && !(this.lateFeeAssessed)) {
    return "<br/><span class='label label-important'>late fee pending</span>";
  }
});

Handlebars.registerHelper("discRentalStatus", function(invoiceDate) {
  //console.log(this);
  //console.log(invoiceDate);  
  invoiceDate = moment(invoiceDate);
  var actualDateReturned = moment(this.actualDateReturned);  
  var daysLapsed = actualDateReturned.diff(invoiceDate, 'days');  
  if (daysLapsed === this.days) {
    var text = "<span class='label label-info'>due today</span>"
  } else if (daysLapsed > this.days) {
    var text = "<span class='label'>overdue " + daysLapsed + "d</span>";
  } else if (daysLapsed >= 0 && daysLapsed <= this.days) {
    var text = "";
  } else {  //strange negative value? (possible?)
    var text = "<span class='label label-important'>Fatal Error</span>";
  }  
  return text;
});
Handlebars.registerHelper("grandTotal", function(options){
  //console.log(this);
  var discFees =  _(this.discs).reduce(function( memo, val, key ){
    return (memo || 0) + (val.price || 0) + (val.lateFeeAssessed || 0);
  }, 0);
  
  var purchaseFees = _(this.purchases).reduce(function( memo, val, key ) {
    var fee = (memo || 0) + (val.quantity * val.unitPrice)
    return parseFloat(fee.toPrecision(12));  //stupid javascript math
  }, 0);
  
  //again, to protect against stupid javascript math (try .1 + .2)
  return parseFloat((discFees + purchaseFees).toPrecision(12)).toFixed(2);  
});

//hbs block helpers
Handlebars.registerHelper("ifLateFeesTotal", function(options){
  var lateFees = _(this.discs).reduce(function( memo, val, key ) {
    return (memo || 0) + (val.lateFeeAssessed || 0);
  }, 0);
  
  if (lateFees > 0) {
    var text = '<p class="alert alert-error text-right">'
    text += '<strong>Overdue Fees Total:'
    text += ' $' + lateFees
    text += '</strong></p>'
    return text;
  } 
  
});

//partials
Handlebars.registerPartial('invoice', $("#invoiceTemplate").html());
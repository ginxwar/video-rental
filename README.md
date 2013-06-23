video rental store
------------------

This is a prototype video rental store web application written entirely in JavaScript.


technology stack
----------------

* node + express
* jquery
* handlebars
* bootstrap
* underscore
* mongodb (not yet implemented)


Time constraints limit this prototype to only read operations against two static JSON files.  But in a real development, the interactions (writes and updates) between the client application and the backend would be facilitated through additional HTTP endpoints (expressJS web service) that would connect to a mongo database to serve up data.

Visually, the application should allow the user to quickly gauge and understand information, if possible, by converting lexical information into graphical information. 


Functional Requirements
-----------------------


* track customers:
  * current and new customers

* track inventory:
  * availability
  * unavailability
  * total stock

* track invoices/transactions:
  * rental date length (terms: 5-day, 2-day)
  * price per rental 
  * rental status (overdue, returned, out...)
  * non-rental purchases

video rental store
==================

This is a prototype video rental store web application written entirely in JavaScript.


Technology stack
----------------

* node + express
* jquery
* handlebars
* bootstrap
* underscore
* (mongodb)*


Time constraints limit this prototype to only read operations against two static JSON files.  But in a real development, the interactions (writes and updates) between the client application and the backend would be facilitated through additional HTTP endpoints (expressJS web service) that would connect to a mongo database.

Visually, the application should allow the user to quickly gauge and understand information, if possible, by converting lexical information into graphical information. 


Functional Requirements


track customers:
current and new customers


track inventory:
* availability
* unavailability
* total stock

track transactions:
* rental date length
* price per rental
* rental status
* non-rental purchases

# SupplyAi Assessment

Hosted here:  <a href="http://still-journey-60085.herokuapp.com/">http://still-journey-60085.herokuapp.com/</a>

This app is an Angular 1.5 app that consumes an external API provided by SupplyAi and then displays that data in D3.js charts. Angular-NVD3 is used to integrate into angular.

<h2>To Install</h2>

`npm install`

should run npm install and then bower install.

<h2> Serve app </h2>

run app 
`gulp serve-dev`


# App Run Down

The app was generated from a modified John Papa Hottowel yeoman that was developed by my current company. The only different between a vanilla hottowel and this hottowel
are the way that our components are architected and out route views. We use this yeoman generator as it follows the style guide fairly closely.

There is one defined route that we use in this app and a 404 route for any route that strays from the dashboard('/'). The dashboard route is my shell for my form and chart components.
My HTML is defined in the dashboard.html under features. 

The app starts with 2 initial service calls to populate the charts with their data. 

From the the user is presented with a line chart and a bar chart which display number of order returns in the line chart
and then the reason of returns in the bar chart.

After the init the user should notice the forms above each chart, There are 2 forms; one for the line chart and another for the bar chart.

After the user specifies a minimum of a start date and a end date then the data is passed via isolate scope to the containerController where they are stored in 
a single object in which the query can be made from.

the container was set up with inspiration from Angular 2. HTML is transcluded from the dashboard page

Nothing is done after the data is populated until the ng-submit is called from the forms. on submit a flag is set true that is watched on the container.
The container then passes the object it aggregated from its watchers and calls it's service.

On the service layer there are 4 services, Two of which are mock services as I didn't want to call the API too much initially as it is rate limited.

The main service is the ReturnService which holds 2 functions one for the reason chart and one for the number of returns chart. Once called the service will
set any optional params data to an empty string if it is default or undefined.

The service will then pass the params, query, and URL to the RestService which will then run it's http call through a promise. 

once the services all pass through the RestService then we return to the containerController where our error handling is done through
our service call promises.

If the data is unsuccessful a logger message is displayed with the errors text and error code.

Upon success, the payload is assigned to an object on the isolate scope that is bound on their respective charts component.

On app init options are defined for NVD3 to setup the charts in the chart components, data isn't necessary on the initial run and will watch for when the chartData
object is defined. If it is defined the watchers will populate the chart. Which through our second calls will destroy the old chart data and then render the new data.


That's the app in a nutshell

# Things to be added

1. form validation needs to be fixed, and validation styles need to be defined (e.g. ng-prisitne)

2. bootstrap styles need to be overriden such as the header's size as well as rows and columns need to be defined for each specific breakpoint.
The app could benefit from a makeover in general

3. Once the assessment is over I need to convert the container calls to use the mockData services

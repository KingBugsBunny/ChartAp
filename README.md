# ChartAp

This app is an Angular 1.5 app that consumes an external API provided by SupplyAi and then displays that data in D3.js charts. Angular-NVD3 is used to integrate into angular.

<h2>To Install</h2>

`npm install`

should run npm install and then bower install.

<h2> Serve app </h2>

run app 
`gulp serve-dev`


# App Run Down

The app was generated from a modified John Papa Hottowel yeoman that was developed by my current company. The only difference between a vanilla hottowel and this hottowel
are the way that our components are architected and our route views are set up. We use this yeoman generator as it follows the style guide fairly closely.

There is one defined route that we use in this app and a 404 route for any route that strays from the dashboard('/'). The dashboard route is my shell for my form and chart components.
My HTML is defined in the dashboard.html under features. 

<h3>Architecture</h3>

The architecture is as such:</br>
`<ui-view>`</br>
   &nbsp;&nbsp;&nbsp; `<dashboard>`</br>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     `<container>`</br>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;         `<lineForm></lineForm>`</br>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;         `<lineChart></lineChart>`</br>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;         `<barForm></barForm>`</br>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;         `<barChart></barChart>`</br>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     `</container>`</br>
   &nbsp;&nbsp;&nbsp; `</dashboard>`</br>
 ` </ui-view>`</br>
 
 The app was architected with inspiration from Angular 2's nested component system.
 
 The container was set up as the main parent with the dashboard acting as a shell. HTML is transcluded in the container from HTML defined on the dashboard page to imitate this architecture.


<h3>On Run</h3>
<h5>Init</h5>
The app starts with 2 initial service calls to populate the charts with their data which originate in the container and then are passed to the chart components. 

From there the user is presented with a line chart and a bar chart which display number of order returns in the line chart
and then the reason of returns in the bar chart.

<h5>User Interaction</h5>
After the init the user should notice the forms above each chart, There are 2 forms; one for the line chart and another for the bar chart.

After the user specifies a minimum of a start date and a end date then the data is passed via isolate scope to the containerController where they are stored in 
a single object in which the query can be made from.(The date pickers used are from Angular-Material, they looked good and worked quickly. However there seems to be a problem with
their validators)

Nothing is done after the data is populated until the ng-submit is called from the forms. on submit a flag is set true that is watched on the container.
The container then passes the object it aggregated from its watchers and calls it's service.

<h5> Service Calls</h5>

On the service layer there are 4 services, Two of which are mock services as I didn't want to call the API too much initially as it is rate limited.

The main service is the ReturnService which holds 2 functions one for the reason chart and one for the number of returns chart. Once called the service will
set any optional params data to an empty string if it is default or undefined.

The service will then pass the params, query, and URL to the RestService which will then run it's http call through a promise. 

once the services all pass through the RestService then we return to the containerController where our error handling is done through
our service call promises.

If the data is unsuccessful a logger message is displayed with the errors text and error code.

<h5> Passing payload data</h5>
Upon success, the payload is assigned to an object on the isolate scope that is bound on their respective charts component.

<h5> Rendering charts <h5>

<p>On app init options are defined for NVD3 to setup the charts in the chart components, data isn't necessary on the initial run and will watch for when the chartData
object is defined. If it is defined the watchers will populate the chart. Which, through our second calls will destroy the old chart data and then render the new data.<p>


<h5>That's the app in a nutshell</h5>

# Things to be added

1. ~~form validation needs to be fixed, and validation styles need to be defined (e.g. ng-prisitne)~~('Fixed as of 10/17/2016') Validation could use prompts

2. bootstrap styles need to be overriden such as ~~the header's size~~('Fixed as of 10/17/2016') as well as rows and columns need to be defined for each specific breakpoint.
The app could benefit from a makeover in general

3. ~~Once the API is disabled I need to convert the container calls to use the mockData services (still working as of 10/17/2016)~~ broken as of 03/27/2017

4. ~~variables need to be cleaned up~~ 'Fixed as of 10/17/2016'

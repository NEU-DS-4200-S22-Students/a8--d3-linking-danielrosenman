// Immediately Invoked Function Expression to limit access to our 
// variables and prevent 
((() => {

  // Load the data from a json file (you can make these using
  // JSON.stringify(YOUR_OBJECT), just remove the surrounding '')
  d3.json('data/texas.json').then(data => {


    //Created event type for the d3-dispatch.
    const dispatchEvent = "updatedSelection";


    // Create a line chart given x and y attributes, labels, offsets;
    // a div id selector to put our svg in; and the data to use.
    let lcYearPoverty = linechart()
      .x(d => d.year)
      .xLabel('YEAR')
      .y(d => d.poverty)
      .yLabel('POVERTY RATE')
      .yLabelOffset(40)
      .selectionDispatcher(d3.dispatch(dispatchEvent))
      ('#linechart', data);

      

    // Create a scatterplot given x and y attributes, labels, offsets;
    // a div id selector to put our svg in; and the data to use.
    let spUnemployMurder = scatterplot()
      .x(d => d.unemployment)
      .xLabel('UNEMPLOYMENT RATE')
      .y(d => d.murder)
      .yLabel('MURDER RATE IN STATE PER 100000')
      .yLabelOffset(150)
      .selectionDispatcher(d3.dispatch(dispatchEvent))
      ('#scatterplot', data);

    
lcYearPoverty.selectionDispatcher().on(dispatchEvent, spUnemployMurder.updateSelection);

spUnemployMurder.selectionDispatcher().on(dispatchEvent, lcYearPoverty.updateSelection);

  });

})());
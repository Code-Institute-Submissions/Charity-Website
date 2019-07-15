//unfinished

queue()
    .defer(d3.json, "data/data.json")
    .defer(d3.json, "data/data2.json")
    .await(createDataVis)



function createDataVis(error, countriesData, countriesData2) {


    show_country_data(error, countriesData);
    show_country_data2(error, countriesData2);
    //show_country_selector(ndx);
    //show_country_data(ndx);



    dc.renderAll();
}

function show_country_data(error, countriesData) {

    var ndx = crossfilter(countriesData);
    var country_dim = ndx.dimension(dc.pluck('country'));


    // GDP per Capita Chart 
    var draw_barchart_gdp_country = country_dim.group().reduceSum(dc.pluck('gdp'));
    dc.barChart('#gdp-per-capita-chart')
        .width(725)
        .height(270)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .dimension(country_dim)
        .group(draw_barchart_gdp_country)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel('Country')
        .yAxisLabel('GDP Per Capita ($)')
        .yAxis().ticks(8);


    // Gini Coefficient Chart 
    var gini_coefficient_dim = country_dim.group().reduceSum(dc.pluck('gini-coefficient'));
    dc.barChart('#gini-coefficient-chart')
        .width(725)
        .height(270)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .dimension(country_dim)
        .group(gini_coefficient_dim)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel('Country')
        .yAxisLabel('Gini Coefficient')
        .yAxis().ticks(8);

    // Unemployment Rate Pie Chart

    var draw_unemployment_rate_pie = country_dim.group().reduceSum(dc.pluck('unemployment-rate'));
    var minRate = country_dim.bottom(1)[0].date;
    var maxRate = country_dim.top(1)[0].date;
    dc.pieChart('#unemployment-rate-pie-chart')
        .height(330)
        .radius(90)
        .transitionDuration(1500)
        .dimension(country_dim)
        .group(draw_unemployment_rate_pie);


    //Female Unemployment Rates

    var parseDate = d3.time.format("%Y").parse;
    countriesData.forEach(function(d) {
        var datedYears = new Date(d.year);
        d.year = datedYears;
    });

    var unemp_rate_female_dim = ndx.dimension(dc.pluck('year')),

        femaleUnempRateDRC = unemp_rate_female_dim.group().reduceCount(function(d) {
            if (d.unemploymentRateCountry === 'DRC') {
                return +d.femaleUnemploymentRate;
            }
            else {
                return 0;
            }
        }),
        femaleUnempRateMZ = unemp_rate_female_dim.group().reduceSum(function(d) {
            if (d.unemploymentRateCountry === 'MZ') {
                return +d.femaleUnemploymentRate;
            }
            else {
                return 0;
            }
        }),
        femaleUnempRateUG = unemp_rate_female_dim.group().reduceSum(function(d) {
            if (d.unemploymentRateCountry === 'UG') {
                return +d.femaleUnemploymentRate;
            }
            else {
                return 0;
            }
        }),
        femaleUnempRateTJ = unemp_rate_female_dim.group().reduceSum(function(d) {
            if (d.unemploymentRateCountry === 'TJ') {
                return +d.femaleUnemploymentRate;
            }
            else {
                return 0;
            }
        }),
        femaleUnempRateYE = unemp_rate_female_dim.group().reduceSum(function(d) {
            if (d.unemploymentRateCountry === 'YE') {
                return +d.femaleUnemploymentRate;
            }
            else {
                return 0;
            }
        }),
        femaleUnempRateHT = unemp_rate_female_dim.group().reduceSum(function(d) {
            if (d.unemploymentRateCountry === 'HT') {
                return +d.femaleUnemploymentRate;
            }
            else {
                return 0;
            }
        }),
        femaleUnempRateET = unemp_rate_female_dim.group().reduceSum(function(d) {
            if (d.unemploymentRateCountry === 'ET') {
                return +d.femaleUnemploymentRate;
            }
            else {
                return 0;
            }
        }),
        femaleUnempRateTZ = unemp_rate_female_dim.group().reduceSum(function(d) {
            if (d.unemploymentRateCountry === 'TZ') {
                return +d.femaleUnemploymentRate;
            }
            else {
                return 0;
            }
        }),
        femaleUnempRateKG = unemp_rate_female_dim.group().reduceSum(function(d) {
            if (d.unemploymentRateCountry === 'KG') {
                return +d.femaleUnemploymentRate;
            }
            else {
                return 0;
            }
        }),
        femaleUnempRateUZ = unemp_rate_female_dim.group().reduceSum(function(d) {
            if (d.unemploymentRateCountry === 'UZ') {
                return +d.femaleUnemploymentRate;
            }
            else {
                return 0;
            }
        });

    var minDate = unemp_rate_female_dim.bottom(1)[0].date;
    var maxDate = unemp_rate_female_dim.top(1)[0].date;

    var composite = dc.compositeChart('#unemployment-rate-female');
    console.log(composite);

    composite
        .width(768)
        .height(480)
        .x(d3.scale.linear().domain([2015, 2018]))
        .yAxisLabel("Unemployment Rate")
        .xAxisLabel("Year")
        .legend(dc.legend().x(580).y(13).itemHeight(20).gap(5))
        .renderHorizontalGridLines(true)
        .compose([
            dc.lineChart(composite)
            .dimension(unemp_rate_female_dim)
            .colors('orange')
            .group(femaleUnempRateDRC, "DRC")
            .dashStyle([2, 2]),
            dc.lineChart(composite)
            .dimension(unemp_rate_female_dim)
            .colors('blue')
            .group(femaleUnempRateMZ, "MZ")
            .dashStyle([5, 5]),
            dc.lineChart(composite)
            .dimension(unemp_rate_female_dim)
            .colors('grey')
            .group(femaleUnempRateUG, "UG")
            .dashStyle([8, 8]),
            dc.lineChart(composite)
            .colors('blue')
            .group(femaleUnempRateTJ, 'Tajikistan')
            .dashStyle([11, 11]),
            dc.lineChart(composite)
            .colors('orange')
            .group(femaleUnempRateYE, 'Yemen')
            .dashStyle([14, 14]),
            dc.lineChart(composite)
            .colors('lightblue')
            .group(femaleUnempRateHT, 'Haiti')
            .dashStyle([17, 17]),
            dc.lineChart(composite)
            .colors('black')
            .group(femaleUnempRateET, 'Ethopia')
            .dashStyle([20, 20]),
            dc.lineChart(composite)
            .colors('brown')
            .group(femaleUnempRateTZ, 'Tanzania')
            .dashStyle([23, 23]),
            dc.lineChart(composite)
            .colors('purple')
            .group(femaleUnempRateKG, 'Kyrgyzstan')
            .dashStyle([26, 26]),
            dc.lineChart(composite)
            .colors('pink')
            .group(femaleUnempRateUZ, 'Uzbekistan')
            .dashStyle([29, 29]),
        ])

        .brushOn(false)
        .render();





    //Male Unemployment Rates

    var parseDate = d3.time.format("%Y").parse;
    countriesData.forEach(function(d) {
        var datedYears = new Date(d.year);
        d.year = datedYears;
    });

    var unemp_rate_male_dim = ndx.dimension(dc.pluck('year')),

        maleUnempRateDRC = unemp_rate_male_dim.group().reduceCount(function(d) {
            if (d.unemploymentRateCountry === 'DRC') {
                return +d.maleUnemploymentRate;
            }
            else {
                return 0;
            }
        }),
        maleUnempRateMZ = unemp_rate_male_dim.group().reduceSum(function(d) {
            if (d.unemploymentRateCountry === 'MZ') {
                return +d.maleUnemploymentRate;
            }
            else {
                return 0;
            }
        }),
        maleUnempRateUG = unemp_rate_male_dim.group().reduceSum(function(d) {
            if (d.unemploymentRateCountry === 'UG') {
                return +d.maleUnemploymentRate;
            }
            else {
                return 0;
            }
        }),
        maleUnempRateTJ = unemp_rate_male_dim.group().reduceSum(function(d) {
            if (d.unemploymentRateCountry === 'TJ') {
                return +d.maleUnemploymentRate;
            }
            else {
                return 0;
            }
        }),
        maleUnempRateYE = unemp_rate_male_dim.group().reduceSum(function(d) {
            if (d.unemploymentRateCountry === 'YE') {
                return +d.maleUnemploymentRate;
            }
            else {
                return 0;
            }
        }),
        maleUnempRateHT = unemp_rate_male_dim.group().reduceSum(function(d) {
            if (d.unemploymentRateCountry === 'HT') {
                return +d.maleUnemploymentRate;
            }
            else {
                return 0;
            }
        }),
        maleUnempRateET = unemp_rate_male_dim.group().reduceSum(function(d) {
            if (d.unemploymentRateCountry === 'ET') {
                return +d.maleUnemploymentRate;
            }
            else {
                return 0;
            }
        }),
        maleUnempRateTZ = unemp_rate_male_dim.group().reduceSum(function(d) {
            if (d.unemploymentRateCountry === 'TZ') {
                return +d.maleUnemploymentRate;
            }
            else {
                return 0;
            }
        }),
        maleUnempRateKG = unemp_rate_male_dim.group().reduceSum(function(d) {
            if (d.unemploymentRateCountry === 'KG') {
                return +d.maleUnemploymentRate;
            }
            else {
                return 0;
            }
        }),
        maleUnempRateUZ = unemp_rate_male_dim.group().reduceSum(function(d) {
            if (d.unemploymentRateCountry === 'UZ') {
                return +d.maleUnemploymentRate;
            }
            else {
                return 0;
            }
        });

    var minDate2 = unemp_rate_male_dim.bottom(1)[0].date;
    var maxDate2 = unemp_rate_male_dim.top(1)[0].date;

    var composite = dc.compositeChart('#unemployment-rate-male');
    console.log(composite);

    composite
        .width(768)
        .height(480)
        .x(d3.scale.linear().domain([2015, 2018]))
        .yAxisLabel("Unemployment Rate")
        .xAxisLabel("Year")
        .legend(dc.legend().x(580).y(13).itemHeight(20).gap(5))
        .renderHorizontalGridLines(true)
        .compose([
            dc.lineChart(composite)
            .dimension(unemp_rate_male_dim)
            .colors('orange')
            .group(maleUnempRateDRC, "DRC")
            .dashStyle([2, 2]),
            dc.lineChart(composite)
            .dimension(unemp_rate_male_dim)
            .colors('blue')
            .group(maleUnempRateMZ, "MZ")
            .dashStyle([5, 5]),
            dc.lineChart(composite)
            .dimension(unemp_rate_male_dim)
            .colors('grey')
            .group(maleUnempRateUG, "UG")
            .dashStyle([8, 8]),
            dc.lineChart(composite)
            .colors('blue')
            .group(maleUnempRateTJ, 'Tajikistan')
            .dashStyle([11, 11]),
            dc.lineChart(composite)
            .colors('orange')
            .group(maleUnempRateYE, 'Yemen')
            .dashStyle([14, 14]),
            dc.lineChart(composite)
            .colors('lightblue')
            .group(maleUnempRateHT, 'Haiti')
            .dashStyle([17, 17]),
            dc.lineChart(composite)
            .colors('black')
            .group(maleUnempRateET, 'Ethopia')
            .dashStyle([20, 20]),
            dc.lineChart(composite)
            .colors('brown')
            .group(maleUnempRateTZ, 'Tanzania')
            .dashStyle([23, 23]),
            dc.lineChart(composite)
            .colors('purple')
            .group(maleUnempRateKG, 'Kyrgyzstan')
            .dashStyle([26, 26]),
            dc.lineChart(composite)
            .colors('pink')
            .group(maleUnempRateUZ, 'Uzbekistan')
            .dashStyle([29, 29]),
        ])

        .brushOn(false)
        .render();




    var gender_dim = ndx.dimension(dc.pluck('totalFemaleUnemploymentRate'));
    var draw_gender_unemployment_rate_pie = gender_dim.group().reduceSum(dc.pluck('totalMaleUnemploymentRate'));
    var minRate2 = gender_dim.bottom(1)[0].date;
    var maxRate2 = gender_dim.top(1)[0].date;
    dc.pieChart('#gender-unemployment-rate-pie-chart')
        .height(330)
        .radius(90)
        .transitionDuration(1500)
        .dimension(gender_dim)
        .group(draw_gender_unemployment_rate_pie);


}

function show_country_data2(error, countriesData2) {

    var ndx = crossfilter(countriesData2);
    var name_dim = ndx.dimension(dc.pluck('countryCostsData'));
    var costs_of_food = name_dim.group().reduceSum(dc.pluck('price'));

    dc.barChart('#costs-of-meals-chart')
        .width(725)
        .height(270)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .dimension(name_dim)
        .group(costs_of_food)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel('Country')
        .yAxisLabel('Price of Food ($)')
        .yAxis().ticks(4);
}

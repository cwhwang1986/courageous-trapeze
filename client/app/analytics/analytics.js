angular.module('courageousTrapeze.analytics', [])

.controller('AnalyticsController', ['$scope', function($scope) {
  $scope.clicks = [
    { 'time': 1, 'value': 22 },
    { 'time': 2, 'value': 10 },
    { 'time': 3, 'value': 1 },
    { 'time': 4, 'value': 33 },
    { 'time': 5, 'value': 21 }
  ];

  $scope.responses = [
    { 'time': 'Brant', 'value': 24 },
    { 'time': 'Charlie', 'value': 10 },
    { 'time': 'Johnny', 'value': 1 },
    { 'time': 'Zack', 'value': 2 },
    { 'time': 'Lu', 'value': 5 }
  ];

  $scope.filt = function() {
    $scope.clicks = [
      { 'time': 1, 'value': 22 },
      { 'time': 2, 'value': 25 },
      { 'time': 3, 'value': 2 },
      { 'time': 4, 'value': 11 },
      { 'time': 5, 'value': 21 }
    ];

    $scope.responses = [
      { 'time': 'Brant', 'value': 24 },
      { 'time': 'Charlie', 'value': 10 },
      { 'time': 'Johnny', 'value': 1 },
      { 'time': 'Zack', 'value': 2 },
      { 'time': 'Lu', 'value': 5 }
    ];
  };

  $scope.filttwo = function() {
    $scope.clicks = [
      { 'time': 1, 'value': 11 },
      { 'time': 2, 'value': 11 },
      { 'time': 3, 'value': 11 },
      { 'time': 4, 'value': 11 },
      { 'time': 5, 'value': 11 }
    ];

    $scope.responses = [
      { 'time': 'Brant', 'value': 11 },
      { 'time': 'Charlie', 'value': 10 },
      { 'time': 'Johnny', 'value': 11 },
      { 'time': 'Zack', 'value': 24 },
      { 'time': 'Lu', 'value': 7 }
    ];
  };

  $scope.filtthree = function() {
    $scope.clicks = [
      { 'time': 1, 'value': 102 },
      { 'time': 2, 'value': 152 },
      { 'time': 3, 'value': 234 },
      { 'time': 4, 'value': 232 },
      { 'time': 5, 'value': 213 }
    ];

    $scope.responses = [
      { 'time': 'Brant', 'value': 4 },
      { 'time': 'Charlie', 'value': 1 },
      { 'time': 'Johnny', 'value': 4 },
      { 'time': 'Zack', 'value': 22 },
      { 'time': 'Lu', 'value': 5 }
    ];
  };
}])

.directive('d3Bar', [function() {
  return {
    restrict: 'E',
    scope: {
      data: '='
    },
    link: function(scope, el) {
      var margin = {top: 50, right: 50, bottom: 50, left: 50};
      var width = 400 - margin.left - margin.right;
      var height = 300 - margin.top - margin.bottom;

      var svg = d3.select(el[0])
        .append('svg')
        .attr("class", "axis")
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
      var y = d3.scale.linear().range([height, 0]);

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");

      
      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
          .ticks(10);

      scope.render = function(data) {
        
        x.domain(data.map(function(d) { return d.time; }));
        y.domain([0, d3.max(data, function(d) { return d.value; })]);
        
        svg.selectAll('g.axis').remove();

        svg.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0,' + height + ')')
          .call(xAxis);
            
        svg.append('g')
          .attr('class', 'y axis')
          .call(yAxis)
          .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '.71em')
            .style('text-anchor', 'end');

        var bars = svg.selectAll('.bar').data(data);
        bars.enter()
          .append('rect')
          .attr('class', 'bar')
          .attr('x', function(d) { return x(d.time); })
          .attr('width', x.rangeBand());
      
        bars
          .transition()
          .duration(500)
          .attr('height', function(d) { return height - y(d.value); })
          .attr('y', function(d) { return y(d.value); });
      };

      scope.$watch('data', function(){
        scope.render(scope.data);
      }, true);  
    }
  };
}])

.directive('d3Donut', [ function(){
  return {
    restrict: 'E',
    scope: {
      data: '='
    },
    link: function(scope, el) {
      var width = 400;
      var height = 300;
      var radius = Math.min(width, height) / 2;
      var color = d3.scale.ordinal().range(['#FF6138', '#FFFF9D', '#BEEB9F', '#79BD8F', '#00A388']);
      var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(radius - 70);
      var data = scope.data;
      var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.value; });
      var svg = d3.select(el[0]).append("svg")
          .attr("width", width)
          .attr("height", height)
        .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      scope.render = function(data){

        svg.selectAll('g').remove();
        var g = svg.selectAll(".arc").data(pie(data));

        g.enter().append("g")
            .attr("class", "arc");

        g.append("path")
          .attr("d", arc)
          .style("fill", function(d) { return color(d.data.time); });

        g.append("text")
          .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
          .attr("dy", ".35em")
          .style("text-anchor", "middle")
          .text(function(d) { return d.data.time; });

        g.selectAll('path').transition().duration(500).attrTween('d', function(d) {
          var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
          return function(t) {
            d.endAngle = i(t);
            return arc(d);
          }
        });

      };

      scope.$watch('data', function(){
        scope.render(scope.data);
      }, true); 
  
    }
  };
}]);


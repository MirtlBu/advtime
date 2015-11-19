new WOW().init();
var svg,
    cloud,
    cloudAnim,
    setupClouds,
    setupSvg,
    initialise,
    template,
    groupArray;

    var svgwrap = Snap.select('.clouds');
    var svgWidth = $('.clouds').width();
    var coordNull = 't0,0';
    var coordWidthPositive = 't'+ svgWidth*1.1 +',0';
    var coordWidthNegative = 'matrix(1, 0, 0, 1,-' + svgWidth*1.1 + ', 0)';

initialise = function() {
    setupSvg();
    var start = setupClouds();
    start.transform(coordNull);
    fun(start);
};

function fun(old) {
    if(old) {
        var mid = setupClouds();
        mid.transform(coordWidthPositive);
        mid.animate({
                transform: coordNull
            }, 30000, function() {
                fun(mid);
            });
        old.animate({
            transform: coordWidthNegative
        }, 30000, function() {
            old.remove();
        });
    }
}

setupSvg = function() {
    svg = new Snap($('.clouds').width(), 0);
    svg.addClass('cloudsSvg').appendTo(svgwrap);
    svg.transform('t0,0');
    template = svg.path('M70.21 41.895h-1.497c.048-1.244.01-3.24-.576-4.73-.912-2.322-3.152-3.65-4.812-3.898-1.295-.194-4.3-.085-5.56-.028-.838-4.137-4.84-7.274-9.663-7.274-5.27 0-9.56 3.748-9.807 8.452-1.267.027-2.457.034-3.51.01-6.356 1.677-6.125 6.107-5.893 7.467H27.07c-.64 0-1.16.52-1.16 1.16 0 .643.52 1.163 1.16 1.163h43.14c.643 0 1.162-.52 1.162-1.162 0-.64-.52-1.16-1.16-1.16');
    template.attr( {
        fill:'#fff',
        id: 'template',
    });
    cloud = svg.select('#template');
}

setupClouds = function() {

    var containerHeight = svg.node.offsetHeight / 3,
        containerWidth = svg.node.offsetWidth,
        numberOfClouds = 5;

    var clouds = svg.g();

        for (var i = numberOfClouds; i >= 0; i--) {

            var x = Math.floor(Math.random() * containerWidth);
            y = Math.floor(Math.random() * containerHeight);

            var newCloud = cloud.use(),
            randomScale = Math.random() * 7,
            randomOpacity = Math.random() + 0.3;
            console.log(randomScale);
            newCloud.transform('s' + randomScale + ' ' + randomScale);
            newCloud.attr({
                x: x/randomScale,
                y: y/randomScale + 10,
                'fill-opacity': randomOpacity
            });

            clouds.add(newCloud);
        }

    return clouds;
};

initialise();


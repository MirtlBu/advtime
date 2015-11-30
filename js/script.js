new WOW().init();
var svg,
    template;

var svgWidth = $('.clouds').width();
var coords = {
    zero: 't0,0',
    positive: 't'+ svgWidth*1.1 +',0',
    negative: 'matrix(1, 0, 0, 1,-' + svgWidth*1.1 + ', 0)'
};

function initialise() {
    setupSvg();
    var startGroup = setupClouds();
    startGroup.transform(coords.zero);
    cloudAnim(startGroup);
};

function cloudAnim(oldGroup) {
    if(oldGroup) {
        var currentGroup = setupClouds();
        currentGroup.transform(coords.positive);
        currentGroup.animate({
                transform: coords.zero
            }, 30000, function() {
                cloudAnim(currentGroup);
            });
        oldGroup.animate({
            transform: coords.negative
        }, 30000, function() {
            oldGroup.remove();
        });
    }
}

function setupSvg() {
    svg = new Snap(svgWidth, 0);
    svg.addClass('cloudsSvg').appendTo(Snap.select('.clouds'));
    var cloud = svg.path('M70.21 41.895h-1.497c.048-1.244.01-3.24-.576-4.73-.912-2.322-3.152-3.65-4.812-3.898-1.295-.194-4.3-.085-5.56-.028-.838-4.137-4.84-7.274-9.663-7.274-5.27 0-9.56 3.748-9.807 8.452-1.267.027-2.457.034-3.51.01-6.356 1.677-6.125 6.107-5.893 7.467H27.07c-.64 0-1.16.52-1.16 1.16 0 .643.52 1.163 1.16 1.163h43.14c.643 0 1.162-.52 1.162-1.162 0-.64-.52-1.16-1.16-1.16');
    cloud.attr( {
        fill:'#fff',
        id: 'template',
    });
    template = svg.select('#template');
    cloud.transform('matrix(1, 0, 0, 1, 0, -50)');
}

function setupClouds() {
    var containerHeight = svg.node.offsetHeight/3;
    var group = svg.g();

    for (var i = 5; i >= 0; i--) {
        var newCloud = template.use();

        var randomScale = Randomaizer(7) + 1;
        newCloud.transform('s' + randomScale + ' ' + randomScale);
        newCloud.attr({
            x: Randomaizer(svgWidth, true)/randomScale,
            y: Randomaizer(containerHeight, true)/randomScale + 60,
            'fill-opacity': Randomaizer(1) + 0.3
        });

        group.add(newCloud);
    }
    return group;
};

function Randomaizer(num, floor) {
    return floor ? Math.floor(Math.random() * num) : Math.random() * num;
}

initialise();

$(window).resize(function() {
    svg.remove();
    initialise();
});


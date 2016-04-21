(function() {
    var map = {
        '' : [],
        '北京' : ['北京大学', '清华大学', '中央财经大学', '北京师范大学', '中国人民大学'],
        '天津' : ['南开大学', '天津大学'],
        '上海' : ['复旦大学', '上海交通大学', '上海大学'],
        '合肥' : ['中国科学技术大学'],
        '南京' : ['南京大学'],
        '广州' : ['中山大学'],
        '哈尔滨' : ['哈尔滨工业大学', '哈尔滨理工大学', '哈尔滨工程大学']
    };

    var std = document.querySelector('#student'),
        noStd = document.querySelector('#not-student'),
        forStd = document.querySelector('#for-student'),
        forNoStd = document.querySelector('#for-not-student'),
        city = document.querySelector('#city'),
        school = document.querySelector('#schools');

    var addEventHandler = function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        } else {
            element['on' + type] = handler;
        }
    };

    var changeSchools = function(cityName) {
        var schools = map[cityName];
        school.innerHTML = "";

        schools.forEach(function(s) {
            var op = document.createElement('option');
            op.innerHTML = s;
            school.appendChild(op);
        });
    };

    addEventHandler(city, 'change', function() {
        var citySelected = city.options[city.selectedIndex].text;

        changeSchools(citySelected);
    });

    addEventHandler(std, 'change', function() {
        if (std.checked) {
            forStd.style.display = 'block';
            forNoStd.style.display = 'none';
        }
    });

    addEventHandler(noStd, 'change', function() {
        if (noStd.checked) {
            forStd.style.display = 'none';
            forNoStd.style.display = 'block';
        }
    });
})();

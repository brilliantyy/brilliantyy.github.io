(function() {
    var nameEl = document.getElementById('name'),
        pswEl = document.getElementById('psw'),
        cpswEl = document.getElementById('confirm-psw'),
        emailEl = document.getElementById('email'),
        phoneEl = document.getElementById('phone'),
        formEl = document.getElementsByTagName('form')[0],
        subBtn = document.getElementsByTagName('button')[0];

    /**
     * 定义事件处理函数
     * @param element
     * @param type
     * @param handler
     */
    function addEventHandler(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        } else {
            element['on' + type] = handler;
        }
    }

    /**
     * 设置验证通过
     * @param element
     * @param text
     */
    var setValid = function(element, text) {
        element.style.cssText = 'border-color: #3CCA3C; box-shadow: 0 0 1px .5px #63DB65';
        element.nextElementSibling.firstElementChild.innerHTML = text;
        element.nextElementSibling.firstElementChild.style.color = '#3CCA3C';
        element.nextElementSibling.style.display = 'block';
    };

    /**
     * 设置验证失败
     * @param element
     * @param text
     */
    var setInvalid = function(element, text) {
        element.style.cssText = 'border-color: #F35959; box-shadow: 0 0 1px .5px rgba(236,144,144,.7)';
        element.nextElementSibling.firstElementChild.innerHTML = text;
        element.nextElementSibling.firstElementChild.style.color = '#F35959';
        element.nextElementSibling.style.display = 'block';
    };

    /**
     * 验证名称
     */
    var nameValidation = function() {
        var text = nameEl.value.trim();
        text = text.replace(/[^\x00-\xff]/g, 'aa');

        if (text.length === 0) {
            setInvalid(nameEl, '名称不能为空');
            return false;
        } else if (text.length < 4 || text.length > 16) {
            setInvalid(nameEl, '名称长度为4~16个字符');
            return false;
        } else {
            setValid(nameEl, '名称格式正确');
            return true;
        }
    };

    /**
     * 验证密码
     */
    var pswValidation = function() {
        var text = pswEl.value;

        if (text.length === 0) {
            setInvalid(pswEl, '密码不能为空');
            return false;
        } else if (text.length < 6 || text.length > 20) {
            setInvalid(pswEl, '名称长度为6~20个字符');
            return false;
        } else {
            setValid(pswEl, '密码可用');
            return true;
        }
    };

    /**
     * 验证确认密码
     */
    var confirmPswValidation = function() {
        var text = cpswEl.value;

        if (text !== pswEl.value) {
            setInvalid(cpswEl, '密码输入不一致');
            return false;
        } else {
            if (text === "") {
                setInvalid(cpswEl, '密码不能为空');
                return false;
            } else {
                setValid(cpswEl, '密码输入一致');
                return true;
            }
        }

    };

    /**
     * 验证邮箱
     */
    var emailValidation = function() {
        var text = emailEl.value.trim();
        var reg = /^([a-zA-Z_\d\.\-])+\@(([a-zA-Z\d\-])+\.)+([a-zA-Z\d]{2,4})+$/;

        if (reg.test(text)) {
            setValid(emailEl, '邮箱格式正确');
            return true;
        } else {
            setInvalid(emailEl, '邮箱格式错误');
            return false;
        }
    };

    /**
     * 验证手机
     */
    var phoneValidation = function() {
        var text = phoneEl.value.trim();
        var reg = /^1[358]\d{9}$/;

        if (reg.test(text)) {
            setValid(phoneEl, '手机号码格式正确');
            return true;
        } else {
            setInvalid(phoneEl, '手机号码格式错误');
            return false;
        }
    };

    /**
     * 统一验证
     */
    var validateAll = function() {
        if (nameValidation() && pswValidation() && confirmPswValidation() &&
            emailValidation() && phoneValidation()) {
            alert('提交成功!');
        } else {
            nameValidation();
            pswValidation();
            confirmPswValidation();
            emailValidation();
            phoneValidation();
            alert('提交失败!');
        }
    };

    /**
     * 为表单中元素添加获得焦点事件代理
     */
    addEventHandler(formEl, 'focusin', function(event) {
        event = event || window.event;
        var target = event.target || event.srcElement;

        if (target.nodeName.toLowerCase() === 'input' && !target.visited) {
            target.visited = true;
            target.style.cssText = 'border-color: #3ADAFF; box-shadow: 0 0 1px .5px rgba(176,233,239,.4)';
            target.nextElementSibling.style.display = 'block';
        }
    });


    /**
     * 为表单中元素添加失去焦点事件代理
     */
    addEventHandler(formEl, 'focusout', function(event) {
        event = event || window.event;
        var target = event.target || event.srcElement;

        if (target.nodeName.toLowerCase() === 'input') {
           switch (target) {
               case nameEl:
                   nameValidation();
                   break;
               case pswEl:
                   pswValidation();
                   break;
               case cpswEl:
                   confirmPswValidation();
                   break;
               case emailEl:
                   emailValidation();
                   break;
               case phoneEl:
                   phoneValidation();
                   break;
               default:
                   break;
           }
        }
    });

    /**
     * 点击提交按钮,重新验证表单
     */
    addEventHandler(subBtn, 'click', validateAll);
})();

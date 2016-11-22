(function () {
  function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2)
      return parts.pop().split(";").shift();
  }

  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  }

  function deleteCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

//  if (!window.localStorage) {
  var facklocalStorage = {
    setItem: function (key, value) {
      if (arguments.length !== 2) {
        throw Error('invalid argument');
      }
      setCookie(key, value, 30);
    },
    getItem: function (key) {
      if (arguments.length !== 1) {
        throw Error('invalid argument');
      }
      return getCookie(key);
    },
    removeItem: function (key) {
      if (arguments.length !== 1) {
        throw Error('invalid argument');
      }
      return deleteCookie(key);
    },
	clear: function (key) {
      if (arguments.length !== 1) {
        throw Error('invalid argument');
      }
      return deleteCookie(key);
    }
  };
  function isNeedEnableCutomStorage() {
    //var is_safari = navigator.userAgent.toLowerCase().indexOf('safari/') > -1;
    try{
	localStorage.setItem('test123mode', 'test123mode');
    console.log(localStorage.getItem('test123mode'));
	return localStorage.getItem('test123mode') === null ? true: false;
  }
  catch(e) {
    console.log('error',JSON.stringify(e));
    return true;
  }
  }
   if (isNeedEnableCutomStorage()) {
    var _setItem = Storage.prototype.setItem;
    Storage.prototype.setItem = facklocalStorage.setItem;
    var _getItem = Storage.prototype.getItem;
    Storage.prototype.getItem = facklocalStorage.getItem;
    var _removeItem = Storage.prototype.removeItem;
    Storage.prototype.removeItem = facklocalStorage.removeItem;
	var _clear = Storage.prototype.clear;
    Storage.prototype.clear = facklocalStorage.clear
	
  }
  
}());
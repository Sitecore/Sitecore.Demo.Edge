var http = require('http');
var https = require('https');
var url = require('url');
var uuid = require('uuid');

var NAME = 'Boxever API Chainsaw';
var VERSION = '1.0.8';

var replaceVariables = function (data, variables) {
  var now = new Date().toISOString();
  var timestamp = new Date().getTime();

  function replaceData(data) {
    if (data.indexOf('{{$guid}}') != -1) {
      data = data.replace('{{$guid}}', uuid.v4()); // Adds a v4 style guid
    }
    data = replaceDates(data);
    if (data.indexOf('{{$randomInt}}') != -1) {
      data = data.replace('{{$randomInt}}', Math.floor(Math.random() * 1001)); // Adds a random integer between 0 and 1000 http://www.w3schools.com/jsref/jsref_random.asp
    }
    return data;
  }

  function replaceDates(data) {
    if (data.indexOf('{{$timestamp}}') != -1) {
      data = data.replace('{{$timestamp}}', timestamp); // Adds a ISO-8601 date
    }
    if (data.indexOf('{{$now}}') != -1) {
      data = data.replace('{{$now}}', now); // Adds a ISO-8601 date
    }
    if (data.indexOf('{{$now(') != -1) {
      for (var i = 1; i <= 365; i++) {
        var theDateNegativeMinute = new Date();
        var theDatePositiveMinute = new Date();

        var theDateNegativeHour = new Date();
        var theDatePositiveHour = new Date();

        var theDateNegativeDay = new Date();
        var theDatePositiveDay = new Date();

        var theDateNegativeMonth = new Date();
        var theDatePositiveMonth = new Date();

        var theDateNegativeYear = new Date();
        var theDatePositiveYear = new Date();

        theDateNegativeMinute.setMinutes(theDateNegativeMinute.getMinutes() - i);
        theDatePositiveMinute.setMinutes(theDateNegativeMinute.getMinutes() + i);

        theDateNegativeHour.setHours(theDateNegativeHour.getHours() - i);
        theDatePositiveHour.setHours(theDatePositiveHour.getHours() + i);

        theDateNegativeDay.setDate(theDateNegativeDay.getDate() - i);
        theDatePositiveDay.setDate(theDatePositiveDay.getDate() + i);

        theDateNegativeMonth.setMonth(theDateNegativeMonth.getMonth() - i);
        theDatePositiveMonth.setMonth(theDatePositiveMonth.getMonth() + i);

        theDateNegativeYear.setYear(theDateNegativeMonth.getYear() - i);
        theDatePositiveYear.setYear(theDatePositiveYear.getYear() + i);

        // Replace Minute
        data = data.replace('{{$now(-' + i + 'm)}}', theDateNegativeMinute.toISOString()); // Adds a ISO-8601 date
        data = data.replace('{{$now(+' + i + 'm)}}', theDatePositiveMinute.toISOString()); // Adds a ISO-8601 date

        // Replace Hour
        data = data.replace('{{$now(-' + i + 'h)}}', theDateNegativeHour.toISOString()); // Adds a ISO-8601 date
        data = data.replace('{{$now(+' + i + 'h)}}', theDatePositiveHour.toISOString()); // Adds a ISO-8601 date

        // Replace Day
        data = data.replace('{{$now(-' + i + 'd)}}', theDateNegativeDay.toISOString()); // Adds a ISO-8601 date
        data = data.replace('{{$now(+' + i + 'd)}}', theDatePositiveDay.toISOString()); // Adds a ISO-8601 date

        // Replace Month
        data = data.replace('{{$now(-' + i + 'M)}}', theDateNegativeMonth.toISOString()); // Adds a ISO-8601 date
        data = data.replace('{{$now(+' + i + 'M)}}', theDatePositiveMonth.toISOString()); // Adds a ISO-8601 date

        // Replace Year
        data = data.replace('{{$now(-' + i + 'y)}}', theDateNegativeYear.toISOString()); // Adds a ISO-8601 date
        data = data.replace('{{$now(+' + i + 'y)}}', theDatePositiveYear.toISOString()); // Adds a ISO-8601 date
      }
    }

    return data;
  }

  if (typeof data == 'string' || data instanceof String) {
    for (var i in variables) {
      data = data.replace('{{' + i + '}}', variables[i]);
      data = replaceData(data);
    }
  } else {
    for (var j in data) {
      if (typeof data[j] == 'string' || data[j] instanceof String) {
        for (var i in variables) {
          data[j] = data[j].replace('{{' + i + '}}', variables[i]);
          data[j] = replaceData(data[j]);
        }
      } else if (typeof data[j] == 'object' || data[j] instanceof Object) {
        data[j] = replaceVariables(data[j], variables);
      }
    }
  }
  return data;
};

exports.replaceVariables = replaceVariables;

exports.replaceAllVariables = function (data, context) {
  data = replaceVariables(data, context.sessionVariables);
  data = replaceVariables(data, context.environmentVariables);
  return data;
};

function Chainsaw() {
  var stack = [];

  // prepare the header
  var headers = {
    'Content-Type': 'application/json',
  };

  var envVariables = {};
  var sleepVariable = 200;
  var maskVariables = ['api_token'];

  this.context = { sessionVariables: {} };

  this.env = function (env) {
    envVariables = env;
    return this;
  };

  this.mask = function (mask) {
    maskVariables = mask;
    return this;
  };

  this.sleep = function (milliseconds) {
    sleepVariable = milliseconds;
    return this;
  };

  this.contentType = function (contentType) {
    headers['Content-Type'] = contentType;
    return this;
  };

  this.basicAuth = function (username, password) {
    var header = new Buffer(username + ':' + password).toString('base64');
    headers.Authorization = 'Basic ' + header;
    return this;
  };

  this.get = function (name, action) {
    action.name = name;
    action.type = 'GET';
    stack.push(action);
    return this;
  };

  this.post = function (name, action) {
    action.name = name;
    action.type = 'POST';
    stack.push(action);
    return this;
  };

  this.delete = function (name, action) {
    action.name = name;
    action.type = 'DELETE';
    stack.push(action);
    return this;
  };

  this.put = function (name, action) {
    action.name = name;
    action.type = 'PUT';
    stack.push(action);
    return this;
  };

  this.execute = function (clearContext) {
    stack.reverse();
    if (clearContext) {
      console.log('Clearing context');
      this.context = {
        action: stack.pop(),
        sessionVariables: {},
        environmentVariables: envVariables,
      };
    } else {
      this.context.action = stack.pop();
      this.context.environmentVariables = envVariables;
    }
    this.executeIt();
  };

  function changeParamByName(href, paramName, newVal) {
    var tmpRegex = new RegExp('(' + paramName + '=)[^&]+', 'ig');
    return href.replace(tmpRegex, '$1' + newVal);
  }

  function maskSensitiveData(data) {
    for (var i = 0; i < maskVariables.length; i++) {
      data = changeParamByName(data, maskVariables[i], '********');
    }
    return data;
  }

  this.executeIt = function () {
    var context = this.context;
    var action = context.action;

    if (action.prepare) {
      action.prepare(context);
    }

    action.url = replaceVariables(action.url, context.sessionVariables);
    action.url = replaceVariables(action.url, context.environmentVariables);

    if (action.body) {
      action.body = replaceVariables(action.body, context.sessionVariables);
      action.body = replaceVariables(action.body, context.environmentVariables);
    }
    if (action.params) {
      action.params = replaceVariables(action.params, context.sessionVariables);
      action.params = replaceVariables(action.params, context.environmentVariables);

      for (key in action.params) {
        if (action.url.indexOf('?') == -1) {
          action.url = action.url + '?';
          action.url = action.url + key + '=' + action.params[key];
        } else if (action.url.indexOf('?') != 0) {
          action.url = action.url + '&';
          action.url = action.url + key + '=' + action.params[key];
        }
      }
    }
    if (action.form) {
      action.body = '';
      action.form = replaceVariables(action.form, context.sessionVariables);
      action.form = replaceVariables(action.form, context.environmentVariables);

      for (key in action.form) {
        if (action.body.length != 0) {
          action.body = action.body + '&';
        }
        action.body = action.body + key + '=' + action.form[key];
      }
    }

    console.log('');
    console.log(action.name);
    console.log(action.type + ' ' + maskSensitiveData(action.url));

    var url_parts = url.parse(action.url, true);

    var httpClient = http;
    if ('https:' == url_parts.protocol) {
      httpClient = https;
    }

    // the port options
    if (url_parts.port === undefined) {
      if ('https:' == url_parts.protocol) {
        url_parts.port = 443;
      } else {
        url_parts.port = 80;
      }
    }

    if (url_parts.host.indexOf(':') >= 0) {
      url_parts.host = url_parts.host.split(':')[0];
    }

    var requestHeaders = {};

    for (var key in headers) {
      requestHeaders[key] = headers[key];
    }

    if (action.headers) {
      for (var key in action.headers) {
        requestHeaders[key] = action.headers[key];
      }
    }

    var options = {
      host: url_parts.host,
      port: url_parts.port,
      path: url_parts.path,
      method: action.type,
      headers: requestHeaders,
    };

    var client = this;

    // do the GET, POST, DELETE or PUT call
    var req = httpClient.request(options, function (res) {
      var response = '';

      res.on('data', function (chunk) {
        response += chunk;
      });

      res.on('end', function () {
        context.response = response;

        var action = stack.pop();
        if (context.action !== undefined && context.action.callback !== undefined) {
          context.action.callback(context);
        }

        if (action !== undefined) {
          context.action = action;
          Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, sleepVariable);
          client.executeIt();
        }
      });
    });
    if (context.action.body) {
      if (typeof context.action.body == 'string' || context.action.body instanceof String) {
        console.log(maskSensitiveData(context.action.body));
        req.write(context.action.body);
      } else {
        console.log(JSON.stringify(context.action.body));
        req.write(JSON.stringify(context.action.body));
      }
    }

    req.on('error', function (e) {
      console.error(e);
    });

    req.end();
  };

  this.version = function () {
    console.log(NAME + ' ' + VERSION);
    return this;
  };

  return this;
}

exports.parseArgs = function () {
  // Parse the command line arguments
  var sysVariables = {};
  if (process.argv.length >= 3) {
    // print process.argv
    process.argv.forEach(function (val) {
      if (val.indexOf('=') > 0) {
        sysVariables[val.split('=')[0]] = val.split('=')[1];
      }
    });
  }
  return sysVariables;
};

exports.create = function (msg) {
  return new Chainsaw(msg);
};

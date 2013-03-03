// console.dir(require('../build/Release/sync'))
var esprima = require("esprima")
var Sync = require('../build/Release/sync').Sync;
var sync = new Sync();

exports.wrap = function wrap(object, functions) {
  for(var name in object) {
    var f = function(_object, _name) {
      console.log("============= wrap :: " + _name)
      var _original_function = _object[_name];

      _object[_name] = function() {
        var args = Array.prototype.slice.call(arguments, 0);
        var final_args = [_original_function, _object].concat(args);
        // console.log(_original_function.toString())
        // console.log("+++++++++++++++++++++++++++++++++++++++++++ 0")
        var result = sync.execute.apply(this, final_args);
        // console.log("+++++++++++++++++++++++++++++++++++++++++++ 1")
        // console.dir(result)

        if(result.err != null) throw result.err;

        if(result.result != null && typeof result.result == 'object') {
          return wrap(result.result, functions);
        }

        return result.result;
      }
    }

    if(typeof object[name] == 'function' && object[name].toString().indexOf("sync.execute.apply") == -1) {
      if(functions.indexOf(name) != -1)
        f(object, name);      
    }
  }

  return object;

  // // Method to wrap
  // for(var i = 0; i < functions.length; i++) {
  //   var func = functions[i];

  //   var f = function(_object, _name) {
  //     if(typeof _object[_name] == 'function') {
  //       var _original_function = _object[_name];
  //       console.log("================= add toplevel:: " + _name)
  //       // console.log(_original_function.toString())
  //       // The actual function
  //       _object[_name] = function() {
  //         // console.log("===================================== connect")
  //         // Setup the call
  //         var args = Array.prototype.slice.call(arguments, 0);
  //         var final_args = [_original_function, _object];
  //         final_args = final_args.concat(args);
  //         // console.log("===================================== connect 2")
  //         // console.dir(final_args)
  //         var result = sync.execute.apply(this, final_args);

  //         // console.log("===================================== connect 2")
  //         // If we have an error throw it
  //         if(result.err != null) throw result.err;
  //         // Return the result
  //         return result.result;
  //       }        
  //     } else if(typeof _object.prototype[_name] == 'function') {
  //       // var _original_function = _object.prototype[_name];
  //       console.log("================= add prototype:: " + _name)

  //       var f2 = function(_original_function) {
  //         return function() {
  //           // console.log("============================")
  //           // Setup the call
  //           var args = Array.prototype.slice.call(arguments, 0);
  //           console.dir()
  //           var final_args = [_original_function, _object];
  //           final_args = final_args.concat(args);
  //           var result = sync.execute.apply(this, final_args);

  //           // If we have an error throw it
  //           if(result.err != null) throw result.err;
  //           // Return the result
  //           return result.result;            
  //         }          
  //       }

  //       // The actual function
  //       _object.prototype[_name] = f2(_object.prototype[_name])
  //     }

  //     // console.log("=========================== _name :: " + _name)
  //     // console.dir(_object.prototype)

  //     // var _original_function = _object[_name];
  //     // if(_original_function == null) return;
  //     // var func_string = _original_function.toString();

  //     // if(func_string.indexOf("sync.execute.apply") == -1) {
  //     //   // Wrap the function in a new function
  //     //   _object[_name] = function() {        
  //     //     console.log("----------------")
  //     //     var args = Array.prototype.slice.call(arguments, 0);
  //     //     var final_args = [_original_function, _object];
  //     //     final_args = final_args.concat(args);
  //     //     var result = sync.execute.apply(this, final_args);

  //     //     if(result.err != null) throw result.err;
  //     //     // If there are some more functions we need to wrap
  //     //     // if(object)
  //     //     // wrap(result.result, functions);
  //     //     // Return the result
  //     //     return result.result;
  //     //   }        
  //     // }
  //   }  

  //   // Wrap method in a private context
  //   f(object, functions[i]);        
  // }

  // Return wrapped object
  // return object;
}

exports.srequire = function() {  
}
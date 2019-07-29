// this example takes 2 seconds to run
var start = Date.now();

console.log("starting timer...");
// expected output: starting timer...

console.log(Date.now());
setTimeout(function() {
    console.log(Date.now());
    console.log(typeof Date.now());
    console.log(typeof 2);
  var millis = Date.now() - start;

  console.log("seconds elapsed = " + Math.floor(millis/1000));
  // expected output : seconds elapsed = 2
}, 2000);

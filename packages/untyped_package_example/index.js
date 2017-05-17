module.exports = (function () {

     const EVENT_INFO = Object.freeze({
          name: "BrestJS",
          date: "2017-05-18 19:00"
     });
     function sayHi() {
          console.log("Hi from BrestJS!!!");
     }

     return {
          sayHi,
          info: EVENT_INFO  
     };
})();



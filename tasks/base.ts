import * as _ from "lodash";
import * as gulp from "gulp";

export default class BaseTask {

     public constructor() {
          this._bindThis();
          this._registerTasks();
     }

     private _bindThis() {
          Object
               .getOwnPropertyNames(Object.getPrototypeOf(this))
               .forEach(key => {
                    if (this.hasOwnProperty(key)) {
                         return;
                    }
                    let func = this[key];
                    if (typeof (func) !== "function") {
                         return;
                    }
                    func = func.bind(this);
                    func.key = key;
                    this[key] = func;
               });
     }

     private _registerTasks() {
          Object
               .keys(this)
               .filter(key => {
                    return typeof (this[key]) === "function"
                         && !_.startsWith(key, "_")
                         && key !== "constructor";
               })
               .map(key => this[key])
               .forEach(func => {
                    // TODO: declare task dependencies via decorator metadata?
                    gulp.task(func.key, [], func);
               });
     }
}

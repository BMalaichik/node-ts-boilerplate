import * as pm2 from "pm2";
import * as gulp from "gulp";
import * as rimraf from "gulp-rimraf";
import * as ts from "gulp-typescript";
import * as runSequence from "run-sequence";
import * as sourcemaps from "gulp-sourcemaps";
import tslint from "gulp-tslint";
import { exec } from "child_process";
import { Project } from "gulp-typescript";
import { PluginOptions, ReportOptions } from "gulp-tslint";

import BaseTask from "./base";


export default class Apptask extends BaseTask {
  private project: Project;
  private tsConfig: any;
  private debugMode?: boolean;

  private appName: string;

  public constructor() {
    super();
    this.appName = process.env["npm_package_name"];
    this.project = ts.createProject("./tsconfig.json", { typescript: require("typescript") });
    // creating project once allow to use gulp-ts plugin incremental compilation
    this.tsConfig = require("../../tsconfig");
  }

  public clean() {
    return gulp
      .src(["built/*", "!built/tasks", "logs/*"])
      .pipe(rimraf());
  }

  public lint() {
    const opts: PluginOptions = {
      formatter: "verbose"
    };

    const reportOpts: ReportOptions = {
      emitError: false,
      summarizeFailureOutput: true
    };

    return this.project
      .src()
      .pipe(tslint(opts))
      .pipe(tslint.report(reportOpts));
  }

  public watch() {
    return gulp.watch([
      "./**/*.ts",
      "!built",
      "!logs",
      "!tasks/**/*.ts",
      "!node_modules",
      "!logs"
    ], ["lint", "build", "restart"]);
  }

  public build() {
    return this.project
      .src()
      .pipe(sourcemaps.init())
      .pipe(this.project())
      .js
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(this.tsConfig.compilerOptions.outDir));
  }

  public dev(cb: (...params: any[]) => void) {
    return runSequence("clean", "lint", "build", "watch", "start", cb);
  }

  public debug(cb: (...params: any[]) => void) {
    this.debugMode = true;

    return runSequence("dev", cb);
  }

  public restart(cb: (...params: any[]) => void) {
    return pm2.restart(this.appName, (err) => {
      if (err) {
        console.log(err);
      }
      cb(err);
    });
  }

  public start(cb: (...params: any[]) => void) {
    //   const query: string = `pm2 start ${this.tsConfig.compilerOptions.outDir}/app.js --name ${this.appName} --no-daemon`;

    //   exec(query, (err: Error, stdout: string, stderr: string) => {
    //        console.log(stdout);
    //        console.log(stderr);
    //        cb(err);
    //   });
    const args = this.debugMode ? ["--inspect"] : [];


    return pm2.connect(true, (err) => {
      if (err) {
        console.error(err);
        process.exit(2);
      }
      pm2.start({
        name: this.appName,
        script: `${this.tsConfig.compilerOptions.outDir}/app.js`,
        output: "logs/out.log",
        error: "logs/err.log",
        node_args: args
      }, (err, apps) => {
        pm2.disconnect();
        if (err) {
          cb(err);
        }
      });
    });
  }
}

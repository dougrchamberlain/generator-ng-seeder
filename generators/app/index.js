'use strict';
//Require dependencies
var generators = require('yeoman-generator');

//todo: I'm lazy so here is a function  to quickly create the prompts.

function ask(n){
  return {
    name: n,
    message: 'What is the ' + n
  }
}



module.exports = generators.Base.extend({
  prompting: function () {
    return this.prompt([
      ask('name'),
      ask('description'),
      ask('gitUrl'),
      ask('issuesUrl'),
      ask('homeUrl'),
      ask('entry'),
      ask('author'),
      ask('license')
    ]).then(function (answers) {
      this.props = answers;
    }.bind(this));
  },
//Writing Logic here
  writing: {
    //Copy the configuration files
    config: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'), this.props
      );
    },

    //Copy application files

    //Install Dependencies
    install: function () {
      this.installDependencies('npm');
    }


  }
});

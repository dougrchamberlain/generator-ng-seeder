'use strict';
//Require dependencies
var generators = require('yeoman-generator');


module.exports = generators.Base.extend({
  method1: function () {
    console.log('method 1 just ran');
  },
  method2: function () {
    console.log('method 2 just ran');
  },
  prompting: function () {
    return this.prompt([{
      type    : 'input',
      name    : 'name',
      message : 'Your project name',
      default : this.appname // Default to current folder name
    }, {
      type    : 'confirm',
      name    : 'cool',
      message : 'Would you like to enable the Cool feature?'
    }]).then(function (answers) {
      this.props = answers;
      this.log('app name', answers.name);
      this.log('cool feature', answers.cool);
      console.log(this.props);
      this.props.name = answers.name;
    }.bind(this));
  },
//Writing Logic here
  writing: {
    //Copy the configuration files
    config: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'), {
          name: this.props.name
        }
      );
    }

    //Copy application files

    //Install Dependencies

  }
});

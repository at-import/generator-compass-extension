'use strict';
var util = require('util');
var path = require('path');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');
var _s = require('underscore.string');
var check = require('validator').check;
var chalk = require('chalk');


var AppGenerator = module.exports = function Appgenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);


  this.on('end', function () {
    if (options['git']) {
      // Git Init
      var repo = this.ghRepo;
      var projectDir = this.projectDir;
      spawn('git', ['init'], {cwd: this.projectDir}).on('close', function() {
        // If we have a GitHub Repo, we're going to add the remote origin as well
        if (repo) {
          spawn('git', ['remote', 'add', 'origin', repo], {cwd: projectDir}).on('close', function() {
            console.log("I've added the remote origin, pointing to " + projectDir);
          });
        }
        else {
          console.log("I've initialized Git for you.");
        }
      });
    }

    if (!options['skip-install']) {
      // Spawn commands
      // Each will output their buffer unless the --slient flag is passed
      // Also available, this.spawnCommand

      // Bundle Install
      var projectDir = this.projectDir;
      // spawn('bundle', ['install'], {cwd: this.projectDir}).stdout.on('data', function(data) {
      //   if (!options['silent']) {
      //     console.log(data.toString());
      //   }
      // }).on('close', function() {
      //   if (options['git'] && options['commit']) {
      //     spawn('git', ['add', '.'], {cwd: projectDir}).on('close', function() {
      //       spawn('git', ['commit', '-m', '"Initial Commit"'], {cwd: projectDir});
      //     });
      //   }
      // });

      // Bower Install
      spawn('bower', ['install'], {cwd: this.projectDir}).stdout.on('data', function(data) {
        if (!options['silent']) {
          console.log(data.toString());
        }
      });

      // NPM Install
      spawn('npm', ['install'], {cwd: this.projectDir}).stdout.on('data', function(data) {
        if (!options['silent']) {
          console.log(data.toString());
        }
      });

      // Log the install
      console.log("\nI'm all done! If your installs did not finish properly, run " + chalk.yellow("bower install & npm install") + " to finish installation.");
    }
    else {
      var bye = "\n I'm all done! Now run " + chalk.yellow("bower install & npm install") + " to finish installation.";
      console.log(bye);
    }
  });

  // var sys = require('sys');
  // var exec = require('child_process').exec;
  // function puts(error, stdout, stderr) {sys.puts(stdout)}

  // exec('bundle install', puts);

  // this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(AppGenerator, yeoman.generators.Base);

AppGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  var welcome =
  chalk.red('\n                                __,') +
  chalk.red('\n                       ____----+++|') + chalk.white('   _   _  ___') +
  chalk.red('\n              _____----++++++++++/') + chalk.white('   | | | |/ _ \\') +
  chalk.red('\n          _---+++++++++++++++++++|') + chalk.white('   | |_| | (_) |') +
  chalk.red('\n      __--++++++++++++++++++++++/') + chalk.white('     \\__, |\\___/') +
  chalk.red('\n    _-+++++++++') + chalk.white('_') + chalk.red('++++++++++++++++|') + chalk.white('      __/ |') +
chalk.red('\n   /++++++') + chalk.white('__') + chalk.red('++') + chalk.white('| |') + chalk.red('++') + chalk.white('__') + chalk.red('++++++++++/') + chalk.white('      |___/') +
  chalk.red('\n  |+++++++') + chalk.white('\\ \\') + chalk.red('+') + chalk.white('| |') + chalk.red('+') + chalk.white('/ /') + chalk.red('++++++++++|') + chalk.white('       ___ ___  _ __ ___  _ __   __ _ ___ ___') +
  chalk.red('\n |+++++++++') + chalk.white('\\ \\| |/ /') + chalk.red('++++++++++/') + chalk.white('       / __/ _ \\| \'_ ` _ \\| \'_ \\ / _` / __/ __|') +
  chalk.red('\n|+++++++') + chalk.white('____\\     /____') + chalk.red('+++++++|') + chalk.white('      | (_| (_) | | | | | | |_) | (_| \\__ \\__ \\') +
  chalk.red('\n|++++++') + chalk.white('/_____     _____\\') + chalk.red('+++++/') + chalk.white('        \\___\\___/|_| |_| |_| .__/ \\__,_|___/___/') +
  chalk.red('\n |++++++++++') + chalk.white('/     \\') + chalk.red('++++++++++|') + chalk.white('                  _        | |      _') +
  chalk.red('\n  |++++++++') + chalk.white('/ /| |\\ \\') + chalk.red('++++++++/') + chalk.white('                  | |       |_|     (_)') +
  chalk.red('\n   \\_+++++') + chalk.white('/_/') + chalk.red('+') + chalk.white('| |') + chalk.red('+') + chalk.white('\\_\\') + chalk.red('+++++_-') + chalk.white('           _____  _| |_ ___ _ __  ___ _  ___  _ __') +
  chalk.red('\n     -__++++++') +chalk.white('|_|') + chalk.red('++++++__-') + chalk.white('            / _ \\ \\/ / __/ _ \\ \'_ \\/ __| |/ _ \\| \'_ \\') +
  chalk.red('\n        --_+++++++++_--') + chalk.white('              |  __/>  <| ||  __/ | | \\__ \\ | (_) | | | |') +
  chalk.red('\n           ---___---') + chalk.white('                  \\___/_/\\_\\\\__\\___|_| |_|___/_|\\___/|_| |_|');

  console.log(welcome);
  console.log("\n I provide an integrated development, build, and test environment for creating Compass extensions. For more information on this generator, see https://github.com/Team-Sass/generator-compass-extension. For more information on Compass extensions, see http://compass-style.org/help/tutorials/extensions/.\n");

    var prompts = [
      {
        name: 'extName',
        message: 'The name of your Compass extension. (Required)',
        default: '',
        validate: function (input) {
          try {
            check(input).notEmpty();
          }
          catch (err) {
            return 'Please enter the name of your Compass extension';
          }
          return true;
        }
      },
      {
        name: 'extURL',
        message: 'Extension homepage (e.g. GitHub repo, personal website, etc…). (Required)',
        default: '',
        validate: function (input) {
          try {
            check(input).isUrl()
          }
          catch (err) {
            return 'Please enter a valid URL';
          }
          return true;
        }
      },
      {
        name: 'authorName',
        message: 'The author of the Compass extension. (Required)',
        validate: function (input) {
          try {
            check(input).notEmpty();
          }
          catch (err) {
            return 'Please enter the name of the author';
          }
          return true;
        }
      },
      {
        name: 'authorEmail',
        message: 'The email address of the author. (Required)',
        default: '',
        validate: function (input) {
          try {
            check(input).isEmail();
          }
          catch (err) {
            return 'Please enter a valid email address';
          }
          return true;
        }
      }
      //,
      // {
      //   name: 'requireJS',
      //   message: 'Would you like to include RequireJS?',
      //   default: true,
      //   warning: 'Yes: RequireJS will be placed into the JavaScript vendor directory.'
      // }
    ];

  if (this.options['git']) {
    prompts.push({
      name: 'ghRepo',
      message: 'Add Origin Git Remote? [ex: git@github.com:Team-Sass/generator-style-prototype] (false)'
    });
  }

  // prompts.push({
  //   name: 'ghDeploy',
  //   message: 'Are you going to deploy to GitHub?',
  //   default: true,
  //   warning: 'You did not specify if you\'re going to deploy to GitHub'
  // });

  this.prompt(prompts, function (props) {

    // manually deal with the response, get back and store the results.
    // we change a bit this way of doing to automatically do this in the self.prompt() method.
    this.extName = props.extName;
    this.extSlug = _s.slugify(this.extName);
    this.extCamelCase = this.extName.replace(/\s+/g, '');
    this.extURL = props.extURL;
    this.authorName = props.authorName;
    this.authorEmail = props.authorEmail;
    this.ghRepo = props.ghRepo;
    // this.devHost = props.devHost;
    // this.devPort = props.devPort;
    // this.requireJS = props.requireJS;
    this.ghDeploy = true;
    // this.ghDeploy = props.ghDeploy;

    this.projectDir = this.extSlug + '/';
    if (this.options['init']) {
      this.projectDir = './';
    }


    cb();
  }.bind(this));
};

AppGenerator.prototype.setup = function setup() {
  this.template('_README.md', this.projectDir + 'README.md');
  this.template('_CONTRIBUTING.md', this.projectDir + 'CONTRIBUTING.md');
}

AppGenerator.prototype.gruntfile = function gruntfile() {
  this.template('_gruntfile.js', this.projectDir + 'Gruntfile.js');
};

AppGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', this.projectDir + 'package.json');
};

AppGenerator.prototype.git = function git() {
  this.copy('gitignore', this.projectDir + '.gitignore');
  this.copy('gitattributes', this.projectDir + '.gitattributes');
};

AppGenerator.prototype.bower = function bower() {
  this.copy('bowerrc', this.projectDir + '.bowerrc');
  this.template('_bower.json', this.projectDir + 'bower.json');
};

AppGenerator.prototype.jshint = function jshint() {
  this.copy('jshintrc', this.projectDir + '.jshintrc');
};

AppGenerator.prototype.csslint = function csslint() {
  this.copy('csslintrc', this.projectDir + '.csslintrc');
};

AppGenerator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', this.projectDir + '.editorconfig');
};



AppGenerator.prototype.app = function app() {
  this.copy('system.json', this.projectDir + '.system.json');
  this.template('_config.yml', this.projectDir + 'config.yml');
  this.copy('config.rb', this.projectDir + 'config.rb');

  this.template('_extension.html', this.projectDir + 'examples/index.html');


  this.template('_extension.scss', this.projectDir + 'sass/_' + this.extSlug + '.scss');
  this.template('example.scss', this.projectDir + 'sass/example.scss');
  this.mkdir(this.projectDir + 'sass/' + this.extSlug);
  this.mkdir(this.projectDir + 'images');
  this.mkdir(this.projectDir + 'images/examples');
  this.mkdir(this.projectDir + 'js');
  this.mkdir(this.projectDir + 'js/examples');
  this.mkdir(this.projectDir + 'fonts');
  this.mkdir(this.projectDir + 'fonts/examples');
  this.mkdir(this.projectDir + 'examples');
};

AppGenerator.prototype.compass = function compass() {
  var today = new Date();
  this.today = today.getFullYear() + '-' + ('0' + (today.getMonth()+1)).slice(-2) + '-' + ('0' + (today.getDate())).slice(-2);

  this.template('_extension.json', this.projectDir + '.extension.json');
  this.copy('extension.gemspec', this.projectDir + '.compass/.template/extension.gemspec');
  this.copy('extension.rb', this.projectDir + '.compass/.template/extension.rb');
  this.template('manifest.rb', this.projectDir + '.compass/templates/project/manifest.rb');
};
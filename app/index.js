'use strict';
var util = require('util');
var path = require('path');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');
var _s = require('underscore.string');
var check = require('validator').check;


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
      console.log("\nI'm all done! If your installs did not finish properly, run ".white + "bundle install & bower install & npm install".yellow + " to finish installation.");
    }
    else {
      var bye = "\n I'm all done! Now run ".white + "bundle install & bower install & npm install".yellow + " to finish installation.";
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
'\n                                __,'.red +
'\n                       ____----+++|'.red + '   _   _  ___'.white +
'\n              _____----++++++++++/'.red + '   | | | |/ _ \\'.white +
'\n          _---+++++++++++++++++++|'.red + '   | |_| | (_) |'.white +
'\n      __--++++++++++++++++++++++/'.red + '     \\__, |\\___/'.white +
'\n    _-+++++++++'.red +'_'.white + '++++++++++++++++|'.red + '      __/ |'.white +
'\n   /++++++'.red +'__'.white + '++'.red + '| |'.white + '++'.red + '__'.white + '++++++++++/'.red + '      |___/'.white +
'\n  |+++++++'.red +'\\ \\'.white + '+'.red + '| |'.white + '+'.red + '/ /'.white + '++++++++++|'.red + '       ___ ___  _ __ ___  _ __   __ _ ___ ___'.white +
'\n |+++++++++'.red +'\\ \\| |/ /'.white + '++++++++++/'.red + '       / __/ _ \\| \'_ ` _ \\| \'_ \\ / _` / __/ __|'.white +
'\n|+++++++'.red +'____\\     /____'.white + '+++++++|'.red + '      | (_| (_) | | | | | | |_) | (_| \\__ \\__ \\'.white +
'\n|++++++'.red +'/_____     _____\\'.white + '+++++/'.red + '        \\___\\___/|_| |_| |_| .__/ \\__,_|___/___/'.white +
'\n |++++++++++'.red +'/     \\'.white + '++++++++++|'.red + '                  _        | |      _'.white +
'\n  |++++++++'.red +'/ /| |\\ \\'.white + '++++++++/'.red + '                  | |       |_|     (_)'.white +
'\n   \\_+++++'.red +'/_/'.white + '+'.red + '| |'.white + '+'.red + '\\_\\'.white + '+++++_-'.red + '           _____  _| |_ ___ _ __  ___ _  ___  _ __'.white +
'\n     -__++++++'.red +'|_|'.white + '++++++__-'.red + '            / _ \\ \\/ / __/ _ \\ \'_ \\/ __| |/ _ \\| \'_ \\'.white +
'\n        --_+++++++++_--'.red + '              |  __/>  <| ||  __/ | | \\__ \\ | (_) | | | |'.white +
'\n           ---___---'.red + '                  \\___/_/\\_\\\\__\\___|_| |_|___/_|\\___/|_| |_|'.white;

  console.log(welcome);
  console.log("\nI provide an integrated development, build, and test environment for creating Compass extensions. For more information on this generator, see https://github.com/Team-Sass/generator-compass-extension. For more information on Compass extensions, see http://compass-style.org/help/tutorials/extensions/.\n");

    var prompts = [
      {
        name: 'extName',
        message: 'The name of the Compass Extension. (Required)',
        default: '',
        warning: 'You did not name the Compass extension.',
        required: true
      },
      {
        name: 'extURL',
        message: 'The homepage for the Compass Extension. (Required)',
        default: '',
        warning: 'You need to include the Extension URL',
        required: true
      },
      {
        name: 'authorName',
        message: 'The author of the Compass Extension. (Required)',
        default: '',
        warning: 'You did not include the author',
        required: true
      },
      {
        name: 'authorEmail',
        message: 'The email address of the author. (Required)',
        default: '',
        warning: 'You did not include the author\'s email address',
        required: true
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
      message: 'Add Origin Git Remote? [ex: git@github.com:Snugug/generator-armadillo] (false)',
      default: '',
      warning: 'You did not include a GitHub Repo.',
      before: function(value) {
        if (value === '') {
          return false;
        }
        else {
          return value;
        }
      }
    });
  }

  // prompts.push({
  //   name: 'ghDeploy',
  //   message: 'Are you going to deploy to GitHub?',
  //   default: true,
  //   warning: 'You did not specify if you\'re going to deploy to GitHub'
  // });

  this.prompt(prompts, function (err, props) {

    if (err) {
      return this.emit('error', err);
    }

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

// AppGenerator.prototype.bower = function bower() {
//   this.copy('bowerrc', this.projectDir + '.bowerrc');
//   this.template('_bower.json', this.projectDir + 'bower.json');
// };

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
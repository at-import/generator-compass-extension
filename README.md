```
                                __,
                       ____----+++|   _   _  ___
              _____----++++++++++/   | | | |/ _ \
          _---+++++++++++++++++++|   | |_| | (_) |
      __--++++++++++++++++++++++/     \__, |\___/
    _-+++++++++_++++++++++++++++|      __/ |
   /++++++__++| |++__++++++++++/      |___/
  |+++++++\ \+| |+/ /++++++++++|       ___ ___  _ __ ___  _ __   __ _ ___ ___
 |+++++++++\ \| |/ /++++++++++/       / __/ _ \| '_ ` _ \| '_ \ / _` / __/ __|
|+++++++____\     /____+++++++|      | (_| (_) | | | | | | |_) | (_| \__ \__ \
|++++++/_____     _____\+++++/        \___\___/|_| |_| |_| .__/ \__,_|___/___/
 |++++++++++/     \++++++++++|                  _        | |      _
  |++++++++/ /| |\ \++++++++/                  | |       |_|     (_)
   \_+++++/_/+| |+\_\+++++_-           _____  _| |_ ___ _ __  ___ _  ___  _ __
     -__++++++|_|++++++__-            / _ \ \/ / __/ _ \ '_ \/ __| |/ _ \| '_ \
        --_+++++++++_--              |  __/>  <| ||  __/ | | \__ \ | (_) | | | |
           ---___---                  \___/_/\_\\__\___|_| |_|___/_|\___/|_| |_|
```
A [Yeoman](http://yeoman.io/) Generator for creating an integrate development, build, and test environment for creating [Compass Extensions](http://compass-style.org/help/tutorials/extensions/).


## Currently Available

* Build a Compass extension in the `sass` repository
* Test it with `example.scss` and by running `grunt server`
  * Include `--launch` to launch a local server to test
  * Change `server:hostname` in `config.yml` to `'*'` to access development server from any computer on your local network, remote debugging included.
* Build your extension using `grunt extension` (will probably change to `build` later)
* Includes a basic project with all files from example's JS and Images

## Rolling a Release

When you're ready to roll a release, commit all of your changes and using [SEMVER](http://semver.org/) and [`grunt bump`](https://github.com/vojtajina/grunt-bump), increase your version number. Once your version number is bumped and committed, run `grunt extension` to build your compass extension. It will create `extension.gem` in your project directory. To push that up to [RubyGems](http://rubygems.org/), run `gem push extension.gem`.

## Planned

* Bower integration
* Generator for templates, plus support for multiple templates
* Ruby support
* Test suite

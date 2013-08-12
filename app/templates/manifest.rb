description "<%= extName %>"

skip_compilation!

discover :javascripts
discover :images
discover :fonts

# file 'Gemfile.txt', :to => 'Gemfile'
file 'editorconfig.txt', :to => '.editorconfig'
file 'jshintrc.txt', :to => '.jshintrc'
file 'csslintrc.txt', :to => '.csslintrc'

help %Q{
  Please contact <%= authorName %> with questions:

    <%= authorEmail %>
}

welcome_message %Q{

 <%= extName %>

 The awesome template for <%= extName %>.

 To use the <%= extName %>, include the following at the top of your Sass file:

 @import "<%= extSlug %>";

}
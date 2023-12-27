# Gulp assembly for HTML coding

### Designed for
   + html coding
       with htmlinclude end css (less/sass)
   + development of WP themes and plagins
   + js 
       all js files are compiled into the main file 
          for frontend  app.main.min.js
          for backend  (example admin panel WP)  admin.main.min.js
       for this file of js scripts must be imported into the main file 
          for frontend  assets/js/app.js
          for backend  (example admin panel WP)  plugin/assets/js/admin.js 

## Describing
   #### htmlcoding:
      Final files are moved to the 'docs' folder so that your sites can be exhibited on GitHub Pages
   #### Wordpres development:
      Final files of theme are moved to the 'my_thyeme_name' folder. 
      Final files of core-plagin are moved to the 'plugins/prod-Plugin-Name' folder
   #### Fast create archive your project
      Just enter in command line one command and an archive your project will be created in root folder
         zipHtml - all files from folder 'docs'
         zipWP - only tamplate files from root folder 
         zipPL - only plugin`s files from src plugin's folder 
         zipWPPL - tamplate files and plugin`s files
   #### Fast deploy on ftp
       Just enter in command line one command and download to ftp will start
         ftpHtml - all files from folder 'docs'
         ftpWP - only tamplate files from root folder to `htdocs/wp-content/themes/${this.ThemeName}`
         ftpPL - only plugin`s files from src plugin's folder to `htdocs/wp-content/plugins/${prodPluginName}`
         ftpWPPL - tamplate files and plugin`s files



# Struckture project
>  plugins   
>>  core-plugin   
      
> themes   
>> my_theme_name   
>>>  .gitignore   
>>>  docs   
>>>  app   
>>>>  src   

>>>>>>  html  
>>>>>>>  index.html  
>>>>>>>  template-parts    
>>>>>>>>  parts   
>>>>>>>>  components 

>>>>>  index.php   
>>>>>  functions.php   
>>>>>  header.php   
>>>>>  footer.php   
>>>>>  screenshot.png   
>>>>>  readme.txt   
>>>>>  style.css   
>>>>>  _and another wordpress theme files_   
>>>>>  template-parts   
>>>>>>  parts   
>>>>>>  components  

>>>>>  core-plugin for wordpress theme   
>>>>>>  html_parts   
>>>>>>  assets   
>>>>>>>  img   
>>>>>>>  js   
>>>>>>>>  admin.main.min.js   
      
>>>>>>>  styles   
>>>>>>>>  mainstyle.min.css   
   
>>>>>  assets   
>>>>>>  fonts   
>>>>>>  img   
>>>>>>>  svgicons   
>>>>>>>  icons   
   
>>>>>>  js   
>>>>>>>  libs   
   
>>>>>>>  moduls   
>>>>>>>>  isWebp.js   
>>>>>>>  app.main.js   
   
>>>>>>  styles   
>>>>>>>  parts   
>>>>>>>  components   
>>>>>>>  fonts.less   
>>>>>>>  main-style.less   
>>>>>>>  mixins.less   
>>>>>>>  reset.css   
>>>>>>>  smart-grid.less   
>>>>>>>  variables.less   
      
>>>>>  inc   
>>>>>>  functions   
>>>>>>  widgets   
      
>>>>  gulp   
>>>>  node_modules   
>>>>  gulpfile.babel.js   
>>>>  package.json   
>>>>  .gitignore   
   
>>>>>  config   
>>>>>>  ftp_config.js   
>>>>>>  grid_config.js   
>>>>>>  path.js   
>>>>>>  plugins.js   
      
>>>>>  tasks   
>>>>>>  php.js   
>>>>>>  html.js   
>>>>>>  styles.js   
>>>>>>  js.js   
>>>>>>  images.js   
>>>>>>  reset_wpPlugin.js   
>>>>>>  reset.js   
>>>>>>  server.js   
>>>>>>  copy.js   
>>>>>>  fonts.js   
>>>>>>  svgsprite.js   
>>>>>>  grid.js   
>>>>>>  ftp.js   
>>>>>>  zip.js   
   
   

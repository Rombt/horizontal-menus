# Gulp assembly for HTML coding
It is based on [Фрілансер по життю](https://youtu.be/jU88mLuLWlk)

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
      Final files of theme are moved to the 'my_thyemename' folder. 
      Final files of core-plagin are moved to the 'plugins/core-plugin' folder


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
   
   

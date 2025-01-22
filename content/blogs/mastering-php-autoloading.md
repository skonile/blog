---
title: "Mastering PHP Autoloading: Streamline Class Loading in Your Projects"
date: 2023-06-14T15:25:00+02:00
tags: ["All", "PHP", "Programming"]
categories: ["All", "Programming"]
author: "Siyabonga Konile"
blogImage: "php-code.jpg"
draft: false
---

Autoloading is the process of loading required classes without having to add the 
{{< codeinline "php" "require" >}} or {{< codeinline "php" "include" >}} statements.
In most cases the standard that is followed is that each class is defined in its own 
file and without autoloading you will have to require each class and use the {{< codeinline "php" "use" >}} 
statement for you to be able to use that class without having append a the its namespace to use it. 

PHP autolaoding cut this two step process in half and leaves you with only having to use the {{< codeinline "php" "use" >}} 
to import a class into your code. Autoloading can be beneficiary in that you won't have to include/require a class to use it and it also promotes things like code organisation since you will have follow a standard for example psr-4.

By following autoloading standards and adopting tools like Composer, which provides a convenient autoloader, you can achieve better interoperability and collaboration with other PHP projects and developers. Consistent autoloading practices ensure that your code can easily integrate with third-party libraries and frameworks, facilitating code sharing and enhancing the overall PHP ecosystem.

### How does PHP autoloading work?
The autoloading process is triggered when a class that is not defined is used in your code. That could mean that when the class is not defined in your project or when you have not included the file that contains the class being used. Tools like composer and other frameworks use these triggers implement their own autoloaders.

PHP have a function called {{< codeinline "php" "spl_autoload_register" >}} which takes in a callback function/method as its argument. The callback method is responsible for how the classes should be included/required. The {{< codeinline "php" "spl_autoload_register" >}} function can be called multiple times and can register multiple function/methods that define the autolaoding logic and when the autolaoding process is triggered the it will iterate through the registered autoloading callbacks.

The callback should have a single parameter and that will contain the fully qualified name of the class being autoloaded. 


### Composer Autolaoding
Composer is the most popular PHP package manager and it supports autolaoding out of the box. Composer autolaoding uses the PHP defined way of autolaoding and follows the classmap, psr-0 ,and psr-4 standard to keep things organised and to make sure that the its autoloader is compitable with most projects. 

To use the composer autoloader you will need to inialize composer in your project and you can do that by running this command in you base project directory {{< codeinline "bash" "composer init">}} to initialize a PHP project and create the composer.json file which you will use to configure autoloading. 

To configure autoloading you will have to decide which standard you are going to follow for your autoloading and add it to the config file. Add the autoload definition that will contain the standard you will follow and define your base directory and what the it's namespace will be. In the example bellow we are telling composer that we want to use psr-4 and every file user the 'src' directory will have the 'MyApp' namespace.

{{< codesnippet "javascript" >}}
{
    "autoload": {
        "psr-4": {
            "MyApp\\": "src/"
        }
    }
}
{{< /codesnippet >}}


### How to create your own autoloader
Maybe you are like me and you like to know how things work maybe even create your own mini versions for better understanding. We will be creating a simple autoloader that follows the psr-4 standard which states that to be able to load your classes your namespaces must follow your directory structures and you namespaces and classes should be case-sensitive. You can read more about this standard on the PHP-FIG website [here](http://localhost:1313/blog/).

Let's start by creating a file with the name autoload.php in our root directory and populate it with the autoloading function and register the triggers. In the end this is what the final code will look like, you can try to understand before reading my explaination.

{{< codesnippet "php" >}}
&lt;?php
spl_autoload_register(function($class){
    $nsPrefix  = 'App\\';
    $baseDir = __DIR__ . '/app/';

    $pathToFile = str_replace($nsPrefix, $baseDir, $class) . '.php';
    if(file_exists($pathToFile)){
        require $pathToFile;
    } 
});

{{< /codesnippet >}}

The first two variables are the namespace prefix for our fully qualified class name and the base base directory for any class name that have the namespace prefix. so now all we have to do is to replace the namespace prefix with the base directory and add the php file extension and voilà we have a full a path to our class all we need is to check if it exists and require it if it does.

Psr-4 does not allow the raising of exceptions, errors, or returning of a value and our code does not do any of that.

It ay seem as if composer is doing some magic tricks to include files in your current code but its not and the autoloading process is easy to implement. Don't get me wrong I am not saying that composer is using a simple code like mine, no. Composer is a complex software and so is it's autoloader but the basics of autoloading are as simple as the example above.
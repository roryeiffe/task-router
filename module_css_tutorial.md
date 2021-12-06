## The Issue
The issue that we were facing is that some of our css stylings were getting mixed up (ex: AJ's CSS were being applied to Rory's pages and vice versa). 

## The solution
A potential solution is to use files that end with '.module.css' instead of just '.css'. From what I know, the .module.css prevents styling mix-ups by adding a random string to the end of the class names. For example, a wrapper class could be named "wrapper_qsdqw" for one component and "wrapper_tkmhl" for another. Thus, the class names are different and would not cause any overlap to occur. 

## How to
Using module.css files isn't too bad, but it has some weird quirks. First, you will want to create a module.css file. this can be any file that ends with the extension .module.css. (Alternatively, if you already have a .css file, you can just change the extension)
For example, we can create a file called "style.module.css" and put regular css code inside:
```
.wrapper {
    background: green;
}
```
Then, we need to import it to an HTML file. At the top of the file should look something like this:
```
import styles from './style.module.css';
```
Change the path so that it matches where the css file is being stored. 
To user the styling, we can do something along these lines:
```
<div className = {style.wrapper}>
    <p>HTML content</p>
</div>
```
When this page is loaded, the div should contain a green background (or whatever you defined in your css file). Furthermore, we can use the wrapper class in another module.css file without fear of overlap!
## Some Quirks to look out for
### Changing Names of Classes
One of the hassles of using module.css files is that we can't have any className that contains a hyphen (there may be other characters but I can't remember right now). 
So, you can do something like 'btnSubmit' instead of btn-submit'. Not too bad, just something to look out for. 
### No more tags :(
Another drawback of using these types of files is using css like:
```
p {
    font-size: 100px;
}
```
might not work the way you want it to. 
Since there is no className associated with the p-tag, this css will be applied to every p tag on the website!
To fix this, you can create a div wrapper:
```
<div className = "wrapper">
    <p>Big Text</p>
</div>
```
and update the styling:
```
.wrapper p{
    font-size: 100px;
}
```
Thus, only p tags which appear in that wrapper class (and in that component) will have that styling. 
### Multiple Classes:
One last thing I want to mention is how to use multiple classes when using style.module.css. Normally, to use multiple classes, we separate the class names by a space:
```
<div className = "btn btn-primary">
```
However, we run into the issue of combining classes that are associated with the styles object, with "regular" classes. 
Here is how can we do both:
```
<div className = `${styles.wrapper} btn btn-primary`>
```
We use the template strings to put our style classes along with the default bootstrap classes. Also, this is just one way of doing it. As long as we have spaces between the different classNames, it should work. 


# Simmer


#### Video Demo: https://youtu.be/ZrTUWk8IF4A?si=cMhrdF5QQfon0qFa

Simmer is a web-based application that allows the user to record their own recipes and view others. There is
Search functionality built in to filter recipes by title name or ingredients. This project is to be used for my
CS50X Final Project


## Tech Used

To make this project I used Python, Javascript, HTML, CSS, Bootstrap, Django, SQLITE3, Git

Python dependencies can be found in the requirements.txt file

## Files in the project

For this project I have writted Python scripts, Javascript scripts, html and css files.


## Features and their implementation


**User authentication and registering**


To handle the user account features such as registering, login/out and account deletion I used
Django's inbuilt accounts form and models. I integrated these into the web app by applying my custom
css and using database queries to handle account-specific actions such as recipe deletion (which can only
be done by using the recipe's registered creator account or manually by an admin modifying the database).


**Recipe Creation**


Recipe creation is handled through a custom HTML form which relies on javascript to dynamically generate content as the form is being completed. Client-side validation is in place to stop the user from creating errors such as putting a non-numerical digit in the ingredient quantity column.


Both the "instructions" and the "ingredients" fields are generated using Javascript. As the button for each instruction is pressed the text above is put into a newly generated template along with a hidden input field associated with that which will be validated in the backend once the form is submitted. This code can be found in "recipes/static/recipes/js/create.js".


Once the user has submitted the form it is then validated on the backend in my Django recipes/views.py file.
If there is an incorrect input or if any of the necessary fields are blank the user will be redirected back to the form which will be prepopulated with all their previous responses and an error alert will be triggered.
To regenerate the previously mentioned lists I modified the function which handles this to accept the previous form data as an argument and regenerate the boxes in order if the form needs to be repopulated.  


If all validation checks are passed upon submission the data will be entered into the custom-made relational database.


**View Recipes**


The recipes are displayed using Bootstrap's card system customised to suit the needs of the app. Once a card is clicked on you are redirected to that recipes page which recalls the database information in a readable format. You can change the 'serves' amount and the webpage will dynamically update the quantities of ingredients needed to create that recipe for that amount of people. If you are logged in to the account which created the recipe a delete recipe option will appear below. This is verified on the back-end so you cannot delete a recipe made by another user.


**Ingredient Search**


This tab allows you to search through all recipes using keywords found in either their titles or ingredients list. The javascript in 'filter.js' uses AJAX to query the database and update the page in real-time with a small delay built in to avoid overloading the server with database queries.

**Inspire Me**

The Inspire Me button links to the view of a random recipe by any user

**Account**

The account tab allows the user to change their password or permanently delete their account

## What I've learnt


This project has taught me many lessons and developed all I've learnt while completing CS50X. Coming from solving problem sets to managing an entire project's development was a big leap but I am now much more confident in my ability to learn new technologies and creatively solve problems at a project level.


I have also learnt the value of version control using Git and Git Hub for this project. During development, I introduced a few project-breaking bugs but using version control and being methodical with my workflow I was able to isolate these bugs and continue work on the project.

One issue I encountered regularly was feature creep which slowly added more and more work to the project and as I got further in, the scope of the project continued to grow. By the end, I was setting more reasonable expectations and making sure I implemented the current tasks before considering new features.

### Final Notes

Thank you to the CS50 team for making such a valuable piece of education available for free!






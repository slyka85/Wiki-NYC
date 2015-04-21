#WIKI NYC

###FEATURES:
* * *
Once connected, a user sees a **WELCOME** page
- From there a user can **REGISTER** by creating a new profile that consists of:
  - username
  - email address
  - full name
  - profile image

![register](http://i.imgur.com/l8PsYy8.png)


- Once registered, a user is able to create an article by clicking on a **ADD NEW ARTICLE** button. The user is being redirected to a page with a form for a new article. A user should choose his username from a dropdown menu, category for the article and date. Then fill out the title, content fields and link to an image to be displayed within the article. And hit submit.

![new](http://i.imgur.com/E4NxoAA.png)

Once submitted, a user will be redirected to a list of all articles.
- From there a user can view all the articles information, such as:
 - category
 - username created the article
 - date of creation/last update
 - content
- Or, edit a particular article by clicking on **EDIT ARTICLE** button.

![edit](http://i.imgur.com/gmdiCrt.png)

- On edit article page, a user can modify content, date, title or image. Click **UPDATE** to save changes. If an article is outdated or inaccurate, a user can **DELETE ** it.
![edit](http://i.imgur.com/KKoI2mM.png)

- A user can filter articles by an author's name. On main page, choose a name of an author from a dropdown menu and hit **SEARCH** to be redirected to articles page filtered.
![filter](http://i.imgur.com/qZj7I2w.png)

- A user can search articles by its category (feature is currently under construction)


###ROUTES
* * *

![routes](http://i.imgur.com/pn0oeBo.png)
* * *
###WIREFRAMES
* * *
![welcome](http://i.imgur.com/reYbi9l.png)


***FEATURES:***

Once on the homepage, a user can choose the next steps:
- If a user chose to create/add a new article:

![new](http://i.imgur.com/xabsHLZ.jpg)
- If a user clicked on view/edit or delete

 ![view](http://i.imgur.com/B2TTkWo.jpg)

 - If a user clicks on a particular article, the following page comes up
 ![articleID](http://i.imgur.com/2DI9F5e.jpg)

- if clicked the "Delete an article" button, the user will be redirected to the page with the list of all articles

- edit the article page. if a user clicked on edit an article, he can also add a category
![edit](http://i.imgur.com/fV8DpIw.jpg)


- if a user clicked on "add author" button
![authorsNew](http://i.imgur.com/sL5N7N4.jpg)

- if a user clicks to see all authors
![authors](http://i.imgur.com/dRxW5rk.jpg)


- if a user clicks on a particular author's name to see his/her profile and all articles by the author
![authorsID](http://i.imgur.com/O8xnTbv.jpg)

- to edit an author' profile page
![authorsIdEdit](http://i.imgur.com/Tsnmcvt.jpg)
The user will be redirected to "/authors/:ID"
* * *
##ERD
![articles](http://i.imgur.com/EtT68mj.png)

![authors](http://i.imgur.com/SclykLa.png)


Pending features:
- owner of an article should receive email when it's been edited
- add a category
?
template for creating a new article?
authors_id??? through the username??
request?
categories?
add stuff to a drop down menu?

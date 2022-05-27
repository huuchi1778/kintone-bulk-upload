# kintone: Bulk Upload Customization
# Table of Contents
- [Overview](#overview)
- [How to build](#how-to-build)
- [Usage](#usage)
- [Browser support](#browser-support)
- [Limitations](#limitations)
# Overview
This customization allows users to upload a file into multiple records with just a few steps.
# How to build
You can clone this repository to your local machine by running this command:
```
git clone https://github.com/huuchi1778/kintone-bulk-upload.git
```
Once this repository is cloned into your machine, there will be the ```bundle.min.js``` file in the ```dist``` folder. You can use this file to import to your app.<br>
If you choose to modify the source code, you will need to install the neccessary depenecies to rebuild the ```bundle.min.js``` file by running this command:
```
npm install
```
To compile and bundle the source code, run this command:
```
npm run webpack:build
```
The output is ```bundle.min.js``` which is bundled and minified located in the ```dist``` folder.
# Usage
## Setting up fieldcodes 
This customization is designed for an app with 3 user-created fields with these specified fieldcodes: ```firstName```, ```lastName```, ```attached_file``` <br>
The customization will not run if the fields for first name, last name and the attachment don't have the correct fieldcodes. <br>
## Setting your list view's filters
The bulk upload script will obtain the records shown in you list view. Setting different filters in your list view will also affect what will be shown in the dialog.
## Importing script into app
Go to your ```App Settings``` then select ```Javascript and CSS Customization``` <br>
Under the heading ```Upload Javascript for PC```, click ```Add File``` and select the ```bundle.min.js```

# Browser support
- Chrome PC

# Limitation
- The maximum number of records can be shown in the dialog is 100; therefore, it is important that you set the approriate filters so the records you want to upload to are shown in the list view which are then shown in the bulk upload dialog.
- The maximum number of records you can upload to is 100 at a time. 















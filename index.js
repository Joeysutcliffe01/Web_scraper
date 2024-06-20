// Import the required modules
const axios = require("axios");      // Axios is used for making HTTP requests
const cheerio = require("cheerio");  // Cheerio is used for parsing HTML
const express = require("express");  // Express is used to set up a web server

// Define the port the server will run on
const PORT = 4000;

const app = express(); // Initialize the Express app

// Define the URLs to be scraped
const url1 = "https://www.joeysutcliffe.com/index.html";
const url2 = "https://www.linkedin.com/in/joseph-sutcliffe-01/";

// Make an HTTP GET request to the first URL using Axios
axios(url1).then(res => {
    // Store the HTML response in a variable
    const html = res.data;
    
    // Load the HTML into Cheerio for parsing
    const $ = cheerio.load(html);
    
    // Initialize an empty array to store the extracted information
    const info = [];

    // Extract text from all elements with the class "projects__right-h1"
    $(".projects__right-h1", html).each(function(){
        const h1 = $(this).text(); // Get the text content of the element
        info.push({ h1 });         // Add the text to the info array
    });

    // Extract text from all elements with the class "projects__right-p"
    $(".projects__right-p", html).each(function(){
        const p = $(this).text(); // Get the text content of the element
        info.push({ p });         // Add the text to the info array
    });

    // Extract links from all elements with the class "projects__right"
    $(".projects__right", html).each(function(){
        const links = $(this).find("a").attr("href"); // Get the href attribute of the first link found
        info.push({ links });                         // Add the link to the info array
    });

    // Log the extracted information to the console
    console.log(info);
}).catch(err => console.log(err)); // Log any errors that occur during the request

// Start the Express server and listen on the specified port
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

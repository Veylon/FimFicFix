// ==UserScript==
// @name         Hide unwanted FimFic Stories
// @namespace    http://tampermonkey.net/
// @version      1.0.2
// @description  Remove stories with specified tags
// @author       Veylon
// @grant        none
// @include      https://www.fimfiction.net/*
// @run-at document-idle
// ==/UserScript==

function getStoryTags(data_tag_string)
{
    // Return all anchor tags that have a data-tag-id member
    // This should select all genre, series, content, and character tags
    let tags = document.querySelectorAll("a.tag-genre[data-tag=" + data_tag_string + "], a.tag-series[data-tag=" + data_tag_string + "], a.tag-character[data-tag=" + data_tag_string + "], a.tag-warning[data-tag=" + data_tag_string + "], a.tag-content[data-tag=" + data_tag_string + "]");
//    tags += document.querySelectorAll("a.tag-series[data-tag=" + data_tag_string + "]");
//    tags += document.querySelectorAll("a.tag-character[data-tag=" + data_tag_string + "]");
    return tags;
}

function removeArrowTag(title)
{
    // Get the featured story arrows
    let arrows = document.querySelectorAll("div.arrow");
    // Go through them
    for (let i = 0; i < arrows.length; i++) {
        // Get the arrow's parent
        let par = arrows[i].parentNode;
        // There's an extra arrow used in the navigation bar
        // This is to avoid it
        if(par.hasAttribute("data-story"))
        {
            // Check if the arrow matches the story's title
            if(par.textContent == title)
            {
                // Remove it in an ugly manner and exit
                arrows[i].parentNode.parentNode.removeChild(arrows[i].parentNode);
                return;
            }
        }
    }
    // Notify if the story has no arrow. Not all do.
    console.log("Info: No Arrow for " + title);
}

function getTitle(node)
{
    // Different story containers are organized differently
    if(node.className == "featured_story")
    {
        let title = node.querySelectorAll("div.title a")[0];
        return title.innerText;
    }
    else if(node.className == "story-card-container")
    {
        let title = node.querySelectorAll("a.story_link")[0];
        return title.innerText;
    }
    else
    {
        console.log("Error: Unknown type \'" + node.className + "\'");
        return null;
    }

}

function getTagName(string)
{
    let tags = document.querySelectorAll("a.tag-genre, a.tag-series, a.tag-character, a.tag-warning, a.tag-content");
    for (let i = 0; i < tags.length; i++) {
//        console.log(tags[i]);
        if(tags[i].innerText == string) {
            return tags[i].getAttribute("data-tag");
        }
    }
    // If no tag found
    console.log("Warning: No tag with text \'" + string + "\' found");
    return null;
}

function removeParentStoryAndArrow(node)
{
    let parent = node;
    while(parent != null && parent.getAttribute("class") != "featured_story" && parent.getAttribute("class") != "story-card-container")
    {
        parent = parent.parentNode;
    }
    if(parent != null)
    {
        // Get the Title of the story
        let title = getTitle(parent);
        console.log("Info: Removing Story \'" + title + "\'");
        // Use the Title to find the related tab in the featured stories and remove it
        removeArrowTag(title);
        // Find the <li> tag around the story container
        let list = parent.parentNode;
        // Remove the story container
        list.removeChild(parent);
        // Also remove the List Node if it is empty. This prevents blank spaces in the grid layout
        if(!list.hasChildNodes()) list.parentNode.removeChild(list);
    }
    else
    {
        console.log("Error: Null Parent for tag" + node);
    }
}

function removeStoriesWithTextInDescription(text)
{
    console.log("Info: Removing stories with text \'" + text + "\' in the description");
    // Get all story descriptions
     let descs = document.querySelectorAll("span.short_description");
    // Go through them
     for (let i = 0; i < descs.length; i++) {
         // Remove story if description has forbidden word
         // This needs work!
         if(descs[i].textContent.toLowerCase().indexOf(text.toLowerCase()) >= 0)
         {
             removeParentStoryAndArrow(descs[i]);
         }
     }
}

function removeStoriesWithTag(name)
{
    // Find the internal tag name
    let tag = getTagName(name);
    // Exit early if no tags of this name exist
    if(tag == null) return;
    // Find all the tags matching the tag name
    let tags = getStoryTags(tag);
    console.log("Info: Removing Stories with tag " + tag + ", " + tags.length + " found");
    // Go through them all
     for (let i = 0; i < tags.length; i++) {
         removeParentStoryAndArrow(tags[i]);
     }
}

function HidePopularStories(doit)
{
    // Do we do it? If not, quit
    if(doit == false) return;
    // Find the "Popular Stories" div
    let tags = document.querySelectorAll("div.front_page_right_column > div[data-tab=popular]");
    // Make sure it is found and has a parent. Otherwise, quite
    if(tags.length == 0) return;
    if(tags[0].parentNode == null) return;
    // Delete it from the parent
    tags[0].parentNode.removeChild(tags[0]);
}


(function() {
    'use strict';
    // Use this to remove the "Popular Stories" section from front page
    HidePopularStories();
    // Use this to remove stories with certain tags
    removeStoriesWithTag("Porn");
    // Use this to remove stories with certain text in the description
    removeStoriesWithTextInDescription("Lavender Unicorn");
    // Use multiple lines for multiple tags or text strings
})();
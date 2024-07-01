/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const navbarList = document.getElementById("navbar__list");
const listItems = navbarList.childNodes;
const sections = document.getElementsByTagName("section");


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
// this function is to extract a number from a string
function extractNumber(str) {
    // ch:character
    let arr = str.split("").reduce((result, ch) => {
        // if the character is not a number keep result as it is
        if (isNaN(parseInt(ch))) {
            return result;
        }
        // if the character is a number add it to result
        else {
            return result + ch;
        }
    }, "");
    return arr;
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNav() {
    // put the nav items in a fragment for better performance
    let frag = document.createDocumentFragment();

    for (const section of sections) {
        let li = document.createElement("li");
        li.innerHTML = `<a class="menu__link">${section.dataset.nav}</a>`
        frag.appendChild(li);
    }
    // add active-nav class to the a element in the first li item
    frag.firstElementChild.firstElementChild.classList.add("active-nav");
    // append the fragment to the ul
    navbarList.appendChild(frag);
}

// Add class 'active' to section when near top of viewport
function makeActive() {
    for (let i=0;i<sections.length;i++) {
        const box = sections[i].getBoundingClientRect();
        const VALUE = 150;
        // the boundries the section should be between to be considered as active
        if (box.top <= VALUE && box.bottom >= VALUE) {
            // add active class from the active section
            sections[i].classList.add("active-section");
            // add active class for the active a in the li 
            listItems[i].firstElementChild.classList.add("active-nav");
        } else {
            // remove active class from the inactive section
            sections[i].classList.remove("active-section");

            // remove active class for the inactive a in the li 
            listItems[i].firstElementChild.classList.remove("active-nav");
        }
    }
}

// Scroll to anchor ID using scrollTO event
function scroll(e) {
    const { target } = e;
    const id = extractNumber(target.innerHTML);
    const section = document.querySelector(`#section${id}`);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu 
buildNav();
// Scroll to section on link click
navbarList.addEventListener("click", scroll);

// Set sections as active
document.addEventListener("scroll", makeActive);


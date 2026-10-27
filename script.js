
/*Gallery filters*/
const filterButtons = document.querySelectorAll(".filter-btn");
const artCards = document.querySelectorAll(".art-card");

filterButtons.forEach(function(button){
    button.addEventListener("click", function(){
        //get the selected category and update active button
        const selectedFilter = button.dataset.filter;

        filterButtons.forEach(function(btn){
            btn.classList.remove("active");
        });
        button.classList.add("active");

        //show and hide artwork cards
        artCards.forEach(function(card){

            const category = card.dataset.category;
            if(selectedFilter==="all" || selectedFilter=== category){
                card.hidden = false;

            }
            else{
                card.hidden = true;
            }
        });

    });
});

/* Artwork viewer*/

const artViewer = document.getElementById("art-viewer");
const viewerImage = document.getElementById("viewer-image");
const viewerTitle = document.getElementById("viewer-title");
const viewerCategory = document.getElementById("viewer-category");
const closeViewerButton = document.getElementById("close-viewer");

let previouslyFocusedElement = null;
function openArtworkViewer(card){

    const image = card.querySelector("img");
    const title = card.querySelector("h3");
    const category = card.querySelector(".art-info p");

    if(!image || !title || !category){
        return;
    }
    previouslyFocusedElement = document.activeElement;
    viewerImage.src = image.src;
    viewerImage.alt = image.alt;

    viewerTitle.textContent = title.textContent;
    viewerCategory.textContent = category.textContent;

    artViewer.hidden = false;
    artViewer.setAttribute("aria-hidden", "false");

    document.body.classList.add("viewer-open");
    closeViewerButton.focus();

}

function closeArtworkViewer(){
    artViewer.hidden = true;
    artViewer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("viewer-open");

    viewerImage.src = "";
    if(previouslyFocusedElement){
        previouslyFocusedElement.focus();

    }
}

//open viewer when an artwork is clicked

artCards.forEach(function(card){
    const image = card.querySelector("img");
    if(image){
        image.addEventListener("click", function(){
            openArtworkViewer(card);

        });

    }
});
//close button
closeViewerButton.addEventListener("click", closeArtworkViewer);

//close when clicking the dark background
artViewer.addEventListener("click", function(event){
    if(event.target=== artViewer){
        closeArtworkViewer();
    }
});

//keyboard support
document.addEventListener("keydown", function(event){
    if(artViewer.hidden){
        return;
    }
    if(event.key === "Escape"){
        closeArtworkViewer();

    }
});

/* responsive navigation menu*/

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

console.log("Menu button:", menuToggle);
console.log("Navigation links", navLinks);

//open and close the menu

menuToggle.addEventListener("click", function(){
    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";

});

//close the menu after clicking a navigation link

navLinks.querySelectorAll("a").forEach(function(link){
    link.addEventListener("click", function(){
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.textContent = "☰";
    });

});

//close the menu when pressing Escape
document.addEventListener("keydown", function(event){
    if(event.key==="Escape"){
        navLinks.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.textContent= "☰";

    }
});

/*auto year change*/

const yearElement =  document.getElementById("current-year");

if (yearElement){
    yearElement.textContent = new Date().getFullYear();
}
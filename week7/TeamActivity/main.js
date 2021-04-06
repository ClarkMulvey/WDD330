import {
    Hike
} from './hike.js';
import {
    Comment
} from './comment.js';


const hike1 = new Hike(
    1,
    'Bechler Falls',
    '3 miles',
    'Easy',
    'Beautiful short hike along the Bechler river to Bechler Falls',
    'Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road.Drive to the end of the Cave Falls road. There is a parking area at the trailhead.'
);


const hike2 = new Hike(
    2,
    'Teton Canyon',
    '3 miles',
    'Easy',
    'Beautiful short (or long) hike through Teton Canyon.',
    'Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Staline Raod for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead.'
);

const hike3 = new Hike(
    3,
    "Denanda Falls",
    "7 miles",
    "Moderate",
    "Beautiful hike through Bechler meadows river to Denanda Falls",
    "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead."
);

const hikeList = [];
hikeList.push(hike1, hike2, hike3);
let commentList = [];
let currentHike = "";

getCommentListFromLocalStorage(commentList);
setCommentsOnHikes(commentList, hikeList);

function saveCommentsToLocalStorage(commentList) {
    localStorage.setItem('commentList', JSON.stringify(commentList));
}

function getCommentListFromLocalStorage(commentList) {
    let data = JSON.parse(localStorage.getItem('commentList'));
    if (data != null) {
        data.forEach(
            comment => {
                comment.__proto__ = Comment.prototype;
                commentList.push(comment);
            }
        )
    }
}

function setCommentsOnHikes(commentList, hikeList) {
    commentList.forEach(
        comment => {
            hikeList.forEach(
                hike => {
                    if (comment.id == hike.id) {
                        hike.comments.push(comment);
                    }
                }
            )
        });
}


const imgBasePath = "//byui-cit.github.io/cit261/examples/";
//on load grab the array and insert it into the page
window.addEventListener("load", () => {
    showHikeList();
});

function renderComments(hike) {
    let commentsDiv = document.getElementById('comments');
    commentsDiv.innerHTML = '';

    if (hike.comments.length != 0) {
        hike.comments.forEach(
            comment => {
                commentsDiv.innerHTML += `
                    <div>
                        <p>${comment.date}</p>
                    </div>
                    <div>
                        <p>${comment.content}</p>
                    </div>`;
            }
        )
    }
}

function showHikeList() {
    const hikeListElement = document.getElementById("hikes");
    hikeListElement.innerHTML = "";
    renderHikeList(hikeList, hikeListElement);
}

function showDetailedHike(hikeList, id, parent) {
    let hikeToDisplay;
    hikeList.forEach(
        hike => {
            if (hike.id == id) {
                hikeToDisplay = hike;
                currentHike = hike;
            }
        }
    );

    if (hikeToDisplay != null) {
        parent.innerHTML = ` <h2>${hikeToDisplay.name}</h2>
        <div class="image"><img src="${imgBasePath}${hikeToDisplay.imgSrc}" alt="${hikeToDisplay.imgAlt}"></div>
        <div>
                <div>
                    <h3>Distance</h3>
                    <p>${hikeToDisplay.distance}</p>
                </div>
                <div>
                    <h3>Difficulty</h3>
                    <p>${hikeToDisplay.difficulty}</p>
                </div>
                <div>
                    <h3>Description</h3>
                    <p>${hikeToDisplay.description}</p>
                </div>
                <div>
                    <h3>Directions</h3>
                    <p>${hikeToDisplay.directions}</p>
                </div>
                <h2>Comments:</h2>
                    <p>Please enter a comment<p>
                    <input type="text" id="commentContent">
                    <input type="button" value="submit" id="commentSubmit">
                <div id="comments">
                    
                </div>
        </div>`;
        renderComments(hikeToDisplay);

        let commentContent = document.querySelector('#commentContent');
        let commentSubmitBtn = document.querySelector('#commentSubmit');
        commentSubmitBtn.addEventListener('click', (event) => {
            if (commentContent.value != "") {
                let newComment = new Comment(currentHike.id, commentContent.value);
                commentList.push(newComment);
                saveCommentsToLocalStorage(commentList);
                currentHike.comments.push(newComment);
                commentContent.value = "";
                renderComments(hikeToDisplay);
            }
        });
    }


}

function renderHikeList(hikes, parent) {
    parent.innerHTML += "Please click a hike for more info:";
    hikes.forEach(hike => {
        parent.appendChild(renderOneHike(hike));
    });

    let hikesTagsList = document.querySelectorAll('li');

    hikesTagsList.forEach(
        hike => {
            hike.addEventListener('click', (event) => {
                parent.innerHTML = "";
                let backToHikesList = document.querySelector('#backToHikesList');
                backToHikesList.innerHTML += "Back to Hikes List";
                backToHikesList.addEventListener('click', () => {
                    showHikeList();
                    backToHikesList.innerHTML = "";
                    currentHike = "";
                });

                showDetailedHike(hikes, hike.id.substr(4), parent);

            })
        }
    )
}

function renderOneHike(hike) {
    const item = document.createElement("li");

    item.innerHTML = ` <h2>${hike.name}</h2>
          <div class="image"><img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
          <div>
                  <div>
                      <h3>Distance</h3>
                      <p>${hike.distance}</p>
                  </div>
                  <div>
                      <h3>Difficulty</h3>
                      <p>${hike.difficulty}</p>
                  </div>
          </div>`;

    item.id = `hike${hike.id}`;
    return item;
}
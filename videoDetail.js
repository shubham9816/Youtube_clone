const menu = document.getElementById("left-menu");
const leftNav = document.getElementById('left-nav');

const key = "AIzaSyBFzUxTYn8vKlhYDtooqLHVCANy4Ao3gOs"
const baseURL = "https://www.googleapis.com/youtube/v3/";
const videoURL = 'videos?part=snippet,contentDetails,statistics';
const channelURL = 'channels?part=snippet,statistics';

function formatNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num;
}

let embedVideo = (videoId) => {
    let iframe = document.createElement('iframe');
    iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}`);
    iframe.setAttribute('width', '960');
    iframe.setAttribute('height', '540');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    iframe.setAttribute('allowfullscreen', '');
    
    document.getElementById('target').appendChild(iframe);
  }
  
  let videoId = window.location.search.split('=')[1]; // replace with your YouTube video ID
  embedVideo(videoId);


  const fetchVideoDetails = async () => {
    const response = await fetch(`${baseURL}${videoURL}&id=${videoId}&key=${key}`);
    const res = await response.json();
    return res;
  };

  const fetchChannelDetail = async (channelId) => {
    const response = await fetch(`${baseURL}${channelURL}&id=${channelId}&key=${key}`);
    const res = await response.json();
    console.log(res);
    return res;
  }
// https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}
  const fetchComments = async() => {
    const response = await fetch(`${baseURL}commentThreads?part=snippet&videoId=${videoId}&key=${key}`);
    const res = await response.json();
    return res;
  }

  document.addEventListener('DOMContentLoaded',async ()=>{
    const {items} = await fetchVideoDetails();
    console.log(items);
    const {items:channel_items} = await fetchChannelDetail(items[0].snippet.channelId);


    // set video details
    const videoDetails = document.getElementById('details');
    videoDetails.innerHTML = `
        <h2>${items[0].snippet.title}</h2>
        <div class="stats">
            <div class="views">
                ${Number(items[0].statistics.viewCount).toLocaleString()} views • ${items[0].snippet.publishedAt.split('T')[0]}
            </div>
            <div class="options">
                <span>
                    <span class="material-symbols-outlined">thumb_up</span>
                    ${formatNumber(items[0].statistics.likeCount)}
                </span>
                <span>
                    <span class="material-symbols-outlined">thumb_down</span>
                    69
                </span>
                <span>
                    <span class="material-symbols-outlined">share</span>
                    SHARE
                </span>
                <span>
                    <span class="material-symbols-outlined">playlist_add</span>
                    SAVE
                </span>
                <span>
                    <span class="material-symbols-outlined">more_horiz</span>
                </span>
            </div>
        </div>
    `;


    //set channel Details
    const channelDetail = document.getElementById("channelDetail");
    channelDetail.innerHTML = `
        <div class='channelInfo'>
            <div class='channelid'>
                <img src='${channel_items[0].snippet.thumbnails.high.url}' class="channelicon"/>
                <div>
                    <p>${channel_items[0].snippet.title}</p>
                    <p>${formatNumber(channel_items[0].statistics.subscriberCount)}</p>
                </div>
            </div>
            <div>
                <button class="subscribe">SUBSCRIBE</button>
            </div>
        </div>
        <div class="videoDescription">
            ${items[0].snippet.description}
        </div>
    `




    //adding comments
    const comments = document.getElementById("comments");
    comments.innerHTML = `
        <div>
            <div class='comment-head'>
                <div>${items[0].statistics.commentCount} Comments</div>
                <div><span class="material-symbols-outlined">
                sort
                </span>Sort By</div>
            </div>
            <div class='comment-list' id="comment-list">

            </div>
        </div>
    `

    const {items:comment_items} = await fetchComments();

    const addComments = document.getElementById("comment-list");
    console.log(comment_items);
    comment_items.forEach(element => {
        const newComment = document.createElement("div");
        newComment.className = "comment";
        const individual = element.snippet.topLevelComment.snippet;
        newComment.innerHTML = `
            <div>
                <img src=${individual.authorProfileImageUrl} class="comment-img"/>
            </div>
            <div class="comment-dis">
                <p>${individual.authorDisplayName}</p>
                <p>${individual.textDisplay}</p>
            </div>
        `
        addComments.appendChild(newComment);
    });


  });

  menu.addEventListener('click',()=>{
    if(leftNav.style.display == 'none' || leftNav.style.display == '') leftNav.style.display = 'flex';
    else leftNav.style.display = 'none';
});


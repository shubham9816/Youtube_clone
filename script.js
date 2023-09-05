
const key = "AIzaSyBFzUxTYn8vKlhYDtooqLHVCANy4Ao3gOs"
const baseURL = "https://www.googleapis.com/youtube/v3";



const menu = document.getElementById("left-menu");
const leftNav = document.getElementById('left-nav');

menu.addEventListener('click',()=>{
    if(leftNav.style.display == 'none' || leftNav.style.display == '') leftNav.style.display = 'flex';
    else leftNav.style.display = 'none';
});


const fetchSearchResult = async (query) =>{
    const response = await fetch(`${baseURL}/search?key=${key}&q=${query}&part=snippet&type=video&maxResults=50`);
    const res = await response.json();

    return res;
}

const search = async(query) => {
    const data = await fetchSearchResult(query);

    render(data);
}


const submitSearch = document.getElementById('submit-search');
const searchText = document.getElementById('search');

searchText.addEventListener('keypress',(e)=>{
    if(e.key === 'Enter')
    {
        search(searchText.value);
    }
})


const render = ({items}) => {
    const target = document.getElementById('target');
    target.innerHTML = "";
    items.forEach(({snippet,id}) => {
        
        const videoBox = document.createElement('a');
        videoBox.href = `videoDetail.html?id=${id.videoId}`
        const channelId=snippet.channelId;

        videoBox.innerHTML = `
        <div class="video-box">
            <img class="thumbnail" src='${snippet.thumbnails.high.url}'/>
            <div class="video-title">
                ${snippet.title.trim()}
            <div>
           
        </div>
        <a class='channel' href="channel.html?id=${channelId}">
        ${snippet.channelTitle}
        </a>
        `

        target.appendChild(videoBox);

    });
}


document.addEventListener('DOMContentLoaded',async ()=>{
    search('acciojob');
})


submitSearch.addEventListener('click',async()=>{
    const query = searchText.value;
    if(query === '') return ;
    console.log(`Searching for ${query}`);

    //fetch data from API and display it on the page here...
    search(query);
    
    // const {items} = data;
    
    // console.log(items);
    

    // const target = document.getElementById('target');
    // target.innerHTML = "";

    // items.forEach(({snippet,id}) => {

    //     const videoBox = document.createElement('a');
    //     videoBox.href = `videoDetail.html?id=${id.videoId}`

    //     videoBox.innerHTML = `
    //     <div class="video-box">
    //         <img class="thumbnail" src='${snippet.thumbnails.high.url}'/>
    //         <div class="video-title">
    //             ${snippet.title.trim()}
    //         <div>
    //         <div class='channel'>
    //             ${snippet.channelTitle}
    //         </div>
    //     </div>
    //     `

    //     target.appendChild(videoBox);

    });

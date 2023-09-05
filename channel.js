const apikey="AIzaSyBFzUxTYn8vKlhYDtooqLHVCANy4Ao3gOs";

const baseURL=`https://www.googleapis.com/youtube/v3`

const searchString=document.getElementById('searchString');
const btn=document.getElementById('search')

btn.addEventListener('click',()=>{
const inputString=searchString.value;
// console.log(inputString);
FetchImages(inputString);
// fetchChannelDetails();

})



async function FetchImages(inputString){
    const url=`${baseURL}/search?key=${apikey}&q=${inputString}&part=snippet&maxResults=100`;
    const data=await fetch(url,{method:"GET"});
    const res=await data.json();
    console.log(res);
    showData(res.items);
}

const images=document.getElementById('vedios');

var tit="";

function showData(res){
     for(let i=0;i<res.length;i++){
    const img=`${res[i].snippet.thumbnails.high.url}`;
    const icon=`${res[i].snippet.thumbnails.default.url}`;
    const title=`${res[i].snippet.title}`; 
    const channelName=`${res[i].snippet.channelTitle}`;
     tit=title;
    const cont=document.createElement('div');
    cont.className="card";
    
    cont.innerHTML=`
           <img class="vedioImg" src=${img}>

       <div class="about">
         <img class="icon" src="${icon}"> 
         <p class="title">${title}</p> 
       </div>

       <div class="info">
       <h5>${channelName}</h5>
       </div>  

    `
    images.appendChild(cont);
     }
}

// const pageBtn=document.getElementsByClassName("info");

// function TakeTitle(title){
//   var tit=title;
//   console.log(tit);
//    return tit;
   
// }


const listener=document.addEventListener("DOMContentLoaded",()=>{
  let channelId = window.location.search.split('=')[1];
  FetchVedios(channelId);

  })

async function FetchVedios(channel_id){
  const url=`${baseURL}/channels?part=snippet,contentDetails,statistics&id=${channel_id}&key=${apikey}`;
  const data=await fetch(url,{method:"GET"});
  const {items}=await data.json();
  console.log(items);
  showPage(items);
}

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



function showPage(res){

  const div=document.createElement('div')
  const channelLogo=res[0].snippet.thumbnails.medium.url;
  const subCount=formatNumber(res[0].statistics.subscriberCount);
  const channelName=res[0].snippet.localized.title;
  const description=res[0].snippet.description;
  const backgrd=res[0].snippet.thumbnails.high.url;
 const views=res[0].statistics.viewCount;

  div.innerHTML=`
  <img class="backgroundImg" src="${backgrd}" alt="" srcset="">
  <div class="subscribeBtn">
    <div class="channellogo">
     <img class="channelLogoImg" src="${channelLogo}" alt="">
     <div class="channelLogoAbout">
         <h2>${channelName}</h2>
         <p>${subCount}</p>
     </div> 
  
    </div>
 
    <button class="subBtn">Subscribe</button>
 
  </div>
 
   <div class="AllLinksOfPage">
     <ul class="links">
         <li><a href="">HOME </a></li>
         <li><a href="">VIDEOS</a></li>
         <li><a href="">PLAYLIST</a></li>
         <li><a href="">COMMUNITY</a></li>
         <li><a href="">CHANNELS</a></li>
         <li><a href="">ABOUT</a></li>
        <i class="fa-light fa-magnifying-glass"></i>
     </ul>
 
 
   </div>
 
   <div id="midvedio">
      <img src="${channelLogo}" alt="">
     <div class="midvedioAbout">
       <h1>${channelName}</h1>
       <b>${views}views</b>
       <p>${description}
       </p>
     </div>
 
   </div>
 
   <hr>
 
   <div id="Allvedios">
     <button class="AllvediosBtn">vedios</button>
 
   </div>

  `
  details.appendChild(div);

}
  




(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))l(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&l(o)}).observe(document,{childList:!0,subtree:!0});function r(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function l(i){if(i.ep)return;i.ep=!0;const n=r(i);fetch(i.href,n)}})();const d=[{handle:"@TrollBot66756542 💎",profilePic:"images/troll.jpg",likes:27,retweets:10,tweetText:`Buy Bitcoin, ETH Make 💰💰💰 low low prices. 
            Guaranteed return on investment. HMU DMs open!!`,replies:[],isLiked:!1,isRetweeted:!1,uuid:"4b161eee-c0f5-4545-9c4b-8562944223ee"},{handle:"@Elon ✅",profilePic:"images/musk.png",likes:6500,retweets:234,tweetText:"I need volunteers for a one-way mission to Mars 🪐. No experience necessary🚀",replies:[{handle:"@TomCruise ✅",profilePic:"images/tcruise.png",tweetText:"Yes! Sign me up! 😎🛩"},{handle:"@ChuckNorris ✅",profilePic:"images/chucknorris.jpeg",tweetText:"I went last year😴"}],isLiked:!1,isRetweeted:!1,uuid:"3c23454ee-c0f5-9g9g-9c4b-77835tgs2"},{handle:"@NoobCoder12",profilePic:"images/flower.png",likes:10,retweets:3,tweetText:"Are you a coder if you only know HTML?",replies:[{handle:"@StackOverflower ☣️",profilePic:"images/overflow.png",tweetText:"No. Obviosuly not. Go get a job in McDonald's."},{handle:"@YummyCoder64",profilePic:"images/love.png",tweetText:"You are wonderful just as you are! ❤️"}],isLiked:!1,isRetweeted:!1,uuid:"8hy671sff-c0f5-4545-9c4b-1237gyys45"}],s=[];for(let e=0;e<256;++e)s.push((e+256).toString(16).slice(1));function f(e,t=0){return(s[e[t+0]]+s[e[t+1]]+s[e[t+2]]+s[e[t+3]]+"-"+s[e[t+4]]+s[e[t+5]]+"-"+s[e[t+6]]+s[e[t+7]]+"-"+s[e[t+8]]+s[e[t+9]]+"-"+s[e[t+10]]+s[e[t+11]]+s[e[t+12]]+s[e[t+13]]+s[e[t+14]]+s[e[t+15]]).toLowerCase()}let c;const p=new Uint8Array(16);function g(){if(!c){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");c=crypto.getRandomValues.bind(crypto)}return c(p)}const m=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),u={randomUUID:m};function w(e,t,r){var i;if(u.randomUUID&&!e)return u.randomUUID();e=e||{};const l=e.random??((i=e.rng)==null?void 0:i.call(e))??g();if(l.length<16)throw new Error("Random bytes length must be >= 16");return l[6]=l[6]&15|64,l[8]=l[8]&63|128,f(l)}document.addEventListener("click",function(e){e.target.dataset.like?y(e.target.dataset.like):e.target.dataset.retweet?h(e.target.dataset.retweet):e.target.dataset.reply?v(e.target.dataset.reply):e.target.id==="tweet-btn"&&k()});function y(e){const t=d.filter(function(r){return r.uuid===e})[0];t.isLiked?t.likes--:t.likes++,t.isLiked=!t.isLiked,a()}function h(e){const t=d.filter(function(r){return r.uuid===e})[0];t.isRetweeted?t.retweets--:t.retweets++,t.isRetweeted=!t.isRetweeted,a()}function v(e){document.getElementById(`replies-${e}`).classList.toggle("hidden")}function k(){const e=document.getElementById("tweet-input");e.value&&(d.unshift({handle:"@Scrimba",profilePic:"images/scrimbalogo.png",likes:0,retweets:0,tweetText:e.value,replies:[],isLiked:!1,isRetweeted:!1,uuid:w()}),a(),e.value="")}function b(){let e="";return d.forEach(function(t){let r="";t.isLiked&&(r="liked");let l="";t.isRetweeted&&(l="retweeted");let i="";t.replies.length>0&&t.replies.forEach(function(n){i+=`
<div class="tweet-reply">
    <div class="tweet-inner">
        <img src="${n.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${n.handle}</p>
                <p class="tweet-text">${n.tweetText}</p>
            </div>
        </div>
</div>
`}),e+=`
<div class="tweet">
    <div class="tweet-inner">
        <img src="${t.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${t.handle}</p>
            <p class="tweet-text">${t.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots"
                    data-reply="${t.uuid}"
                    ></i>
                    ${t.replies.length}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-heart ${r}"
                    data-like="${t.uuid}"
                    ></i>
                    ${t.likes}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${l}"
                    data-retweet="${t.uuid}"
                    ></i>
                    ${t.retweets}
                </span>
            </div>   
        </div>            
    </div>
    <div class="hidden" id="replies-${t.uuid}">
        ${i}
    </div>   
</div>
`}),e}function a(){document.getElementById("feed").innerHTML=b()}a();

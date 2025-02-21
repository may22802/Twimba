import { tweetsData } from './data.js'
import { v4 as uuidv4 } from 'uuid';

let tweetsDataState = JSON.parse(localStorage.getItem('tweetsData')) || tweetsData

document.addEventListener('click', function (e) {
    if (e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like)
    }
    else if (e.target.dataset.retweet) {
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if (e.target.dataset.reply) {
        handleReplyClick(e.target.dataset.reply)
    }
    else if (e.target.id === 'tweet-btn') {
        handleTweetBtnClick()
    }
    else if (e.target.dataset.addReply){
        handleAddReplyClick(e.target.dataset.addReply)
    }
})

function handleLikeClick(tweetId) {
    const targetTweetObj = tweetsDataState.filter(function (tweet) {
        return tweet.uuid === tweetId
    })[0]

    if (targetTweetObj.isLiked) {
        targetTweetObj.likes--
    }
    else {
        targetTweetObj.likes++
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    localStorage.setItem('tweetsData', JSON.stringify(tweetsDataState))
    render()
}

function handleRetweetClick(tweetId) {
    const targetTweetObj = tweetsDataState.filter(function (tweet) {
        return tweet.uuid === tweetId
    })[0]

    if (targetTweetObj.isRetweeted) {
        targetTweetObj.retweets--
    }
    else {
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    localStorage.setItem('tweetsData', JSON.stringify(tweetsDataState))
    render()
}

function handleReplyClick(replyId) {
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}

function handleAddReplyClick(replyId) {
    const replyInput = document.getElementById(`reply-input-${replyId}`)
    if (replyInput.value){
        tweetsDataState.forEach(function (tweet) {
            if (tweet.uuid === replyId) {
                tweet.replies.unshift({
                    handle: `@May22802😵‍💫`,
                    profilePic: `images/unnamed.jpg`,
                    tweetText: replyInput.value
                })
            }
        })
        localStorage.setItem('tweetsData', JSON.stringify(tweetsDataState))
        render()
        replyInput.value = ''
    }
}

function handleTweetBtnClick() {
    const tweetInput = document.getElementById('tweet-input')

    if (tweetInput.value) {
        tweetsDataState.unshift({
            handle: `@May22802😵‍💫`,
            profilePic: `images/unnamed.jpg`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        })
        localStorage.setItem('tweetsData', JSON.stringify(tweetsDataState))
        render()
        tweetInput.value = ''
    }

}

function getFeedHtml() {
    let feedHtml = ``

    tweetsDataState.forEach(function (tweet) {

        let likeIconClass = ''

        if (tweet.isLiked) {
            likeIconClass = 'liked'
        }

        let retweetIconClass = ''

        if (tweet.isRetweeted) {
            retweetIconClass = 'retweeted'
        }

        let repliesHtml = ''

        if (tweet.replies.length > 0) {
            tweet.replies.forEach(function (reply) {
                repliesHtml += `
<div class="tweet-reply">
    <div class="tweet-inner">
        <img src="${reply.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${reply.handle}</p>
                <p class="tweet-text">${reply.tweetText}</p>
            </div>
        </div>
</div>
`
            })
        }


        feedHtml += `
<div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots"
                    data-reply="${tweet.uuid}"
                    ></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-heart ${likeIconClass}"
                    data-like="${tweet.uuid}"
                    ></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${retweetIconClass}"
                    data-retweet="${tweet.uuid}"
                    ></i>
                    ${tweet.retweets}
                </span>
            </div>   
        </div>            
    </div>
    <div class="hidden" id="replies-${tweet.uuid}">
        <div class="tweet-reply-box">
            <img src="images/unnamed.jpg" class="profile-pic-reply">
            <input type="text" id="reply-input-${tweet.uuid}" placeholder="Add your reply" class="reply-input">
            <i class="fa-solid fa-circle-plus reply-add-icon" data-add-reply='${tweet.uuid}'></i>    
        </div>        
        ${repliesHtml}
    </div>   
</div>
`
    })
    return feedHtml
}

function render() {
    document.getElementById('feed').innerHTML = getFeedHtml()
}

render()


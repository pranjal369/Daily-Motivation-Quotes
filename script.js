// const quotes = document.getElementById('quotes');
// const author = document.getElementById('author');
// const newQ = document.getElementById('newQ');
// const tweetme = document.querySelector('.tweetme');
// const speechBtn = document.querySelector(".speech");
// const copyBtn = document.querySelector(".copy");
// // twitterBtn = document.querySelector(".twitter"),
// const synth = speechSynthesis;

// let realdata = "";
// let quotesdata = "";

// const tweetnow = () => {
//     let tweetpost = `http://twitter.com/intent/tweet?text=${quotesdata.text}`;
//     window.open(tweetpost);
// }

// speechBtn.addEventListener("click", ()=>{
//     if(!newQ.classList.contains("loading")){
//         let utterance = new SpeechSynthesisUtterance(`${quotesdata.innerText} by ${quotesdata.author.innerText}`);
//         synth.speak(utterance);
//         setInterval(()=>{
//             !synth.speaking ? speechBtn.classList.remove("active") : speechBtn.classList.add("active");
//         }, 10);
//     }
// });

// copyBtn.addEventListener("click", ()=>{
//     navigator.clipboard.writeText(quotesdata.innerText);
// });


// const getnewquotes = () => {
//     let rand_num = Math.floor(Math.random() * 10);
//     // console.log(realdata[rand_num].text);
//     // console.log(realdata[rand_num].author);
//     // console.log(rand_num);
//     quotesdata = realdata[rand_num];
//     quotes.innerText = `${quotesdata.text}`;
//     // author.innerText=`${realdata[rand_num].author}`;
//     quotesdata.author == null ? (author.innerText = "unKnown") : (author.innerText =
//     `-${quotesdata.author}`);
// };

// const getquotes = async () => {
//     const api = "http://type.fit/api/quotes";
//     try {
//         let data = await fetch(api);
//         realdata = await data.json();
//         // console.log(realdata[0].text);
//         getnewquotes();
//     } catch (error) {}

// };

// newQ.addEventListener('click', getnewquotes);
// tweetme.addEventListener('click', tweetnow);
// getquotes();

const quoteText = document.querySelector("#quotes"),
    quoteBtn = document.querySelector("#newQ"),
    authorName = document.querySelector("#author"),
    speechBtn = document.querySelector(".speech"),
    copyBtn = document.querySelector(".copy"),
    twitterBtn = document.querySelector(".tweetme"),
    synth = speechSynthesis;

function randomQuote() {
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";
    fetch("http://api.quotable.io/random").then(response => response.json()).then(result => {
        quoteText.innerText = result.content;
        authorName.innerText = result.author;
        quoteBtn.classList.remove("loading");
        quoteBtn.innerText = "New Quote";
    });
}
speechBtn.addEventListener("click", () => {
    if (!quoteBtn.classList.contains("loading")) {
        let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
        synth.speak(utterance);
        setInterval(() => {
            !synth.speaking ? speechBtn.classList.remove("active") : speechBtn.classList.add("active");
        }, 10);
    }
});
copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(quoteText.innerText);
});
twitterBtn.addEventListener("click", () => {
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
    window.open(tweetUrl, "_blank");
});
quoteBtn.addEventListener("click", randomQuote);
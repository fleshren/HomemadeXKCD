// MORGAN FLESHREN
// index.js for XKCD

const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const randButton = document.getElementById('random');

let currentIssue;
let latestIssue;


function nextFunc(){
	
	if (currentIssue == latestIssue.num)
		return;
	history.pushState(null, null, "?issue=" + (currentIssue + 1));
	main();
}
function prevFunc(){
	if (currentIssue == 1)
		return;
	history.pushState(null, null, "?issue=" + (currentIssue - 1));
	main();
}
function randFunc(){
	
	const newNum = Math.floor(Math.random() * latestIssue.num);
	console.log(newNum);
	history.pushState(null, null, "?issue=" + (newNum));
	main();
	
}
function windowLoaded(event){
	console.log('page is fully loaded');
	main();
}
function getUrlParams(){
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const issue = urlParams.get('issue');
	return issue;
}
async function getIssue(issue){
	console.log(issue);
	let response
	let json
	if (issue == null){
		json = await fetch("https://xkcd.now.sh/?comic=latest")
			.then(response => {
				//console.log(response);
				return response.json();
			})
		return json;
	}else{
		json = await fetch("https://xkcd.now.sh/?comic="+issue)
			.then(response => response.json())
		return json;
	}
	
}

window.addEventListener('load', windowLoaded);

async function main() {

	const issueNum = getUrlParams();
	const issue = await getIssue(issueNum);
	currentIssue = issue.num;
	latestIssue = await getIssue(null);
	console.log(issue);
	
	document.getElementById("title").innerHTML = issue.title;
	document.getElementById("caption").innerHTML = issue.alt;
	document.getElementById("comic").src = issue.img;


	nextButton.addEventListener('click', nextFunc);
	prevButton.addEventListener('click', prevFunc);
	randButton.addEventListener('click', randFunc);


}
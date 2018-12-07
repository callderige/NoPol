var contextMenuItem = {
	"id": "block",
	"title": "block this subreddit",
	"contexts": ["link"]
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(clickData) {
	let url = clickData.linkUrl
	let subredditToBlock = url.replace("https://old.reddit.com/r/", "");
	subredditToBlock = subredditToBlock.replace("/", "");
	let key = subredditToBlock;
	let value = "r/" + subredditToBlock;
	let object = {};
	object[key] = value;
	chrome.storage.local.set(object);
	chrome.tabs.executeScript(null, {file: "/js/blockSubreddits.js"});
});
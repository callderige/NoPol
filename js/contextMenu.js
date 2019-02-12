var contextMenuItem = {
	"id": "block",
	"title": "block this subreddit",
	"contexts": ["link"]
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(clickData) {
	let subredditToBlock = clickData.linkUrl.replace("https://old.reddit.com/r/", "").replace("/", "");
	let value = "r/" + subredditToBlock;
	chrome.storage.local.set( {[subredditToBlock]: value} );
	chrome.tabs.executeScript(null, {file: "/js/blockSubreddits.js"});
});
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addBlockedSubreddit').addEventListener("click", addBlockedSubreddit);
    chrome.storage.local.get(null, function(blockedSubreddits) {
		for (let key in blockedSubreddits) {
			let blockSubredditDiv = "<div class='blocked-subreddit-div'><p>" + blockedSubreddits[key] + "</p><button class='delete-button' id='" + key + "'>Delete</button></div>";
			$("#blockListContainer").append(blockSubredditDiv);
			document.getElementById(key).addEventListener("click", removeBlockedSubreddit);
		}
	});
});

function addBlockedSubreddit() {
	let subredditToBlock = document.getElementById('addBlockedSubredditName').value.trim();
	if (subredditToBlock.length > 0) {
		let key = subredditToBlock;
		let value = "r/" + subredditToBlock;
		let object = {};
		object[key] = value;
		chrome.storage.local.set(object);
		chrome.tabs.executeScript(null, {file: "/js/blockSubreddits.js"});
		let blockSubredditDiv = "<div class='blocked-subreddit-div'><p>" + value + "</p><button class='delete-button' id='" + key + "'>Delete</button></div>";
		$("#blockListContainer").append(blockSubredditDiv);
		document.getElementById(key).addEventListener("click", removeBlockedSubreddit);
	} else {
		alert("Please enter a valid subreddit");
	}
}

function removeBlockedSubreddit() {
	let subredditName = event.path[0].id;
	chrome.storage.local.remove(subredditName);
	chrome.tabs.executeScript(null, {code: "location.reload()"});
	document.getElementById(subredditName).parentElement.remove();
}
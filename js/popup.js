document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addBlockedSubreddit').addEventListener("click", addBlockedSubreddit);
    document.getElementById('temporaryDisable').addEventListener("click", temporaryDisable);
    chrome.storage.local.get(null, function(data) {
		if (data['setBlocking'] === undefined) {
			data['setBlocking'] = true;
			chrome.storage.local.set(data);
		}
		let checkbox = document.getElementById("temporaryDisable").checked = data['setBlocking'];
		if (checkbox.checked) {
			document.getElementById("disabledSignifier").innerHTML = "Blocking enabled";
		} else {
			document.getElementById("disabledSignifier").innerHTML = "Blocking disabled";
		}		
	});
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
		let value = "r/" + subredditToBlock;
		chrome.storage.local.set( {[subredditToBlock]: value} );
		chrome.tabs.executeScript(null, {file: "/js/blockSubreddits.js"});
		let blockSubredditDiv = "<div class='blocked-subreddit-div'><p>" + value + "</p><button class='delete-button' id='" + subredditToBlock + "'>Delete</button></div>";
		$("#blockListContainer").append(blockSubredditDiv);
		document.getElementById(subredditToBlock).addEventListener("click", removeBlockedSubreddit);
	} else {
		alert("Please enter a valid subreddit");
	}
}

function temporaryDisable() {
	let checkbox = document.getElementById("temporaryDisable");
	chrome.storage.local.get(null, function(data) {
		data['setBlocking'] = !data['setBlocking'];		
		chrome.storage.local.set(data);
		let checkbox = document.getElementById("temporaryDisable");
		if (checkbox.checked) {
			document.getElementById("disabledSignifier").innerHTML = "Blocking enabled";
			chrome.tabs.executeScript(null, {file: "/js/blockSubreddits.js"});
		} else {
			document.getElementById("disabledSignifier").innerHTML = "Blocking disabled";
			chrome.tabs.executeScript(null, {code: "location.reload()"});
		}
	});
}

function removeBlockedSubreddit() {
	let subredditName = event.path[0].id;
	chrome.storage.local.remove(subredditName);
	chrome.tabs.executeScript(null, {code: "location.reload()"});
	document.getElementById(subredditName).parentElement.remove();
}
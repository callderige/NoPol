$(document).ready(function() {
	chrome.storage.local.get(null, function(blockedSubreddits) {
		for (var key in blockedSubreddits) {
			if (document.location.href.localeCompare("https://old.reddit.com") == true)  {
				$('*[data-subreddit-prefixed="' + blockedSubreddits[key] + '"]').remove();
			}
		}
	});
});

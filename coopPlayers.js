javascript: function coopPlayers(e) {
	var r = e.el.querySelectorAll(".btn-lis-user"),
		t = [];

	for (s of r)
		t.push({
			name: s.getAttribute("data-nick-name"),
			rank: s.getAttribute("data-user-rank"),
			id: parseInt(s.getAttribute("data-user-id")),
		});

	if (!t.length) {
		alert("Please open the Players screen and try again.");
		return;
	}

	for (var n = "The room has " + r.length + " player(s):\n", a = 0; a < t.length; a++) {
		var s = t[a];
		n += `- ${a + 1}: ${s.name} (Rank ${s.rank})\n`;
	}

	var i = parseInt(prompt((n += `\nEnter the number for who you want to inspect:`)));

	if (!isNaN(i)) {
		if (i < 1 || i > t.length) {
			alert("There is no player for that number.");
			return;
		}

		var u = t[i - 1].id;
		window.open(`https://game.granbluefantasy.jp/#profile/${u}`, "blank");
	}
}
coopPlayers(Game.view);

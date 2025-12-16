javascript: !(function () {
	function doRegex(str) {
		return (
			typeof str !== "string" && (str = str.toString()), str.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
		);
	}

	function getClass(id) {
		return id in classes ? classes[id] : "Unknown Class";
	}

	const classes = {
		100301:"Berserker",
		100401:"Viking",
		100501:"Fighter Origin",
		110301:"Spartan",
		110401:"Paladin",
		120301:"Sage",
		120401:"Iatromantis",
		130301:"Warlock",
		130401:"Manadiver",
		140301:"Bandit Tycoon",
		140401:"Street King",
		150301:"Chaos Ruler",
		150401:"Onmyoji",
		160301:"Luchador",
		160401:"Sumaibito",
		170301:"Nighthound",
		170401:"Boogeyman",
		180301:"Elysian",
		180401:"Mariachi",
		190301:"Apsaras",
		200301:"Doctor",
		210301:"Runeslayer",
		220301:"Kengo",
		230301:"Glorybringer",
		240301:"Soldier",
		250301:"Nekomancer",
		260301:"Tormentor",
		270301:"Rising Force",
		280301:"Masquerade",
		290301:"Mechanic",
		300301:"Chrysaor",
		410301:"Lumberjack",
		420301:"Cavalier",
		430301:"Monk",
		440301:"Robin Hood",
		450301:"Relic Buster",
		460301:"Yamato",
		470301:"Shieldsworn"
	};

	const elements = ["Null", "Fire", "Water", "Earth", "Wind", "Light", "Dark"];

	let gameStatus = stage.gGameStatus;
	let jsnData = stage.pJsnData;

	let result = [];
	let playerInfoArray = [];

	let timer = jsnData.timer;
	let timeSubstrIdx = jsnData.timer >= 3600 ? 11 : 14;
	let turn = gameStatus.turn;

	let bossInfoStr = "";
	let playerStr = "";

	let turnTimeStr = `Turn ${turn} / ${new Date(1e3 * timer)
		.toISOString()
		.substring(timeSubstrIdx, 19)} Left`;

	result.push(turnTimeStr);

	for (let bossInfo in jsnData.boss.param) {
		let boss = jsnData.boss.param[bossInfo];
		let hpPercentage = Math.floor((parseInt(boss.hp) / boss.hpmax) * 1e4) / 100;
		bossInfoStr += `${boss.monster} - ${doRegex(boss.hp)} HP (${hpPercentage}%)`;
	}

	result.push(bossInfoStr);

	for (let raidParticipant in jsnData.multi_raid_member_info) {
		let player = jsnData.multi_raid_member_info[raidParticipant];
		let playerInfo = {
			name: player.nickname,
			rank: player.level,
			id: player.user_id,
			host: player.is_host,
			dead: player.is_dead,
			retreated: player.retired_flag,
			honor: player.point === null || player.point === undefined ? 0 : player.point,
			element: player.pc_attribute,
			class: player.job_id,
		};

		playerInfoArray.push(playerInfo);
	}

	playerInfoArray.sort((a, b) => {
		return a.honor + b.honor;
	});

	for (let player in playerInfoArray) {
		let user = playerInfoArray[player];

		/* #1: Name [id] */
		playerStr += `#${parseInt(player) + 1}: ${user.name} [${user.id}]`;
		/* Rank Ele Class */
		playerStr += ` (R${user.rank} ${elements[user.element]} ${getClass(user.class)})`;
		/* Honor */
		playerStr += ` - ${doRegex(user.honor)}pt`;

		let hrdString = "";

		user.host && (hrdString += " HOST");
		user.dead && (hrdString += " DEAD");
		user.retreated && (hrdString += " RETREATED");

		playerStr += hrdString;
		playerStr += `\n`;
	}

	result.push(playerStr);

	result.push(`Put in a Player # to see their Profile:`);

	result = result.join("\n");

	let playerId = prompt(result);

	if (playerId > 0) {
		if (--playerId >= playerInfoArray.length) {
			alert(`No player for number ${playerId + 1}`);
		} else {
			window.open(
				`https://game.granbluefantasy.jp/#profile/${playerInfoArray[playerId].id}`,
				"blank"
			);
		}
	}
})();

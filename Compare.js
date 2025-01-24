javascript: function compareDPM() {
	function doRegex(str) {
		return (
			typeof str !== "string" && (str = str.toString()), str.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
		);
	}

	let s, d, t, su;

	let n = document.getElementsByClassName("lis-gain");

	if (!n) return 0;

	for (let a = 0; a < n.length; a++) {
		let i = n[a].childNodes;
		if (i && !(i.length < 2)) {
			let l = i[0].textContent,
				o = i[1].textContent;
			if ("Damage dealt:" == l || "与えたダメージ" == l) {
				d = o;
			} else if ("Turns:" == l || "経過ターン" == l) {
				t = o;
			} else if ("Time:" == l || "討伐時間" == l) {
				s = o;
			} else if ("Summon calls:" == l || "召喚石使用回数" == l) {
				su = o;
			}
		}
	}

	if (!s || !d || !t || !su) return 0;

	d = parseFloat(d.replaceAll(",", ""));

	s = s.split(":");
	let sec = parseInt(s[0]) * 60 + parseInt(s[1]);

	let dps = d / sec;
	let dpm = dps * 60;
	let dpt = d / t;
	let tpm = (t / sec) * 60;

	let ids = [];

	/* MVP */

	let mvp = document.getElementsByClassName("mvp");

	if (!mvp) return 0;

	let mvpName = mvp[0].getElementsByClassName("txt-name")[0].textContent;
	let mvpDMG = parseInt(
		mvp[0].getElementsByClassName("prt-user-damage")[0].textContent.match(/\d+$/)[0]
	);
	let mvpDPS = mvpDMG / sec;
	let mvpDPM = mvpDPS * 60;

	let mvpID = mvp[0]
		.getElementsByClassName("prt-thumb-image btn-thumb-image")[0]
		.getAttribute("data-href")
		.match(/\d+$/);

	if (mvpID) {
		/* You're not MVP */
		ids.push("/" + mvpID[0]);
	} else {
		mvpID = "You";
		ids.push("");
	}

	/* Vice */

	let vice = document.getElementsByClassName("mvp_2nd");

	if (!vice) return 0;

	let viceName = vice[0].getElementsByClassName("txt-name")[0].textContent;
	let viceDMG = parseInt(
		vice[0].getElementsByClassName("prt-user-damage")[0].textContent.match(/\d+$/)[0]
	);
	let viceDPS = viceDMG / sec;
	let viceDPM = viceDPS * 60;

	let viceID = vice[0]
		.getElementsByClassName("prt-thumb-image btn-thumb-image")[0]
		.getAttribute("data-href")
		.match(/\d+$/);

	if (viceID) {
		/* You're not Vice */
		ids.push("/" + viceID[0]);
	} else {
		viceID = "You";
		ids.push("");
	}

	/* Raid Name and Time */
	let raid = document.getElementsByClassName("txt-enemy-name")[0].textContent;
	let date = document.getElementsByClassName("txt-defeat-value")[0].textContent;

	let output = `
	Raid: ${raid} | Date: ${date}\n
	Total DMG: ${doRegex(d)} | Turns: ${t} | Time: ${s[0]}:${s[1]} | Summons: ${su}\n
    `;

	/* Metrics */
	output += `
	\n
	You - DPT: ${doRegex(dpt.toFixed(2))} | DPM: ${doRegex(dpm.toFixed(2))}\n
	`;

	/* MVP Metrics */
	output += `
	MVP - ${mvpName} [${mvpID}] - DPM: ${doRegex(mvpDPM.toFixed(2))}\n
	`;

	/* Vice Metrics */
	output += `
	Vice - ${viceName} [${viceID}] - DPM: ${doRegex(viceDPM.toFixed(2))}
	`;

	/* Copy */
	navigator.clipboard.writeText(output);

	output += `\n\n1 for MVP, 2 for Vice:`;

	let playerId = prompt(output);

	if (playerId) {
		try {
			playerId = parseInt(playerId);
			if (playerId === 1 || playerId === 2) {
				window.open(`https://game.granbluefantasy.jp/#profile${ids[playerId - 1]}`, "blank");
			} else {
				alert(`Read the instruction better`);
			}
		} catch (err) {
			alert(`Read the instruction better`);
		}
	}
}
compareDPM();

javascript: function showDMG() {
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
	let dptRei = d / (t-5);
	let tpm = (t / sec) * 60;

	/* Raid Name and Time */
	let raid = document.getElementsByClassName("txt-enemy-name")[0].textContent;
	let date = document.getElementsByClassName("txt-defeat-value")[0].textContent;

	/* Damage Breakdown */
	let parent = document.getElementById("prt-damage-category");
	let children = parent.childNodes;
	let auto = parseInt(children[0].textContent.replaceAll(",", ""));
	let skill = parseInt(children[1].textContent.replaceAll(",", ""));
	let ougi = parseInt(children[2].textContent.replaceAll(",", ""));
	let other = parseInt(children[3].textContent.replaceAll(",", ""));

	let output = `
	Raid: ${raid} | Date: ${date}\n
	Total DMG: ${doRegex(d)} | Turns: ${t} | Time: ${s[0]}:${s[1]} | Summons: ${su}\n
    `;

	/* Damage Breakdown */
	output += `
	\n
	Auto: ${doRegex(auto)} (${((auto / d) * 100).toFixed(2)}%)\n
	Skill: ${doRegex(skill)} (${((skill / d) * 100).toFixed(2)}%)\n
	Ougi: ${doRegex(ougi)} (${((ougi / d) * 100).toFixed(2)}%)\n
	Other: ${doRegex(other)} (${((other / d) * 100).toFixed(2)}%)\n
	`;

	/* Metrics */
	output += `
	DPS: ${doRegex(dps.toFixed(2))} | DPM: ${doRegex(dpm.toFixed(2))}\n
	DPT: ${doRegex(dpt.toFixed(2))} | DPT (Rei): ${doRegex(dptRei.toFixed(2))} | TPM: ${doRegex(tpm.toFixed(2))}
	`;

	/* Copy */
	navigator.clipboard.writeText(output);

	alert(output);
}
showDMG();

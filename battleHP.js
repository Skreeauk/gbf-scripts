javascript: function showHP() {
	let data = stage.gGameStatus,
		strs = [],
		boss = null,
		hp = 0;
	for (let i in data.boss.param)
		(boss = data.boss.param[i]),
			(hp = parseInt(boss.hp)),
			strs.push(
				boss.name.en +
					"\n\t--" +
					hp.toLocaleString() +
					" [" +
					((100 * hp) / parseInt(boss.hpmax)).toLocaleString(void 0, { maximumFractionDigits: 2 }) +
					"%]"
			);
	alert(`Turn: ${stage.gGameStatus.turn}\n${strs.join("\n")}`);
}
showHP();

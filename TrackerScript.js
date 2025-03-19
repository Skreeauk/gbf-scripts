// ==UserScript==
// @name         碧蓝幻想掉落提醒
// @version      0.0.2
// @description  结算出现目标物品时弹窗提醒
// @icon         http://game.granbluefantasy.jp/favicon.ico
// @author       w
// @match        *://game.granbluefantasy.jp/*
// @match        *://gbf.game.mbga.jp/*
// @run-at       document-end
// @grant        GM_notification
// ==/UserScript==
(function () {
	"use strict";

	const boosted_artifact = true;

	const targetInfo = [
		{ key: "17_20004", comment: "Gold Bar" },
		{ key: "10_215", comment: "Sand" },
		{ key: "91_4019", comment: "Soup Shield" },
		// { key: "10_79", comment: "Horn" }
	];

	const element = ["Fire", "Water", "Earth", "Wind", "Light", "Dark"];
	const weapon_type = ["Sword", "Dagger", "Spear", "Axe", "Staff", "Gun", "Melee", "Bow", "Harp", "Katana"];

	const AUDIO_URL = "https://www.dropbox.com/scl/fi/3ajxcpx9wymxabyw3lhjm/your_fate_is_over_retard.mp3?rlkey=h458moqyu92m4jycak4uva3if&raw=1";
	const audio = new Audio(AUDIO_URL);

	const send = (itemInfo) => {
		GM_notification({
			title: "FKING SACK",
			text: `${itemInfo} GET!!!`,
			timeout: 3000,
		});
		audio.play();
	};

	const send_artifact = (ele, weapon) => {
		GM_notification({
			title: "FKING SACK",
			text: `${element[ele]} ${weapon_type[weapon]} Artifact GET!!!`,
			timeout: 3000,
		});
		audio.play();
	};

	window.addEventListener("hashchange", () => {
		if (/^#result(_multi)?\/\d/.test(location.hash)) {
			$(document).ajaxSuccess((event, xhr, settings, data) => {
				if (/\/result(multi)?\/content\/index\/\d+/.test(settings.url)) {
					const reward_list = data.option.result_data.rewards.reward_list;

					Object.values(reward_list).forEach((box) => {
						for (const [key, info] of Object.entries(box)) {
							if (targetInfo.some((i) => i.key === key)) {
								send(info.name);
							}
						}
					});

					const artifact_list = data.option.result_data.rewards.artifact_list;

					if (artifact_list.length > 0) {
						const artifact_count = data.option.result_data.rewards.artifact_drop_count_info.current_count;

						const artifact_ele = parseInt(artifact_list[0].attribute) - 1;
						const artifact_weapon = parseInt(artifact_list[0].kind) - 1;

						if (boosted_artifact || artifact_count === "30") {
							send_artifact(artifact_ele, artifact_weapon);
						}
					}
				}
			});
		}
	});
})();

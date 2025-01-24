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

	const targetInfo = [
		{ key: "1_1040025400", comment: "Celestial Sword" },
		{ key: "1_1040816300", comment: "Celestial Harp" },
		{ key: "1_1040618600", comment: "Celestial Fist" },
		{ key: "1_1040713600", comment: "Celestial Bow" },
		{ key: "1_1040423300", comment: "Celestial Staff" },
		{ key: "1_1040219400", comment: "Celestial Spear" },
		{ key: "1_1040120100", comment: "Celestial Dagger" },
		{ key: "17_20004", comment: "Gold Bar" },
		{ key: "10_215", comment: "Sand" },
		{ key: "91_4019", comment: "Soup Shield" },
		{ key: "93_11", comment: "Agastura" },
		// { key: "10_79", comment: "Horn" }
	];

	const AUDIO_URL =
		"https://www.dropbox.com/scl/fi/3ajxcpx9wymxabyw3lhjm/your_fate_is_over_retard.mp3?rlkey=h458moqyu92m4jycak4uva3if&raw=1";
	const audio = new Audio(AUDIO_URL);

	const send = (itemInfo) => {
		GM_notification({
			title: "FKING SACK",
			text: `${itemInfo.name} GET!!!`,
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
								send(info);
							}
						}
					});
				}
			});
		}
	});
})();

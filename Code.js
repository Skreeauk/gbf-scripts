javascript: let copyFrom = $("<textarea/>");
copyFrom.css({ position: "absolute", left: "-1000px", top: "-1000px" });
try {
	copyFrom.text(stage.pJsnData.twitter.battle_id);
} catch (e) {
	copyFrom.text($(".txt-room-id").text());
}
$("body").append(copyFrom), copyFrom.select(), document.execCommand("copy"), copyFrom.remove();

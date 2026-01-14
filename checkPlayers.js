javascript: function checkPlayers() {

	let j = document.getElementsByClassName("prt-room-member")[0];

	if (!j) return 0;

    let k = j.getElementsByClassName("btn-lis-user");

    if (!k) return 0;

    let output = "";

    for (let i = 0; i < k.length; i++) {
        let player = k[i];

        output += `${player.getAttribute("data-user-id")} - ${player.getAttribute("data-nick-name")}`;

        if (i < k.length - 1){
            output += "\n";
        }
    }

	/* Copy */
	navigator.clipboard.writeText(output);
}
checkPlayers();

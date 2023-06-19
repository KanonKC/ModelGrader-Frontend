export function descriptionFormatter(description) {
	try {
		let formatted_text = "";
		let pre = false;
		let red = -1;
		let open = [];
		let close = [];

		for (let i = 0; i < description.length; i++) {
			if (description.slice(i, i + 4) === "<pre") {
				pre = true;
			} else if (description.slice(i, i + 6) === "</pre>") {
				pre = false;
				red = -1;
			}
			if (description[i] === "_" && pre && red === -1) {
				red = i;
				open.push(i);
			} else if (description[i] === "_" && pre && red !== -1) {
				close.push(i);
				red = -1;
			}
		}

		for (let i = 0; i < description.length; i++) {
			if (open.includes(i)) {
				formatted_text += '<u style="color:#d90000;"><b>';
			} else if (close.includes(i)) {
				formatted_text += "</b></u>";
			} else {
				formatted_text += description[i];
			}
		}
		return formatted_text;
	} catch (err) {
		return "";
	}
}

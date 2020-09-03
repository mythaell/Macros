const option1 = 'Blessed';
const option2 = 'Bladesong';
const option3 = 'Hasted';

const path1 = 'systems/dnd5e/icons/spells/air-burst-air-1.jpg';
const path2 = 'systems/dnd5e/icons/spells/wind-grasp-sky-2.jpg';
const path3 = 'systems/dnd5e/icons/spells/beam-blue-1.jpg';

const queryTitle = "Effect"
const queryText = "Choose effect to equip/unequip"
const queryOptions = [option1, option2, option3]

let template = `
<div>
    <div class="form-group">
        <label>${queryText}</label>
        <select id="selectedOption">`
			for (let option of queryOptions) {
				template += `<option value="${option}">${option}</option>`
			}
			template += `</select>
    </div>
</div>
`

new Dialog({
    title: queryTitle,
    content: template,
    buttons: {
        ok: {
            icon: '<i class="fas fa-check"></i>',
            label: "OK",
            callback: async (html) => {
                const selectedOption = html.find("#selectedOption")[0].value;
                console.log("selected option", selectedOption);
				
                let itemName = html.find("#selectedOption")[0].value; // <--- Change this to the *exact* item name (capitals count!)
                let sendToChat = true; // <--- Change to 'true' or 'false' to display a chat message about equipping
                let displayIcon = true; // <--- Change to 'true' or 'false' to display an effect icon when equipped

        //				const effectIconPath = 'modules/plutonium/media/icon/spell/phb-bless.jpg';

                let toggleResult = false;

                if (!actor) {
                  ui.notifications.warn('You need to select a token before using this macro!');
                } else {

                  let myItem = actor.items.find(i => i.name == itemName);
                  if (myItem != null)	{
                    let item = actor.getOwnedItem(myItem._id);
                    let attr = "data.equipped";
                    let equipped = getProperty(item.data, attr);
                    if (sendToChat) {			
                      if (!equipped) {
                        chatMessage(actor.name + ' equipped the ' + itemName+ ' effect</i>');
                      } else {
                        chatMessage(actor.name + ' unequipped the ' + itemName + 'effect</i>');			
                      }
                    }
                    item.update({[attr]: !getProperty(item.data, attr)});

        // mark/unmark character's token with an effect icon when displayToken is true
                    (async () => { 
                      if (displayIcon) {
                          if (itemName === option1) {
                          const effectIconPath = path1;
                          toggleResult = await token.toggleEffect(effectIconPath);
                          if (toggleResult == equipped) token.toggleEffect(effectIconPath);

                        } else if (itemName === option2) {
                          const effectIconPath = path2;
                          toggleResult = await token.toggleEffect(effectIconPath);
                          if (toggleResult == equipped) token.toggleEffect(effectIconPath);

                        } else if (itemName === option3) {
                          const effectIconPath = path3;
                          toggleResult = await token.toggleEffect(effectIconPath);
                          if (toggleResult == equipped) token.toggleEffect(effectIconPath);

                        } 	

                      }
                      })();

                  } else {
                    ui.notifications.warn("No item named '" + itemName + "' found on character!");
                  }
                }

function chatMessage(messageContent) {
	// create the message
	if (messageContent !== '') {
		let chatData = {
			user: game.user._id,
			speaker: ChatMessage.getSpeaker(),
			content: messageContent,
		};
		ChatMessage.create(chatData, {});
	}
}

            }
        },
        cancel: {
            icon: '<i class="fas fa-times"></i>',
            label: 'Cancel',
            callback: async (html) => {
                console.log("canceled");
            }
        }
    },
    default: "cancel"
}).render(true)




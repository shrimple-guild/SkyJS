import { fetchAuctions, parseAuction } from "../hypixel/services/Auction.js"

console.profile()
const auctions = await fetchAuctions()
console.profileEnd()
console.log(auctions)

const apiAuction = {
	uuid: "ee0149a15ee24684827c81494eb7b9c9",
	auctioneer: "b5ac88b07a984a11bf5e24e48dc7c8ed",
	profile_id: "d61f4de15a8e43e3b35d90d205f49763",
	coop: ["b5ac88b07a984a11bf5e24e48dc7c8ed"],
	start: 1705439718683,
	end: 1705461318683,
	item_name: "Voodoo Doll",
	item_lore:
		"§6Ability: Acupuncture  §e§lRIGHT CLICK\n" +
		"§7Shoot arrows from every direction\n" +
		"§7around the targeted monster.\n" +
		"§7\n" +
		"§7Monsters hit by at least one arrow\n" +
		"§7are slowed and receive §c66,676.6\n" +
		"§c§7damage/s for §a10s§7.\n" +
		"§8Mana Cost: §3200\n" +
		"§8Cooldown: §a5s\n" +
		"\n" +
		"§8Who do you voodoo?\n" +
		"\n" +
		"§9§lRARE",
	extra: "Voodoo Doll Raw Fish",
	category: "consumables",
	tier: "RARE",
	starting_bid: 1700000,
	item_bytes:
		"H4sIAAAAAAAAACWRz27TQBDGJ38KiVFBquixYg7lgkgwTuO0vUCUFFqREqmgckJo7Z0mK9meaHedkAfgWfwefhweAjFJ97DS/ObbmW9nAoAuNEwAAI0mNI1u/GzAwYTLwjcCaHm16EKbinQJu9OC7rXR9ClTCyfhvwCeauNWmdqKasaWOkIP4U1dxePEZMZvL3GclquySH1pCbGuqK6yu5vP199xMruZfIHTuhp9WzJ7VNbyxuGD5RxpTXaL2lhKveECXolKWXGl0S8JvbIL8qQx58J5sn1oiQBey3X7SBwujcdki8pjRsp55IIeW+xlSty4jDdSQ0lR6UNmTeIvjeO38Sjux3AigSi1ytWC3okxtpJX70MntA8v6+r8VhUKJ+z8pWQGURjCkdAJc6Z5U+ygGu4GdSz0x5JRM265xDWzZv4giaCuLnYDGd9ddaD9VeUEzwXd7wU45SyDAF5c/fZWjb23Jik9uc5uT/Dsfj6fzue/pvPZTN6WpbDTwTBSo1A99MIo1r2z4XnUu0iiqJcO4ySkQXJGadSGrjc5Oa/ylWz9z9/Dg48ATXgy3f9Ulgz/ARk05QgWAgAA",
	claimed: false,
	claimed_bidders: [],
	highest_bid_amount: 0,
	last_updated: 1705439718683,
	bin: true,
	bids: [],
	item_uuid: "352a70af026d45829b22c56b0e3b4ec2"
}

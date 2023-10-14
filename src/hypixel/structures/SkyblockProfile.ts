import { PlayerInfo } from "../../mojang/mojang"
import { normalizeUuid } from "../../utils/utils"
import { SkyblockProfileData } from "../types/SkyblockProfileTypes"
import { APISkyblockProfile, OptionalRecord } from "../types/APIProfileTypes"
import { SkyblockMember } from "./SkyblockMember"

export class SkyblockProfile {
  constructor(readonly player: PlayerInfo, private profile: APISkyblockProfile) {}

  get member() {
    return new SkyblockMember(this.player, this.profile.members[this.player.uuid]!)
  }

  get gamemode() {
    return this.profile.game_mode
  }

  get cuteName() {
    return this.profile.cute_name
  }

  get profileId() {
    return normalizeUuid(this.profile.profile_id)
  }

  get members() {
    return Object.keys(this.profile.members)
  }

  get selected() {
    return this.profile.selected
  }

  generate(): SkyblockProfileData {
    return {
      player: this.player,
      profileId: this.profileId,
      members: this.members,
      bankBalance: this.profile.banking?.balance,
      cuteName: this.cuteName,
      selected: this.selected,
      member: this.member.generate(),
    }
  }
}

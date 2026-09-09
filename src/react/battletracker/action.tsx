import { JSX } from "react/jsx-runtime";
import { ActionType } from "../../godsight/battletypes/actiontype";
import { BattleAction } from "../../godsight/battletypes/battleaction";
import { AbilityAction } from "../../godsight/battletypes/abilityaction";
import { GodsightBattleData } from "../../godsight/battletypes/battledata";
import { Actor } from "../../gbf/battletypes/scenariodata/mechanics/actor";
import { PartyFormationHelper } from "../../godsight/battletypes/partyformationdata";
import { BossSpecialAttackAction } from "../../godsight/battletypes/bossspecialattackaction";
import { GameElementHelper } from "../../gbf/battletypes/scenariodata/mechanics/element";
import { DamageInstance } from "../../godsight/battletypes/damageinstance";
import { SummonAction } from "../../godsight/battletypes/summonaction";
import { CAMeterChangedAction } from "../../godsight/battletypes/cameterchangedaction";
import React from "react";
import { ChainBurstAction } from "../../godsight/battletypes/chainburstaction";
import { ChargedAttackAction } from "../../godsight/battletypes/chargedattackaction";
import { ConditionChangeAction } from "../../godsight/battletypes/conditionchangeaction";

function Action({ action, battleData }: { action: BattleAction, battleData: GodsightBattleData }) {
  const subactions = action.subactions;

  let actionElement: JSX.Element = (
    <>
      <div className="action-description">Unhandled action type! {action.getSimpleDescription()}
        {subactions.map(a =>
          <div key={a.actionNumber} className="action-description">{a.getSimpleDescription()}</div>
        )}
      </div>
    </>
  );

  switch (action.actionType) {
    case ActionType.ACTIVATED_ABILITY: {
      const abilityAction = action as AbilityAction;
      const actorName = getActorName(battleData, abilityAction.actor, abilityAction.position);

      actionElement = (
        <>
          <div className="action-description">{actorName} activated {abilityAction.name}!
            {abilityAction.subactions.map(subaction => (
              <Action key={subaction.actionNumber} action={subaction} battleData={battleData} />
            ))}
          </div>
        </>
      );
      break;
    }

    case ActionType.BOSS_SPECIAL_ATTACK: {
      const bossSpecialAction = action as BossSpecialAttackAction;

      let damageInstanceJsx = <></>;
      if (bossSpecialAction.damageInstances.length) {
        damageInstanceJsx = getDamageInstanceJsx(
          battleData,
          bossSpecialAction.target,
          bossSpecialAction.damageInstances,
        );
      }

      actionElement = (
        <>
          <div className="action-description">{bossSpecialAction.sourceName} activated {bossSpecialAction.attackName}!
            {damageInstanceJsx}
            {bossSpecialAction.subactions.map(subaction => (
              <Action key={subaction.actionNumber} action={subaction} battleData={battleData} />
            ))}
          </div>
        </>
      );
      break;
    }

    case ActionType.CALLED_SUMMON: {
      const summonAction = action as SummonAction;

      let damageInstanceJsx = <></>;
      if (summonAction.damageInstances.length) {
        damageInstanceJsx = getDamageInstanceJsx(battleData, Actor.BOSS, summonAction.damageInstances);
      }

      actionElement = (
        <>
          <div className="action-description">{getMainCharacterName(battleData)} called {summonAction.name}!
            {damageInstanceJsx}
            {summonAction.subactions.map(subaction => (
              <Action key={subaction.actionNumber} action={subaction} battleData={battleData} />
            ))}
          </div>
        </>
      );
      break;
    }

    case ActionType.CA_METER_CHANGED: {
      const meterChangedAction = action as CAMeterChangedAction;

      let changeWord = "";
      if (meterChangedAction.change > 0) {
        changeWord = "gained";
      } else {
        changeWord = "lost";
      }

      let meterWord = "meter";
      if (meterChangedAction.target == Actor.BOSS) {
        if (meterChangedAction.change > 1 || meterChangedAction.change < 1) {
          meterWord = "charge diamonds";
        } else {
          meterWord = "charge diamond";
        }
      } else if (meterChangedAction.target == Actor.PLAYER) {
        meterWord = "charge bar";
      }

      actionElement = (
        <>
          <div className="action-description">{getActorName(
            battleData,
            meterChangedAction.target,
            meterChangedAction.position,
          )} {changeWord} {meterChangedAction.change} {meterWord}!
          </div>
        </>
      );
      break;
    }

    case ActionType.CHAIN_BURST: {
      const chainBurstAction = action as ChainBurstAction;
      const damageInstanceJsx = getDamageInstanceJsx(battleData, Actor.BOSS, chainBurstAction.damageInstances);

      actionElement = (
        <>
          <div className="action-description">The party activated the chain burst {chainBurstAction.name}!
            {damageInstanceJsx}
          </div>
        </>
      );
      break;
    }

    case ActionType.CHARGED_ATTACK: {
      const chargeAttackAction = action as ChargedAttackAction;

      const damageInstanceJsx = getDamageInstanceJsx(battleData, chargeAttackAction.target, chargeAttackAction.damageTotals);

      actionElement = (
        <>
          <div className="action-description">{getActorName(
            battleData,
            Actor.PLAYER,
            chargeAttackAction.attackerPosition,
          )} activated their charged attack, {chargeAttackAction.name}!
            {damageInstanceJsx}
          </div>
        </>
      );

      break;
    }

    case ActionType.CONDITION_CHANGED: {
      const conditionChangedAction = action as ConditionChangeAction;
      const allStatuses = [
        ...conditionChangedAction.buffs,
        ...conditionChangedAction.debuffs,
        ...conditionChangedAction.unclassified
      ];

      const actorName = getActorName(
        battleData,
        conditionChangedAction.target,
        conditionChangedAction.position,
      );

      const gainedStatuses = allStatuses.filter(s => !s.dispelled);
      const dispelledStatuses = allStatuses.filter(s => s.dispelled);

      const gainedStatusesJsx: JSX.Element[] | null = gainedStatuses.map((status, idx) => (
        <>
          <span key={idx} className="status-text">{status.name}</span> <img className="status-icon" src={getStatusUrl(status.icon)} />
        </>
      )).reduce((prev: any, cur) => prev === null ? [cur] : [...prev, <>, </>, cur], null);

      const dispelledStatusesJsx: JSX.Element[] | null = dispelledStatuses.map(status => (
        <>
          <span className="status-text">{status.name}</span> <img className="status-icon" src={getStatusUrl(status.icon)} />
        </>
      )).reduce((prev: any, cur) => prev === null ? [cur] : [...prev, <>, </>, cur], null);

      let finalGainedStatusJsx = <></>;
      if (gainedStatusesJsx) {
        finalGainedStatusJsx = (
          <>
            {actorName} was affected by {gainedStatusesJsx}!
          </>
        );
      }

      let finalDispelledStatusesJsx = <></>;
      if (dispelledStatuses) {
        finalDispelledStatusesJsx = (
          <>
            {actorName} had {dispelledStatusesJsx} dispelled!
          </>
        );
      }

      actionElement = (
        <>
          <div className="action-description">{finalGainedStatusJsx} {finalDispelledStatusesJsx}
          </div>
        </>
      );
      break;
    }

    case ActionType.DAMAGE_DEALT: {

      break;
    }

    case ActionType.DAMAGE_DEALT_MULTIHIT:
    case ActionType.DEATH:
    case ActionType.HEAL:
    case ActionType.NORMAL_ATTACK:
    case ActionType.OMEN_CANCELLED:
    case ActionType.REPLACED_CHARACTER:
    case ActionType.SINGULAR_NORMAL_ATTACK:
    case ActionType.STANDBY:
    case ActionType.TURN_CHANGE:
    case ActionType.USED_FULL_ELIXIR:
    case ActionType.WINDOW_EFFECT:
  }

  return (
    <div className="action-container">
      {actionElement}
    </div>
  );
}

export default React.memo(Action);

function getMainCharacterName(battleData: GodsightBattleData): string {
  return battleData["party"]["members"][0]["name"];
}

function getDamageInstancesGroupedByPosition(allInstances: DamageInstance[]): Record<string | number, DamageInstance[]> {
  const damageInstancesByPosition: Record<string | number, DamageInstance[]> = {};
  allInstances.forEach(instance => {
    if (!damageInstancesByPosition[instance["receiverPosition"]]) {
      damageInstancesByPosition[instance["receiverPosition"]] = [];
    }
    damageInstancesByPosition[instance["receiverPosition"]].push(instance);
  });

  return damageInstancesByPosition;
}

function getDamageInstanceJsx(
  battleData: GodsightBattleData,
  receiver: Actor,
  damageInstances: DamageInstance[],
): JSX.Element {
  const damageInstancesByPosition = getDamageInstancesGroupedByPosition(damageInstances);
  return (
    <>
      {Object.keys(damageInstancesByPosition).map(position => (
        <div className="action-description">{getActorName(battleData, receiver, (Number(position)))} took {damageInstancesByPosition[position].map((instance, idx) => (
          <span key={idx} className={`element ${GameElementHelper.getPrettyElementName(instance["element"])}`}>{instance["value"]}</span>
        )).reduce((prev: any, cur) => prev === null ? [cur] : [...prev, <> + </>, cur], null)
        } damage! (Total: {damageInstancesByPosition[position].reduce((prev, cur) => prev + cur["value"], 0)})
          (Hits: {damageInstancesByPosition[position].filter(i => i["value"] > 0).length})
        </div>
      ))}
    </>
  );
}

function getActorName(battleData: GodsightBattleData, actor: Actor, position: number): string {
  let actorName = "";
  if (actor == Actor.BOSS) {
    actorName = battleData["boss"][position]["name"];
  } else if (actor == Actor.PLAYER) {
    actorName = PartyFormationHelper.getNameOfFrontlineCharacterInPosition(
      battleData["party"],
      position
    );
  } else {
    actorName = "Unknown Actor Type";
  }

  return actorName;
}

const statusBaseUrl = "https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img/sp/ui/icon/status/x64/";
const passiveBaseUrl = "https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img/sp/ui/icon/passive_effect/";

function getStatusUrl(statusIcon: string): string {
  if (statusIcon.includes("passive_effect")) {
    return `${passiveBaseUrl}/${statusIcon}.png`;
  } else {
    return `${statusBaseUrl}/${statusIcon}.png`;
  }
}
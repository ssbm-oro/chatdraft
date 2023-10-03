import * as cards from '$lib/data/cards.json';
import { shuffle } from './utils';
import type { NewDraft } from '$lib/schema.js';

export function StartDraft(player: string) {
	const newDraft: Draft = {
		total: 0,
		playerKey: player,
		currentChoice: NewChoice(),
		cards: []
	}

	return newDraft;
}

export function NewChoice(excluded: Card[] = []): Choice {
	const available = cards.all.slice().filter((card) => !excluded.includes(card))

	if (available.length < 3) {
		throw new Error('Not enough selectable cards to continue draft')
	}

	const deck = shuffle(available);
	return {
		card1: deck.pop()!,
		card2: deck.pop()!,
		card3: deck.pop()!
	};
}

export function LookupCard(cardDefKey: string | undefined | null) {
	if (!cardDefKey) return undefined;
	return cards.all.find((card) => card.cardDefKey == cardDefKey);
}

export function Choose(draft: Draft, cardDefKey: string | undefined | null) {
	console.log(`cardDefKey: ${cardDefKey}`)
	if (!cardDefKey) return;

	if (!CanChoose(draft, cardDefKey)) return;

	draft.cards.push(LookupCard(cardDefKey)!)
	draft.total++;

	if (draft.total == 12) {
		draft.currentChoice = undefined;
	}
	else {
		draft.currentChoice = NewChoice(draft.cards)
	}
}

export function CanChoose(draft: Draft, cardDefKey: string | undefined | null) {
	if (draft.total == 12) return false;

	if (!cardDefKey) return false

	const card = LookupCard(cardDefKey);
	console.log(`card: ${card}`);

	if (!(card)) return false;

	const validChoice = draft.currentChoice && [
		draft.currentChoice.card1.cardDefKey, 
		draft.currentChoice.card2.cardDefKey, 
		draft.currentChoice.card3.cardDefKey].includes(card.cardDefKey);
	
	console.log(`validChoice: ${validChoice}`);

	const alreadyDrafted = draft.cards.includes(card)

	console.log(`alreadyDrafted: ${alreadyDrafted}`);

	return (validChoice && !alreadyDrafted);
}

export function SerializeDraft(draft: Draft): NewDraft {
	const serializedDraft: NewDraft = {
		playerKey: draft.playerKey,
		cards: draft.cards.map((card) => card.cardDefKey).toString()
	}

	return serializedDraft;
}

export function DeserializeDraft(draft: NewDraft): Draft {
	const deserializedDraft: Draft = {
		playerKey: draft.playerKey!,
		cards: draft.cards?.split(',').map(card => LookupCard(card)!) || [],
		total: 12,
		currentChoice: undefined
	}

	return deserializedDraft;
}

export type Card = {
	cardDefKey: string,
	displayImageUrl: string,
	name: string,
	description: string,
}

export type Deck = Card[];

export type Choice = {
	card1: Card,
	card2: Card,
	card3: Card
}

export type Draft = {
	cards: Deck,
	total: number,
	playerKey: string,
	currentChoice: Choice | undefined,
}
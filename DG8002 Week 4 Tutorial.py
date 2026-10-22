# card_deck = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
# print(card_deck)

deck = []
import random

for i in range(13):
    deck.append(1+1)
deck = deck * 4

playing = True

while playing:
    random1 = random.randint(0, len(deck)-1)
    card1 = deck.pop(random1)
    random2 = random.randint(0, len(deck)-1)
    card2 = deck.pop(random2)

    score = card1 + card2
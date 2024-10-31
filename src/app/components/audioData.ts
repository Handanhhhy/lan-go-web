// audioData.ts

type AudioSegment = {
    sprite: [number, number];
    text: string;
};

export const audioSegments: AudioSegment[] = [
    { sprite: [0, 7000], text: "6 Minute English from bbclearningenglish.com" },
    { sprite: [7000, 4000], text: "Hello, this is 6 Minute English from BBC Learning English. I'm Phil." },
    { sprite: [11000, 4000], text: "And I'm Beth. Now, let's talk about food." },
    { sprite: [15000, 11000], text: "OK. What food do you love? What food do you hate? If you ask around, you'll soon see there's no right or wrong answer. It's all a question of taste." },
    { sprite: [26000, 11000], text: "But our taste, it turns out, isn't simply a matter of opinion. Rather, scientists have discovered that taste is influenced by our genes and DNA." },
    { sprite: [37000, 6000], text: "So, in this programme, we'll be asking, what is taste? Why can't we agree on it?" },
    { sprite: [43000, 10000], text: "And is it worth listening to experts whose job is to tell us what to eat and drink? And as usual, we'll be learning some useful new vocabulary as well." },
    { sprite: [53000, 11000], text: "Great! But first I have a question for you, Beth. A good way of finding out about British tastes is with the nation's best-loved snack – crisps." },
    { sprite: [64000, 6000], text: "So, what is the most popular flavour of crisps in the UK? Is it…" },
    { sprite: [70000, 8000], text: "a) salt and vinegar, b) cheese and onion, or c) prawn cocktail?" },
    { sprite: [78000, 3000], text: "I'm going to guess cheese and onion." }
];
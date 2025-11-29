/* Define more vibrant colors */
const colors = [
	"#ff0000", "#cc0000", "#ff3333", "#800080", "#9932cc",
	"#8b00ff", "#9370db", "#800020", "#722f37", "#9b2d30", "#a52a2a"
];

const words = [
	"i love you", "te amo", "mi niña preciosa", "mi amor hermoso",
	"mi corazon", "mi todo", "mi princesa", "mi flor hermosa",
	"mi estrellita", "mi sol radiante"
];

let wordIndex = 0;

function getRandomWord() {
	const word = words[wordIndex];
	wordIndex = (wordIndex + 1) % words.length;
	return word;
}

function createFirework(x, y) {
	const launchHeight = Math.random() * (window.innerHeight / 4) + window.innerHeight / 4;
	const projectile = document.createElement("div");
	projectile.classList.add("projectile");
	document.body.appendChild(projectile);
	projectile.style.left = `${x}px`;
	projectile.style.top = `${y}px`;

	anime({
		targets: projectile,
		translateY: -launchHeight,
		duration: 1200,
		easing: "easeOutQuad",
		complete: () => {
			projectile.remove();
			createBurst(x, y - launchHeight);
		}
	});
}

function createBurst(x, y) {
	const numPhrases = 3;
	const numSparkles = 50;

	for (let i = 0; i < numPhrases; i++) {
		const phrase = getRandomWord();
		createPhrase(x, y, phrase);
	}

	for (let i = 0; i < numSparkles; i++) {
		createParticle(x, y, true);
	}
}

function createPhrase(x, y, phrase) {
	const words = phrase.split(' ');
	document.querySelector('.instructions').style.display = 'none';

	const baseAngle = Math.random() * Math.PI * 2;
	const baseDistance = anime.random(80, 150);
	const color = colors[Math.floor(Math.random() * colors.length)];

	const phraseStartX = x + Math.cos(baseAngle) * 20;
	const phraseStartY = y + Math.sin(baseAngle) * 20;

	words.forEach((word, index) => {
		const el = document.createElement("div");
		el.classList.add("particule");
		el.textContent = word;
		el.style.color = color;

		const wordSpacing = 60;
		const wordOffsetX = (index - (words.length - 1) / 2) * wordSpacing;
		const wordOffsetY = (Math.random() - 0.5) * 30;

		el.style.left = `${phraseStartX + wordOffsetX}px`;
		el.style.top = `${phraseStartY + wordOffsetY}px`;
		document.body.appendChild(el);

		animatePhraseWord(el, baseAngle, baseDistance, wordOffsetX, wordOffsetY);
	});
}

function createParticle(x, y, isSparkle) {
	const el = document.createElement("div");
	el.classList.add(isSparkle ? "sparkle" : "particule");
	document.querySelector('.instructions').style.display = 'none';

	if (!isSparkle) {
		el.textContent = getRandomWord();
		el.style.color = colors[Math.floor(Math.random() * colors.length)];
	} else {
		el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
	}

	el.style.left = `${x}px`;
	el.style.top = `${y}px`;
	document.body.appendChild(el);

	animateParticle(el, isSparkle);
}

function animatePhraseWord(el, baseAngle, baseDistance, wordOffsetX, wordOffsetY) {
	const variationAngle = baseAngle + (Math.random() - 0.5) * 0.3;
	const variationDistance = baseDistance + (Math.random() - 0.5) * 30;
	const duration = anime.random(1500, 2200);
	const fallDistance = anime.random(30, 60);
	const scale = Math.random() * 0.8 + 0.7;

	const finalX = Math.cos(variationAngle) * variationDistance;
	const finalY = Math.sin(variationAngle) * variationDistance;

	anime.timeline({ targets: el, easing: "easeOutCubic", duration: duration, complete: () => el.remove() })
		.add({ translateX: [0, finalX], translateY: [0, finalY], scale: [0, scale], opacity: [1, 0.9] })
		.add({ translateY: `+=${fallDistance}px`, opacity: [0.9, 0], easing: "easeInCubic", duration: duration / 2 });
}

function animateParticle(el, isSparkle) {
	const angle = Math.random() * Math.PI * 2;
	const distance = anime.random(100, 200);
	const duration = anime.random(1200, 2000);
	const fallDistance = anime.random(20, 80);
	const scale = isSparkle ? Math.random() * 0.5 + 0.5 : Math.random() * 1 + 0.5;

	anime.timeline({ targets: el, easing: "easeOutCubic", duration: duration, complete: () => el.remove() })
		.add({ translateX: Math.cos(angle) * distance, translateY: Math.sin(angle) * distance, scale: [0, scale], opacity: [1, 0.9] })
		.add({ translateY: `+=${fallDistance}px`, opacity: [0.9, 0], easing: "easeInCubic", duration: duration / 2 });
}

/* Carta */
let isLetterOpen = false;
let isTyping = false;
let typingInterval = null;

const letterText = `Te deseo con la fuerza de lo imposible con el cuerpo roto y la fe intacta. Amarte es caer y renacer en la misma herida, es suplicar mas dolor con tal de tenerte cerca.
Y cuando pienso en ti, en tu cabello, en tu boca, en el dulce sabor de tus besos entiendo que siempre lo supe, desde el primer instante iba amarte toda la vida`;

function typeLetter() {
	if (isTyping) return;
	isTyping = true;
	const textElement = document.getElementById('letterText');
	textElement.textContent = '';
	let index = 0;

	typingInterval = setInterval(() => {
		if (index < letterText.length && isLetterOpen) {
			textElement.textContent += letterText.charAt(index);
			index++;
		} else {
			clearInterval(typingInterval);
			typingInterval = null;
			isTyping = false;
		}
	}, 60);
}

function openEnvelope() {
	const envelope = document.getElementById('envelope');
	envelope.classList.add('open');
	envelope.classList.remove('close');
	isLetterOpen = true;
	setTimeout(() => {
		if (isLetterOpen) typeLetter();
	}, 1700);
}

function closeEnvelope() {
	const envelope = document.getElementById('envelope');
	envelope.classList.add('close');
	envelope.classList.remove('open');
	isLetterOpen = false;
	if (typingInterval) {
		clearInterval(typingInterval);
		typingInterval = null;
		isTyping = false;
	}
	document.getElementById('letterText').textContent = '';
}

function toggleLetter() {
	if (!isLetterOpen) openEnvelope();
	else closeEnvelope();
}

/* Listeners */
document.addEventListener('DOMContentLoaded', () => {
	const envelope = document.getElementById('envelope');
	envelope.addEventListener('click', (e) => {
		e.stopPropagation();
		toggleLetter();
	});
});

document.addEventListener("click", (e) => {
	if (e.target.closest('#envelope')) return; // no fireworks on the envelope
	createFirework(e.clientX, e.clientY);
});

window.onload = function () {
	const centerX = window.innerWidth / 2;
	const centerY = window.innerHeight / 2;
	createFirework(centerX, centerY);
};

window.onload = function () {
	const centerX = window.innerWidth / 2;
	const centerY = window.innerHeight / 2;
	createFirework(centerX, centerY);

	// ⭐ Música suave
	const music = document.getElementById("bgMusic");
	music.volume = 0.10;   // volumen bajito (0.0 a 1.0)
	music.play();
};

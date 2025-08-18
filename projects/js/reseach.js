const cardsData = [
  {
    color: "#9fa1fb",
    title: "Innovative Strategies",
    description: "Explore cutting-edge methods to drive your business forward.",
    highlight: "Growth Mindset",
    image: "https://plus.unsplash.com/premium_photo-1690407617686-d449aa2aad3c?fm=jpg&q=60&w=3000",
  },
  {
    color: "#74b9ff",
    title: "Global Networking",
    description: "Connect with leaders from around the world.",
    highlight: "Collaboration",
    image: "https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?fm=jpg&q=60&w=3000",
  },
  {
    color: "#55efc4",
    title: "Sustainable Practices",
    description: "Learn how to balance profit with environmental impact.",
    highlight: "Eco Leadership",
    image: "https://plus.unsplash.com/premium_photo-1661602011150-6c6f8b9ba788?fm=jpg&q=60&w=3000",
  },
  {
    color: "#fab1a0",
    title: "Market Analysis",
    description: "Gain insights into industry trends and opportunities.",
    highlight: "Data Driven",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?fm=jpg&q=60&w=3000",
  },
  {
    color: "#81ecec",
    title: "Leadership Development",
    description: "Unlock your potential with proven leadership frameworks.",
    highlight: "Lead with Impact",
    image: "https://images.unsplash.com/photo-1628125660717-5190c3fdfb86?fm=jpg&q=60&w=3000",
  },
  {
    color: "#fdcb6e",
    title: "Financial Planning",
    description: "Master budgeting, investment, and risk management.",
    highlight: "Strategic Finance",
    image: "https://images.unsplash.com/photo-1672825464619-79acee9f7e29?fm=jpg&q=60&w=3000",
  },
];

const container = document.getElementById("cards-container");

// Generate repeated cards for infinite scroll effect
for (let i = 0; i < 12; i++) {
  const data = cardsData[i % cardsData.length];

  const card = document.createElement("div");
  card.className = "card";
  card.style.border = `2px solid ${data.color}`;

  // Background
  const bg = document.createElement("div");
  bg.className = "card-background";
  bg.style.backgroundImage = `url(${data.image})`;

  // Gradient overlay
  const gradient = document.createElement("div");
  gradient.className = "card-gradient";

  // Content
  const content = document.createElement("div");
  content.className = "card-content";

  const h3 = document.createElement("h3");
  h3.textContent = data.title;

  const p = document.createElement("p");
  p.textContent = data.description;

  const highlight = document.createElement("p");
  highlight.textContent = data.highlight;
  highlight.className = "highlight";
  highlight.style.color = data.color;

  content.appendChild(h3);
  content.appendChild(p);
  content.appendChild(highlight);

  card.appendChild(bg);
  card.appendChild(gradient);
  card.appendChild(content);

  container.appendChild(card);
}

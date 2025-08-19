const cardsData = [
  {
    color: "#9fa1fb",
    title: "Innovative Strategies",
    description: "Explore cutting-edge methods to drive your business forward.",
    highlight: "Growth Mindset",
    image: "assets/p1.jpeg",
  },
  {
    color: "#74b9ff",
    title: "Global Networking",
    description: "Connect with leaders from around the world.",
    highlight: "Collaboration",
        image: "assets/p2.jpeg",
  },
  {
    color: "#55efc4",
    title: "Sustainable Practices",
    description: "Learn how to balance profit with environmental impact.",
    highlight: "Eco Leadership",
        image: "assets/p3.jpeg",
  },
  {
    color: "#fab1a0",
    title: "Market Analysis",
    description: "Gain insights into industry trends and opportunities.",
    highlight: "Data Driven",
        image: "assets/p4.jpeg",
  },
  // {
  //   color: "#81ecec",
  //   title: "Leadership Development",
  //   description: "Unlock your potential with proven leadership frameworks.",
  //   highlight: "Lead with Impact",
  //       image: "assets/p1.jpeg",
  // },
  // {
  //   color: "#fdcb6e",
  //   title: "Financial Planning",
  //   description: "Master budgeting, investment, and risk management.",
  //   highlight: "Strategic Finance",
  //       image: "assets/p1.jpeg",
  // },
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

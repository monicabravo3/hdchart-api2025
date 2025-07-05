export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const { birthDate, birthTime, birthLocation } = req.body;

  if (!birthDate || !birthTime || !birthLocation) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // For now, return the birth info back + dummy chart
  const chart = {
    birthDate,
    birthTime,
    birthLocation,
    type: "Manifesting Generator",
    authority: "Sacral",
    profile: "5/1",
    incarnationCross: "Right Angle Cross of the Sleeping Phoenix",
    gates: {
      conscious: [
        { planet: "Sun", gate: 34 },
        { planet: "Earth", gate: 20 }
      ],
      design: [
        { planet: "Sun", gate: 57 },
        { planet: "Earth", gate: 51 }
      ]
    }
  };

  return res.status(200).json({ chart });
}

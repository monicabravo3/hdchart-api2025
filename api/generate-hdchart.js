export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { birthDate, birthTime, birthLocation } = req.body;

  try {
    // Call RotationTime API
    const response = await fetch("https://rotationtime.vercel.app/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        date: birthDate,
        time: birthTime,
        place: birthLocation
      })
    });

    const chartData = await response.json();

    if (!chartData || chartData.error) {
      throw new Error("Invalid chart data");
    }

    // You can format or map this data however you want:
    return res.status(200).json({
      type: chartData.type,
      authority: chartData.authority,
      strategy: chartData.strategy,
      profile: chartData.profile,
      definedCenters: chartData.definedCenters,
      undefinedCenters: chartData.undefinedCenters,
      gates: chartData.gates,
      channels: chartData.channels,
      incarnationCross: chartData.incarnationCross
    });
  } catch (err) {
    return res.status(500).json({
      error: "Failed to generate chart",
      details: err.message
    });
  }
}

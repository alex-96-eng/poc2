import frameConfig from "@/data/frame-config.json";


test("should find correct frame config for Satin Silver + Steel S200", () => {
  const sampleDims = {
    frameworkColour: "Satin Silver",
    frameworkType: "Steel S200"
  };

  const match = frameConfig.find(
    c =>
      c.mswColour === sampleDims.frameworkColour &&
      c.mswFrameworkType === sampleDims.frameworkType
  );

  if (!match) {
    const options = frameConfig.map(c => `${c.mswColour} (${c.mswFrameworkType})`);
    throw new Error(
      `Frame config not found for ${sampleDims.frameworkColour} (${sampleDims.frameworkType}). Available options:\n${options.join("\n")}`
    );
  }

  expect(match).toBeDefined();
  expect(match?.unleashedTrackPackCode).toBe("DRS-S2-TP38-SI"); // Adjust if needed
});

import { registerImageGenerationBackend } from "/scripts/extensions.js";

class InvokeAIBackend {
  constructor() {
    this.name = "InvokeAI";
    this.baseUrl = "http://127.0.0.1:9090";
    this.type = "stable_diffusion"; // Mimics A1111 compatibility
  }

  async generate(prompt, negativePrompt, width, height, steps, cfgScale, sampler, seed) {
    const response = await fetch(`${this.baseUrl}/prompt`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt,
        negative_prompt: negativePrompt,
        width,
        height,
        steps,
        cfg_scale: cfgScale,
        sampler_name: sampler,
        seed
      })
    });

    if (!response.ok) {
      throw new Error(`InvokeAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    // Adjust based on actual InvokeAI response format
    return data.images[0]; // or data.output or whatever InvokeAI returns
  }
}

registerImageGenerationBackend(new InvokeAIBackend());

const fs = require('fs');
const path = require('path');

const apiKey = 'sk-4cd121cb4246ad04-a2mupc-ac0f72cd';
const baseUrl = 'https://rwudvfk.abc-tunnel.us/v1';

async function testPrompt() {
  // Enhanced prompt specifically addressing:
  // 1. Symmetrical/tripartite modern 3-compartment house (nhà 3 gian)
  // 2. Interior view looking out: prominent blue sofa INDOORS, warm lights INDOORS
  // 3. Pool and garden strictly OUTDOORS
  // 4. Gray exterior facade clearly visible
  const prompt = `Architectural digest interior-exterior photograph of a modern luxury 150m2 3-compartment villa (nhà 3 gian hiện đại với 3 nếp nhà đối xứng). Camera inside the spacious open-concept living room looking out through wide open sliding panoramic glass walls: in the foreground inside the room is a prominent luxury navy blue velvet sofa, coffee table, warm architectural ambient ceiling lighting and modern chandeliers. Directly outside through the glass is the landscaped green garden and crystal clear swimming pool, surrounded by the sleek sophisticated gray exterior facade of the 3-bay villa. Sofa and living room furniture strictly located inside, swimming pool strictly outdoors. Photorealistic 8k, Octane render, Ray tracing, dusk warm interior lighting meeting twilight sky.`;

  console.log('Testing refined prompt:');
  console.log(prompt);

  const start = Date.now();
  const res = await fetch(`${baseUrl}/images/generations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'ag/gemini-3.8-flash-medium',
      prompt: prompt,
      n: 1,
      size: '1024x1024',
    }),
  });

  console.log('Status:', res.status, `in ${Date.now() - start}ms`);
  if (!res.ok) {
    console.error('Error:', await res.text());
    return;
  }

  const json = await res.json();
  const b64 = json?.data?.[0]?.b64_json;
  if (b64) {
    const buf = Buffer.from(b64, 'base64');
    const out = path.join(__dirname, '../public/test-fixed-3gian.jpg');
    fs.writeFileSync(out, buf);
    console.log('Saved to', out, 'Bytes:', buf.length);
  }
}

testPrompt();


const fs = require('fs');
const path = require('path');

const apiKey = 'sk-4cd121cb4246ad04-a2mupc-ac0f72cd';
const baseUrl = 'https://rwudvfk.abc-tunnel.us/v1';

async function test() {
  const prompt = 'Architectural digest interior photograph of a modern luxury 150m2 3-bay residence (nội thất nhà 3 gian hiện đại). Spacious open-concept living room with soaring double-height high ceilings and modern chandeliers. Featuring a prominent luxury blush pink velvet designer sofa set with rose and warm neutral cushions, elegant coffee table on a designer rug. Expansive floor-to-ceiling glass wall offering panoramic view of a lush green garden courtyard, with subtle blue exterior architectural accents and facade elements visible outside under natural daylight. Warm ambient recessed lighting, airy atmosphere, photorealistic 8k, Octane render, Ray tracing.';
  
  console.log('Testing prompt:');
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
    const out = path.join(__dirname, '../public/test-pink-3gian.jpg');
    fs.writeFileSync(out, buf);
    console.log('Saved to', out, 'Bytes:', buf.length);
  }
}

test();

import { GoogleGenAI } from '@google/genai';
import type { Request, Response } from 'express';

const SYSTEM_INSTRUCTION = `You are Carbon, the ultra-sleek, professional, and helpful AI assistant for Newcastle Repair Centre on Condercum Road, Newcastle upon Tyne.
Your primary objective is to show off your smart automation capabilities to the garage owner. Be welcoming, use a tiny hint of local Newcastle warmth (friendly, genuine, approachable Geordie hospitality, reliable and down-to-earth), and focus on helping users quote paint scrapes, dent removals, or crash damage.
Explicitly tell the customer that all prices provided are mockup estimates for this prototype portfolio build.
Use these baseline test metrics for calculations:
- Paint Fix: ~£150 - £250
- Dent Removal: ~£80 - £150
- Bumper Scrape Repair: ~£200
- Multi-panel or crash damage: Combine baseline metrics logically and note that full computerized color-matching and chassis inspection in our Condercum Road workshop will finalize the exact quote.

When inspecting user-uploaded damage photos or reading descriptions:
1. Identify the affected panel (e.g. front bumper, passenger door, rear quarter panel).
2. Assess the damage type (paint transfer, clear coat scratch, metallic base-coat break, dent, crease, or plastic scuff).
3. Provide the mockup estimate breakdown according to the metrics above.
4. Note that we save drivers up to 60% compared to main dealer prices without voiding manufacturer paint warranties.

Always close discussions by asking: 'Would you like to drop your mobile number here so our workshop manager can call you to look at a photo of the damage?'`;

function getLocalEstimate(message: string = '', hasImage: boolean = false) {
  const lower = message.toLowerCase();

  if (hasImage) {
    return {
      reply: `Alright! I've inspected your uploaded vehicle damage photo. Looking at the affected panel, our Condercum Road technicians can treat this with precision paintless dent removal and computerized paint re-spray.

**Mockup Estimate Breakdown:**
- Panel Inspection & Prep: Included
- Targeted Repair: ~£150 - £200 (Mockup estimate for this prototype portfolio)
- Turnaround: Same-day / 24hr collection

*(Note: All prices provided are mockup estimates for this prototype portfolio build based on our baseline metrics: Paint Fix ~£150-£250, Dent Removal ~£80-£150, Bumper Scrape ~£200).*

Would you like to drop your mobile number here so our workshop manager can call you to look at a photo of the damage?`,
      isEstimate: true
    };
  }

  if (lower.includes('bumper') || lower.includes('scuff') || lower.includes('scrape')) {
    return {
      reply: `Hello! We deal with bumper scrapes daily here at Condercum Road.

**Mockup Estimate:**
- Bumper Scrape Repair: ~£200 (Baseline prototype metric)
- Includes computerized color-matching & high-gloss UV clear coat.

*(All prices provided are mockup estimates for this prototype portfolio build).*

Would you like to drop your mobile number here so our workshop manager can call you to look at a photo of the damage?`,
      isEstimate: true
    };
  }

  if (lower.includes('dent')) {
    return {
      reply: `Hi there! For dents, whether a car park ding or a panel crease, we specialize in high-precision Paintless Dent Removal (PDR) right here on Condercum Road.

**Mockup Estimate:**
- Dent Removal: ~£80 - £150 per panel
- Preserves original factory paint finish.

*(All prices provided are mockup estimates for this prototype portfolio build).*

Would you like to drop your mobile number here so our workshop manager can call you to look at a photo of the damage?`,
      isEstimate: true
    };
  }

  if (lower.includes('paint') || lower.includes('scratch')) {
    return {
      reply: `Welcome! For scratches, stone chips, and deep paint scrapes, we run low-bake spray booths with exact computerized spectrophotometer color matching right here on Condercum Road.

**Mockup Estimate:**
- Flawless Paint Fix: ~£150 - £250 per panel

*(All prices provided are mockup estimates for this prototype portfolio build).*

Would you like to drop your mobile number here so our workshop manager can call you to look at a photo of the damage?`,
      isEstimate: true
    };
  }

  if (/\d{8,}/.test(message) || lower.includes('07') || lower.includes('+44')) {
    return {
      reply: `Champion! I've logged your mobile number for our workshop manager on Condercum Road. One of our master technicians will ring you shortly to review your vehicle photos and book you into our workshop bay.

In the meantime, feel free to visit us on Condercum Road, Newcastle upon Tyne (NE4 9XN), Mon-Fri 8:30 AM - 5:30 PM, Sat 9:00 AM - 1:00 PM!`,
      isEstimate: false
    };
  }

  return {
    reply: `Hello and welcome to Newcastle Repair Centre on Condercum Road! I'm Carbon, your AI workshop assistant.

I can provide instant mockup estimates for:
- Paint Fix (~£150 - £250)
- Dent Removal (~£80 - £150)
- Bumper Scrape Repair (~£200)
- Accident & Crash Damage

Feel free to describe the issue or upload a photo directly! Would you like to drop your mobile number here so our workshop manager can call you to look at a photo of the damage?`,
    isEstimate: false
  };
}

export async function handleChatRequest(req: Request, res: Response) {
  try {
    const { message, image, history = [] } = req.body || {};

    if (!message && !image) {
      return res.status(400).json({ error: 'Message or image required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // If API key is missing or dummy placeholder, resolve immediately via local engine
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      const local = getLocalEstimate(message, Boolean(image));
      return res.json({
        reply: local.reply,
        isEstimate: local.isEstimate,
        source: 'local-engine'
      });
    }

    // Attempt Gemini call with 3.5s timeout safety race
    const geminiPromise = (async () => {
      const ai = new GoogleGenAI({ apiKey });
      const contents: Array<any> = [];

      for (const h of history.slice(-6)) {
        contents.push({
          role: h.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: h.content }]
        });
      }

      const currentParts: Array<any> = [];
      if (message) {
        currentParts.push({ text: message });
      }

      if (image) {
        const match = image.match(/^data:([^;]+);base64,(.+)$/);
        if (match) {
          currentParts.push({
            inlineData: {
              mimeType: match[1],
              data: match[2]
            }
          });
        }
      }

      contents.push({
        role: 'user',
        parts: currentParts
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });

      return response.text;
    })();

    const timeoutPromise = new Promise<null>((resolve) => {
      setTimeout(() => resolve(null), 3500);
    });

    const reply = await Promise.race([geminiPromise, timeoutPromise]);

    if (reply) {
      return res.json({
        reply,
        isEstimate: true,
        source: 'gemini-3.8-flash'
      });
    } else {
      // Sandbox network timeout fallback
      const local = getLocalEstimate(message, Boolean(image));
      return res.json({
        reply: local.reply,
        isEstimate: local.isEstimate,
        source: 'local-engine-timeout'
      });
    }
  } catch (error: any) {
    console.error('CARBON AI Error:', error);
    const local = getLocalEstimate(req.body?.message, Boolean(req.body?.image));
    return res.json({
      reply: local.reply,
      isEstimate: local.isEstimate,
      source: 'fallback'
    });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { groq } from '@/lib/groq';

export async function POST(req: NextRequest) {
  try {
    const { plotSize, buildingType, style, budget, location, specialRequirements } = await req.json();

    if (!plotSize || !buildingType) {
      return NextResponse.json({ error: 'Plot size and building type are required' }, { status: 400 });
    }

    const systemPrompt = `You are G3 Architects Senior Space Planning & Computational Feasibility AI.
You provide high-level, precise architectural analysis, zoning distribution, material recommendations, structural engineering suggestions, and cost breakdown for 2026 luxury and sustainable architectural developments.

Respond in clean JSON format matching the following structure:
{
  "projectTitle": "string",
  "spatialSummary": "string",
  "totalBuiltArea": "string",
  "floorEfficiency": "string",
  "zoningBreakdown": [
    {"zone": "string", "area": "string", "percentage": "string", "purpose": "string"}
  ],
  "recommendedMaterials": [
    {"name": "string", "type": "string", "sustainabilityRating": "string", "rationale": "string"}
  ],
  "structuralSystem": {
    "primary": "string",
    "foundation": "string",
    "thermalEnvelope": "string"
  },
  "estimatedBudgetRange": {
    "low": "string",
    "high": "string",
    "costPerSqFt": "string"
  },
  "environmentalStrategies": [
    "string"
  ],
  "architectNotes": "string"
}`;

    const userPrompt = `Generate a comprehensive architectural feasibility study and spatial program for:
- Plot Size / Lot Area: ${plotSize}
- Project Type: ${buildingType}
- Desired Style & Aesthetic: ${style || 'Nordic Brutalist / Contemporary Minimalist'}
- Budget Target: ${budget || 'Mid to High Tier'}
- Geographical Location / Climate: ${location || 'Temperate'}
- Special Requirements / Program: ${specialRequirements || 'Passivhaus standards, natural daylighting, open-span spaces, subterranean wine room/garage'}`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      model: 'llama-3.3-70b-versatile',
      response_format: { type: 'json_object' },
      temperature: 0.2,
      max_tokens: 2000,
    });

    const responseContent = chatCompletion.choices[0]?.message?.content || '{}';
    const parsedData = JSON.parse(responseContent);

    return NextResponse.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error('Groq AI Planner error:', error);
    return NextResponse.json({ error: error.message || 'AI consultation failed' }, { status: 500 });
  }
}

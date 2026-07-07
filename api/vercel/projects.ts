import type { VercelRequest, VercelResponse } from '@vercel/node';

const VERCEL_API = 'https://api.vercel.com';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const token = process.env.VERCEL_TOKEN;
  if (!token) {
    return res.status(500).json({
      error:
        "VERCEL_TOKEN n'est pas configuré côté serveur. Ajoute-le dans les variables d'environnement du projet sur Vercel.",
    });
  }

  const teamId = process.env.VERCEL_TEAM_ID;
  const params = new URLSearchParams({ limit: '100' });
  if (teamId) params.set('teamId', teamId);

  try {
    const response = await fetch(`${VERCEL_API}/v9/projects?${params.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const detail = await response.text();
      return res
        .status(response.status)
        .json({ error: `Erreur API Vercel (${response.status})`, detail });
    }

    const data = (await response.json()) as { projects?: any[] };
    const projects = (data.projects || []).map((p) => ({
      id: p.id as string,
      name: p.name as string,
      framework: (p.framework ?? null) as string | null,
      updatedAt: (p.updatedAt ?? null) as number | null,
    }));

    return res.status(200).json({ projects });
  } catch (error: any) {
    return res.status(500).json({ error: error?.message || 'Erreur inconnue' });
  }
}
